/**
 * 화면ID: KIDS-PP-US-LG-07
 * 화면명: 아이디 찾기 결과
 * 화면경로: /ko/auth/FindIdAuthSuccess
 * 화면설명: 아이디 찾기 결과(일반 회원일 경우)
 */

import { Box, Typography, Button, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DepsLocation from '@/components/common/DepsLocation';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function FindIdAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n: i18nInstance } = useTranslation();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {scrollTo(0, 0);}, []);

  console.log("FindIdAuthSuccess.tsx location.state=", location.state);
  if(!location.state?.id || !location.state?.name) {
    alert('잘못된 접근입니다.');
    return <Navigate to="/" replace />;
  }

  const handleFindPwClick = () => {
    navigate('/pp/ko/auth/FindPw');
  }

  const handleLoginClick = () => {
    navigate('/pp/ko/auth/Login');
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
                  <Typography className="guide-text">
                    {location.state?.name && location.state?.id 
                    ? t('findIdFound') : t('systemErrorTitle')}
                  </Typography>
                  {/* 아이디 결과 영역 */}
                  <Box className="id-find-result">
                    {location.state?.name && location.state?.id
                      ? <>
                          <p><span>{location.state?.name}</span>{t('findIdResultNameId')}</p>
                          <p><span className="txt-2">{location.state?.id}</span>{i18nInstance.language === 'ko' ? ' 입니다' : ''}.</p>
                        </>
                      : <p>{t('systemErrorMessage')}</p>}
                  </Box>
                  {/* 로그인 버튼 영역 */}
                  <Box className="login-actions">
                    <Button 
                      variant="contained" 
                      fullWidth 
                      size="large" 
                      className="btn-login fw-700"
                      onClick={handleLoginClick}
                    >
                      {t('login')}
                    </Button>
                  </Box>
                  {/* 비밀번호 찾기 링크 영역 */}
                  <Stack direction="row" className="form-helper-group">
                    <Typography className="txt">
                      {t('forgotPassword')}
                    </Typography>
                    <Button 
                      variant="text" 
                      className="btn-link" 
                      endIcon={<ChevronRightIcon />}
                      onClick={handleFindPwClick}
                    >
                      {t('findPassword')}
                    </Button>
                  </Stack>
                </Box>
                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
