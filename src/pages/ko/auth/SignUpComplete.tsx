/**
 * 화면ID: KIDS-PP-US-JM-06
 * 화면명: 가입 신청 완료
 * 화면경로: /ko/auth/SignUpComplete
 * 화면설명: 가입 신청 완료 화면
 */
import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography} from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from './signUpSteps';


export default function SignUpComplete() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // 회원 정보 입력 화면에서 전달받은 steps을 사용
  const state = location.state as { 
    steps?: ReturnType<typeof getSignUpSteps>;
  } | null;

  // 회원 정보 입력 화면에서 전달받은 steps을 사용하거나, 없으면 새로 생성
  const steps = useMemo(() => {
    if (state?.steps && Array.isArray(state.steps)) {
      return state.steps;
    }
    return getSignUpSteps(t, false); // 일반 가입 (14세 이상)
  }, [state?.steps, t]);

  // currentStep을 steps 배열에서 'signUpComplete' 단계를 찾아서 동적으로 계산
  const currentStep = useMemo(() => {
    return steps.findIndex(step => step.description === t('signUpComplete'));
  }, [steps, t]);

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
                      <Box className="join-complete-section">
                        <Typography component="p" className="complete-title">{t('signUpCompleteTitle')}</Typography>
                        <Typography component="p" className="complete-info">{t('signUpCompleteDescription')}</Typography>
                      </Box>
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group right">
                      <Button variant="contained" size="large" onClick={() => navigate('/ko')}>{t('homeTo')}</Button>
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