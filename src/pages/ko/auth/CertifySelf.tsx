/**
 * 화면ID: KIDS-PP-US-JM-04
 * 화면명: 본인인증
 * 화면경로: /ko/auth/CertifySelf
 * 화면설명: 본인인증 화면
 */
import { useTranslation } from 'react-i18next'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography, Card, CardContent, Stack } from '@mui/material';
import {
  HelpOutline as HelpIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from '@/pages/ko/auth/signUpSteps'

import { ensureAnyIdAssets, waitForAnyidC, shouldLoadAnyIdSdk } from '@/lib/anyid/ensureAnyIdAssets'
import { getAnyIdUserInfoFromSsob } from '@/features/auth/AnyIdThunks';
import type { AnyIdUserInfoFromSsobRVO } from '@/features/auth/AnyIdTypes';
import { useAppDispatch } from '@/store/hooks';
import { useDialog } from '@/contexts/DialogContext';
import { resolveCiFromSignUpFlowState, type SignUpFlowUserInfoState } from '@/pages/ko/auth/signUpFlowState';

const showAnyIdArea = shouldLoadAnyIdSdk()

export default function CertifySelf() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { showAlert } = useDialog();


  // 본인인증 완료 상태
  const [isCertified, setIsCertified] = useState(false);

  // Any-ID 준비 상태
  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);

  // 약관 동의 화면에서 전달받은 steps 사용 (본 화면은 14세 이상 가입 전용)
  const locationState = useMemo(() => {
    return location.state as (SignUpFlowUserInfoState & {
      steps?: ReturnType<typeof getSignUpSteps>;
    }) | null;
  }, [location.state]);

  const userInfoFromSsobRef = useRef<AnyIdUserInfoFromSsobRVO | null>(null)
  useEffect(() => {
    if (locationState?.userInfoFromSsob) {
      userInfoFromSsobRef.current = locationState.userInfoFromSsob
    }
  }, [locationState?.userInfoFromSsob])

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
  const txRef = useRef(tx);
  const acrValuesRef = useRef(acrValues);
  const redirectUriRef = useRef(redirectUri);
  const dispatchRef = useRef(dispatch);
  const tRef = useRef(t);
  useEffect(() => {
    txRef.current = tx
    acrValuesRef.current = acrValues
    redirectUriRef.current = redirectUri
    dispatchRef.current = dispatch
    tRef.current = t
  })

  const steps = useMemo(() => {
    if (locationState?.steps && Array.isArray(locationState.steps)) {
      return locationState.steps;
    }
    // steps가 없으면 일반 가입(14세 이상)으로 가정
    // 이전에 14세 미만 가입을 했다가 취소하고 일반 가입으로 변경한 경우를 대비
    return getSignUpSteps(t);
  }, [locationState?.steps, t]);

  // currentStep을 steps 배열에서 'certifySelf' 단계를 찾아서 동적으로 계산
  const currentStep = useMemo(() => {
    return steps.findIndex(step => step.description === t('certifySelf'));
  }, [steps, t]);

  // 만 14세 미만: 본 화면 미포함 — 잘못 진입 시 법정대리인 동의(인증) 화면으로. 14세 이상: 이미 CI 있으면 본인인증 생략
  useEffect(() => {
    if (locationState?.signUpIsJunior === true) {
      navigate('/pp/ko/auth/LegalGuardAgr', {
        replace: true,
        state: {
          steps: locationState?.steps ?? steps,
          userInfoFromSsob: locationState?.userInfoFromSsob,
          signUpIsJunior: true,
        },
      });
      return;
    }
    const existingCi = resolveCiFromSignUpFlowState(locationState);
    if (existingCi) {
      navigate('/pp/ko/auth/SignUpMbrInfo', {
        state: {
          steps: locationState?.steps,
          userInfoFromSsob: locationState?.userInfoFromSsob,
          signUpIsJunior: false,
        },
      });
    }
  }, [locationState, navigate, steps]);

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

  const openModal = (message: string) => {
    showAlert(message)
  }

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

        try{
          const userInfoFromSsob = await dispatchRef.current(getAnyIdUserInfoFromSsob({ ssob: data?.ssob, tag: txRef.current ?? data?.txId, isCheckMbr: true })).unwrap();
          
          if(userInfoFromSsob.existMbrInfo && userInfoFromSsob.existMbrInfo === 'Y'){
            showAlert(t('alreadyRegistered'));
            return;
          }
          else{
            setIsCertified(true);
            userInfoFromSsobRef.current = userInfoFromSsob
            ciRef.current = userInfoFromSsob.ci ?? null;
          }
        }catch(error){
          // API 호출 실패 시 오류 처리
          console.log('CertifySelf.tsx window.anyidAdaptor success getAnyIdUserInfoFromSsob error=', error);
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
        showAlert(tRef.current('certifySelfFailedReminder'))
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

    /*
     * 현재창에서 본인인증을 완료한 경우만 회원정보입력 페이지로 이동할 수 있음.
     * 개발환경에서는 ciRef.current가 없어도 회원정보입력 페이지로 이동할 수 있음.
     */
    if(ciRef.current || !showAnyIdArea){
      // 14세 이상 가입: 회원정보 입력 (만 14세 미만은 LegalGuardAgr에서 처리, 본 화면 미포함)
      navigate('/pp/ko/auth/SignUpMbrInfo', { 
        state: { 
          steps, 
          userInfoFromSsob: userInfoFromSsobRef.current ?? locationState?.userInfoFromSsob,
          signUpIsJunior: false,
        } 
      });
    }
  }

  // 취소하기: 본 화면은 14세 이상 가입 전용 → 일반 약관동의로만 이동 (만 14세 미만은 LegalGuardAgr에서 인증 처리, 본 화면이 플로우에 없음)
  const handleCancel = () => {
    navigate('/pp/ko/auth/GeneralSignUpAgrTrms', {
      state: { steps, signUpIsJunior: false },
    });
  }

  // 만 14세 미만 가입은 본 화면을 쓰지 않음 → 리다이렉트 중 렌더 생략 (steps[currentStep] 접근 방지)
  if (locationState?.signUpIsJunior === true) {
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

    </>
  )
}
