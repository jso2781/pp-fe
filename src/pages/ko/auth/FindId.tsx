/**
 * 화면ID: KIDS-PP-US-LG-06
 * 화면명: 아이디 찾기
 * 화면경로: /ko/auth/FindId
 * 화면설명: 아이디 찾기 화면.
 */

import { Box, Typography,} from '@mui/material';
import DepsLocation from "@/components/common/DepsLocation"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FindId() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleAuthClick = () => {
    navigate('/ko/auth/FindIdAuthSuccess');
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
                    Any-ID 영역
                    <button onClick={handleAuthClick}>인증</button>
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
