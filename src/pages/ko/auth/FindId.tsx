/**
 * 화면ID: KIDS-PP-US-LG-06
 * 화면명: 아이디 찾기
 * 화면경로: /ko/auth/FindId
 * 화면설명: 아이디 찾기
 */

import DepsLocation from "@/components/common/DepsLocation";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { findMbrInfoId } from '@/features/mbr/MbrInfoThunks';
import { useAppDispatch } from '@/store/hooks';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import {
  PhoneAndroid as PhoneIcon,
  AccountCircle as AccountIcon,
  Fingerprint as FingerprintIcon,
} from '@mui/icons-material';

export default function FindId() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleLoginMethod = (type: string) => {
    //API dispatch
    try{
      // mbrNo 1000000005 회원으로 고정
      dispatch(findMbrInfoId({ mbrNo: '1000000005' })).unwrap()
        .then((res) => {
          navigate('/ko/auth/FindIdAuthSuccess', { state:{ ...res }});
        });
    } catch(e) {
      alert('아이디찾기 실패')
    } finally {
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
                <Box className="pageCont-idPwFind member-page">
                  <p className="guide-text">{t('findIdSelectMethod')}</p>  
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
                      <li>{t('findIdCaution1')}</li>
                      <li>{t('findIdCaution2')}</li>
                      <li>{t('findIdCaution3')}</li>
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
