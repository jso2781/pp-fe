/**
 * 화면ID: KIDS-PP-US-LG-01
 * 화면명: 로그인 방식 선택
 * 화면경로: /ko/auth/LoginMethod
 * 화면설명: 로그인 방식 선택 화면
 */
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Box, Button, Card, CardContent, Link, Stack, Switch, Typography, IconButton, Tooltip } from '@mui/material'
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
import i18n from '@/i18n/i18n';
import { v4 as uuidv4 } from 'uuid';

function ensureAnyIdAssets() {
  // Vite base path (dev: '/', prod: '/' 또는 '/pp/') 반영해 public 자원 경로 생성
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

  // public 폴더 기준: base 반영 (public/anyid/... -> {base}anyid/...)
  ensureLink(`${baseNorm}css/app.css`)

  // manifest -> vendor -> app 순서 권장
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

  const tx = useMemo(() => {
    // SSO를 쓰는 구조라면 SSO 모듈이 txId를 내려줌(가이드). 없으면 로컬에서 생성.
    return params.get('tx') || uuidv4();
  }, [params])

  const acrValues = useMemo(() => {
    const v = params.get('acrValues')
    const n = v ? parseInt(v, 10) : NaN
    return Number.isFinite(n) ? n : 3
  }, [params])

  const redirectUri = useMemo(() => params.get('redirect_uri') || '/', [params])

  // 화면 로딩과 함께 Any-ID 자원 로드 및 SDK 초기화 (마운트 시 1회 자동 실행)
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        await ensureAnyIdAssets()
        if (cancelled) return

        // Vue Login.vue 참조: anyidAdaptor(target.sso).success(data) 구조
        // LOAD_MODULE의 success에서 호출될 어댑터(sso + success)를 전역 노출
        const adaptor = {
          sso: ssoInfo ?? undefined,
          success: async (data: any) => {
            try {

              console.log("anyidAdaptor.success tx="+tx);
              console.log("anyidAdaptor.success ssob=", data?.ssob);

              /*
               * Any-ID(정부24 통합인증) 인증이 끝난 뒤, 우리 서버에 인증 결과를 넘겨서 “우리 포털 로그인(세션 생성)”을 하는 API
               * 콜백에서 받은 ssob(암호화된 인증 결과)와 tag(tx 등)를 서버로 보냅니다.
               * ssob를 검증/복호화해서 사용자 정보(CI, 이름 등)를 꺼냅니다.
               * 그 정보로 Spring Security 세션을 만들고, 응답에 JSESSIONID 쿠키를 담아 내려줍니다.
               * navigate(redirectUri) 로 이동하고, 이후 요청부터 JSESSIONID로 로그인된 상태로 서버를 사용합니다.
               */
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
        window.anyidAdaptor = adaptor as typeof window.anyidAdaptor

        // AnyidC 전역 객체가 로드될 때까지 대기 후 apiInit 이관 (서버에서 tx 기준 초기화 설정 조회)
        const checkAnyIdC = async () => {
          if (window.AnyidC?.LOAD_MODULE) {
            try {
              await dispatch(getAnyIdInit({ tx })).unwrap()
            } catch (e) {
              console.error('getAnyIdInit (apiInit) error', e)
            }
            if (!cancelled) setAnyIdReady(true)
          } else {
            setTimeout(() => checkAnyIdC(), 100)
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
  }, [navigate, redirectUri, tx, dispatch, ssoInfo])

  // 화면 로딩 시 #anyidc에 Any-ID SDK 렌더링 (Vue처럼 LOAD_MODULE 1회 호출)
  const loadModuleCalledRef = useRef(false)
  useEffect(() => {
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE || loadModuleCalledRef.current) return
    loadModuleCalledRef.current = true
    const successCb = (data: any) => window.anyidAdaptor?.success?.(data)
    const failCb = (err: any) => console.error(err)
    const logCb = (data: any) => console.log(data)
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
        bypass: anyidInit?.bypass ?? 1,
        toggle: anyidInit?.toggle ?? true,
        theme: anyidInit?.theme ?? '4.1.0',
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
      // Any-ID SDK는 화면 로딩 시 이미 #anyidc에 렌더링됨. 준비 안 됐을 때만 안내.
      if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) {
        console.error('Any-ID 모듈이 준비되지 않았습니다.')
        return
      }
      // 이미 LOAD_MODULE로 렌더링된 #anyidc 영역으로 스크롤 등 필요 시 처리
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
