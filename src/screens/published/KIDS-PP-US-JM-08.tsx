
import React from 'react';
import { Box, Typography, TextField, Button, Alert, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DepsLocation from '@/components/common/DepsLocation';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_JM_08() {
  return (
    <ScreenShell screenId="KIDS-PP-US-JM-08" title="비밀번호 확인" uiType="form">

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
                  
                  <Box className="pageCont-memberEdit member-page">
                    <Typography className="guide-text">
                      회원정보 수정을 위해 비밀번호를 입력해주세요.
                    </Typography>
                    <Box className="bordered-box">
                      <Box component="form" noValidate>
                        <Box className="form-item">
                          <Typography component="label" htmlFor="password" className="label">
                            비밀번호
                            <Box component="span" className="necessary" aria-label="필수입력">
                              (필수)
                            </Box>
                          </Typography>
                          <TextField
                            id="password" 
                            type="password"
                            placeholder="비밀번호를 입력하세요."
                            size="large"
                            fullWidth
                            error={true} // 에러가 발생했을 때 true로 변경됨
                            // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                            slotProps={{
                              htmlInput: {
                                'aria-required': 'true',
                                'aria-describedby': 'password-alert',
                              },
                            }}
                          />
                          <Alert severity="error" className="error-alert" id="password-alert" role="alert">
                            비밀번호가 일치하지 않습니다. (1/5)
                          </Alert>
                        </Box>
                      </Box>
                    </Box>
                    {/* 하단 버튼 그룹 */}
                    <Box className="btn-group right">
                      <Button variant="contained" size="large">확인</Button>
                    </Box>

                    {/* 비밀번호 찾기 링크 영역 */}
                    <Stack  direction="row" className="find-recovery">
                      <Typography className="txt">
                        비밀번호를 잊으셨다면?
                      </Typography>
                      <Button 
                        variant="text" 
                        className="btn-link" 
                        endIcon={<ChevronRightIcon />}
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

    </ScreenShell>
  );
}
