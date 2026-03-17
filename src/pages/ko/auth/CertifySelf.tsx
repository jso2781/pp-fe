/**
 * 화면ID: KIDS-PP-US-JM-04
 * 화면명: 본인인증
 * 화면경로: /ko/auth/CertifySelf
 * 화면설명: 본인인증 화면
 */
import { useTranslation } from 'react-i18next'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography, Card, CardContent, Stack, Dialog, DialogTitle, DialogContent, DialogActions, IconButton} from '@mui/material';
import {
  PhoneAndroid as PhoneIcon,
  AccountCircle as AccountIcon,
  Fingerprint as FingerprintIcon,
  HelpOutline as HelpIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
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

import { ensureAnyIdAssets, waitForAnyidC } from '@/lib/anyid/ensureAnyIdAssets'

export default function CertifySelf() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // 본인인증 완료 상태
  const [isCertified, setIsCertified] = useState(false);
  
  // 선택한 인증 방식 추적
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // Any-ID 준비 상태
  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);

  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // URL로 직접 진입 시 location.state.ci 가 있으면 이전 페이지로 자동 이동
  useEffect(() => {
    const state = location.state as { ci?: string, steps?: ReturnType<typeof getSignUpSteps> } | null
    if(state?.ci){
      navigate('/pp/ko/auth/SignUpMbrInfo', { state: { steps: state?.steps, ci: state.ci } });
    }
  }, [location.state?.steps, location.state?.ci, navigate])

  // URL 파라미터에서 tx, acrValues, redirectUri 추출
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const tx = useMemo(() => {
    // SSO를 쓰는 구조라면 SSO 모듈이 txId를 내려줌(가이드). 없으면 로컬에서 생성.
    return params.get('tx');
  }, [params]);

  const acrValues = useMemo(() => {
    const v = params.get('acrValues');
    const n = v ? parseInt(v, 10) : NaN;
    return Number.isFinite(n) ? n : 3;
  }, [params]);

  const redirectUri = useMemo(() => params.get('redirect_uri') || window.location.href, [params]);

  // 약관 동의 화면에서 전달받은 steps 사용
  // 만 14세 미만 가입의 경우: LegalGuardAgr에서 전달받은 legalGuardFormData (법정대리인 동의 폼 데이터들)
  // 일반 가입의 경우: legalGuardFormData 없음
  const locationState = useMemo(() => {
    return location.state as { 
      steps?: ReturnType<typeof getSignUpSteps>; 
      legalGuardFormData?: {
        userName?: string;           // 신청인 이름 (만 14세 미만)
        birthDate?: string;         // 신청인 생년월일 (만 14세 미만)
        phone?: string;             // 신청인 휴대전화번호 (만 14세 미만)
        parentName?: string;        // 법정대리인 이름 (만 14세 미만)
        relationship?: string;      // 신청인과의 관계 (만 14세 미만)
        parentPhone?: string;       // 법정대리인 휴대전화번호 (만 14세 미만)
      };
    } | null;
  }, [location.state]);

  const steps = useMemo(() => {
    if (locationState?.steps && Array.isArray(locationState.steps)) {
      return locationState.steps;
    }
    // steps가 없으면 일반 가입(14세 이상)으로 가정
    // 이전에 14세 미만 가입을 했다가 취소하고 일반 가입으로 변경한 경우를 대비
    return getSignUpSteps(t, false);
  }, [locationState?.steps, t]);

  // currentStep을 steps 배열에서 'certifySelf' 단계를 찾아서 동적으로 계산
  const currentStep = useMemo(() => {
    return steps.findIndex(step => step.description === t('certifySelf'));
  }, [steps, t]);

  // Any-ID 자원 로드 (전역 1회 캐시) + AnyidC 준비 즉시 확인 + 짧은 간격 대기
  useEffect(() => {
    if (hasLoadedAnyIdRef.current) return
    hasLoadedAnyIdRef.current = true

    let cancelWait: (() => void) | null = null

    ensureAnyIdAssets()
      .then(() => {
        cancelWait = waitForAnyidC(
          () => setAnyIdReady(true),
          () => console.warn('[CertifySelf] AnyidC.LOAD_MODULE not ready (timeout)'),
          50,
          40
        )
      })
      .catch((err) => {
        console.error(t('anyIdAssetsLoadFailed'), err)
      })

    return () => {
      cancelWait?.()
    }
  }, [t])

  // 모달 열기 함수
  const openModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
    setModalMessage('');
  };

  const handleLoginMethod = (method: string) => {
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) {
      openModal(t('certifySelfModuleNotReady'))
      return
    }
    setSelectedMethod(method)
  }

  // selectedMethod 설정 후 #anyidc가 DOM에 마운트된 뒤 LOAD_MODULE 호출 (bypass: 1, toggle: false, theme: '4.1.0')
  const loadModuleCalledRef = useRef<string | null>(null)
  useEffect(() => {
    if (!selectedMethod || !anyIdReady || !window.AnyidC?.LOAD_MODULE) return
    if (loadModuleCalledRef.current === selectedMethod) return
    loadModuleCalledRef.current = selectedMethod

    const configAnyidcJsonUrl = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')}config/config.anyidc.json`
    const txId = tx ?? `certify-${selectedMethod}-${Date.now()}`

    let lvl = acrValues
    if (selectedMethod === 'sms') lvl = 2
    else if (selectedMethod === 'mobileId') lvl = 3

    window.anyidAdaptor = {
      success: (data: any) => {
        setIsCertified(true)
      },
    } as typeof window.anyidAdaptor

    window.AnyidC.LOAD_MODULE({
      cfg: configAnyidcJsonUrl,
      txId,
      tag: txId,
      lvl,
      bypass: 1,
      toggle: false,
      theme: '4.1.0',
      redirect_uri: redirectUri,
      success: (data: any) => {
        setIsCertified(true)
        window.anyidAdaptor?.success?.(data)
      },
      fail: (err: any) => {
        console.error(t('certifySelfFailed'), err)
        openModal(t('certifySelfFailedReminder'))
      },
      log: (data: any) => {
        console.log(t('anyIdLog'), data)
      },
    })
  }, [selectedMethod, anyIdReady, tx, acrValues, redirectUri, t])

  // 다음단계 버튼 클릭 핸들러
  const handleNextStep = () => {
    if (!isCertified) {
      openModal(t('certifySelfCompleteReminder'));
      return;
    }

    // legalGuardFormData를 sessionStorage에 저장 (뒤로가기 시 유지)
    if (locationState?.legalGuardFormData) {
      try {
        sessionStorage.setItem('legalGuardFormData', JSON.stringify(locationState.legalGuardFormData));
      } catch (error) {
        console.error('Failed to save form data to storage:', error);
      }
    }

    // 회원정보입력 페이지로 이동
    // 만 14세 미만 가입의 경우: LegalGuardAgr에서 전달받은 legalGuardFormData (법정대리인 동의 폼 데이터들)을 회원 정보 입력 step에 그대로 전달
    // 일반 가입의 경우: legalGuardFormData 없음 (본인인증에서 받은 데이터는 별도 처리)
    navigate('/pp/ko/auth/SignUpMbrInfo', { 
      state: { 
        steps, 
        legalGuardFormData: locationState?.legalGuardFormData  // 법정대리인 동의 폼 데이터 전달 (만 14세 미만 가입인 경우)
      } 
    });
  }

  // 취소하기 버튼 클릭 핸들러 (약관동의 페이지로 이동)
  const handleCancel = () => {
    let certifySelfIndex = steps.findIndex(step => step.description === t('certifySelf'));
    certifySelfIndex = certifySelfIndex >= 0 ? certifySelfIndex : 2; // 기본값: 일반 가입의 경우 2 (배열 인덱스)
    
    // 본인인증 단계가 3번째(일반 가입)인 경우 약관동의 페이지로 이동
    // 본인인증 단계가 4번째(만 14세 미만 가입)인 경우 법정대리인 동의 페이지로 이동
    if(certifySelfIndex === 2){
      navigate('/pp/ko/auth/GeneralSignUpAgrTrms', { state: { steps } });
    }else{
      // sessionStorage에서 저장된 legalGuardFormData 불러오기
      let legalGuardFormData = null;
      try {
        const stored = sessionStorage.getItem('legalGuardFormData');
        if (stored) {
          legalGuardFormData = JSON.parse(stored);
        }
      } catch (error) {
        console.error('Failed to parse stored form data:', error);
      }
      //법정대리인 동의 페이지로 되돌아가기전에 sessionStorage에서 저장된 legalGuardFormData를 전달(이전 입력값 유지)
      navigate('/pp/ko/auth/LegalGuardAgr', { 
        state: { 
          steps,
          legalGuardFormData: legalGuardFormData  // sessionStorage에서 불러온 legalGuardFormData 전달
        } 
      });
    }
  }

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

                    {selectedMethod && (
                      <Box sx={{ mt: 2 }}>
                        <div id="anyidc" className="anyidc" />
                      </Box>
                    )}

                    <Card className="login-method-card">
                      <CardContent className="login-method-card-content">
                        <Box className="login-button-group">
                          <Button variant="outlined" onClick={() => handleLoginMethod('simple')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <AccountIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">{t('certifySelfSimple')}</Typography>
                              <Typography variant="caption" className="login-desc">
                                {t('certifySelfSimpleDesc')}
                              </Typography>
                            </Stack>
                          </Button>
                          
                          <Button variant="outlined" onClick={() => handleLoginMethod('sms')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <PhoneIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">{t('certifySelfSms')}</Typography>
                              <Typography variant="caption" className="login-desc">
                                {t('certifySelfSmsDesc')}
                              </Typography>
                            </Stack>
                          </Button>

                          <Button variant="outlined" onClick={() => handleLoginMethod('mobileId')} className="login-button">
                            <Stack spacing={1} alignItems="center" className="login-button-stack">
                              <FingerprintIcon className="login-icon" />
                              <Typography variant="body1" className="login-label">{t('certifySelfMobileId')}</Typography>
                              <Typography variant="caption" className="login-desc">
                                {t('certifySelfMobileIdDesc')}
                              </Typography>
                            </Stack>
                          </Button>
                        </Box>


                      </CardContent>
                    </Card>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outlined" size="large" onClick={handleCancel}>{t('cancel')}</Button>
                      <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleNextStep}
                        disabled={!isCertified}
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

      {/* 알림 모달 */}
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              width: undefined,
            },
            className: 'modal-small',
          },
        }}
      >
        <DialogTitle component="div" className="modal-title">
          <h2>{t('alert')}</h2>
          <IconButton
            aria-label={t('close')}
            onClick={closeModal}
            className="btn-modal-close"
          >
            <CloseIcon aria-hidden="true" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="modal-content">
          <Typography variant="body1">
            {modalMessage}
          </Typography>
        </DialogContent>
        <DialogActions className="modal-footer">
          <Button variant="contained" onClick={closeModal}>
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}