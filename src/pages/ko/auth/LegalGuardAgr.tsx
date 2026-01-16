/**
 * 화면ID: KIDS-PP-US-JM-07
 * 화면명: 만14세미만가입 법정대리인동의
 * 화면경로: /ko/auth/LegalGuardAgr
 * 화면설명: 만14세미만가입 법정대리인동의 화면
 */
import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, Stack, Alert} from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from '@/pages/ko/auth/signUpSteps'

export default function LegalGuardAgr() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const currentStep = 2

  // 약관 동의 화면에서 전달받은 steps를 사용하거나, 없으면 새로 생성
  // location.state에서 steps를 받아오거나, 없으면 공통 유틸리티 함수로 생성
  const steps = useMemo(() => {
    // location.state에서 steps를 받아온 경우 사용
    const state = location.state as { steps?: ReturnType<typeof getSignUpSteps> } | null;
    if (state?.steps && Array.isArray(state.steps)) {
      return state.steps;
    }
    // 없으면 만 14세 미만 가입용 steps 생성 (이 화면은 만 14세 미만 가입 전용)
    return getSignUpSteps(t, true);
  }, [location.state, t])

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
                                <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('displayRequired')})</Box>
                              </Typography>
                              <TextField
                                id="userName"
                                placeholder={t('namePlaceholder')}
                                size="large"
                                fullWidth
                                error={true}
                                helperText={t('namePlaceholder')}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    //'aria-describedby': errors.userName ? 'userName-alert' : undefined,
                                  },
                                  formHelperText: {
                                    id: 'userName-alert',
                                    className: 'error-alert',
                                    //role: errors.userName ? 'alert' : undefined,
                                    //'aria-live': errors.userName ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                            {/* 생년월일 (필수) */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="birthDate" className="label">
                                {t('birthDate')}
                                <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('displayRequired')})</Box>
                              </Typography>
                              <TextField
                                id="birthDate"
                                placeholder={t('birthDatePlaceholder')}
                                size="large"
                                fullWidth
                                error={true}
                                helperText={t('birthDateError')}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    //'aria-describedby': errors.birthDate ? 'birthDate-alert' : undefined,
                                    
                                  },
                                  formHelperText: {
                                    id: 'birthDate-alert',
                                    className: 'error-alert',
                                    //role: errors.birthDate ? 'alert' : undefined,
                                    //'aria-live': errors.birthDate ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                          </Box>

                          {/* 휴대전화번호 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="phone" className="label">
                              {t('phone')}
                              <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('displayRequired')})</Box>
                            </Typography>
                            <TextField
                              id="phone"
                              placeholder={t('phonePlaceholder')}
                              size="large"
                              fullWidth
                              error={true}
                              helperText={t('phoneError')}
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                  //'aria-describedby': errors.phone ? 'phone-alert' : undefined,
                                  
                                },
                                formHelperText: {
                                  id: 'phone-alert',
                                  className: 'error-alert',
                                  'type': 'tel', // 전화번호 입력 모드 활성화
                                  //role: errors.phone ? 'alert' : undefined,
                                  //'aria-live': errors.phone ? 'polite' : undefined,
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
                                <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('displayRequired')})</Box>
                              </Typography>
                              <TextField
                                id="parentName"
                                placeholder={t('namePlaceholder')}
                                size="large"
                                fullWidth
                                error={true}
                                helperText={t('namePlaceholder')}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    //'aria-describedby': errors.parentName ? 'parentName-alert' : undefined,
                                    
                                  },
                                  formHelperText: {
                                    id: 'parentName-alert',
                                    className: 'error-alert',
                                    //role: errors.parentName ? 'alert' : undefined,
                                    //'aria-live': errors.parentName ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                          </Box>

                          {/* 법정대리인 휴대전화번호 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="parentPhone" className="label">
                              {t('phone')}
                              <Box component="span" className="necessary" aria-label={t("requiredInput")}>({t('displayRequired')})</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="parentPhone"
                                placeholder={t('phonePlaceholder')}
                                size="large"
                                fullWidth
                                error={true}
                                helperText={t('phoneError')}
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    //'aria-describedby': errors.parentPhone ? 'parentPhone-alert' : undefined,
                                    
                                  },
                                  formHelperText: {
                                    id: 'parentPhone-alert',
                                    className: 'error-alert',
                                    //role: errors.parentPhone ? 'alert' : undefined,
                                    //'aria-live': errors.parentPhone ? 'polite' : undefined,
                                  },
                                }}
                              />
                              <Button variant="outlined" size="large" aria-label={t('phoneCertify')} className="btn-outline-02 btn-form-util">{t('certifySelf')}</Button>
                            </Stack>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outlined" size="large" onClick={() => navigate(-1)}>{t('cancel')}</Button>
                      <Button variant="contained" size="large">{t('nextStep')}</Button>
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