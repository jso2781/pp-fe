import React from 'react';
import { Box, Typography, TextField, Button, Stack, Grid } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_LG_09() {
  return (
    <ScreenShell screenId="KIDS-PP-US-LG-09" title="비밀번호 재설정" uiType="page">


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
                      비밀번호 변경을 위해 새로운 비밀번호를 입력해주세요.
                    </Typography>
                    <Box className="inner-box">
                      <Box component="form" noValidate className="pw-reset">
                        {/* 1. 새 비밀번호 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="new-password" className="label">
                            새 비밀번호 
                            <Box component="span" className="necessary" aria-label="필수입력">
                              (필수)
                            </Box>
                          </Typography>
                          
                          <TextField
                            id="new-password" // id 부여
                            fullWidth
                            type="password"
                            placeholder="숫자+영문+특수문자 조합 10자리 이상"
                            variant="outlined"
                            className="input-password"
                            // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                            inputProps={{
                              'aria-required': 'true',
                            }}
                          />
                        </Box>

                        {/* 2. 비밀번호 확인 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="confirm-password" className="label">
                            비밀번호 확인 
                            <Box component="span" className="necessary" aria-label="필수입력">
                              (필수)
                            </Box>
                          </Typography>
                          
                          <TextField
                            id="confirm-password" // id 부여
                            fullWidth
                            type="password"
                            placeholder="비밀번호를 동일하게 입력하세요."
                            variant="outlined"
                            className="input-confirm"
                            inputProps={{
                              'aria-required': 'true',
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    {/* 하단 버튼 그룹 */}
                    <Box className="btn-group between">
                      <Button variant="outlined" size="large">취소하기</Button>
                      <Button variant="contained" size="large">변경하기</Button>
                    </Box>
                  </Box>
                  
                  {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>



      {/* <Box sx={{ maxWidth: 560, mx: 'auto' }}>
        <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
          <Stack spacing={2}>
            <Typography variant="h6">비밀번호 재설정</Typography>

            <TextField label="아이디" name="username" />
            <TextField label="인증코드" name="otp" />

            <TextField label="새 비밀번호" name="newPassword" type="password" />
            <TextField label="새 비밀번호 확인" name="confirmPassword" type="password" />

            <Button type="submit" variant="contained" size="large">
              저장
            </Button>

            <Alert severity="info">
              본 화면은 UI 템플릿입니다. 실제 검증/저장 로직은 별도 구현이 필요합니다.
            </Alert>
          </Stack>
        </Box>
      </Box> */}
              
    </ScreenShell>
  );
}
