import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_LG_07() {
  return (
    <ScreenShell screenId="KIDS-PP-US-LG-07" title="로그인 실패" uiType="page">
      <div className="page-layout">
        <div className="sub-container">
          <div className="content-wrap">
            <div className="sub-content">
              <DepsLocation />
              <div className="content-view" id="content">
                <Box sx={{ maxWidth: 640, mx: 'auto' }}>
                  <Stack spacing={2} alignItems="flex-start">
                    <Typography variant="h6">로그인에 실패했습니다</Typography>
                    <Typography variant="body2">
                      아이디/비밀번호를 확인하거나 비밀번호 재설정을 진행해 주세요.
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button variant="contained">다시 시도</Button>
                      <Button variant="outlined">비밀번호 재설정</Button>
                    </Stack>
                  </Stack>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
