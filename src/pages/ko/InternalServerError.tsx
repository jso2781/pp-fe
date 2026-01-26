/**
 * 화면ID: KIDS-PP-US-EP-02
 * 화면명: 500 에러안내
 * 화면경로: /ko/InternalServerError
 * 화면설명: 500 에러안내
 */
import { useNavigate } from 'react-router-dom'
import { Box, Button} from '@mui/material';

export default function InternalServerError() {
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
                        <p className="error-code__summary">잠시 후 다시 확인해주세요!</p>
                        <p className="error-code__number">500</p>
                        <p className="error-code__title">Internal Server Error</p>
                      </Box>
                  </Box>
                  <Box className="error-msg">
                      <p>지금 사용하고자 하시는 서비스 페이지에 연결할 수 없습니다.</p>
                      <p>문제를 해결하기 위해 열심히 노력하고 있습니다 </p>
                      <p>잠시 후 다시 확인해주세요.  </p>
                  </Box>
                  <Box className="btn-group center">
                    <Button variant="outlined" size="large" onClick={handleClick}>이전 페이지</Button>
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
