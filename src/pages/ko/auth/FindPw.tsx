/**
 * 화면ID: KIDS-PP-US-LG-08
 * 화면명: 비밀번호 찾기
 * 화면경로: /ko/auth/FindPw
 * 화면설명: 비밀번호 찾기
 */

import DepsLocation from "@/components/common/DepsLocation"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import {
  PhoneAndroid as PhoneIcon,
  AccountCircle as AccountIcon,
  Fingerprint as FingerprintIcon,
} from '@mui/icons-material';

export default function FindPw() {
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleLoginMethod = (type: string) => {
    // mbrNo 1000000005 회원으로 고정
    navigate('/ko/auth/FindPwModify', { state:{ mbrNo: '1000000005' }});
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
                <Box className="pageCont-idPwFind member-page">
                  <p className="guide-text">{t('findPwGuide')}</p>  
                  <Box className="AnyID-area">
                    <Card className="login-method-card">
                      <CardContent className="login-method-card-content">
                        <Box className="login-button-group">
                          <Button variant="outlined" onClick={() => handleLoginMethod('simple')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <AccountIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">{t('certifySelfSimple')}</Typography>
                              <Typography variant="caption" className="login-desc">
                                {t('certifySelfSimpleDesc')}
                              </Typography>
                            </Stack>
                          </Button>
                          <Button variant="outlined" onClick={() => handleLoginMethod('sms')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <PhoneIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">{t('certifySelfSms')}</Typography>
                              <Typography variant="caption" className="login-desc">
                                {t('certifySelfSmsDesc')}
                              </Typography>
                            </Stack>
                          </Button>

                          <Button variant="outlined" onClick={() => handleLoginMethod('mobileId')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <FingerprintIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">{t('certifySelfMobileId')}</Typography>
                              <Typography variant="caption" className="login-desc">
                                {t('certifySelfMobileIdDesc')}
                              </Typography>
                            </Stack>
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box component="section" className="caution-area" aria-labelledby="caution-title">
                    <Typography component="h4" id="caution-title" className="caution-title">
                      {t('cautionTitle')}
                    </Typography>
                    <ul className="caution-list">
                      <li>{t('findPwCaution1')}</li>
                      <li>{t('findPwCaution2')}</li>
                      <li>{t('findPwCaution3')}</li>
                    </ul>
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
