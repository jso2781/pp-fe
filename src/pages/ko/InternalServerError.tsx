/**
 * 화면ID: KIDS-PP-US-EP-02
 * 화면명: 500 에러안내
 * 화면경로: /ko/InternalServerError
 * 화면설명: 500 에러안내
 */
import { useNavigate } from 'react-router-dom'
import { Box, Button} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function InternalServerError() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
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
                        <p className="error-code__summary">{t('internalServerErrorCheckLater')}</p>
                        <p className="error-code__number">500</p>
                        <p className="error-code__title">{t('internalServerError')}</p>
                      </Box>
                  </Box>
                  <Box className="error-msg">
                      <p>{t('internalServerErrorCannotConnect')}</p>
                      <p>{t('internalServerErrorWorkingOnIt')}</p>
                      <p>{t('internalServerErrorTryAgainLater')}</p>
                  </Box>
                  <Box className="btn-group center">
                    <Button variant="outlined" size="large" onClick={handleClick}>{t('previousPage')}</Button>
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
