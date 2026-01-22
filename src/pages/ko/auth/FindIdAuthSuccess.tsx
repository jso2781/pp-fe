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

export default function FindIdAuthSuccess() {
  const navigate = useNavigate();
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
                    아이디를 찾았어요.
                  </Typography>
                  {/* 아이디 결과 영역 */}
                  <Box className="id-find-result">
                    <p><span>$김철수$</span>님의 아이디는</p>
                    <p><span className="txt-2">$chskim7788</span>$ 입니다.</p>
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
                      로그인
                    </Button>
                  </Box>
                  {/* 비밀번호 찾기 링크 영역 */}
                  <Stack direction="row" className="form-helper-group">
                    <Typography className="txt">
                      비밀번호를 잊으셨다면?
                    </Typography>
                    <Button 
                      variant="text" 
                      className="btn-link" 
                      endIcon={<ChevronRightIcon />}
                      onClick={handleFindPwClick}
                    >
                      비밀번호 찾기
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
