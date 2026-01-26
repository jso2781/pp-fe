import React from 'react'
import { Box, Button} from '@mui/material';
import ScreenShell from '../ScreenShell';


export default function KIDS_PP_US_EP_02() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  //return <FormTemplate screenId="KIDS-PP-US-EP-02" title="오류안내 500 에러안내" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-EP-02" title="오류안내 500 에러안내" uiType="page">
      
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
                      <Button variant="outlined" size="large" onClick={() => navigate(-1)}>이전 페이지</Button>
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
