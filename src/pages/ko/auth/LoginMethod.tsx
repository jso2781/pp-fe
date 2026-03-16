/**
 * 화면ID: KIDS-PP-US-LG-01
 * 화면명: 로그인 방식 선택
 * 화면경로: /ko/auth/LoginMethod
 * 화면설명: 로그인 방식 선택 화면
 *
 * [인증 흐름]
 * 1. tx 파라미터 없이 진입 시 → /oidc/auth 로 리다이렉트 (KMS tx 발급)
 * 2. SSO 완료 → /loginPage?tx=KMS발급값 → 이 페이지로 돌아옴
 * 3. tx 있으면 → /api/pp/auth/anyid/init 호출 (bypass=0 응답)
 * 4. AnyidC.LOAD_MODULE({ bypass: 0, txId: KMS발급tx })
 * 5. extractInfo → success 콜백 (ssob 포함)
 * 6. /api/pp/auth/anyid/login (ssob + tx) → 세션 생성 → 이동
 *
 * [로딩 개선]
 * - tx 없음: 최소 UI("이동 중...")만 표시 후 리다이렉트
 * - tx 있음: 스켈레톤 먼저 표시, 스크립트·init 병렬 수행 후 위젯 표시
 */
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { AccountCircle as AccountIcon } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAnyIdInit, postAnyIdLogin } from '@/features/auth/AnyIdThunks'
import { ensureAnyIdAssets, waitForAnyidC } from '@/lib/anyid/ensureAnyIdAssets'
import DepsLocation from '@/components/common/DepsLocation'

type LoginPhase = 'redirecting' | 'preparing' | 'ready' | 'error'

// tx별 getAnyIdInit 결과 캐시 (중복 호출 방지)
const anyIdInitPromiseCache = new Map<string, Promise<unknown>>()

