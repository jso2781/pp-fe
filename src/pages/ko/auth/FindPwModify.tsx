/**
 * 화면ID: KIDS-PP-US-LG-09
 * 화면명: 비밀번호 재설정
 * 화면경로: /ko/auth/FindPwModify
 * 화면설명: 비밀번호 재설정 화면.
 */

import { Box, Typography, TextField, Button, Stack, Alert } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import { useDialog } from '@/contexts/DialogContext';
import { useNavigate, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/store/hooks';
import { updateMbrInfoPw } from '@/features/mbr/MbrInfoThunks';

export default function FindPwModify() {

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    password: '',       // 비밀번호
    confirmPassword: '',// 비밀번호 확인
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showConfirmBackdrop } = useDialog();
  const dispatch = useAppDispatch();

  // 비밀번호 유효성 검사 (숫자, 영문, 특수문자 조합 10-20자리)
  const validatePassword = (password: string): string => {
    if (!password || password.trim().length === 0) {
      return t('newPasswordPlaceholder');
    }
    const trimmed = password.trim();
    if (trimmed.length < 10 || trimmed.length > 20) {
      return t('passwordLengthError');
    }
    // 숫자, 영문, 특수문자 조합 확인
    const hasNumber = /[0-9]/.test(trimmed);
    const hasLetter = /[a-zA-Z]/.test(trimmed);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(trimmed);
    
    if (!hasNumber || !hasLetter || !hasSpecial) {
      return t('passwordSpecialError');
    }
    return '';
  }

  // 비밀번호 확인 일치 검증
  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    if (!confirmPassword || confirmPassword.trim().length === 0) {
      return t('passwordPlaceholder');
    }
    if (confirmPassword !== password) {
      return t('passwordConfirmPlaceholder');
    }
    return '';
  }

  // 입력 필드 변경 핸들러
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // 실시간 유효성 검사
    let error = '';
    if(field === 'password'){
      error = validatePassword(value);
      // 비밀번호 변경 시 비밀번호 확인도 재검증
      if (formData.confirmPassword) {
        const confirmError = validateConfirmPassword(formData.confirmPassword, value);
        setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    } else if (field === 'confirmPassword') {
      error = validateConfirmPassword(value, formData.password);
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  }

  // 입력완료 버튼 활성화 조건
  const isInputCompleteEnabled = useMemo(() => {
    // 실제 에러 메시지가 있는지 확인
    const hasErrors = Object.values(errors).some(error => error && error.trim() !== '');
    
    const isFormValid = 
      formData.password.trim().length >= 10 &&
      formData.password.trim().length <= 20 &&
      formData.confirmPassword === formData.password &&
      !hasErrors;
    return isFormValid;
  }, [formData, errors]);

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  

  const handleInputComplete = () => {
    if (!validateForm()) {
      return;
    }

    //API dispatch
    try{
      dispatch(updateMbrInfoPw({ mbrNo: location.state?.mbrNo, mbrEnpswd: formData.password })).unwrap();
    } catch(e) {

    } finally {
      setFormData({
        password: '',
        confirmPassword: '',
      });
    }

    showConfirmBackdrop(
      '비밀번호 변경이 완료되었습니다.<br/> 이제 정상적으로 로그인이 가능합니다.<br/> 지금 로그인 페이지로 이동하시겠습니까?',
      '비밀번호 변경 완료',
      () => navigate('/ko/auth/login'),
      () => {}
    );
  }

  const handleCancle = () => {
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
                            onChange={(e) => handleChange('password', e.target.value)}
                            value={formData.password}
                            placeholder="숫자+영문+특수문자 조합 10자리 이상"
                            size="large"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password || ''}
                            slotProps={{
                              htmlInput: {
                                'aria-required': 'true',
                                'aria-describedby': errors.password ? 'password-alert' : undefined,
                                maxLength: 20,
                                autoComplete: 'new-password',
                              },
                              formHelperText: {
                                id: 'password-alert',
                                className: errors.password ? 'error-alert' : '',
                                role: errors.password ? 'alert' : undefined,
                                'aria-live': errors.password ? 'polite' : undefined,
                              },
                            }}
                          />
                        </Box>

                        {/* 2. 비밀번호 확인 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="confirmPassword" className="label">
                            비밀번호 확인 
                            <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <TextField
                            id="confirmPassword" 
                            type="password"
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            value={formData.confirmPassword}
                            placeholder="비밀번호를 동일하게 입력하세요."
                            size="large"
                            fullWidth
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword || ''}
                            slotProps={{
                              htmlInput: {
                                'aria-required': 'true',
                                'aria-describedby': errors.confirmPassword ? 'confirmPassword-alert' : undefined,
                                maxLength: 20,
                                autoComplete: 'new-password',
                              },
                              formHelperText: {
                                id: 'confirmPassword-alert',
                                className: errors.confirmPassword ? 'error-alert' : '',
                                role: errors.confirmPassword ? 'alert' : undefined,
                                'aria-live': errors.confirmPassword ? 'polite' : undefined,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* 하단 버튼 그룹 */}
                  <Box className="btn-group between">
                    <Button variant="outlined" size="large" onClick={handleCancle}>취소하기</Button>
                    <Button disabled={!isInputCompleteEnabled} variant="contained" size="large" onClick={handleInputComplete}>변경하기</Button>
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
