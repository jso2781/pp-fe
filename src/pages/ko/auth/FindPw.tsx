/**
 * 화면ID: KIDS-PP-US-LG-08
 * 화면명: 비밀번호 찾기
 * 화면경로: /ko/auth/FindPw
 * 화면설명: 비밀번호 찾기 화면.
 */

import { Box, Typography, Button } from '@mui/material';
import DepsLocation from "@/components/common/DepsLocation"
import { useNavigate } from 'react-router-dom';

export default function FindPw() {
  
  const navigate = useNavigate();
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
                  <p className="guide-text">비밀번호 재설정을 위해 본인 확인을 진행합니다.</p>  
                  <Box className="AnyID-area">
                    Any-ID 영역
                    <Button onClick={handleAuthClick}>인증</Button>
                  </Box>
                  <Box component="section" className="caution-area" aria-labelledby="caution-title">
                    <Typography component="h4" id="caution-title" className="caution-title">
                      유의사항
                    </Typography>
                    <ul className="caution-list">
                      <li>주민등록번호가 변경된 경우에는 콜센터로 연락 또는 신규 회원가입해서 이용할 수 있습니다.</li>
                      <li>신규 회원가입 이용 시 변경 전 주민등록번호로 신청한 회원정보는 확인이 불가능합니다.</li>
                      <li>전문가 회원일 경우에는 가입한 여러개의 아이디가 노출됩니다.</li>
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
