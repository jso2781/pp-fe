import { useTranslation } from 'react-i18next'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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

// Any-ID 자원 로드 함수
// UI 프로젝트의 public 폴더에서 직접 로드
function ensureAnyIdAssets() {
  const ensureLink = (href: string) => {
    if (document.querySelector(`link[href="${href}"]`)) return
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    document.head.appendChild(l)
  }

  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error(`Failed to load ${src}`))
      document.body.appendChild(s)
    })

  // public 폴더 기준 상대 경로 사용
  // public/anyid/css/app.css -> /anyid/css/app.css
  ensureLink('/anyid/css/app.css')
  
  // manifest -> vendor -> app 순서 권장
  return loadScript('/anyid/js/manifest.js')
    .then(() => loadScript('/anyid/js/vendor.js'))
    .then(() => loadScript('/anyid/js/app.js'))
}

export default function CertifySelf() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const currentStep = 3; // 만14세 미만 가입의 경우 4단계 (배열 인덱스는 3)

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

  // URL 파라미터에서 tx, acrValues, redirectUri 추출
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const tx = useMemo(() => {
    // SSO를 쓰는 구조라면 SSO 모듈이 txId를 내려줌(가이드). 없으면 로컬에서 생성.
    return params.get('tx') || crypto.randomUUID();
  }, [params]);

  const acrValues = useMemo(() => {
    const v = params.get('acrValues');
    const n = v ? parseInt(v, 10) : NaN;
    return Number.isFinite(n) ? n : 3;
  }, [params]);

  const redirectUri = useMemo(() => params.get('redirect_uri') || window.location.href, [params]);

  // 약관 동의 화면에서 전달받은 steps를 사용하거나, 없으면 새로 생성
  const steps = useMemo(() => {
    const state = location.state as { steps?: ReturnType<typeof getSignUpSteps> } | null;
    if (state?.steps && Array.isArray(state.steps)) {
      return state.steps;
    }
    return getSignUpSteps(t, true);
  }, [location.state, t]);

  // Any-ID 자원 로드
  useEffect(() => {
    if (hasLoadedAnyIdRef.current) return;
    hasLoadedAnyIdRef.current = true;

    ensureAnyIdAssets()
      .then(() => {
        // Any-ID 모듈이 로드될 때까지 대기
        const checkInterval = setInterval(() => {
          if (window.AnyidC?.LOAD_MODULE) {
            setAnyIdReady(true);
            clearInterval(checkInterval);
          }
        }, 100);

        // 최대 5초 대기
        setTimeout(() => {
          clearInterval(checkInterval);
          if (window.AnyidC?.LOAD_MODULE) {
            setAnyIdReady(true);
          }
        }, 5000);
      })
      .catch((err) => {
        console.error(t('anyIdAssetsLoadFailed'), err);
      });
  }, []);

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

  // Any-ID 인증 방식 호출 함수
  const handleLoginMethod = async (method: string) => {
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) {
      openModal(t('certifySelfModuleNotReady'));
      return;
    }

    // public 폴더 기준 상대 경로 사용
    // public/anyid/config/config.anyidc.json -> /anyid/config/config.anyidc.json
    const configAnyidcJsonUrl = '/anyid/config/config.anyidc.json';
    const txId = `certify-${method}-${Date.now()}`;

    // 인증 방식에 따른 설정
    let lvl = acrValues;
    if (method === 'sms') {
      // 휴대폰 SMS 인증 레벨
      lvl = 2;
    } else if (method === 'mobileId') {
      // 모바일 신분증 인증 레벨
      lvl = 3;
    }

    // Any-ID 본인인증 랩업장 호출
    window.AnyidC.LOAD_MODULE({
      cfg: configAnyidcJsonUrl,
      txId: txId,
      tag: txId,
      lvl: lvl,
      // SSO 연동이 없는 "이용기관 자체 로그인" 흐름: bypass=1
      bypass: 1,
      toggle: true,
      theme: '4.1.0',
      redirect_uri: redirectUri,
      success: function (data: any) {
        // 본인인증 성공
        setIsCertified(true);
        setSelectedMethod(method);
        window.anyidAdaptor?.success?.(data);
      },
      fail: function (err: any) {
        console.error(t('certifySelfFailed'), err);
        setIsCertified(false);
        setSelectedMethod(null);
        openModal(t('certifySelfFailedReminder'));
      },
      log: function (data: any) {
        console.log(t('anyIdLog'), data);
      },
    });
  }

  // 다음단계 버튼 클릭 핸들러
  const handleNextStep = () => {
    if (!isCertified) {
      openModal(t('certifySelfCompleteReminder'));
      return;
    }

    // 회원정보입력 페이지로 이동 (경로는 실제 라우터 설정에 맞게 수정 필요)
    const state = location.state as { steps?: ReturnType<typeof getSignUpSteps>; formData?: unknown } | null;
    navigate('/ko/auth/InputMbrInfo', { state: { steps, formData: state?.formData } });
  }

  // 취소하기 버튼 클릭 핸들러 (약관동의 페이지로 이동)
  const handleCancel = () => {
    navigate('/ko/auth/JuniorSignUpAgrTrms', { state: { steps } });
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