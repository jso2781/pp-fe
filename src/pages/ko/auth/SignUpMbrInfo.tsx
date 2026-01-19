/**
 * 화면ID: KIDS-PP-US-JM-05
 * 화면명: 회원정보 입력
 * 화면경로: /ko/auth/SignUpMbrInfo
 * 화면설명: 회원정보 입력 화면
 */
import { useTranslation } from 'react-i18next'
import React, { useMemo, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, Stack } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from '@/pages/ko/auth/signUpSteps'

export default function SignUpMbrInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const location = useLocation();

  // Rest API 호출로 메뉴 가져오기
  const { list } = useAppSelector((s) => s.menu);

  // 본인인증에서 전달받은 데이터
  // 만 14세 미만 가입의 경우: LegalGuardAgr에서 전달받은 legalGuardFormData (법정대리인 동의 폼 데이터들)
  // 일반 가입의 경우: legalGuardFormData 없음 (본인인증에서 받은 데이터는 별도 처리)
  const state = location.state as { 
    steps?: ReturnType<typeof getSignUpSteps>; 
    legalGuardFormData?: {
      userName?: string;           // 신청인 이름 (만 14세 미만)
      birthDate?: string;          // 신청인 생년월일 (만 14세 미만)
      phone?: string;             // 신청인 휴대전화번호 (만 14세 미만)
      parentName?: string;        // 법정대리인 이름 (만 14세 미만)
      relationship?: string;      // 신청인과의 관계 (만 14세 미만)
      parentPhone?: string;       // 법정대리인 휴대전화번호 (만 14세 미만)
    };
  } | null;

  // formData 타입 정의
  type LegalGuardFormData = {
    userName?: string;
    birthDate?: string;
    phone?: string;
    parentName?: string;
    relationship?: string;
    parentPhone?: string;
  };

  // sessionStorage에서 저장된 legalGuardFormData(법정대리인 동의 폼 데이터들) 불러오기
  const getLegalGuardFormData = (): LegalGuardFormData | null => {
    try {
      const storedLegalGuardFormData = sessionStorage.getItem('legalGuardFormData');
      if (storedLegalGuardFormData) {
        return JSON.parse(storedLegalGuardFormData);
      }
    } catch (error) {
      console.error('Failed to parse stored form data:', error);
    }
    return null;
  };

  // formData를 sessionStorage에 저장
  const saveLegalGuardFormDataToStorage = (formData: LegalGuardFormData) => {
    if (formData) {
      try {
        sessionStorage.setItem('legalGuardFormData', JSON.stringify(formData));
      } catch (error) {
        console.error('Failed to save form data to storage:', error);
      }
    }
  };

  // 약관 동의 화면에서 전달받은 steps를 사용하거나, 없으면 새로 생성
  const steps = useMemo(() => {
    if (state?.steps && Array.isArray(state.steps)) {
      return state.steps;
    }
    return getSignUpSteps(t, false); // 일반 가입 (14세 이상)
  }, [state?.steps, t]);

  // currentStep을 steps 배열에서 'inputMbrInfo' 단계를 찾아서 동적으로 계산
  const currentStep = useMemo(() => {
    return steps.findIndex(step => step.description === t('inputMbrInfo'));
  }, [steps, t]);

  // 전달받은 legalGuardFormData(법정대리인 동의 폼 데이터들) 또는 sessionStorage에서 불러온 legalGuardFormData(법정대리인 동의 폼 데이터들) 사용
  const initialFormData = useMemo(() => {
    // location.state에서 전달받은 legalGuardFormData(법정대리인 동의 폼 데이터들)가 있으면 우선 사용하고 저장
    if (state && state.legalGuardFormData) {
      saveLegalGuardFormDataToStorage(state.legalGuardFormData);
      return {
        userName: state.legalGuardFormData.userName || '',
        phone: state.legalGuardFormData.phone || '',
      };
    }
    // 없으면 sessionStorage에서 legalGuardFormData(법정대리인 동의 폼 데이터) 불러오기
    const storedLegalGuardFormData = getLegalGuardFormData();
    if (storedLegalGuardFormData) {
      return {
        userName: storedLegalGuardFormData.userName || '',
        phone: storedLegalGuardFormData.phone || '',
      };
    }
    return {
      userName: '',
      phone: '',
    };
  }, [state]);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    userName: initialFormData.userName,  // 본인인증에서 받은 이름
    phone: initialFormData.phone,        // 본인인증에서 받은 휴대전화번호
    loginId: '',                          // 아이디
    email: '',                            // 이메일
    password: '',                         // 비밀번호
    confirmPassword: '',                  // 비밀번호 확인
  });

  // location.state에서 새로운 legalGuardFormData(법정대리인 동의 폼 데이터들)가 전달되면 업데이트
  useEffect(() => {
    if (state && state.legalGuardFormData) {
      saveLegalGuardFormDataToStorage(state.legalGuardFormData);
      setFormData(prev => ({
        ...prev,
        userName: state.legalGuardFormData?.userName || prev.userName,
        phone: state.legalGuardFormData?.phone || prev.phone,
      }));
    }
  }, [state]);

  // 에러 상태 관리
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 중복확인 상태 관리
  const [isLoginIdChecked, setIsLoginIdChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [loginIdAvailable, setLoginIdAvailable] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);

  // 성공 메시지 상태
  const [successMessages, setSuccessMessages] = useState<Record<string, string>>({});

  // 아이디 유효성 검사 (숫자, 영문 조합 4-16자리)
  const validateLoginId = (loginId: string): string => {
    if (!loginId || loginId.trim().length === 0) {
      return t('loginIdPlaceholder');
    }
    const trimmed = loginId.trim();
    if (trimmed.length < 4 || trimmed.length > 16) {
      return t('loginIdLengthError');
    }
    // 숫자와 영문만 허용
    const idPattern = /^[a-zA-Z0-9]+$/;
    if (!idPattern.test(trimmed)) {
      return t('loginIdAlphabetError');
    }
    return '';
  }

  // 이메일 유효성 검사
  const validateEmail = (email: string): string => {
    if (!email || email.trim().length === 0) {
      return ''; // 선택 항목이므로 빈 값은 에러 아님
    }
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      return t('emailPlaceholder');
    }
    return '';
  }

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
    
    // 중복확인 상태 초기화 (값이 변경되면 중복확인 무효화)
    if (field === 'loginId') {
      setIsLoginIdChecked(false);
      setLoginIdAvailable(false);
      setSuccessMessages(prev => ({ ...prev, loginId: '' }));
    } else if (field === 'email') {
      setIsEmailChecked(false);
      setEmailAvailable(false);
      setSuccessMessages(prev => ({ ...prev, email: '' }));
    }

    // 실시간 유효성 검사
    let error = '';
    if (field === 'loginId') {
      error = validateLoginId(value);
    } else if (field === 'email') {
      error = validateEmail(value);
    } else if (field === 'password') {
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

  // 아이디 중복확인
  const handleCheckLoginIdDuplicate = async () => {
    const loginIdError = validateLoginId(formData.loginId);
    if (loginIdError) {
      setErrors(prev => ({ ...prev, loginId: loginIdError }));
      setIsLoginIdChecked(false);
      setLoginIdAvailable(false);
      return;
    }

    try {
      // TODO: 실제 API 호출로 대체
      // const response = await https.post('/auth/check-login-id', { loginId: formData.loginId });
      // if (response.data.available) {
      //   setLoginIdAvailable(true);
      //   setSuccessMessages(prev => ({ ...prev, loginId: '사용가능합니다.' }));
      // } else {
      //   setLoginIdAvailable(false);
      //   setErrors(prev => ({ ...prev, loginId: t('loginIdError') }));
      // }

      // 임시: 항상 사용 가능으로 처리 (실제로는 API 호출 필요)
      setLoginIdAvailable(true);
      setIsLoginIdChecked(true);
      setSuccessMessages(prev => ({ ...prev, loginId: t('available') }));
      setErrors(prev => ({ ...prev, loginId: '' }));
    } catch (error) {
      console.error(t('loginIdDuplicateCheckFailed'), error);
      setLoginIdAvailable(false);
      setIsLoginIdChecked(true);
      setErrors(prev => ({ ...prev, loginId: t('loginIdError') }));
    }
  }

  // 이메일 중복확인
  const handleCheckEmailDuplicate = async () => {
    // 이메일이 입력되지 않은 경우 (선택 항목)
    if (!formData.email || formData.email.trim().length === 0) {
      return;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
      setIsEmailChecked(false);
      setEmailAvailable(false);
      return;
    }

    try {
      // TODO: 실제 API 호출로 대체
      // const response = await https.post('/auth/check-email', { email: formData.email });
      // if (response.data.available) {
      //   setEmailAvailable(true);
      //   setSuccessMessages(prev => ({ ...prev, email: '사용가능합니다.' }));
      // } else {
      //   setEmailAvailable(false);
      //   setErrors(prev => ({ ...prev, email: t('emailError') }));
      // }

      // 임시: 항상 사용 가능으로 처리 (실제로는 API 호출 필요)
      setEmailAvailable(true);
      setIsEmailChecked(true);
      setSuccessMessages(prev => ({ ...prev, email: t('available') }));
      setErrors(prev => ({ ...prev, email: '' }));
    } catch (error) {
      console.error(t('emailDuplicateCheckFailed'), error);
      setEmailAvailable(false);
      setIsEmailChecked(true);
      setErrors(prev => ({ ...prev, email: t('emailError') }));
    }
  }

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const loginIdError = validateLoginId(formData.loginId);
    if (loginIdError) newErrors.loginId = loginIdError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // 입력완료 버튼 클릭 핸들러
  const handleInputComplete = () => {
    if (!validateForm()) {
      return;
    }

    if (!isLoginIdChecked || !loginIdAvailable) {
      alert(t('loginIdDuplicateCheckCompleteReminder'));
      return;
    }

    // 이메일이 입력된 경우에만 중복확인 체크
    if (formData.email && formData.email.trim().length > 0) {
      if (!isEmailChecked || !emailAvailable) {
        alert(t('emailDuplicateCheckCompleteReminder'));
        return;
      }
    }

    // 회원가입 완료 시 만 14세 미만 가입의 경우 법정대리인 동의 폼 데이터를 sessionStorage에서 제거
    try {
      sessionStorage.removeItem('legalGuardFormData');
    } catch (error) {
      console.error('Failed to clear form data from storage:', error);
    }

    // 다음 단계로 이동 (가입 신청 완료 페이지)
    navigate('/ko/auth/SignUpComplete', { state: { steps, formData } });
  }

  // 취소하기 버튼 클릭 핸들러
  const handleCancel = () => {
    // sessionStorage에서 저장된 legalGuardFormData(법정대리인 동의 폼 데이터들) 불러오기
    const storedLegalGuardFormData = getLegalGuardFormData();
    
    // 본인인증 단계 인덱스 찾기
    const certifySelfIndex = steps.findIndex(step => step.description === t('certifySelf'));
    
    if (certifySelfIndex === 2) {
      // 일반 가입: 본인인증 단계가 3번째(인덱스 2) → 약관동의 페이지로 이동
      navigate('/ko/auth/GeneralSignUpAgrTrms', { state: { steps } });
    } else if (certifySelfIndex === 3) {
      // 만 14세 미만 가입: 본인인증 단계가 4번째(인덱스 3) → 본인인증 페이지로 이동 (저장된 legalGuardFormData(법정대리인 동의 폼 데이터들) 전달)
      navigate('/ko/auth/CertifySelf', { 
        state: { 
          steps,
          legalGuardFormData: storedLegalGuardFormData  // sessionStorage에서 불러온 legalGuardFormData(법정대리인 동의 폼 데이터들) 전달
        } 
      });
    } else {
      // 기본값: 약관동의 페이지로 이동
      navigate('/ko/auth/GeneralSignUpAgrTrms', { state: { steps } });
    }
  }

  // 입력완료 버튼 활성화 조건
  const isInputCompleteEnabled = useMemo(() => {
    // 실제 에러 메시지가 있는지 확인
    const hasErrors = Object.values(errors).some(error => error && error.trim() !== '');
    
    const isFormValid = 
      formData.userName.trim().length > 0 &&
      formData.phone.trim().length > 0 &&
      formData.loginId.trim().length >= 4 &&
      formData.loginId.trim().length <= 16 &&
      formData.password.trim().length >= 10 &&
      formData.password.trim().length <= 20 &&
      formData.confirmPassword === formData.password &&
      !hasErrors &&
      isLoginIdChecked &&
      loginIdAvailable &&
      // 이메일이 입력된 경우에만 중복확인 체크
      (formData.email.trim().length === 0 || (isEmailChecked && emailAvailable));

    return isFormValid;
  }, [formData, errors, isLoginIdChecked, loginIdAvailable, isEmailChecked, emailAvailable]);

  return (
    <>
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
                  
                  <Box className="pageCont-joinType member-page">
                    {/* 단계 표시 */}
                    <Box 
                      className="step-progress" 
                      role="img" 
                      aria-label={`${t('totalSteps')} ${currentStep + 1}${t('step')} ${steps[currentStep].description} ${t('inProgress')}`}
                    >
                      <Stepper activeStep={currentStep} alternativeLabel aria-hidden="true">
                        {steps.map((step, index) => (
                          <Step key={index}>
                            <StepLabel 
                              aria-hidden="true"
                              slotProps={{
                                stepIcon: {
                                  classes: {
                                    root: 'step-icon',
                                    text: 'step-text'
                                  }
                                }
                              }}
                            >
                              <Typography variant="caption" className="step-label">
                                {step.label}
                              </Typography>
                              <Typography className={`step-description ${index === currentStep ? 'current-step' : ''}`}>
                                {step.description}
                              </Typography>
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>

                    {/* 단계 제목 */}
                    <Box className="step-header">
                      <Typography className="step-title">
                        <Box component="span" className="step-current">
                          {steps[currentStep].label}
                        </Box>
                        {` / ${steps[steps.length - 1].label}`}
                      </Typography>
                      <Typography className="step-description">
                        <span className="step-description-text">
                          {steps[currentStep].description}
                        </span>
                      </Typography>
                    </Box>
                    
                    <Box className="bordered-box">
                      <Box component="form" noValidate>
                        <Box className="form-group-wrap">
                          <Box className="flex-container flex-half">
                            {/* 이름 (필수) - 본인인증에서 받은 값, 비활성화 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="userName" className="label">
                                {t('name')}
                                <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="userName"
                                value={formData.userName}
                                size="large"
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                  },
                                }}
                                fullWidth
                                // disabled
                              />
                            </Box>
                            {/* 휴대폰번호 (필수) - 본인인증에서 받은 값, 비활성화 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="phone" className="label">
                                {t('phone')}
                                <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="phone"
                                value={formData.phone}
                                size="large"
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                  },
                                }}
                                fullWidth
                                // disabled
                              />
                            </Box>
                          </Box>

                          {/* 아이디 (필수) + 중복확인버튼 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="loginId" className="label">
                              {t('loginId')}
                              <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="loginId"
                                value={formData.loginId}
                                onChange={(e) => handleChange('loginId', e.target.value)}
                                placeholder={t('loginIdPlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.loginId}
                                helperText={errors.loginId || successMessages.loginId || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.loginId || successMessages.loginId ? 'loginId-alert' : undefined,
                                    maxLength: 16,
                                  },
                                  formHelperText: {
                                    id: 'loginId-alert',
                                    className: errors.loginId ? 'error-alert' : successMessages.loginId ? 'success-message' : '',
                                    role: (errors.loginId || successMessages.loginId) ? 'alert' : undefined,
                                    'aria-live': (errors.loginId || successMessages.loginId) ? 'polite' : undefined,
                                  },
                                }}
                              />
                              <Button 
                                variant="outlined" 
                                size="large" 
                                onClick={handleCheckLoginIdDuplicate}
                                aria-label={t('loginIdDuplicateCheck')} 
                                className="btn-outline-02 btn-form-util"
                              >
                                {t('duplicateCheck')}
                              </Button>
                            </Stack>
                          </Box>

                          {/* 이메일 (선택) + 중복확인버튼 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="email" className="label">
                              {t('email')}
                              <Box component="span" className="optional" aria-label={t('optionalInput')}>({t('optional')})</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder={t('emailPlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email || successMessages.email || ''}
                                slotProps={{
                                  htmlInput: {
                                    type: 'email',
                                    'aria-describedby': (errors.email || successMessages.email) ? 'email-alert' : undefined,
                                  },
                                  formHelperText: {
                                    id: 'email-alert',
                                    className: errors.email ? 'error-alert' : successMessages.email ? 'success-message' : '',
                                    role: (errors.email || successMessages.email) ? 'alert' : undefined,
                                    'aria-live': (errors.email || successMessages.email) ? 'polite' : undefined,
                                  },
                                }}
                              />
                              <Button 
                                variant="outlined" 
                                size="large" 
                                onClick={handleCheckEmailDuplicate}
                                aria-label={t('emailDuplicateCheck')} 
                                className="btn-outline-02 btn-form-util"
                                disabled={!formData.email || formData.email.trim().length === 0}
                              >
                                {t('duplicateCheck')}
                              </Button>
                            </Stack>
                          </Box>

                          <Box className="flex-container flex-half">
                            {/* 비밀번호 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="password" className="label">
                                {t('newPassword')}
                                <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder={t('newPasswordPlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.password ? 'password-alert' : undefined,
                                    maxLength: 20,
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
                            
                            {/* 비밀번호 확인 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="confirmPassword" className="label">
                                {t('passwordConfirm')}
                                <Box component="span" className="necessary" aria-label={t('requiredInput')}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                placeholder={t('passwordConfirmPlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.confirmPassword ? 'confirmPassword-alert' : undefined,
                                    maxLength: 20,
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
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outlined" size="large" onClick={handleCancel}>{t('cancel')}</Button>
                      <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleInputComplete}
                        disabled={!isInputCompleteEnabled}
                      >
                        {t('inputComplete')}
                      </Button>
                    </Box>
                  </Box>
                  {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>  
    </>
  )
}