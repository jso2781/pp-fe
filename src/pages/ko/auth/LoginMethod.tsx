/**
 * 화면ID: KIDS-PP-US-LG-01
 * 화면명: 로그인 방식 선택
 * 화면경로: /ko/auth/LoginMethod
 * 화면설명: 로그인 방식 선택 화면
 */
import React, { useState, useEffect, useMemo } from 'react'
import { Box, Button, Card, CardContent, Link, Stack, Switch, Typography, IconButton, Tooltip } from '@mui/material'
import { Switch as BaseSwitch } from '@base-ui/react';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid'
import {
  PhoneAndroid as PhoneIcon,
  AccountCircle as AccountIcon,
  Fingerprint as FingerprintIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import https from '@/api/axiosInstance'
import DepsLocation from '@/components/common/DepsLocation'

function ensureAnyIdAssets() {
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

  // dev - http://localhost:8080/pp
  const anyIdStaticUrl = import.meta.env.VITE_ANY_ID_STATIC_URL

  // Any-ID UI 자원(CSS/JS) 적용 가이드 (AuthResourceRelay 기준)
  //  - /anyid/css/app.css
  //  - /anyid/js/manifest.js, vendor.js, app.js
  ensureLink(`${anyIdStaticUrl}/anyid/css/app.css`)

  // manifest -> vendor -> app 순서 권장
  return loadScript(`${anyIdStaticUrl}/anyid/js/manifest.js`)
    .then(() => loadScript(`${anyIdStaticUrl}/anyid/js/vendor.js`))
    .then(() => loadScript(`${anyIdStaticUrl}/anyid/js/app.js`))
}

export default function LoginMethod() {
  const navigate = useNavigate()
  const location = useLocation()
  const [useGovLogin, setUseGovLogin] = useState(false)
  const [anyIdReady, setAnyIdReady] = useState(false)

  const params = useMemo(() => new URLSearchParams(location.search), [location.search])

  const tx = useMemo(() => {
    // SSO를 쓰는 구조라면 SSO 모듈이 txId를 내려줌(가이드). 없으면 로컬에서 생성.
    return params.get('tx') || crypto.randomUUID()
  }, [params])

  const acrValues = useMemo(() => {
    const v = params.get('acrValues')
    const n = v ? parseInt(v, 10) : NaN
    return Number.isFinite(n) ? n : 3
  }, [params])

  const redirectUri = useMemo(() => params.get('redirect_uri') || '/', [params])

  // Any-ID SDK 초기화
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        await ensureAnyIdAssets()
        if (cancelled) return

        // Any-ID SDK의 success 콜백에서 호출될 어댑터 객체를 전역으로 노출
        window.anyidAdaptor = {
          success: async (data: any) => {
            try {
              // Any-ID 샘플(orgLogin.jsp)과 동일하게 ssob/tag(tx) 전송
              await https.post('/auth/anyid/login', {
                ssob: data?.ssob,
                tag: tx,
              })
              navigate(redirectUri, { replace: true })
            } catch (e) {
              console.error(e)
            }
          },
        }

        // AnyidC 전역 객체가 로드될 때까지 대기
        const checkAnyIdC = () => {
          if (window.AnyidC?.LOAD_MODULE) {
            setAnyIdReady(true)
          } else {
            setTimeout(checkAnyIdC, 100)
          }
        }
        checkAnyIdC()
      } catch (e) {
        console.error(e)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [navigate, redirectUri, tx])

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
      // 간편인증: 정부24와 동일하게 Any-ID SDK 다이얼로그 띄우기
      if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) {
        console.error('Any-ID 모듈이 준비되지 않았습니다.')
        return
      }

      const configAnyidcJsonUrl =
        import.meta.env.VITE_ANY_ID_STATIC_URL + '/config/config.anyidc.json'

      // 정부24와 동일한 방식으로 간편인증 다이얼로그 표시
      window.AnyidC.LOAD_MODULE({
        cfg: configAnyidcJsonUrl,
        txId: tx,
        tag: tx,
        lvl: acrValues,
        // SSO 연동이 없는 "이용기관 자체 로그인" 흐름: bypass=1
        bypass: 1,
        toggle: true,
        theme: '4.1.0',
        redirect_uri: redirectUri,
        success: function (data) {
          window.anyidAdaptor?.success?.(data)
        },
        fail: function (err) {
          console.error(err)
        },
        log: function (data) {
          console.log(data)
        },
      })
    } else if (method === 'sms') {
      // 휴대폰 SMS 인증 처리
      console.log('휴대폰 SMS 인증:', method)
      // TODO: 실제 SMS 인증 처리 로직 구현
    } else if (method === 'mobileId') {
      // 모바일 신분증 인증 처리
      console.log('모바일 신분증 인증:', method)
      // TODO: 실제 모바일 신분증 인증 처리 로직 구현
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
                  {/* Any-ID SDK가 렌더링될 영역 (정부24와 동일) */}
                  <div id="anyidc" className="anyidc" />

                  <Typography variant="h3" className="login-title">
                    로그인 방식을 선택해주세요.
                  </Typography>
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
                            {/* Base UI 스위치 */}
                            <BaseSwitch.Root
                              className="base_switch_root"
                              checked={useGovLogin}
                              onCheckedChange={(checked) => setUseGovLogin(checked)}
                            >
                              <BaseSwitch.Thumb className="base_switch_thumb" />
                            </BaseSwitch.Root>
                            {/* 텍스트 라벨 */}
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

<<<<<<< HEAD:src/pages/ko/auth/LoginMethod.tsx
                {/* KIDS 로그인 */}
                <Card sx={{ border: 'none', boxShadow: 'none' }}>
                <CardContent sx={{ pb: 0 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    KIDS 로그인
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box
                        component={Button}
                        variant="outlined"
                        onClick={() => navigate('/ko/auth/Login')}
                        sx={{
                            width: '100%',
                            aspectRatio: '2/1',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: 'divider',
                            borderWidth: 2,
                            p: 1,
                            '&:hover': {
                            borderColor: 'primary.main',
                            borderWidth: 2,
                            backgroundColor: 'action.hover',
                            },
                        }}
=======

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
                        
                        <Button variant="outlined" onClick={() => handleLoginMethod('sms')} className="login-button">
                          <Stack spacing={1} alignItems="center" className="login-button-stack">
                            <PhoneIcon className="login-icon" />
                            <Typography variant="body1" className="login-label">휴대폰 SMS 인증</Typography>
                            <Typography variant="caption" className="login-desc">
                              본인 명의로 가입된 휴대폰 인증으로 로그인
                            </Typography>
                          </Stack>
                        </Button>

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

                  {/* KIDS 로그인 */}
                  <Card className="kids-login-card">
                    <Typography className="kids-login-title">KIDS 로그인</Typography>
                    <CardContent className="kids-login-card-content">
                      <Box className="login-button-group">
                        <Button
                          variant="outlined"
                          onClick={() => navigate('/ko/login')}
                          className="login-button"
>>>>>>> d408a120cccd8e370dec1dc2766951af89b6269b:src/pages/ko/LoginMethod.tsx
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
      
              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
