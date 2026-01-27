import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography, Card, CardContent, Stack} from '@mui/material';
import {
  PhoneAndroid as PhoneIcon,
  AccountCircle as AccountIcon,
  Fingerprint as FingerprintIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material'
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'


export default function KIDS_PP_US_JM_04() {
  const navigate = useNavigate()
  const currentStep = 2

  const steps = [
    { label: '1단계', description: '회원 유형 선택' },
    { label: '2단계', description: '약관 동의' },
    { label: '3단계', description: '본인 인증' },
    { label: '4단계', description: '회원 정보 입력' },
    { label: '5단계', description: '가입 신청 완료' },
  ]

  const handleLoginMethod = async (method: string) => {
    if (method === 'simple') {
      // 간편인증: 정부24와 동일하게 Any-ID SDK 다이얼로그 띄우기
      if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) {
        console.error('Any-ID 모듈이 준비되지 않았습니다.')
        return
      }

      // public 폴더 기준 상대 경로 사용
      // public/anyid/config/config.anyidc.json -> /anyid/config/config.anyidc.json
      const configAnyidcJsonUrl = '/anyid/config/config.anyidc.json'

      // 정부24와 동일한 방식으로 간편인증 다이얼로그 표시
      window.AnyidC.LOAD_MODULE({
        cfg: configAnyidcJsonUrl,
        txId: tx,
        tag: tx,
        lvl: acrValues,
        // SSO 연동이 없는 "이용기관 자체 로그인" 흐름: bypass=1
        bypass: 1,
        toggle: true,
        theme: '4.1.0',
        redirect_uri: redirectUri,
        success: function (data) {
          window.anyidAdaptor?.success?.(data)
        },
        fail: function (err) {
          console.error(err)
        },
        log: function (data) {
          console.log(data)
        },
      })
    } else if (method === 'sms') {
      // 휴대폰 SMS 인증 처리
      console.log('휴대폰 SMS 인증:', method)
      // TODO: 실제 SMS 인증 처리 로직 구현
    } else if (method === 'mobileId') {
      // 모바일 신분증 인증 처리
      console.log('모바일 신분증 인증:', method)
      // TODO: 실제 모바일 신분증 인증 처리 로직 구현
    }
  }
  return (
    <ScreenShell screenId="KIDS-PP-US-JM-04" title="본인 인증(14세 이상인 경우 3단계)" uiType="page">

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
                    
                    <Card className="login-method-card">
                      <CardContent className="login-method-card-content">
                        <Box className="login-button-group">
                          <Button variant="outlined" onClick={() => handleLoginMethod('simple')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <AccountIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">간편 인증</Typography>
                              <Typography variant="caption" className="login-desc">
                                네이버, 카카오, 금융기관 등의 전자서명으로 로그인
                              </Typography>
                            </Stack>
                          </Button>
                          
                          <Button variant="outlined" onClick={() => handleLoginMethod('sms')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <PhoneIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">휴대폰 SMS 인증</Typography>
                              <Typography variant="caption" className="login-desc">
                                본인 명의로 가입된 휴대폰 인증으로 로그인
                              </Typography>
                            </Stack>
                          </Button>

                          <Button variant="outlined" onClick={() => handleLoginMethod('mobileId')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <FingerprintIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">모바일 신분증 인증</Typography>
                              <Typography variant="caption" className="login-desc">
                                스마트폰의 모바일 신분증 인증으로 로그인
                              </Typography>
                            </Stack>
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outline02" size="large" onClick={() => navigate(-1)}>취소하기</Button>
                      <Button variant="contained" size="large">다음단계</Button>
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