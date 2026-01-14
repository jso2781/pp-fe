import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography} from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_JM_06() {
  const navigate = useNavigate()
  const currentStep = 4

  const steps = [
    { label: '1단계', description: '회원 유형 선택' },
    { label: '2단계', description: '약관 동의' },
    { label: '3단계', description: '본인 인증' },
    { label: '4단계', description: '회원 정보 입력' },
    { label: '5단계', description: '가입 신청 완료' },
  ]

  return (
    <ScreenShell screenId="KIDS-PP-US-JM-06" title="일반회원가입 가입신청완료" uiType="page">

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
                        <Typography component="p" className="complete-title">일반회원 가입 신청이 완료되었습니다.</Typography>
                        <Typography component="p" className="complete-info">전문가회원으로 활동하셔야 하실 경우 전문가회원 전환신청 페이지에서 신청해주세요.</Typography>
                      </Box>
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group right">
                      <Button variant="contained" size="large">홈으로</Button>
                    </Box>
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