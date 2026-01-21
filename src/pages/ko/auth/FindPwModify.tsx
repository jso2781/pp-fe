import { Box, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';

export default function FindPwModify() {
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
                    비밀번호 변경을 위해 새로운 비밀번호를 입력해주세요.
                  </Typography>
                  <Box className="bordered-box">
                    <Box component="form" noValidate>
                      <Box className="form-group-wrap">
                        {/* 1. 새 비밀번호 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="password" className="label">
                            새 비밀번호 
                            <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <TextField
                            id="password"
                            type="password"
                            placeholder="숫자+영문+특수문자 조합 10자리 이상"
                            size="large"
                            fullWidth
                            error={true}
                            helperText="사용할수없는 비밀번호입니다."
                            slotProps={{
                              htmlInput: {
                                'aria-required': 'true',
                                //'aria-describedby': errors.password ? 'password-alert' : undefined,
                                
                              },
                              formHelperText: {
                                id: 'password-alert',
                                className: 'error-alert',
                                //role: errors.password ? 'alert' : undefined,
                                //'aria-live': errors.password ? 'polite' : undefined,
                              },
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
                            id="confirm-password" 
                            type="password"
                            placeholder="비밀번호를 동일하게 입력하세요."
                            size="large"
                            fullWidth
                            error={true}
                            helperText="입력하신 비밀번호가 일치하지 않습니다. 다시 입력해주세요. "
                            slotProps={{
                              htmlInput: {
                                'aria-required': 'true',
                                //'aria-describedby': errors.confirm-password ? 'confirm-password' : undefined,
                              },
                              formHelperText: {
                                id: 'confirm-password-alert',
                                className: 'error-alert',
                                //role: errors.confirm-password ? 'alert' : undefined,
                                //'aria-live': errors.confirm-password ? 'polite' : undefined,
                              },
                            }}
                          />
                        </Box>
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
    // {/* <Box sx={{ maxWidth: 560, mx: 'auto' }}>
    //   <Box component="form" noValidate onSubmit={(e) => e.preventDefault()}>
    //     <Stack spacing={2}>
    //       <Typography variant="h6">비밀번호 재설정</Typography>

    //       <TextField label="아이디" name="username" />
    //       <TextField label="인증코드" name="otp" />

    //       <TextField label="새 비밀번호" name="newPassword" type="password" />
    //       <TextField label="새 비밀번호 확인" name="confirmPassword" type="password" />

    //       <Button type="submit" variant="contained" size="large">
    //         저장
    //       </Button>

    //       <Alert severity="info">
    //         본 화면은 UI 템플릿입니다. 실제 검증/저장 로직은 별도 구현이 필요합니다.
    //       </Alert>
    //     </Stack>
    //   </Box>
    // </Box> */} 
  );
}
