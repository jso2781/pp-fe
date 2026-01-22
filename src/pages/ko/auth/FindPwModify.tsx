/**
 * 화면ID: KIDS-PP-US-LG-09
 * 화면명: 비밀번호 재설정
 * 화면경로: /ko/auth/FindPwModify
 * 화면설명: 비밀번호 재설정 화면.
 */

import { Box, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import { useDialog } from '@/contexts/DialogContext';
import { useNavigate } from 'react-router-dom'

export default function FindPwModify() {
  const navigate = useNavigate();
  const { showConfirmBackdrop } = useDialog();

  const handleChangeClick = () => {
    showConfirmBackdrop(
      '비밀번호 변경이 완료되었습니다.<br/> 이제 정상적으로 로그인이 가능합니다.<br/> 지금 로그인 페이지로 이동하시겠습니까?',
      '비밀번호 변경 완료',
      () => navigate('/ko/auth/login'),
      () => {}
    );
  }
  const handleCancleClick = () => {
    navigate('/ko/auth/findPw');
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
                    <Button variant="outlined" size="large" onClick={handleCancleClick}>취소하기</Button>
                    <Button variant="contained" size="large" onClick={handleChangeClick}>변경하기</Button>
                  </Box>
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
