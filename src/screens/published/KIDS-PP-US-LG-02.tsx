import React from 'react';
import { Alert, Box, Button, Checkbox, Divider, Stack, TextField, Typography, Link, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import DepsLocation from '@/components/common/DepsLocation';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_LG_02() {
  return (
    <ScreenShell screenId="KIDS-PP-US-LG-02" title="로그인 로그인 방식 선택" uiType="page">
      <div className="page-layout">
        <div className="sub-container">
          <div className="content-wrap">
            <div className="sub-content">
              <DepsLocation />
              <div className="content-view" id="content">
                <div className="pageCont_login">
                  <Grid container spacing={4}>
                    <Grid className="login_form_section" size={{ xs: 12, md: 6 }}>
                      <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
                        <Stack spacing={2}>
                          <Typography variant="h6">로그인</Typography>

                          <TextField label="아이디" name="username" autoComplete="username" />
                          <TextField label="비밀번호" name="password" type="password" autoComplete="current-password" />

                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <FormControlLabel control={<Checkbox name="rememberId" />} label="아이디 저장" />
                            <Link href="#" underline="hover">비밀번호 찾기</Link>
                          </Stack>

                          <Button type="submit" variant="contained" size="large">
                            로그인
                          </Button>

                          <Divider />

                          <Alert severity="info">
                            로그인 방식 선택 화면(MUI 전환본). 실제 인증 로직은 별도 연동이 필요합니다.
                          </Alert>
                        </Stack>
                      </Box>
                    </Grid>

                    <Grid className="login_info_section" size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Typography variant="h6">안내</Typography>
                        <Typography variant="body2">
                          사용자 유형에 따라 로그인 방식이 달라질 수 있습니다. 관리자에게 문의하세요.
                        </Typography>
                        <Button variant="outlined">회원가입</Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
