import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, Stack, Alert} from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'


export default function KIDS_PP_US_JM_05() {
  const navigate = useNavigate()
  const currentStep = 3

  const steps = [
    { label: '1단계', description: '회원 유형 선택' },
    { label: '2단계', description: '약관 동의' },
    { label: '3단계', description: '본인 인증' },
    { label: '4단계', description: '회원 정보 입력' },
    { label: '5단계', description: '가입 신청 완료' },
  ]

  return (
    <ScreenShell screenId="KIDS-PP-US-JM-05" title="만14세미만가입 회원정보입력" uiType="page">

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
                      <Box component="form" noValidate>
                        <Box className="form-group-wrap">
                          <Box className="flex-container flex-half">
                            {/* 이름 (필수) */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="userName" className="label">
                                이름
                                <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                              </Typography>
                              <TextField
                                id="userName"
                                placeholder="이름을 입력하세요."
                                size="large"
                                // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                  },
                                }}
                                fullWidth
                                disabled
                              />
                            </Box>
                            {/* 휴대폰번호 (필수) */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="phone" className="label">
                                휴대폰번호
                                <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                              </Typography>
                              <TextField
                                id="phone"
                                placeholder="숫자만 입력하세요."
                                size="large"
                                // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                  },
                                }}
                                fullWidth
                                disabled
                              />
                            </Box>
                          </Box>

                          {/* 아이디 (필수) + 중복확인버튼 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="loginId" className="label">
                              아이디
                              <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="loginId"
                                placeholder="아이디를 입력하세요."
                                size="large"
                                fullWidth
                                error={true}
                                helperText="사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    //'aria-describedby': errors.loginId ? 'loginId-alert' : undefined,
                                    
                                  },
                                  formHelperText: {
                                    id: 'loginId-alert',
                                    className: 'error-alert',
                                    //role: errors.loginId ? 'alert' : undefined,
                                    //'aria-live': errors.loginId ? 'polite' : undefined,
                                  },
                                }}
                              />
                              <Button variant="outlined" size="large" aria-label="아이디 중복확인" className="btn-form-util">중복확인</Button>
                            </Stack>
                          </Box>

                          {/* 이메일 (선택) + 중복확인버튼 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="email" className="label">
                              이메일
                              <Box component="span" className="optional" aria-label="선택입력">(선택)</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="email"
                                placeholder="이메일 주소를 입력하세요."
                                size="large"
                                fullWidth
                                error={true}
                                helperText="사용할 수 없는 이메일입니다. 다른 이메일을 입력해 주세요."
                                slotProps={{
                                  htmlInput: {
                                    //'aria-describedby': errors.email ? 'email-alert' : undefined,
                                    
                                  },
                                  formHelperText: {
                                    id: 'email-alert',
                                    className: 'error-alert',
                                    //role: errors.email ? 'alert' : undefined,
                                    //'aria-live': errors.email ? 'polite' : undefined,
                                  },
                                }}
                              />
                              <Button variant="outlined" size="large" aria-label="이메일 주소 중복확인" className="btn-form-util">중복확인</Button>
                            </Stack>
                          </Box>

                          <Box className="flex-container flex-half">
                            {/* 비밀번호 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="password" className="label">
                                새 비밀번호 
                                <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                              </Typography>
                              <TextField
                                id="password"
                                type="password"
                                placeholder="숫자+영문+특수문자 조합 10자리 이상"
                                size="large"
                                fullWidth
                                error={true}
                                helperText="사용할수없는 비밀번호입니다."
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    //'aria-describedby': errors.password ? 'password-alert' : undefined,
                                    
                                  },
                                  formHelperText: {
                                    id: 'password-alert',
                                    className: 'error-alert',
                                    //role: errors.password ? 'alert' : undefined,
                                    //'aria-live': errors.password ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                            
                            <Box className="form-item">
                              <Typography component="label" htmlFor="confirm-password" className="label">
                                비밀번호
                                <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                              </Typography>
                              <TextField
                                id="confirm-password"
                                type="password"
                                placeholder="비밀번호를 동일하게 입력하세요."
                                size="large"
                                fullWidth
                                error={true}
                                helperText="입력하신 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
                                slotProps={{
                                  htmlInput: {
                                    'aria-required': 'true',
                                    //'aria-describedby': errors.confirm-password ? 'confirm-password-alert' : undefined,
                                    
                                  },
                                  formHelperText: {
                                    id: 'confirm-password-alert',
                                    className: 'error-alert',
                                    //role: errors.confirm-password ? 'alert' : undefined,
                                    //'aria-live': errors.confirm-password ? 'polite' : undefined,
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
                      <Button variant="outlined02" size="large" onClick={() => navigate(-1)}>취소하기</Button>
                      <Button variant="contained" size="large">입력완료</Button>
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