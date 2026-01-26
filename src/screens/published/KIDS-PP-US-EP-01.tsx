import React from 'react'
import { Box, Button} from '@mui/material';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_EP_01() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  // return <FormTemplate screenId="KIDS-PP-US-EP-01" title="오류안내 404 에러안내" config={config} />

  return (
    <ScreenShell screenId="KIDS-PP-US-EP-01" title="오류안내 404 에러안내" uiType="page">
      
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
                          <p className="error-code__summary">다시 한번 확인해주세요!</p>
                          <p className="error-code__number">404</p>
                          <p className="error-code__title">Not Found</p>
                        </Box>
                    </Box>
                    <Box className="error-msg">
                        <p>지금 입력하신 주소의 페이지는 사라졌거나 다른 페이지로 변경되었습니다.</p>
                        <p>URL 주소를 다시 확인해주세요.</p>
                    </Box>
                    <Box className="btn-group center">
                      <Button variant="outlined" size="large" onClick={() => navigate(-1)}>이전 페이지</Button>
                      <Button variant="contained" size="large">홈으로 이동</Button>
                    </Box>
                  </Box>

                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScreenShell>
  );
}
