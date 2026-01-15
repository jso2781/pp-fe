/**
 * 화면ID: KIDS-PP-US-JM-01
 * 화면명: 회원 유형 선택
 * 화면경로: /ko/auth/signUpSel
 * 화면설명: 회원 유형 선택 화면
 */
import { useTranslation } from 'react-i18next'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Stack, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material'
import DepsLocation from '@/components/common/DepsLocation'

export default function SignUpSel() {
  const navigate = useNavigate();
  const { t, i18n: i18nInstance } = useTranslation();
  const currentStep = 0

  const steps = [
    { label: t('step1'), description: t('signUpSelect') },
    { label: t('step2'), description: t('signUpAgree') },
    { label: t('step3'), description: t('certifySelf') },
    { label: t('step4'), description: t('inputMbrInfo') },
    { label: t('step5'), description: t('signUpComplete') },
  ]

  const memberTypes = [
    {
      id: 'general',
      title: t('signUpGeneral'),
      description: t('signUpGeneralDescription'),
      route: '/ko/signup/general', // 실제 라우트 경로로 변경 필요
    },
    {
      id: 'junior',
      title: t('signUpJunior'),
      description: t('signUpJuniorDescription'),
      route: '/ko/signup/junior', // 실제 라우트 경로로 변경 필요
    },
  ]

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
                
                <Box className="pageCont-joinType member-page">
                  {/* 단계 표시 */}
                  <Box 
                    className="step-progress" 
                    role="img" 
                    aria-label={`${t('totalSteps')} ${currentStep + 1}${t('step')} ${steps[currentStep].description} ${t('inProgress')}`}
                  >
                    <Stepper activeStep={currentStep} alternativeLabel>
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
                  
                  {/* 회원 유형 선택 카드 */}
                  <Stack className="member-type-list">
                    {memberTypes.map((type) => (
                      <Card
                        key={type.id}
                        variant="outlined"
                        className={`member-type-card member-type-card--${type.id}`}
                        onClick={() => navigate(type.route)}
                      >
                        <CardContent className="member-type-card__link">
                          <Stack className="member-type-card__inner">
                            <Box className="member-type-card__text">
                              <Typography className="member-type-card__title">
                                {type.title}
                              </Typography>
                              <Typography className="member-type-card__description">
                                {type.description}
                              </Typography>
                            </Box>
                            <Button
                              variant="text"
                              className="member-type-card__action"
                              endIcon={<ArrowForward />}
                              onClick={(e) => {
                                e.stopPropagation(); // Card 클릭 이벤트 방지
                                navigate(type.route);
                              }}
                            >
                              {t('signUpApply')}
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Box>

                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
