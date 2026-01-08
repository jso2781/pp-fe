import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material'
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
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <DepsLocation />
        </Box>

        <Box className="pageCont_joinType member_page">
          {/* 단계 표시 */}
          <Box sx={{ mb: 6 }}>
            <Stepper activeStep={currentStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.813rem' }}>
                      {step.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.938rem',
                        color: index === currentStep ? 'primary.main' : 'text.primary',
                        mt: 0.5,
                      }}
                    >
                      {step.description}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* 단계 제목 */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              <Typography component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {steps[currentStep].label}
              </Typography>
              {' / '}
              {steps[steps.length - 1].label}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.938rem' }}>
              {steps[currentStep].description}
            </Typography>
          </Box>

          {/* 회원 유형 선택 카드 */}
          <Stack spacing={3} sx={{ maxWidth: 800, mx: 'auto' }}>
            {memberTypes.map((type) => (
              <Card
                key={type.id}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 2,
                  },
                }}
                onClick={() => navigate(type.route)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.063rem',
                          mb: 1,
                          color: 'text.primary',
                        }}
                      >
                        {type.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.938rem' }}
                      >
                        {type.description}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      sx={{
                        minWidth: 120,
                        height: 40,
                        fontWeight: 600,
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(type.route)
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
      </Container>
    </ScreenShell>
  )
}
