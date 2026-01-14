import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, Stack, Alert} from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import ScreenShell from '../ScreenShell'


export default function KIDS_PP_US_JM_07() {
  const navigate = useNavigate()
  const currentStep = 2

  const steps = [
    { label: '1단계', description: '회원 유형 선택' },
    { label: '2단계', description: '약관 동의' },
    { label: '3단계', description: '법정대리인 동의' },
    { label: '4단계', description: '본인 인증' },
    { label: '5단계', description: '회원 정보 입력' },
    { label: '6단계', description: '가입 신청 완료' },
  ]

  return (
    <ScreenShell screenId="KIDS-PP-US-JM-07" title="만14세미만가입 법정대리인동의" uiType="form">

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
                    
                    {/* 신청인 (만14세 미만) 정보 */}
                    <Box className="bordered-box">
                      <Box className="form-group-wrap">
                        <Box component="h3" className="sub-title">
                          신청인 (만14세 미만) 정보
                        </Box>
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
                              error={true} // 에러가 발생했을 때 true로 변경됨
                              // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                  'aria-describedby': 'userName-alert',
                                },
                              }}
                              fullWidth
                            />
                            <Alert severity="error" className="error-alert" id="userName-alert" role="alert">
                              이름을 입력해주세요.
                            </Alert>
                          </Box>
                          {/* 생년월일 (필수) */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="birthDate" className="label">
                              생년월일
                              <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="birthDate"
                              placeholder="8자리 입력 ex)20121231"
                              size="large"
                              error={true} // 에러가 발생했을 때 true로 변경됨
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                  'aria-describedby': 'birthDate-alert',
                                  'maxLength': 8, // 8자리로 제한 (선택 사항)
                                },
                              }}
                              fullWidth
                            />
                            <Alert severity="error" className="error-alert" id="birthDate-alert" role="alert">
                              숫자 8자리로 입력해주세요.
                            </Alert>
                          </Box>
                        </Box>

                        {/* 휴대전화번호 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="phone" className="label">
                            휴대전화번호
                            <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <TextField
                            id="phone"
                            placeholder="휴대전화번호를 입력하세요."
                            size="large"
                            fullWidth
                            error={true} // 에러가 발생했을 때 true로 변경됨
                            // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                            slotProps={{
                              htmlInput: {
                                'aria-required': 'true',
                                'aria-describedby': 'phone-alert',
                                'type': 'tel', // 전화번호 입력 모드 활성화
                              },
                            }}
                          />
                          <Alert severity="error" className="error-alert" id="phone-alert" role="alert">
                            사용할 수 없는 휴대전화번호입니다. 다른 번호를 입력해 주세요.
                          </Alert>
                        </Box>

                        {/* 법정 대리인 정보 */}
                        <Box component="h3" className="sub-title">
                          법정 대리인 정보
                        </Box>
                        <Box className="flex-container flex-half">
                          {/* 법정대리인 이름 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="parentName" className="label">
                              이름
                              <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                            </Typography>
                            <TextField
                              id="parentName"
                              placeholder="이름을 입력하세요."
                              size="large"
                              fullWidth
                              error={true} // 에러 상태 예시
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                  'aria-describedby': 'parentName-alert',
                                },
                              }}
                            />
                            <Alert severity="error" className="error-alert" id="parentName-alert" role="alert">
                              이름을 입력해 주세요.
                            </Alert>
                          </Box>
                        </Box>

                        {/* 법정대리인 휴대전화번호 */}
                        <Box className="form-item">
                          <Typography component="label" htmlFor="parentPhone" className="label">
                            휴대전화번호
                            <Box component="span" className="necessary" aria-label="필수입력">(필수)</Box>
                          </Typography>
                          <Stack direction="row" spacing={1} className="input-with-btn">
                            <TextField
                              id="parentPhone"
                              placeholder="휴대전화번호를 입력하세요."
                              size="large"
                              fullWidth
                              error={true} // 에러가 발생했을 때 true로 변경됨
                              // 스크린 리더가 입력 형식을 미리 알 수 있도록 설명 연결
                              slotProps={{
                                htmlInput: {
                                  'aria-required': 'true',
                                  'aria-describedby': 'parentPhone-alert',
                                  'type': 'tel', // 전화번호 입력 모드 활성화
                                },
                              }}
                            />
                            <Button variant="outlined" size="large" aria-label="휴대전화번호 본인인증" className="btn-outline-02 btn-overlap">본인인증</Button>
                          </Stack>
                          <Alert severity="error" className="error-alert" id="parentPhone-alert" role="alert">
                            사용할 수 없는 휴대전화번호입니다. 다른 번호를 입력해 주세요.
                          </Alert>
                        </Box>
                      </Box>
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outlined" size="large" onClick={() => navigate(-1)}>취소하기</Button>
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