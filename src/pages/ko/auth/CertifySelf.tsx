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
  HelpOutline as HelpIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from '@/pages/ko/auth/signUpSteps'

import { ensureAnyIdAssets, waitForAnyidC, shouldLoadAnyIdSdk } from '@/lib/anyid/ensureAnyIdAssets'
import { getAnyIdCiFromSsob } from '@/features/auth/AnyIdThunks';
import { useAppDispatch } from '@/store/hooks';

const showAnyIdArea = shouldLoadAnyIdSdk()

export default function CertifySelf() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();


  // 본인인증 완료 상태
  const [isCertified, setIsCertified] = useState(false);

  // Any-ID 준비 상태
  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);

  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 약관 동의 화면에서 전달받은 steps 사용
  // 만 14세 미만 가입의 경우: LegalGuardAgr에서 전달받은 legalGuardFormData (법정대리인 동의 폼 데이터들)
  // 일반 가입의 경우: legalGuardFormData 없음
  const locationState = useMemo(() => {
    return location.state as {
      steps?: ReturnType<typeof getSignUpSteps>; 
      // 법정대리인 단계에서 전달받은 legalGuardFormData (법정대리인 동의 폼 데이터들)
      legalGuardFormData?: {
        userName?: string;           // 신청인 이름 (만 14세 미만)
        birthDate?: string;         // 신청인 생년월일 (만 14세 미만)
        phone?: string;             // 신청인 휴대전화번호 (만 14세 미만)
        parentName?: string;        // 법정대리인 이름 (만 14세 미만)
        relationship?: string;      // 신청인과의 관계 (만 14세 미만)
        parentPhone?: string;       // 법정대리인 휴대전화번호 (만 14세 미만)
        ciFromGuardAgr?: string;    // 법정대리인 동의 폼에서 법정대리인의 본인인증 성공 시 Any-ID에서 전달받은 ci
      };
      // 본인인증 단계에서 전달받은 ci (포탈 사용자 가입 안된 상태에서 로그인시 Any-ID 본인인증 응답 결과로 전달받은 ci 파라미터)
      ci?: string;
    } | null;
  }, [location.state]);
  
  // URL로 직접 진입 시 location.state.ci 가 있으면 SignUpMbrInfo로 자동 이동
  useEffect(() => {
    if (locationState?.ci) {
      navigate('/pp/ko/auth/SignUpMbrInfo', {
        state: { steps: locationState.steps, legalGuardFormData: locationState.legalGuardFormData, ci: locationState.ci },
      });
    }
  }, [locationState, navigate]);

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

  /** LoginMethod 등에서 남은 window.anyidAdaptor가 Any-ID 성공 시 /auth/anyid/login을 호출하지 않도록 본 화면 전용으로 덮어씀 */
  const txRef = useRef(tx)
  const acrValuesRef = useRef(acrValues)
  const redirectUriRef = useRef(redirectUri)
  const tRef = useRef(t)
  useEffect(() => {
    txRef.current = tx
    acrValuesRef.current = acrValues
    redirectUriRef.current = redirectUri
    tRef.current = t
  })

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

  // 만 14세 미만 가입 steps에는 본인인증 단계가 없음 → 이 화면으로 오면 회원정보 입력으로 보냄
  useEffect(() => {
    if (currentStep < 0) {
      navigate('/pp/ko/auth/SignUpMbrInfo', {
        replace: true,
        state: {
          steps,
          ci: locationState?.ci,
          legalGuardFormData: locationState?.legalGuardFormData,
        },
      });
    }
  }, [currentStep, steps, navigate, locationState]);

  // Any-ID 자원 로드 (전역 1회 캐시) + AnyidC 준비 즉시 확인 + 짧은 간격 대기
  useEffect(() => {
    if (!showAnyIdArea) return
    if (hasLoadedAnyIdRef.current) return
    hasLoadedAnyIdRef.current = true

    let cancelWait: (() => void) | null = null

    ensureAnyIdAssets(false)
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
  }, [showAnyIdArea, t])

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

  // #anyidc가 DOM에 마운트된 뒤 LOAD_MODULE 1회 호출 (bypass: 1, toggle: false, theme: '4.1.0') — showAnyIdArea 일 때만
  const loadModuleCalledRef = useRef(false);
  const ciRef = useRef<string | null>(null);

  useEffect(() => {
    if (!showAnyIdArea) return
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) return
    if (loadModuleCalledRef.current) return
    loadModuleCalledRef.current = true

    const prevAdaptor = window.anyidAdaptor
    window.anyidAdaptor = {
      success: async (data: any) => {
        console.log('[AnyID] log:', data);
        setIsCertified(true);

        try{
          const ci = await dispatch(getAnyIdCiFromSsob({ ssob: data?.ssob, tag: txRef.current ?? data?.txId })).unwrap();
          ciRef.current = ci ?? null;
          console.log('CertifySelf.tsx window.anyidAdaptor success getAnyIdCiFromSsob ci=', ciRef.current);
        }catch(error){
          // API 호출 실패 시 오류 처리
          console.log('CertifySelf.tsx window.anyidAdaptor success getAnyIdCiFromSsob error=', error);
        }finally{}
      },
    }

    const configAnyidcJsonUrl = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')}config/config.anyidc.json`
    const txId = txRef.current ?? `certify-${Date.now()}`
    const lvl = acrValuesRef.current

    window.AnyidC.LOAD_MODULE({
      cfg: configAnyidcJsonUrl,
      txId,
      tag: txId,
      lvl,
      bypass: 1,
      toggle: false,
      show: false,
      theme: '4.1.0',
      redirect_uri: redirectUriRef.current,
      success: (data: any) => {
        void window.anyidAdaptor?.success?.(data)
      },
      fail: (err: any) => {
        console.error(tRef.current('certifySelfFailed'), err)
        setModalMessage(tRef.current('certifySelfFailedReminder'))
        setModalOpen(true)
      },
      log: (data: any) => {
        console.log(tRef.current('anyIdLog'), data)
      },
    })

    return () => {
      window.anyidAdaptor = prevAdaptor
    }
  }, [anyIdReady])

  // 다음단계 버튼 클릭 핸들러
  const handleNextStep = () => {
    // production: 본인인증 완료 후에만 다음 화면으로 진행
    if (showAnyIdArea && !isCertified) {
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

    /*
     * 현재창에서 본인인증을 완료한 경우만 회원정보입력 페이지로 이동할 수 있음.
     * 개발환경에서는 ciRef.current가 없어도 회원정보입력 페이지로 이동할 수 있음.
     */
    if(ciRef.current || !showAnyIdArea){
      // 회원정보입력 페이지로 이동
      // 만 14세 미만 가입의 경우: LegalGuardAgr에서 전달받은 legalGuardFormData (법정대리인 동의 폼 데이터들)을 회원 정보 입력 step에 그대로 전달
      // 일반 가입의 경우: legalGuardFormData 없음 (본인인증에서 받은 데이터는 별도 처리)
      navigate('/pp/ko/auth/SignUpMbrInfo', { 
        state: { 
          steps, 
          legalGuardFormData: locationState?.legalGuardFormData,  // 법정대리인 동의 폼 데이터 전달 (만 14세 미만 가입인 경우)
          ci: ciRef.current                                       // 로그인 Any-ID 본인인증 응답 결과로 전달받은 ci 파라미터 전달 (현재창에서 본인인증을 완료한 경우만 전달)
        } 
      });
    }
  }

  // 취소하기 버튼 클릭 핸들러 (약관동의 페이지로 이동)
  const handleCancel = () => {
    let certifySelfIndex = steps.findIndex(step => step.description === t('certifySelf'));
    certifySelfIndex = certifySelfIndex >= 0 ? certifySelfIndex : 2; // 기본값: 일반 가입의 경우 2 (배열 인덱스)
    
    // 본인인증 단계가 3번째(일반 가입)인 경우 약관동의 페이지로 이동
    // 본인인증 단계가 4번째(만 14세 미만 가입)인 경우 법정대리인 동의 페이지로 이동
    if(certifySelfIndex === 2){
      navigate('/pp/ko/auth/GeneralSignUpAgrTrms', { state: { steps, legalGuardFormData: locationState?.legalGuardFormData, ci: locationState?.ci } });
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
          legalGuardFormData: legalGuardFormData,        // sessionStorage에서 불러온 legalGuardFormData 전달
          ci: locationState?.ci                          // 포탈 사용자 회원가입 안된 상태에서 로그인시 본인인증 단계에서 전달받은 ci 파라미터 전달
        } 
      });
    }
  }

  // 만 14세 미만 steps에는 certifySelf가 없음 → 리다이렉트 중에는 렌더 생략 (steps[currentStep] 접근 방지)
  if (currentStep < 0) {
    return null;
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

                    {/* showAnyIdArea: anyidc + SDK. 아니면 로컬 안내 문구 */}
                    {showAnyIdArea ? (
                      <Box sx={{ mt: 2 }}>
                        <div id="anyidc" className="anyidc" />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          mt: 2,
                          minHeight: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px dashed',
                          borderColor: 'divider',
                          borderRadius: 1,
                          bgcolor: 'background.paper',
                          px: 2,
                          textAlign: 'center',
                        }}
                      >
                        <Typography color="error">로컬 테스트 환경입니다. 개발환경에서는 사용할 수 없습니다.</Typography>
                      </Box>
                    )}

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outlined" size="large" onClick={handleCancel}>{t('cancel')}</Button>
                      <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleNextStep}
                        disabled={showAnyIdArea && !isCertified}
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
