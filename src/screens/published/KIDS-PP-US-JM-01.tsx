import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Stack, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material'
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_JM_01() {
  const navigate = useNavigate()
  const currentStep = 0

  const steps = [
    { label: '1단계', description: '회원 유형 선택' },
    { label: '2단계', description: '약관 동의' },
    { label: '3단계', description: '본인 인증' },
    { label: '4단계', description: '회원 정보 입력' },
    { label: '5단계', description: '가입 신청 완료' },
  ]

  const memberTypes = [
    {
      id: 'general',
      title: '일반 회원(만 14세 이상 회원)',
      description: '만14세 이상의 회원을 가입합니다.',
      route: '/ko/signup/general', // 실제 라우트 경로로 변경 필요
    },
    {
      id: 'junior',
      title: '일반 회원(만 14세 미만 회원)',
      description: '만 14세 미만 가입 시 법정대리인의 동의가 필요합니다.',
      route: '/ko/signup/junior', // 실제 라우트 경로로 변경 필요
    },
  ]

  return (
    <ScreenShell screenId="KIDS-PP-US-JM-01" title="회원가입 회원 유형 선택" uiType="page">

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
                      aria-label={`총 5단계 중 현재 ${currentStep + 1}단계 ${steps[currentStep].description} 진행 중`}
                    >
                      <Stepper activeStep={currentStep} alternativeLabel>
                        {steps.map((step, index) => (
                          <Step key={index}>
                            <StepLabel 
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
                                가입하기
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

    </ScreenShell>
  )
}
