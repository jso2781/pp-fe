/**
 * 화면ID: KIDS-PP-US-JM-07
 * 화면명: 만14세미만가입 법정대리인동의
 * 화면경로: /ko/auth/LegalGuardAgr
 * 화면설명: 만14세미만가입 법정대리인동의 화면
 */
import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from '@/pages/ko/auth/signUpSteps'

// Any-ID 타입 선언
declare global {
  interface Window {
    AnyidC?: {
      LOAD_MODULE: (config: any) => void;
    };
    anyidAdaptor?: {
      success?: (data: any) => void;
    };
  }
}

// Any-ID 자원 로드 함수
function ensureAnyIdAssets() {
  const ensureLink = (href: string) => {
    if (document.querySelector(`link[href="${href}"]`)) return
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    document.head.appendChild(l)
  }

  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error(`Failed to load ${src}`))
      document.body.appendChild(s)
    })

  // public 폴더 기준 상대 경로 사용
  // public/anyid/css/app.css -> /anyid/css/app.css
  ensureLink('/anyid/css/app.css')
  
  // manifest -> vendor -> app 순서 권장
  return loadScript('/anyid/js/manifest.js')
    .then(() => loadScript('/anyid/js/vendor.js'))
    .then(() => loadScript('/anyid/js/app.js'))
}

