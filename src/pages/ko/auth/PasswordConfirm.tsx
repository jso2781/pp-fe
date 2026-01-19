/**
 * 화면ID: KIDS-PP-US-JM-08
 * 화면명: 비밀번호 확인(회원 정보 수정시 비밀번호 확인)
 * 화면경로: /ko/auth/PasswordConfirm
 * 화면설명: 회원 정보 수정시 비밀번호 확인 화면 (KIDS-PP-US-JM-08.pdf 반영)
 */
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DepsLocation from '@/components/common/DepsLocation';

const MAX_FAIL_COUNT = 5;

export default function PasswordConfirm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [failCount, setFailCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPasswordErrorPopup, setShowPasswordErrorPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!password.trim()) {
      setErrorMessage(t('passwordPlaceholder'));
      return;
    }

    // 5회 초과 시 재시도해도 팝업만 재표시
    if (failCount >= MAX_FAIL_COUNT) {
      setShowPasswordErrorPopup(true);
      return;
    }

    // TODO: 실제 API 연동 (예: /api/auth/verify-password). 성공 시 회원정보수정(EditProfile) 화면으로 이동
    // 현재는 실패 시나리오(n/5, 5회 팝업) UI 검증을 위해 실패로 처리
    const nextCount = failCount + 1;
    setFailCount(nextCount);

    if (nextCount >= MAX_FAIL_COUNT) {
      setErrorMessage(t('passwordConfirmMismatchWithCount', { count: nextCount }));
      setShowPasswordErrorPopup(true);
    } else {
      setErrorMessage(t('passwordConfirmMismatchWithCount', { count: nextCount }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  // 비밀번호 찾기 화면으로 이동
  const handleFindPassword = () => {
    navigate('/screens/KIDS-PP-US-LG-08');
  };

  return (
    <>
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                  <Box className="pageCont-memberEdit member-page">
                    <Typography className="guide-text">
                      {t('passwordConfirmMessage')}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                      <Box className="bordered-box">
                        <Box className="form-group-wrap">
                          <Box className="form-item">
                            <Typography component="label" htmlFor="password" className="label">
                              {t('password')}
                              <Box component="span" className="necessary" aria-label={t('requiredInput')}>
                                ({t('required')})
                              </Box>
                            </Typography>
                            <TextField
                              id="password"
                              name="kids_cred"
                              type="password"
                              value={password}
                              onChange={handlePasswordChange}
                              placeholder={t('passwordPlaceholder')}
                              size="large"
                              fullWidth
                              error={!!errorMessage}
                              helperText={errorMessage}
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                  'aria-describedby': errorMessage ? 'password-alert' : undefined,
                                  autoComplete: 'new-password',
                                },
                                formHelperText: {
                                  id: 'password-alert',
                                  className: errorMessage ? 'error-alert' : '',
                                  role: errorMessage ? 'alert' : undefined,
                                  'aria-live': errorMessage ? 'polite' : undefined,
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>

                      {/* 비밀번호 찾기 링크 영역 */}
                      <Stack direction="row" className="form-helper-group">
                        <Typography className="txt">
                          {t('forgotPassword')}
                        </Typography>
                        <Button
                          type="button"
                          variant="text"
                          className="btn-link"
                          endIcon={<ChevronRightIcon />}
                          onClick={handleFindPassword}
                        >
                          {t('findPassword')}
                        </Button>
                      </Stack>

                      {/* 하단 버튼 그룹 */}
                      <Box className="btn-group right">
                        <Button type="submit" variant="contained" size="large">
                          {t('confirm')}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 비밀번호 5회 오류 팝업 (KIDS-PP-US-JM-08) */}
      <Dialog
        open={showPasswordErrorPopup}
        onClose={() => setShowPasswordErrorPopup(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('passwordError5Times')}</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="body1">
            {t('passwordError5TimesMessage')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordErrorPopup(false)}>{t('cancel')}</Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowPasswordErrorPopup(false);
              navigate('/screens/KIDS-PP-US-LG-08');
            }}
          >
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
