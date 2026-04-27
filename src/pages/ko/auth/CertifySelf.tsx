/**
 * 화면ID: KIDS-PP-US-JM-04
 * 화면명: 본인인증
 * 화면경로: /ko/auth/CertifySelf
 * 화면설명: 본인인증 화면
 */
import { useTranslation } from 'react-i18next'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from '@/pages/ko/auth/signUpSteps'
import { getTransctionId } from '@/features/auth/NiceThunks'
import { useAppDispatch } from '@/store/hooks'
import type { AnyIdUserInfoFromSsobRVO } from '@/features/auth/AnyIdTypes';
import { resolveCiFromSignUpFlowState, type SignUpFlowUserInfoState } from '@/pages/ko/auth/signUpFlowState';
import { getTransctionIdApiPath } from '@/api/auth/NiceApiPaths';
import { useDialog } from '@/contexts/DialogContext';

export default function CertifySelf() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showAlert } = useDialog();

  // 본인인증 완료 상태
  const [isCertified, setIsCertified] = useState(false);

  const ciRef = useRef<string | null>(null);

  const isShowNiceAuthArea = useMemo(() => {
    return (import.meta.env.MODE === 'production' || import.meta.env.MODE === 'stg')
      ? true
      : false;
  }, []);

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
          prvcChcAgreYn: locationState?.prvcChcAgreYn ?? 'N',
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
          prvcChcAgreYn: locationState?.prvcChcAgreYn ?? 'N',
        },
      });
    }
  }, [locationState, navigate, steps]);

  // 다음단계 버튼 클릭 핸들러
  const handleNextStep = () => {
    // 본인인증 완료 후에만 다음 화면으로 진행
    if (!isCertified) {
      showAlert(t('certifySelfCompleteReminder'));
      return;
    }

    /*
     * 현재창에서 본인인증을 완료한 경우만 회원정보입력 페이지로 이동할 수 있음.
     * 개발환경에서는 ciRef.current가 없어도 회원정보입력 페이지로 이동할 수 있음.
     */
    // 14세 이상 가입: 회원정보 입력 (만 14세 미만은 LegalGuardAgr에서 처리, 본 화면 미포함)
    navigate('/pp/ko/auth/SignUpMbrInfo', {
      state: {
        steps,
        userInfoFromSsob: userInfoFromSsobRef.current ?? locationState?.userInfoFromSsob,
        signUpIsJunior: false,
        prvcChcAgreYn: locationState?.prvcChcAgreYn ?? 'N',
      }
    });
  }

  // 취소하기: 본 화면은 14세 이상 가입 전용 → 일반 약관동의로만 이동 (만 14세 미만은 LegalGuardAgr에서 인증 처리, 본 화면이 플로우에 없음)
  const handleCancel = () => {
    navigate('/pp/ko/auth/GeneralSignUpAgrTrms', {
      state: {
        steps,
        signUpIsJunior: false,
        userInfoFromSsob: locationState?.userInfoFromSsob,
        prvcChcAgreYn: locationState?.prvcChcAgreYn ?? 'N',
      },
    });
  }

  // 만 14세 미만 가입은 본 화면을 쓰지 않음 → 리다이렉트 중 렌더 생략 (steps[currentStep] 접근 방지)
  if (locationState?.signUpIsJunior === true) {
    return null;
  }

  // 나이스ID 인증팝업 결과
  useEffect(() => {

    // 방법1: postMessage 수신
    const handleMessage = (event: MessageEvent) => {
      const dataObj = event.data;

      if (dataObj?.type === "NICE_AUTH_RESULT") {
        console.log("인증 결과:", event.data);
        if('0000' === dataObj?.code){
          const name = dataObj?.name;
          const brdt = dataObj?.brdt;
          const phone = dataObj?.phone;
          const ci = dataObj?.ci;
          const existMbrInfo = dataObj?.existMbrInfo;

          const userInfoFromSsob = {name, brdt, phone, ci, existMbrInfo} as AnyIdUserInfoFromSsobRVO;
          if(userInfoFromSsob.existMbrInfo && userInfoFromSsob.existMbrInfo === 'Y'){
            showAlert(t('alreadyRegistered'));
            return;
          }
          else{
            setIsCertified(true);
            userInfoFromSsobRef.current = userInfoFromSsob
            ciRef.current = userInfoFromSsob.ci ?? null;
          }
        }
        else if('FAIL' === event.data?.code){
          showAlert(t('certifySelfFailedReminder'));
          return;
        }
      }
    };
    // 방법2: localStorage 이벤트 수신 (opener 차단 시 fallback)
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "NICE_AUTH_RESULT" && event.newValue) {
        const dataObj = JSON.parse(event.newValue);
        console.log("인증 결과(storage):", dataObj);

        if('0000' === dataObj?.code){
          const name = dataObj?.name;
          const brdt = dataObj?.brdt;
          const phone = dataObj?.phone;
          const ci = dataObj?.ci;
          const existMbrInfo = dataObj?.existMbrInfo;

          const userInfoFromSsob = {name, brdt, phone, ci, existMbrInfo} as AnyIdUserInfoFromSsobRVO;
          if(userInfoFromSsob.existMbrInfo && userInfoFromSsob.existMbrInfo === 'Y'){
            showAlert(t('alreadyRegistered'));
            return;
          }
          else{
            setIsCertified(true);
            userInfoFromSsobRef.current = userInfoFromSsob
            ciRef.current = userInfoFromSsob.ci ?? null;
          }
        }
        else if('FAIL' === dataObj?.code){
          showAlert(t('certifySelfFailedReminder'));
          return;
        }
      }
    };
  
    window.addEventListener("message", handleMessage);
    window.addEventListener("storage", handleStorage);
  
    // 본인인증 화면의 진입 직후 Nice 본인인증창 열기
    handleAuth();

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleAuth = async () => {

    try{
      const result = await dispatch(getTransctionId({
        requestId: "1234567890",
      })).unwrap();
  
      window.open(
        `${result.uthUrl}`,
        "authNiceWeb",
        "width=480,height=812,top=100,fullscreen=no,menubar=no,status=no,titlebar=yes,location=no,toolbar=no,scrollbar=no"
      );
    }catch(error){
      console.error("CertifySelf.tsx handleAuth error=", error);
    }
  };

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

                    <Box
                      sx={{
                        mt: 2,
                        minHeight: 70,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.paper',
                        px: 2,
                        textAlign: 'center',
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleAuth}
                        sx={{ minWidth: 240, height: 56 }}
                      >
                        {t('niceCertify')}
                      </Button>
                    </Box>

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

    </>
  )
}
