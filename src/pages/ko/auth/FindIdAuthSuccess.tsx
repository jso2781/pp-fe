/**
 * 화면ID: KIDS-PP-US-LG-07
 * 화면명: 아이디 찾기 결과
 * 화면경로: /ko/auth/FindIdAuthSuccess
 * 화면설명: 아이디 찾기 결과 화면.
 */

import { Box, Typography, Button, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DepsLocation from '@/components/common/DepsLocation';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FindIdAuthSuccess() {
  const navigate = useNavigate();
  const { t, i18n: i18nInstance } = useTranslation();
  const handleFindPwClick = () => {
    navigate('/ko/auth/FindPw');
  }

  const handleLoginClick = () => {
    navigate('/ko/auth/login');
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
                    {t('findIdFound')}
                  </Typography>
                  {/* 아이디 결과 영역 */}
                  <Box className="id-find-result">
                    <p><span>$김철수$</span>{t('findIdResultNameId')}</p>
                    <p><span className="txt-2">$chskim7788</span>{i18nInstance.language === 'ko' ? ' 입니다' : ''}.</p>
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
