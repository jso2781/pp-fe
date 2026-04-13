/**
 * 화면ID: KIDS-PP-US-LG-01
 * 화면명: 로그인 방식 선택
 * 화면경로: /ko/auth/LoginMethod
 *
 * - production + tx 없음: /oidc/auth (KMS tx)
 * - production + tx 있음: getAnyIdInit → LOAD_MODULE(SSO)
 * - development + `VITE_SHOW_ANYID_AREA=true` + tx 없음: 임베드 LOAD_MODULE(bypass 1, KMS/oidc 없음) — 성공 시 콜백의 ssob·tag(tx)로 /auth/anyid/login (Any-ID 가이드·영문 Login.tsx와 동일 패턴)
 */
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { AccountCircle as AccountIcon } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAnyIdInit, getAnyIdUserInfoFromSsob, postAnyIdLogin } from '@/features/auth/AnyIdThunks'
import type { AnyIdUserInfoFromSsobRVO } from '@/features/auth/AnyIdTypes'
import { shouldLoadAnyIdSdk } from '@/lib/anyid/ensureAnyIdAssets'
import { useAnyIdSdkReady } from '@/lib/anyid/useAnyIdSdkReady'
import DepsLocation from '@/components/common/DepsLocation'
import { useDialog } from '@/contexts/DialogContext'
import { useTranslation } from 'react-i18next'

type LoginPhase = 'local' | 'redirecting' | 'preparing' | 'ready' | 'error'

/** production 또는 `VITE_SHOW_ANYID_AREA=true` 일 때 로컬에서도 Any-ID 로드·표시 */
const showAnyIdArea = shouldLoadAnyIdSdk()
const isProd = import.meta.env.MODE === 'production'

const anyIdInitPromiseCache = new Map<string, Promise<unknown>>()

function initialPhase(search: string): LoginPhase {
  if (!showAnyIdArea) return 'local'
  if (isProd) {
    return new URLSearchParams(search).get('tx') ? 'preparing' : 'redirecting'
  }
  return 'preparing'
}