export default function LoginMethod() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const ssoInfo = useAppSelector((s) => s.anyId.ssoInfo)
  const anyidInit = useAppSelector((s) => s.anyId.anyidInit)
  const [anyIdReady, setAnyIdReady] = useState(false)
  const [phase, setPhase] = useState<LoginPhase>(() => {
    const p = new URLSearchParams(location.search)
    return p.get('tx') ? 'preparing' : 'redirecting'
  })

  const params = useMemo(() => new URLSearchParams(location.search), [location.search])

  // tx는 반드시 /oidc/auth → KMS에서 발급된 값이어야 함
  const tx = useMemo(() => params.get('tx') || null, [params])

  const acrValues = useMemo(() => {
    const v = params.get('acrValues')
    const n = v ? parseInt(v, 10) : NaN
    return Number.isFinite(n) ? n : 3
  }, [params])

  const redirectUri = useMemo(() => params.get('redirect_uri') || '/pp/ko', [params])

  // tx 없음 → 최소 UI만 보여주고 즉시 리다이렉트 (전체 레이아웃 스킵)
  useEffect(() => {
    if (!tx) {
      setPhase('redirecting')
      const currentPath = location.pathname || '/pp/ko/auth/LoginMethod'
      const endPoint = encodeURIComponent(currentPath)
      window.location.href = `/oidc/auth?end_point=${endPoint}`
      return
    }
  }, [tx, location.pathname])

  // tx 있음 → 첫 페인트 후 스크립트·init 병렬 수행
  useEffect(() => {
    if (!tx) return

    let cancelled = false
    let cancelWait: (() => void) | null = null

    ;(async () => {
      try {
        setPhase('preparing')

        // tx별 init 결과 캐시: 동일 tx에 대해 getAnyIdInit 중복 호출 방지
        const initPromise =
          anyidInit?.txId === tx
            ? Promise.resolve(anyidInit)
            : (() => {
                const cached = anyIdInitPromiseCache.get(tx)
                if (cached) return cached
                const p = dispatch(getAnyIdInit({ tx }))
                  .unwrap()
                  .catch((e) => {
                    console.error('[AnyID] getAnyIdInit error', e)
                    anyIdInitPromiseCache.delete(tx)
                    return null
                  })
                anyIdInitPromiseCache.set(tx, p)
                return p
              })()

        // 스크립트 로드와 init API 병렬 처리
        await Promise.all([ensureAnyIdAssets(), initPromise])
        if (cancelled) return

        const adaptor = {
          sso: ssoInfo ?? undefined,
          success: async (data: any) => {
            try {
              const payload = await dispatch(postAnyIdLogin({ ssob: data?.ssob, tag: tx, ci: data?.res?.ci })).unwrap()
              if (payload.status === 'LoggedIn') {
                navigate('/pp/ko')
                return
              }
              // 회원가입 선택 페이지로 이동(ci 파라미터 전달)
              if (payload.status === 'SignUpSel') {
                navigate('/pp/ko/auth/SignUpSel', { state: { ci: payload?.ci ?? '' } })
                return
              }
            } catch (e) {
              console.error('[AnyID] login error:', e)
              alert('인증에 실패했습니다. 다시 시도해주세요.')
            }
          },
        }
        window.anyidAdaptor = adaptor as typeof window.anyidAdaptor

        cancelWait = waitForAnyidC(
          () => {
            if (!cancelled) {
              setAnyIdReady(true)
              setPhase('ready')
            }
          },
          () => {
            if (!cancelled) {
              console.error('[AnyID] window.AnyidC.LOAD_MODULE not ready (timeout)')
              setPhase('error')
            }
          }
        )
      } catch (e) {
        console.error('[AnyID] SDK load error:', e)
        if (!cancelled) setPhase('error')
      }
    })()

    return () => {
      cancelled = true
      cancelWait?.()
    }
  }, [tx, navigate, dispatch, ssoInfo])

  // LOAD_MODULE 1회 호출 (bypass=0, KMS tx 사용)
  const loadModuleCalledRef = useRef(false)
  useEffect(() => {
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE || loadModuleCalledRef.current) return
    if (!tx) return  // tx 없으면 호출하지 않음

    loadModuleCalledRef.current = true

    const successCb = (data: any) => window.anyidAdaptor?.success?.(data)
    const failCb = (err: any) => console.error('[AnyID] fail:', err)
    const logCb = (data: any) => console.log('[AnyID] log:', data)

    console.log('[AnyID] LOAD_MODULE 호출, txId:', anyidInit?.txId ?? tx, 'bypass:', anyidInit?.bypass ?? 0)

    window.AnyidC.LOAD_MODULE(Object.assign(
      {
        contextRoot: location.pathname,
        success: successCb,
        fail: failCb,
        log: logCb,
        redirect_uri: redirectUri,
        cfg: anyidInit?.cfg ?? '/anyid/config/config.anyidc.json',
        txId: anyidInit?.txId ?? tx,
        tag: anyidInit?.tag ?? tx,
        lvl: anyidInit?.lvl ?? acrValues,
        bypass: anyidInit?.bypass ?? 0,   // 기본값 0 (SSO 모드, 1→0 수정)
        toggle: anyidInit?.toggle ?? true,
        theme: anyidInit?.theme ?? '4.1.0',
      },
      anyidInit || {},
      { success: successCb, fail: failCb, log: logCb }
    ))
  }, [anyIdReady, location.pathname, redirectUri, tx, acrValues, anyidInit])

  // tx 없음: 리다이렉트 중에는 최소 UI만 표시 (전체 레이아웃·리소스 절약)
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

                {/* --- 본문 시작 --- */}
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
                      {phase === 'error' && (
                        <Box id="anyidc" className="anyidc" sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography color="error">로그인 도구를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.</Typography>
                        </Box>
                      )}
                    </Box>

                    <Box className="login-card-area__right">
                      {/* KIDS 로그인 */}
                      <Card className="kids-login-card">
                        <Typography className="kids-login-title">KIDS 로그인</Typography>
                        <CardContent className="kids-login-card-content">
                          <Box className="login-button-group">
                            <Button
                              variant="outlined"
                              onClick={() => navigate('/pp/ko/auth/Login')}
                              className="login-button"
                            >
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

                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
