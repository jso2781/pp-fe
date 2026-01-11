import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Link,
  Stack,
  Switch,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  PhoneAndroid as PhoneIcon,
  AccountCircle as AccountIcon,
  Fingerprint as FingerprintIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_LG_01() {
  const navigate = useNavigate()
  const [useGovLogin, setUseGovLogin] = useState(false)

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

  const handleLoginMethod = (method: string) => {
    // 각 로그인 방식에 따른 처리
    console.log('로그인 방식 선택:', method)
    // TODO: 실제 로그인 처리 로직 구현
  }

  return (
    <ScreenShell screenId="KIDS-PP-US-LG-01" title="로그인 방식 선택" uiType="page">
      <div className="page-layout">
        <div className="sub-container">
          <div className="content-wrap">
            <div className="sub-content">
              <Box sx={{ mb: 0, '& .location': { marginBottom: '12px !important' } }}>
                <DepsLocation />
              </Box>
              <div className="content-view" id="content">
                <Box sx={{ maxWidth: 980, margin: '0 auto', padding: '5px 16px' }}>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                    로그인 방식을 선택해주세요.
                  </Typography>
                  {/* 정부 통합로그인 사용 여부 */}
                  <Card sx={{ border: 'none', borderColor: 'divider' }}>
                    <CardContent sx={{ pb: 0 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={0} alignItems="center">
                          <Stack direction="row" spacing={0} alignItems="center">
                            <Typography variant="body1" fontWeight={600}>
                              정부 통합로그인 사용
                            </Typography>
                            <Tooltip
                              title="도글 ON 시 정부 통합 인증을 적용, 도글 OFF 시 정보 통합 인증을 미적용하고 1회성으로 본인인증 처리"
                              arrow
                            >
                              <IconButton size="small" sx={{ p: 0.5 }}>
                                <HelpIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                          <Switch
                            checked={useGovLogin}
                            onChange={(e) => setUseGovLogin(e.target.checked)}
                            color="primary"
                          /> {useGovLogin ? '사용' : '미사용'}
                        </Stack>
                        <Stack spacing={1}>
                          <Typography variant="body2" color="text.secondary">
                            아직 정부 통합인증(Any-ID) 사용자가 아니신가요?{' '}
                            <Link
                              component="button"
                              variant="body2"
                              onClick={handleUserReg}
                              sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: 'primary.main',
                                fontWeight: 500,
                              }}
                            >
                              사용자 등록 &gt;
                            </Link>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            정부 통합인증(Any-ID){' '}
                            <Link
                              component="button"
                              variant="body2"
                              onClick={handleUserMgmt}
                              sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: 'primary.main',
                                fontWeight: 500,
                              }}
                            >
                              사용자 관리 &gt;
                            </Link>
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* 로그인 방식 선택 */}
                  <Card sx={{ border: 'none', boxShadow: 'none' }}>
                    <CardContent sx={{ pb: 0 }}>
                      <Grid container spacing={2}>
                        {/* 간편 인증 */}
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                          <Box
                            component={Button}
                            variant="outlined"
                            onClick={() => handleLoginMethod('simple')}
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
                          >
                            <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
                              <AccountIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                              <Typography variant="body1" fontWeight={600}>
                                간편 인증
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textAlign: 'center', lineHeight: 1.4 }}
                              >
                                네이버, 카카오, 금융기관 등의 전자서명으로 로그인
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid>

                        {/* 휴대폰 SMS 인증 */}
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                          <Box
                            component={Button}
                            variant="outlined"
                            onClick={() => handleLoginMethod('sms')}
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
                          >
                            <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
                              <PhoneIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                              <Typography variant="body1" fontWeight={600}>
                                휴대폰 SMS 인증
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textAlign: 'center', lineHeight: 1.4 }}
                              >
                                본인 명의로 가입된 휴대폰 인증으로 로그인
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid>

                        {/* 모바일 신분증 인증 */}
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                          <Box
                            component={Button}
                            variant="outlined"
                            onClick={() => handleLoginMethod('mobileId')}
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
                          >
                            <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
                              <FingerprintIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                              <Typography variant="body1" fontWeight={600}>
                                모바일 신분증 인증
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textAlign: 'center', lineHeight: 1.4 }}
                              >
                                스마트폰의 모바일 신분증 인증으로 로그인
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

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
                            onClick={() => navigate('/ko/login/kids')}
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
                          >
                            <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
                              <AccountIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                              <Typography variant="body1" fontWeight={600}>
                                아이디 로그인
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textAlign: 'center', lineHeight: 1.4 }}
                              >
                                한국의약품안전관리원 가입 시 등록한 아이디를 이용하여 로그인
                              </Typography>
                            </Stack>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>

    </ScreenShell>
  )
}