export default function LoginMethod() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { showAlert } = useDialog()
  const { t } = useTranslation()
  const ssoInfo = useAppSelector((s) => s.anyId.ssoInfo)
  const anyidInit = useAppSelector((s) => s.anyId.anyidInit)

  const [phase, setPhase] = useState<LoginPhase>(() => initialPhase(location.search))
  const params = useMemo(() => new URLSearchParams(location.search), [location.search])
  const tx = useMemo(() => params.get('tx') || null, [params])
  const hasUrlTx = Boolean(tx)

  const acrValues = useMemo(() => {
    const v = params.get('acrValues')
    const n = v ? parseInt(v, 10) : NaN
    return Number.isFinite(n) ? n : 3
  }, [params])

  const redirectUri = useMemo(() => {
    const r = params.get('redirect_uri') || '/pp/ko'
    if (r.startsWith('http://') || r.startsWith('https://')) return r
    return `${window.location.origin}${r.startsWith('/') ? '' : '/'}${r}`
  }, [params])

  const devEmbedLogin = showAnyIdArea && !isProd && !hasUrlTx
  const devLoginTag = useMemo(() => `login-dev-${Date.now()}`, [])

  const sdkEnabled = showAnyIdArea && (!isProd || hasUrlTx)
  const anyIdSdkReady = useAnyIdSdkReady(sdkEnabled, {
    showGovLoginTitleRow: !devEmbedLogin,
  })

  useEffect(() => {
    if (!showAnyIdArea) {
      setPhase('local')
      return
    }
    if (!isProd) return
    if (hasUrlTx) return
    setPhase('redirecting')
    const currentPath = location.pathname || '/pp/ko/auth/LoginMethod'
    window.location.href = `/oidc/auth?end_point=${encodeURIComponent(currentPath)}`
  }, [showAnyIdArea, hasUrlTx, location.pathname])

  useEffect(() => {
    if (!showAnyIdArea || !hasUrlTx) return
    let cancelled = false
    ;(async () => {
      try {
        setPhase('preparing')
        const cached = anyIdInitPromiseCache.get(tx!)
        const p =
          cached ??
          (() => {
            const np = dispatch(getAnyIdInit({ tx: tx! }))
              .unwrap()
              .catch((e) => {
                console.error('[AnyID] getAnyIdInit error', e)
                anyIdInitPromiseCache.delete(tx!)
                return null
              })
            anyIdInitPromiseCache.set(tx!, np)
            return np
          })()
        const r = await p
        if (cancelled) return
        if (!r) setPhase('error')
      } catch (e) {
        console.error('[AnyID] init error', e)
        if (!cancelled) setPhase('error')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [showAnyIdArea, hasUrlTx, tx, dispatch])

  useEffect(() => {
    if (!showAnyIdArea) return
    if (phase === 'local' || phase === 'error' || phase === 'redirecting') return
    if (!anyIdSdkReady) return
    if (hasUrlTx && anyidInit?.txId !== tx) return
    setPhase('ready')
  }, [showAnyIdArea, phase, anyIdSdkReady, hasUrlTx, anyidInit?.txId, tx])

  const loadModuleCalledRef = useRef(false)
  /** Any-ID가 success를 여러 번 호출해도 /auth/anyid/login 은 1회만 */
  const anyIdLoginOnceRef = useRef(false)
  /**
   * tx / devLoginTag 가 바뀔 때만 LOAD_MODULE·login 가드 리셋.
   * (React 18 StrictMode 개발 모드에서 동일 세션으로 재마운트될 때마다 ref를 지우면 LOAD_MODULE 이 2번 돌아가고,
   *  SDK 내부 extractInfo 호출도 배수로 늘어남)
   */
  const anyIdSessionKeyRef = useRef<{ tx: string | null; tag: string }>({ tx: null, tag: '' })
  useEffect(() => {
    const prev = anyIdSessionKeyRef.current
    if (prev.tx === tx && prev.tag === devLoginTag) return
    anyIdSessionKeyRef.current = { tx, tag: devLoginTag }
    loadModuleCalledRef.current = false
    anyIdLoginOnceRef.current = false
  }, [tx, devLoginTag])

  const navigateRef = useRef(navigate)
  const dispatchRef = useRef(dispatch)
  const tRef = useRef(t)
  useEffect(() => {
    navigateRef.current = navigate
    dispatchRef.current = dispatch
    tRef.current = t
  })

  useEffect(() => {
    if (!showAnyIdArea) return
    if (phase !== 'ready') return
    if (!anyIdSdkReady || !window.AnyidC?.LOAD_MODULE) return
    if (hasUrlTx && anyidInit?.txId !== tx) return
    if (loadModuleCalledRef.current) return
    loadModuleCalledRef.current = true

    const prevAdaptor = window.anyidAdaptor

    const loginTag: string = hasUrlTx && tx ? (anyidInit?.txId ?? tx) : devLoginTag

    const adaptor = {
      sso: ssoInfo ?? undefined,
      success: async (data: any) => {
        // esign 등에서 단계마다 success가 반복 호출됨 — 최종 완료만 처리(step 없으면 기존 SDK 호환)
        if (data?.step != null && data.step !== 'authComplete') {
          return
        }
        if (anyIdLoginOnceRef.current) {
          return
        }
        anyIdLoginOnceRef.current = true

        // bypass(임베드)에서도 Any-ID는 인증 완료 시 ssob·tag(tx)를 넘길 수 있음 — 콜백 값 우선, 없으면 LOAD_MODULE에 넣은 tag
        const tagFromCallback =
          (typeof data?.tag === 'string' && data.tag) || (typeof data?.txId === 'string' && data.txId) || loginTag
        try {
          const payload = await dispatchRef
            .current(postAnyIdLogin({ ssob: data?.ssob, tag: tagFromCallback, ci: data?.res?.ci }))
            .unwrap()
          if (payload.status === 'LoggedIn') {
            navigateRef.current('/pp/ko')
            return
          }
          if (payload.status === 'SignUpSel') {
            let userInfoFromSsob: AnyIdUserInfoFromSsobRVO | undefined = payload.userInfoFromSsob;
            if (!userInfoFromSsob && data?.ssob) {
              try {
                userInfoFromSsob = await dispatchRef.current(getAnyIdUserInfoFromSsob({ ssob: data.ssob, tag: tagFromCallback , isCheckMbr: false})).unwrap();
              } catch (e) {
                console.warn('[AnyID] SignUpSel: getAnyIdUserInfoFromSsob failed', e);
              }
            }
            navigateRef.current('/pp/ko/auth/SignUpSel', {
              state: { userInfoFromSsob },
            });
            return;
          }
        } catch (e) {
          console.error('[AnyID] login error:', e)
          anyIdLoginOnceRef.current = false
          showAlert(tRef.current('loginFailedMessage'), tRef.current('error'))
        } finally {
          const ci = data?.res?.ci
          if (typeof ci !== 'string' || !ci.trim()) {
            console.warn('[AnyID] success callback 응답에 ci가 없습니다.', { data })
          }
        }
      },
    }
    window.anyidAdaptor = adaptor as typeof window.anyidAdaptor

    const baseCfg = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')}config/config.anyidc.json`
    const successCb = (data: any) => void window.anyidAdaptor?.success?.(data)
    const failCb = (err: any) => {
      console.error('[AnyID] fail:', err)
      setPhase('error')
    }
    const logCb = (data: any) => console.log('[AnyID] log:', data)

    if (devEmbedLogin) {
      window.AnyidC.LOAD_MODULE({
        cfg: baseCfg,
        contextRoot: location.pathname,
        txId: devLoginTag,
        tag: devLoginTag,
        lvl: acrValues,
        bypass: 1,
        toggle: false,
        show: false,
        theme: '4.1.0',
        redirect_uri: redirectUri,
        success: successCb,
        fail: failCb,
        log: logCb,
      })
      return () => {
        window.anyidAdaptor = prevAdaptor
      }
    }

    window.AnyidC.LOAD_MODULE(
      Object.assign(
        {
          contextRoot: location.pathname,
          success: successCb,
          fail: failCb,
          log: logCb,
          redirect_uri: redirectUri,
          cfg: anyidInit?.cfg ?? '/config/config.anyidc.json',
          txId: anyidInit?.txId ?? tx,
          tag: anyidInit?.tag ?? tx,
          lvl: anyidInit?.lvl ?? acrValues,
          bypass: anyidInit?.bypass ?? 0,
          toggle: anyidInit?.toggle ?? true,
          theme: anyidInit?.theme ?? '4.1.0',
        },
        anyidInit || {},
        { success: successCb, fail: failCb, log: logCb }
      )
    )

    return () => {
      window.anyidAdaptor = prevAdaptor
    }
  }, [
    showAnyIdArea,
    phase,
    anyIdSdkReady,
    hasUrlTx,
    devEmbedLogin,
    devLoginTag,
    tx,
    anyidInit,
    acrValues,
    redirectUri,
    location.pathname,
    ssoInfo,
  ])

  if (phase === 'redirecting') {
    return (
      <Box className="page-layout" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <Typography variant="body1" color="text.secondary">
          인증 페이지로 이동 중…
        </Typography>
      </Box>
    )
  }

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                <Box className="page-content__anyid">
                  <Box className="login-card-area">
                    <Box className="login-card-area__left">
                      {phase === 'preparing' && (
                        <Box
                          id="anyidc"
                          className="anyidc"
                          sx={{
                            minHeight: 280,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            p: 2,
                          }}
                        >
                          <Box sx={{ height: 24, bgcolor: 'action.hover', borderRadius: 1, width: '60%' }} />
                          <Box sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1 }} />
                          <Box sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1 }} />
                          <Box sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1 }} />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                            로그인 준비 중…
                          </Typography>
                        </Box>
                      )}
                      {phase === 'ready' && <div id="anyidc" className="anyidc" />}
                      {phase === 'local' && (
                        <Box
                          sx={{
                            minHeight: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px dashed',
                            borderColor: 'divider',
                            borderRadius: 1,
                            bgcolor: 'background.paper',
                            px: 2,
                            textAlign: 'center',
                          }}
                        >
                          <Typography color="text.secondary">
                            Any-ID 영역을 보려면 `.env.development` 등에{' '}
                            <code>VITE_SHOW_ANYID_AREA=true</code> 를 넣고 dev 서버를 재시작하세요.
                          </Typography>
                        </Box>
                      )}
                      {phase === 'error' && (
                        <Box id="anyidc" className="anyidc" sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography color="error">로그인 도구를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.</Typography>
                        </Box>
                      )}
                    </Box>

                    <Box className="login-card-area__right">
                      <Card className="kids-login-card">
                        {/* <Typography className="kids-login-title">KIDS 로그인</Typography> */}
                        <CardContent className="kids-login-card-content">
                          <Box className="login-button-group">
                            <Button variant="outlined" onClick={() => navigate('/pp/ko/auth/Login')} className="login-button" title={t('login')}>
                              <Stack spacing={1} alignItems="center" className="login-button-stack">
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <AccountIcon className="login-icon" />
                                  <Typography variant="body1" className="login-label">아이디 로그인</Typography>
                                </Stack>
                                <Typography variant="caption" className="login-desc">
                                  한국의약품안전관리원 가입 시 등록한 아이디를 이용하여 로그인
                                </Typography>
                              </Stack>
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
