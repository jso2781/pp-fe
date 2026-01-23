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
import { verifyPassword } from '@/features/mbr/MbrInfoThunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useDialog } from '@/contexts/DialogContext';

const MAX_FAIL_COUNT = 5;

export default function PasswordConfirm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showDialogBackdrop } = useDialog();

  // Redux auth에서 userInfo.mbrId 가져오기
  const mbrId = useAppSelector((state) => state.auth.userInfo?.mbrId || '');

  const [password, setPassword] = useState('');
  const [failCount, setFailCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 비밀번호 입력 검증
    if (!password.trim()) {
      setErrorMessage(t('passwordPlaceholder'));
      return;
    }

    // mbrId가 없으면 오류 처리
    if (!mbrId) {
      setErrorMessage(t('mbrIdRequired'));
      return;
    }

    // 5회 초과 시 재시도해도 팝업만 재표시
    if (failCount >= MAX_FAIL_COUNT) {
      showDialogBackdrop({
        message: t('passwordError5TimesMessage'),
        title: t('passwordError5Times'),
        type: 'confirm',
        confirmText: t('confirm'),
        cancelText: t('cancel'),
        onConfirm: () => navigate('/ko/auth/FindPwModify'),
        onCancel: () => {}
      });
      return;
    }

    setIsLoading(true);

    try{
      // 비밀번호 확인 API 호출
      const result = await dispatch(verifyPassword({ 
        mbrId: mbrId, 
        encptMbrPswd: password 
      })).unwrap();

      // existYn이 'Y'이면 회원정보수정 화면으로 이동
      if (result.existYn === 'Y') {
        // 회원정보수정 화면으로 이동
        // TODO: 실제 회원정보수정 화면 경로에 맞게 수정 필요
        navigate('/ko/auth/EditProfile', { 
          state: { mbrId } 
        });
      } else {
        // 비밀번호 불일치: 실패 횟수 증가
        const nextCount = failCount + 1;
        setFailCount(nextCount);

        if (nextCount >= MAX_FAIL_COUNT) {
          setErrorMessage(t('passwordConfirmMismatchWithCount', { count: nextCount }));
          showDialogBackdrop({
            message: t('passwordError5TimesMessage'),
            title: t('passwordError5Times'),
            type: 'confirm',
            confirmText: t('confirm'),
            cancelText: t('cancel'),
            onConfirm: () => navigate('/ko/auth/FindPwModify'),
            onCancel: () => {}
          });
        } else {
          setErrorMessage(t('passwordConfirmMismatchWithCount', { count: nextCount }));
        }
      }
    }catch(error){
      // API 호출 실패 시 오류 처리
      console.error('Password confirmation failed:', error);
      const nextCount = failCount + 1;
      setFailCount(nextCount);
      setErrorMessage(t('passwordConfirmError'));

      if (nextCount >= MAX_FAIL_COUNT) {
        showDialogBackdrop({
          message: t('passwordError5TimesMessage'),
          title: t('passwordError5Times'),
          type: 'confirm',
          confirmText: t('confirm'),
          cancelText: t('cancel'),
          onConfirm: () => navigate('/ko/auth/FindPwModify'),
          onCancel: () => {}
        });
      }
    }finally{
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  // 비밀번호 찾기 화면으로 이동
  const handleFindPassword = () => {
    navigate('/ko/auth/FindPw');
  };

  return (
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
                      <Button 
                        type="submit" 
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                      >
                        {isLoading ? t('confirmLoading') : t('confirm')}
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
  );
}
