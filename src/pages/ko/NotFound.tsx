/**
 * 화면ID: KIDS-PP-US-EP-01
 * 화면명: 404 에러안내
 * 화면경로: /*
 * 화면설명: 404 에러안내
 */
import { useTranslation } from 'react-i18next';
import { Box, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }
  const handleHome = () => {
    navigate('/');
  }

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}
                <Box className="error-page">
                  <Box className="error-code">
                      <i className="icon"></i>
                      <Box className="error-code__desc">
                        <p className="error-code__summary">{t('notFoundCheckAgain')}</p>
                        <p className="error-code__number">404</p>
                        <p className="error-code__title">{t('notFound')}</p>
                      </Box>
                  </Box>
                  <Box className="error-msg">
                      <p>{t('notFoundPageMoved')}</p>
                      <p>{t('notFoundCheckUrl')}</p>
                  </Box>
                  <Box className="btn-group center">
                    <Button variant="outlined" size="large" onClick={handleBack}>{t('previousPage')}</Button>
                    <Button variant="contained" size="large" onClick={handleHome}>{t('goHome')}</Button>
                  </Box>
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
