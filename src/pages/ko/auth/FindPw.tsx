/**
 * 화면ID: KIDS-PP-US-LG-08
 * 화면명: 비밀번호 찾기
 * 화면경로: /ko/auth/FindPw
 * 화면설명: 비밀번호 찾기 화면.
 */

import { Box, Typography, Button } from '@mui/material';
import DepsLocation from "@/components/common/DepsLocation"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FindPw() {
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleAuthClick = () => {
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
                    Any-ID 영역
                    <Button onClick={handleAuthClick}>인증</Button>
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
