import React from 'react';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_LG_09() {
  return (
    <ScreenShell screenId="KIDS-PP-US-LG-09" title="비밀번호 재설정" uiType="page">
      <div className="page_layout">
        <div className="sub_container">
          <div className="content_wrap">
            <div className="sub_content">
              <DepsLocation />
              <div className="content_view" id="content">
                <Box sx={{ maxWidth: 560, mx: 'auto' }}>
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
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