export default function LegalGuardAgr() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const currentStep = 2;

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    userName: '',           // 신청인 이름
    birthDate: '',          // 신청인 생년월일
    phone: '',              // 신청인 휴대전화번호
    parentName: '',         // 법정대리인 이름
    relationship: '',       // 신청인과의 관계
    parentPhone: '',        // 법정대리인 휴대전화번호
  });

  // 에러 상태 관리
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 본인인증 완료 상태
  const [isCertified, setIsCertified] = useState(false);

  // Any-ID 준비 상태
  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);

  // 약관 동의 화면에서 전달받은 steps를 사용하거나, 없으면 새로 생성
  const steps = useMemo(() => {
    const state = location.state as { steps?: ReturnType<typeof getSignUpSteps> } | null;
    if (state?.steps && Array.isArray(state.steps)) {
      return state.steps;
    }
    return getSignUpSteps(t, true);
  }, [location.state, t]);

  // Any-ID 자원 로드
  useEffect(() => {
    if (hasLoadedAnyIdRef.current) return;
    hasLoadedAnyIdRef.current = true;

    ensureAnyIdAssets()
      .then(() => {
        // Any-ID 모듈이 로드될 때까지 대기
        const checkInterval = setInterval(() => {
          if (window.AnyidC?.LOAD_MODULE) {
            setAnyIdReady(true);
            clearInterval(checkInterval);
          }
        }, 100)

        // 최대 5초 대기
        setTimeout(() => {
          clearInterval(checkInterval);
          if (window.AnyidC?.LOAD_MODULE) {
            setAnyIdReady(true);
          }
        }, 5000)
      })
      .catch((err) => {
        console.error(t('anyIdAssetsLoadFailed'), err);
      })
  }, []);

  // 이름 유효성 검사 (한글과 영문만, 2-30자)
  const validateName = (name: string): string => {
    if (!name || name.trim().length === 0) {
      return t('namePlaceholder');
    }
    const trimmed = name.trim()
    if (trimmed.length < 2 || trimmed.length > 30) {
      return t('nameTwoCharacters');
    }
    // 한글과 영문만 허용
    const namePattern = /^[가-힣a-zA-Z\s]+$/;
    if (!namePattern.test(trimmed)) {
      return t('nameOnlyKoreanAndEnglish');
    }
    return '';
  }

  // 생년월일 유효성 검사 (숫자만, 8자리)
  const validateBirthDate = (birthDate: string): string => {
    if (!birthDate || birthDate.trim().length === 0) {
      return t('birthDateError');
    }
    const trimmed = birthDate.trim()
    if (trimmed.length !== 8) {
      return t('birthDateError');
    }
    // 숫자만 허용
    const numberPattern = /^\d+$/
    if (!numberPattern.test(trimmed)) {
      return t('birthDateError');
    }
    return ''
  }

  // 휴대전화번호 유효성 검사 (숫자만, 11자리 또는 12자리)
  const validatePhone = (phone: string): string => {
    if (!phone || phone.trim().length === 0) {
      return t('phoneError');
    }
    const trimmed = phone.trim()
    // 숫자만 허용
    const numberPattern = /^\d+$/;
    if (!numberPattern.test(trimmed)) {
      return t('phoneError');
    }
    // 10자리 이하 또는 13자리 이상이면 오류
    if (trimmed.length <= 10 || trimmed.length >= 13) {
      return t('phoneError');
    }
    return '';
  }

  // 입력 필드 변경 핸들러
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 실시간 유효성 검사
    let error = '';
    if (field === 'userName') {
      error = validateName(value);
    } else if (field === 'birthDate') {
      // 숫자만 입력 허용
      const numericValue = value.replace(/[^0-9]/g, '')
      if (numericValue !== value) {
        setFormData(prev => ({ ...prev, [field]: numericValue }));
      }
      error = validateBirthDate(numericValue);
    } else if (field === 'phone') {
      // 숫자만 입력 허용
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue !== value) {
        setFormData(prev => ({ ...prev, [field]: numericValue }));
      }
      error = validatePhone(numericValue);
    } else if (field === 'parentName') {
      error = validateName(value);
    } else if (field === 'parentPhone') {
      // 숫자만 입력 허용
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue !== value) {
        setFormData(prev => ({ ...prev, [field]: numericValue }));
      }
      error = validatePhone(numericValue);
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  }

  // 생년월일 입력 제한 (8자리)
  const handleBirthDateChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 8);
    handleChange('birthDate', numericValue);
  }

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const userNameError = validateName(formData.userName);
    if (userNameError) newErrors.userName = userNameError;

    const birthDateError = validateBirthDate(formData.birthDate);
    if (birthDateError) newErrors.birthDate = birthDateError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const parentNameError = validateName(formData.parentName);
    if (parentNameError) newErrors.parentName = parentNameError;

    if (!formData.relationship || formData.relationship === '') {
      newErrors.relationship = t('selectRelationship');
    }

    const parentPhoneError = validatePhone(formData.parentPhone);
    if (parentPhoneError) newErrors.parentPhone = parentPhoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // 본인인증 버튼 클릭 핸들러
  const handleCertify = () => {
    // 법정대리인 휴대전화번호 유효성 검사
    const phoneError = validatePhone(formData.parentPhone);
    if (phoneError) {
      setErrors(prev => ({ ...prev, parentPhone: phoneError }));
      return
    }

    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) {
      alert(t('certifySelfModuleNotReady'));
      return
    }

    // public 폴더 기준 상대 경로 사용
    // public/anyid/config/config.anyidc.json -> /anyid/config/config.anyidc.json
    const configAnyidcJsonUrl = '/anyid/config/config.anyidc.json';

    // Any-ID 본인인증 랩업장 호출
    window.AnyidC.LOAD_MODULE({
      cfg: configAnyidcJsonUrl,
      txId: `legal-guard-${Date.now()}`,
      tag: `legal-guard-${Date.now()}`,
      lvl: '2',
      bypass: 1,
      toggle: true,
      theme: '4.1.0',
      redirect_uri: window.location.href,
      success: function (data: unknown) {
        // 본인인증 성공
        setIsCertified(true);
        window.anyidAdaptor?.success?.(data);
      },
      fail: function (err: unknown) {
        console.error(t('certifySelfFailed'), err);
        setIsCertified(false);
        alert(t('certifySelfFailedReminder'));
      },
      log: function (data: unknown) {
        console.log(t('anyIdLog'), data);
      },
    })
  }

  // 다음단계 버튼 클릭 핸들러
  const handleNextStep = () => {
    if (!validateForm()) {
      return;
    }

    if (!isCertified) {
      alert(t('legalGuardCertifyComplete'));
      return;
    }

    // 다음 단계로 이동 (본인인증 페이지)
    navigate('/ko/auth/CertifySelf', { state: { steps, formData } });
  }

  // 취소하기 버튼 클릭 핸들러 (만 14세 미만 회원가입 약관동의 페이지로 이동)
  const handleCancel = () => {
    navigate('/ko/auth/JuniorSignUpAgrTrms', { state: { steps } });
  }

  // 다음단계 버튼 활성화 조건
  const isNextStepEnabled = useMemo(() => {
    const isFormValid = 
      formData.userName.trim().length >= 2 &&
      formData.birthDate.trim().length === 8 &&
      formData.phone.trim().length >= 11 &&
      formData.phone.trim().length <= 12 &&
      formData.parentName.trim().length >= 2 &&
      formData.relationship !== '' &&
      formData.parentPhone.trim().length >= 11 &&
      formData.parentPhone.trim().length <= 12 &&
      Object.keys(errors).length === 0 &&
      isCertified

    return isFormValid;
  }, [formData, errors, isCertified]);

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
                    
                    {/* 신청인 (만14세 미만) 정보 */}
                    <Box className="bordered-box">
                      <Box component="form" noValidate>
                        <Box className="form-group-wrap">
                          <Box component="h3" className="sub-title">
                            {t('applyJuniorInfo')}
                          </Box>
                          <Box className="flex-container flex-half">
                            {/* 이름 (필수) */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="userName" className="label">
                                {t('name')}
                                <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="userName"
                                value={formData.userName}
                                onChange={(e) => handleChange('userName', e.target.value)}
                                placeholder={t('namePlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.userName}
                                helperText={errors.userName || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.userName ? 'userName-alert' : undefined,
                                    maxLength: 30,
                                  },
                                  formHelperText: {
                                    id: 'userName-alert',
                                    className: errors.userName ? 'error-alert' : '',
                                    role: errors.userName ? 'alert' : undefined,
                                    'aria-live': errors.userName ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                            {/* 생년월일 (필수) */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="birthDate" className="label">
                                {t('birthDate')}
                                <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="birthDate"
                                value={formData.birthDate}
                                onChange={(e) => handleBirthDateChange(e.target.value)}
                                placeholder={t('birthDatePlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.birthDate}
                                helperText={errors.birthDate || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.birthDate ? 'birthDate-alert' : undefined,
                                    maxLength: 8,
                                    inputMode: 'numeric',
                                  },
                                  formHelperText: {
                                    id: 'birthDate-alert',
                                    className: errors.birthDate ? 'error-alert' : '',
                                    role: errors.birthDate ? 'alert' : undefined,
                                    'aria-live': errors.birthDate ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                          </Box>

                          {/* 휴대전화번호 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="phone" className="label">
                              {t('phone')}
                              <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('required')})</Box>
                            </Typography>
                            <TextField
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              placeholder={t('phonePlaceholder')}
                              size="large"
                              fullWidth
                              error={!!errors.phone}
                              helperText={errors.phone || ''}
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                  'aria-describedby': errors.phone ? 'phone-alert' : undefined,
                                  type: 'tel',
                                  inputMode: 'numeric',
                                  maxLength: 13,
                                },
                                formHelperText: {
                                  id: 'phone-alert',
                                  className: errors.phone ? 'error-alert' : '',
                                  role: errors.phone ? 'alert' : undefined,
                                  'aria-live': errors.phone ? 'polite' : undefined,
                                },
                              }}
                            />
                          </Box>

                          {/* 법정 대리인 정보 */}
                          <Box component="h3" className="sub-title">
                            {t('legalGuardInfo')}
                          </Box>
                          <Box className="flex-container flex-half">
                            {/* 법정대리인 이름 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="parentName" className="label">
                                {t('name')}
                                <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="parentName"
                                value={formData.parentName}
                                onChange={(e) => handleChange('parentName', e.target.value)}
                                placeholder={t('namePlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.parentName}
                                helperText={errors.parentName || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.parentName ? 'parentName-alert' : undefined,
                                    maxLength: 30,
                                  },
                                  formHelperText: {
                                    id: 'parentName-alert',
                                    className: errors.parentName ? 'error-alert' : '',
                                    role: errors.parentName ? 'alert' : undefined,
                                    'aria-live': errors.parentName ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                            {/* 신청인과의 관계 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="relationship" className="label">
                                신청인과의 관계
                                <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('required')})</Box>
                              </Typography>
                              <FormControl fullWidth size="large" error={!!errors.relationship}>
                                <InputLabel id="relationship-label">선택</InputLabel>
                                <Select
                                  labelId="relationship-label"
                                  id="relationship"
                                  value={formData.relationship}
                                  onChange={(e) => handleChange('relationship', e.target.value)}
                                  label="선택"
                                  inputProps={{
                                    'aria-required': 'true',
                                    'aria-describedby': errors.relationship ? 'relationship-alert' : undefined,
                                  }}
                                >
                                  <MenuItem value="">선택</MenuItem>
                                  <MenuItem value="부">부</MenuItem>
                                  <MenuItem value="모">모</MenuItem>
                                  <MenuItem value="조부">조부</MenuItem>
                                  <MenuItem value="조모">조모</MenuItem>
                                  <MenuItem value="친척">친척</MenuItem>
                                  <MenuItem value="기타">기타</MenuItem>
                                </Select>
                                {errors.relationship && (
                                  <Typography
                                    id="relationship-alert"
                                    className="error-alert"
                                    role="alert"
                                    aria-live="polite"
                                    sx={{ mt: 0.5, fontSize: '0.75rem', color: 'error.main' }}
                                  >
                                    {errors.relationship}
                                  </Typography>
                                )}
                              </FormControl>
                            </Box>
                          </Box>

                          {/* 법정대리인 휴대전화번호 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="parentPhone" className="label">
                              {t('phone')}
                              <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('required')})</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="parentPhone"
                                value={formData.parentPhone}
                                onChange={(e) => handleChange('parentPhone', e.target.value)}
                                placeholder={t('phonePlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.parentPhone}
                                helperText={errors.parentPhone || ''}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    'aria-describedby': errors.parentPhone ? 'parentPhone-alert' : undefined,
                                    type: 'tel',
                                    inputMode: 'numeric',
                                    maxLength: 13,
                                  },
                                  formHelperText: {
                                    id: 'parentPhone-alert',
                                    className: errors.parentPhone ? 'error-alert' : '',
                                    role: errors.parentPhone ? 'alert' : undefined,
                                    'aria-live': errors.parentPhone ? 'polite' : undefined,
                                  },
                                }}
                              />
                              <Button 
                                variant="outlined" 
                                size="large" 
                                onClick={handleCertify}
                                aria-label={t('phoneCertify')} 
                                className="btn-outline-02 btn-form-util"
                                disabled={!anyIdReady || isCertified}
                              >
                                {isCertified ? t('certifyComplete') : t('certifySelf')}
                              </Button>
                            </Stack>
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
                        onClick={handleNextStep}
                        disabled={!isNextStepEnabled}
                      >
                        {t('nextStep')}
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