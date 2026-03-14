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
 */
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Box, Button, Card, CardContent, Link, Stack, Typography, IconButton, Tooltip } from '@mui/material'
import { Switch as BaseSwitch } from '@base-ui/react';
import {
  PhoneAndroid as PhoneIcon,
  AccountCircle as AccountIcon,
  Fingerprint as FingerprintIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAnyIdInit } from '@/features/auth/AnyIdThunks'
import https from '@/api/axiosInstance'
import DepsLocation from '@/components/common/DepsLocation'

function ensureAnyIdAssets() {
  const baseNorm = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') + '/'

  const ensureLink = (href: string) => {
    if (document.querySelector(`link[href="${href}"]`)) return
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    document.head.appendChild(l)
  }

  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error(`Failed to load ${src}`))
      document.body.appendChild(s)
    })

  ensureLink(`${baseNorm}css/app.css`)

  return loadScript(`${baseNorm}js/manifest.js`)
    .then(() => loadScript(`${baseNorm}js/vendor.js`))
    .then(() => loadScript(`${baseNorm}js/app.js`))
}

export default function LoginMethod() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const ssoInfo = useAppSelector((s) => s.anyId.ssoInfo)
  const anyidInit = useAppSelector((s) => s.anyId.anyidInit)
  const [useGovLogin, setUseGovLogin] = useState(false)
  const [anyIdReady, setAnyIdReady] = useState(false)

  const params = useMemo(() => new URLSearchParams(location.search), [location.search])

  // tx는 반드시 /oidc/auth → KMS에서 발급된 값이어야 함
  // uuidv4() 자동생성 제거 → 없으면 null
  const tx = useMemo(() => params.get('tx') || null, [params])

  const acrValues = useMemo(() => {
    const v = params.get('acrValues')
    const n = v ? parseInt(v, 10) : NaN
    return Number.isFinite(n) ? n : 3
  }, [params])

  const redirectUri = useMemo(() => params.get('redirect_uri') || '/pp/ko', [params])

  useEffect(() => {
    // tx 없으면 /oidc/auth 로 이동하여 KMS tx 발급
    // end_point: SSO 완료 후 loginPage → AnyIdLoginPageController → 이 페이지로 돌아올 경로
    // /pp prefix 제거하지 않고 그대로 사용 (ex: /pp/ko/auth/LoginMethod)
    if (!tx) {
      const currentPath = location.pathname || '/pp/ko/auth/LoginMethod'
      const endPoint = encodeURIComponent(currentPath)
      console.log('[AnyID] tx 없음 → /oidc/auth 이동, end_point:', endPoint)
      window.location.href = `/oidc/auth?end_point=${endPoint}`
      return
    }

    let cancelled = false

    ;(async () => {
      try {
        await ensureAnyIdAssets()
        if (cancelled) return

        const adaptor = {
          sso: ssoInfo ?? undefined,
          success: async (data: any) => {
            try {
              console.log('[AnyID] success callback data:', data)
              console.log('[AnyID] tag(tx):', tx)

              const res = await https.post('/auth/anyid/login', {
                ssob: data?.ssob,
                tag: tx,
              })

              console.log('[AnyID] login response:', res.data)

              // 실패 시 alert
              const result = res.data?.data?.result
              if (result?.status === 'fail' || res.data?.code !== 0) {
                console.error('[AnyID] login failed:', res.data)
                alert('인증에 실패했습니다. 다시 시도해주세요.')
                return
              }

              navigate(redirectUri, { replace: true })
            } catch (e) {
              console.error('[AnyID] login error:', e)
              alert('로그인 처리 중 오류가 발생했습니다.')
            }
          },
        }
        window.anyidAdaptor = adaptor as typeof window.anyidAdaptor

        const checkAnyIdC = async () => {
          if (window.AnyidC?.LOAD_MODULE) {
            try {
              await dispatch(getAnyIdInit({ tx })).unwrap()
            } catch (e) {
              console.error('[AnyID] getAnyIdInit error', e)
            }
            if (!cancelled) setAnyIdReady(true)
          } else {
            setTimeout(() => checkAnyIdC(), 100)
          }
        }
        checkAnyIdC()
      } catch (e) {
        console.error('[AnyID] SDK load error:', e)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [navigate, redirectUri, tx, dispatch, ssoInfo, location])

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
        theme: anyidInit?.theme ?? '4.2.2',
      },
      anyidInit || {},
      { success: successCb, fail: failCb, log: logCb }
    ))
  }, [anyIdReady, location.pathname, redirectUri, tx, acrValues, anyidInit])

  const handleUserReg = () => {
    const width = 800
    const height = 900
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2
    window.open(
      'https://ptl.anyid.go.kr/anyid/user/idv/itg/trms?srvcNo=5000000079&userSeCd=01',
      'anyidUserReg',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,noopener,noreferrer`
    )
  }

  const handleUserMgmt = () => {
    const width = 800
    const height = 900
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2
    window.open(
      'https://ptl.anyid.go.kr/anyid/user/idv/main',
      'anyidUserMgmt',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,noopener,noreferrer`
    )
  }

  const handleLoginMethod = async (method: string) => {
    if (method === 'simple') {
      if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) {
        console.error('[AnyID] 모듈이 준비되지 않았습니다.')
        return
      }
    } else if (method === 'sms') {
      console.log('휴대폰 SMS 인증:', method)
    } else if (method === 'mobileId') {
      console.log('모바일 신분증 인증:', method)
    }
  }

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
          {/* 서브 콘텐츠 영역 */}
          <Box className="sub-content">
            {/* 상단 현재 위치 정보 */}
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                {/* --- 본문 시작 --- */}

                <Box className="page-content__anyid">
                  {/* Any-ID SDK가 렌더링될 영역 */}
                  <div id="anyidc" className="anyidc" />

                  <Typography variant="h3" className="login-title">
                    로그인 방식을 선택해주세요.
                  </Typography>

                  <Box className="login-card-area">
                    <Box className="login-card-area__left">
                      <Card className="gov-login-card">
                        <CardContent className="gov-login-card-content">
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={0} alignItems="center">
                              <Stack direction="row" spacing={0} alignItems="center">
                                <Typography className="gov-login-label"> 정부 통합로그인 사용</Typography>
                                <Tooltip
                                  title="도글 ON 시 정부 통합 인증을 적용, 도글 OFF 시 정보 통합 인증을 미적용하고 1회성으로 본인인증 처리"
                                  arrow
                                >
                                  <IconButton size="small" className="help-icon-button">
                                    <HelpIcon className="help-icon" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>

                              <Stack direction="row" alignItems="center" spacing={2} className="switch_group">
                                <BaseSwitch.Root
                                  className="base_switch_root"
                                  checked={useGovLogin}
                                  onCheckedChange={(checked) => setUseGovLogin(checked)}
                                  aria-label="정부 로그인 사용 여부 설정"
                                >
                                  <BaseSwitch.Thumb className="base_switch_thumb" />
                                </BaseSwitch.Root>
                                <Typography component="p" className="switch_label">
                                  {useGovLogin ? '사용 중' : '미사용'}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack spacing={1}>
                              <Typography variant="body2" className="user-reg-text">
                                아직 정부 통합인증(Any-ID) 사용자가 아니신가요?{' '}
                                <Link component="button" variant="body2" onClick={handleUserReg} className="link">
                                  사용자 등록 &gt;
                                </Link>
                              </Typography>
                              <Typography variant="body2" className="user-mgmt-text">
                                정부 통합인증(Any-ID){' '}
                                <Link component="button" variant="body2" onClick={handleUserMgmt} className="link">
                                  사용자 관리 &gt;
                                </Link>
                              </Typography>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>

                      {/* 로그인 방식 선택 */}
                      <Card className="login-method-card">
                        <CardContent className="login-method-card-content">
                          <Box className="login-button-group">
                            <Button variant="outlined" onClick={() => handleLoginMethod('simple')} className="login-button">
                              <Stack spacing={1} alignItems="center" className="login-button-stack">
                                <AccountIcon className="login-icon" />
                                <Typography variant="body1" className="login-label">간편 인증</Typography>
                                <Typography variant="caption" className="login-desc">
                                  네이버, 카카오, 금융기관 등의 전자서명으로 로그인
                                </Typography>
                              </Stack>
                            </Button>

                            {/* <Button variant="outlined" onClick={() => handleLoginMethod('sms')} className="login-button">
                              <Stack spacing={1} alignItems="center" className="login-button-stack">
                                <PhoneIcon className="login-icon" />
                                <Typography variant="body1" className="login-label">휴대폰 SMS 인증</Typography>
                                <Typography variant="caption" className="login-desc">
                                  본인 명의로 가입된 휴대폰 인증으로 로그인
                                </Typography>
                              </Stack>
                            </Button> */}

                            <Button variant="outlined" onClick={() => handleLoginMethod('mobileId')} className="login-button">
                              <Stack spacing={1} alignItems="center" className="login-button-stack">
                                <FingerprintIcon className="login-icon" />
                                <Typography variant="body1" className="login-label">모바일 신분증 인증</Typography>
                                <Typography variant="caption" className="login-desc">
                                  스마트폰의 모바일 신분증 인증으로 로그인
                                </Typography>
                              </Stack>
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
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
                                <AccountIcon className="login-icon" />
                                <Typography variant="body1" className="login-label">아이디 로그인</Typography>
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
