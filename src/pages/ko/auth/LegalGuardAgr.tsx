/**
 * 화면ID: KIDS-PP-US-JM-07
 * 화면명: 만14세미만가입 법정대리인동의
 * 화면경로: /ko/auth/LegalGuardAgr
 * 화면설명: 만14세미만가입 법정대리인동의 화면
 */
import React, { useMemo, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material'
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from '@/pages/ko/auth/signUpSteps'
import { ensureAnyIdAssets, ensureApplicantAnyIdCompatCss, ensureGuardianAnyIdCompatCss, waitForAnyidC } from '@/lib/anyid/ensureAnyIdAssets'
import { useAppDispatch } from '@/store/hooks'
import { getAnyIdUserInfoFromSsob } from '@/features/auth/AnyIdThunks'
import type { AnyIdUserInfoFromSsobRVO } from '@/features/auth/AnyIdTypes'

const isProduction = import.meta.env.MODE === 'production'

// LegalGuardFormData 타입 정의
type LegalGuardFormData = {
  userName: string;
  birthDate: string;
  phone: string;
  parentName: string;
  relationship: string;
  parentPhone: string;
  /** 법정대리인 동의 폼에서 법정대리인의 본인인증 성공 시 Any-ID에서 전달받은 ci */
  ciFromGuardAgr?: string;
};

/**
 * Any-ID가 #anyidc 안에 본인인증 UI를 그렸는지 판별한다.
 * theme 4.1.x 는 ul.certify-type 대신 .login-4btn 등을 사용한다.
 */
function isApplicantAnyIdDomReady(root: Element): boolean {
  if (root.querySelector('ul.certify-type > li')) return true
  if (
    root.querySelector('.login-4btn li') ||
    root.querySelector('.certificate-wrapper.login-4btn li') ||
    root.querySelector('.newLoginWrap .login-4btn li')
  ) {
    return true
  }
  if (
    (root.classList.contains('thema_04') || root.classList.contains('container')) &&
    root.querySelector('.newLoginWrap, .login-4btn, .tab-content-wrap') &&
    root.querySelectorAll('li, button, a[href]').length >= 1
  ) {
    return true
  }
  return false
}

const ANYID_APPLICANT_SHELL = '[data-legal-guard-anyid="applicant"]'
const ANYID_GUARDIAN_SHELL = '[data-legal-guard-anyid="guardian"]'

/**
 * Any-ID SDK가 마운트 후에도 id="anyidc" 를 유지해 React의 id={anyidc_applicant_done} 전환이 DOM에 반영되지 않을 수 있다.
 * 법정대리인 LOAD_MODULE 전에 신청인 영역의 노드 id만 임의로 바꿔 문서에 #anyidc 가 하나만 남게 한다.
 */
function releaseApplicantAnyIdcId(): void {
  const shell = document.querySelector(ANYID_APPLICANT_SHELL)
  let node = shell?.querySelector<HTMLElement>('#anyidc')
  if (!node) {
    const first = document.getElementById('anyidc')
    if (first && first.closest(ANYID_APPLICANT_SHELL)) node = first as HTMLElement
  }
  if (node) node.id = 'anyidc_applicant_done'
}

/** 초기 2단계(신청인/법정대리인) 로딩이 끝난 후 신청인 id를 원래 anyidc로 복원 */
function restoreApplicantAnyIdcId(): void {
  const shell = document.querySelector(ANYID_APPLICANT_SHELL)
  const node = shell?.querySelector<HTMLElement>('#anyidc_applicant_done')
  if (node) node.id = 'anyidc'
}

function getGuardianAnyIdMountElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`${ANYID_GUARDIAN_SHELL} #anyidc`)
}

export default function LegalGuardAgr() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const currentStep = 2;
  const { lang } = useParams<{ lang: string }>();

  /** LoginMethod 등에서 남은 window.anyidAdaptor가 Any-ID 성공 시 /auth/anyid/login을 호출하지 않도록 이 화면 전용으로 덮어씀 */
  const tRef = useRef(t);
  useEffect(() => {
    tRef.current = t;
  });

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const openModal = (message: string) => {
    setModalMessage(message)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
    setModalMessage('')
  }

  /*
   * 로그인 Any-ID 본인인증 응답 결과로 법정대리인 동의 화면에 이동된 경우 전달받은 ci 파라미터 가져옴.
   * (=Any-ID 본인인증은 통과되었으나, 회원정보가 없는 경우 가입절차가 진행됨.)
   */
  const initialCi = (location.state?.ci as string) ?? ''
  const [ci, setCi] = useState<string>(initialCi) // 신청인 CI (다음 단계 state.ci로 전달)
  console.log('LegalGuardAgr ci=', ci);
  
  // sessionStorage에서 저장된 LegalGuardFormData 불러오기
  const getStoredLegalGuardFormData = (): LegalGuardFormData | null => {
    try {
      const stored = sessionStorage.getItem('legalGuardFormData');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to parse stored form data:', error);
    }
    return null;
  };

  // location.state에서 전달받은 legalGuardFormData 또는 sessionStorage에서 불러온 legalGuardFormData 사용
  const getInitialLegalGuardFormData = (): LegalGuardFormData => {
    const state = location.state as { legalGuardFormData?: LegalGuardFormData } | null;
    // location.state에서 전달받은 legalGuardFormData가 있으면 우선 사용
    if (state?.legalGuardFormData) {
      return state.legalGuardFormData;
    }
    // 없으면 sessionStorage에서 불러오기
    const stored = getStoredLegalGuardFormData();
    if (stored) {
      return {
        userName: stored.userName || '',
        birthDate: stored.birthDate || '',
        phone: stored.phone || '',
        parentName: stored.parentName || '',
        relationship: stored.relationship || '',
        parentPhone: stored.parentPhone || '',
        ciFromGuardAgr: stored.ciFromGuardAgr,
      };
    }
    return {
      userName: '',
      birthDate: '',
      phone: '',
      parentName: '',
      relationship: '',
      parentPhone: '',
      ciFromGuardAgr: ''
    };
  };

  // 법정대리인 동의 폼 데이터 상태 관리
  const [legalGuardFormData, setLegalGuardFormData] = useState<LegalGuardFormData>(getInitialLegalGuardFormData());

  // 에러 상태 관리
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 본인인증 완료 상태
  const [isLegalGuardCertified, setIsLegalGuardCertified] = useState(false); // 법정대리인 인증
  const [isApplicantCertified, setIsApplicantCertified] = useState(false); // 신청인 인증
  // Any-ID 영역 표시 여부: 요구사항상 화면 로딩 즉시 표시
  const [showAnyIdArea, setShowAnyIdArea] = useState(true);

  // Any-ID 준비 상태
  const [anyIdReady, setAnyIdReady] = useState(false);
  const hasLoadedAnyIdRef = useRef(false);
  const applicantLoadModuleCalledRef = useRef(false);
  const guardianLoadModuleCalledRef = useRef(false);
  const guardianRenderObserverDisconnectRef = useRef<(() => void) | null>(null);
  const applicantIdRestoreDoneRef = useRef(false);
  const applicantRenderObserverDisconnectRef = useRef<(() => void) | null>(null);
  const [isApplicantAnyIdRendered, setIsApplicantAnyIdRendered] = useState(false);
  const [isGuardianAnyIdRendered, setIsGuardianAnyIdRendered] = useState(false);
  const applicantTagRef = useRef<string>('')
  const guardianTagRef = useRef<string>('')

  /** 신청인 인증 성공 후 법정대리인 렌더 단계. 법정대리인 렌더 완료 시 종료된다. */
  const guardianPhase = useMemo(
    () => isProduction && isApplicantCertified && !isGuardianAnyIdRendered,
    [isProduction, isApplicantCertified, isGuardianAnyIdRendered]
  )

  const isUnder14ByBrdt = (brdt: string | undefined): boolean | null => {
    if (!brdt) return null
    const s = String(brdt).trim()
    if (!/^\d{8}$/.test(s)) return null
    const y = Number(s.slice(0, 4))
    const m = Number(s.slice(4, 6))
    const d = Number(s.slice(6, 8))
    if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null
    const birth = new Date(y, m - 1, d)
    if (Number.isNaN(birth.getTime())) return null

    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const mm = today.getMonth() - birth.getMonth()
    if (mm < 0 || (mm === 0 && today.getDate() < birth.getDate())) age -= 1
    return age < 14
  }

  /** #anyidc 에 실제 위젯이 붙었는지 MutationObserver 로 감지 */
  const observeApplicantRenderDone = useCallback((): (() => void) | void => {
    const source = document.getElementById('anyidc')
    if (!source) return

    const markRenderedOnce = (): boolean => {
      if (!isApplicantAnyIdDomReady(source)) return false
      setIsApplicantAnyIdRendered(true)
      if (import.meta.env.DEV) {
        console.log('[LegalGuardAgr] Any-ID applicant mount detected, switching to guardian #anyidc phase')
      }
      return true
    }

    if (markRenderedOnce()) return

    const observer = new MutationObserver(() => {
      if (markRenderedOnce()) {
        observer.disconnect()
      }
    })
    observer.observe(source, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  // 약관 동의 화면에서 전달받은 steps를 사용하거나, 없으면 새로 생성
  const steps = useMemo(() => {
    const state = location.state as { steps?: ReturnType<typeof getSignUpSteps> } | null;
    if (state?.steps && Array.isArray(state.steps)) {
      return state.steps;
    }
    return getSignUpSteps(t, true);
  }, [location.state, t]);

  // location.state에서 이전 legalGuardFormData가 전달되면 업데이트
  useEffect(() => {
    const state = location.state as { legalGuardFormData?: LegalGuardFormData } | null;
    if (state?.legalGuardFormData) {
      setLegalGuardFormData(state.legalGuardFormData);
      // sessionStorage에도 저장
      try {
        sessionStorage.setItem('legalGuardFormData', JSON.stringify(state.legalGuardFormData));
      } catch (error) {
        console.error('Failed to save form data to storage:', error);
      }
    }
  }, [location.state]);

  // Any-ID 자원 로드 (production)
  useEffect(() => {
    if (!isProduction) return
    if (hasLoadedAnyIdRef.current) return
    hasLoadedAnyIdRef.current = true

    let cancelWait: (() => void) | null = null

    ensureAnyIdAssets()
    ensureApplicantAnyIdCompatCss()
    ensureGuardianAnyIdCompatCss()
    ensureAnyIdAssets()
      .then(() => {
        cancelWait = waitForAnyidC(
          () => setAnyIdReady(true),
          () => console.warn('[LegalGuardAgr] AnyidC.LOAD_MODULE not ready (timeout)'),
          50,
          40
        )
      })
      .catch((err) => {
        console.error(t('anyIdAssetsLoadFailed'), err);
      })

    return () => {
      cancelWait?.()
    }
  }, [t]);

  // Any-ID: 신청인 영역(#anyidc)에 LOAD_MODULE 1회 → 렌더 완료 확인
  useEffect(() => {
    if (!isProduction) return
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) return
    if (applicantLoadModuleCalledRef.current) return
    applicantLoadModuleCalledRef.current = true

    const prevAdaptor = window.anyidAdaptor
    window.anyidAdaptor = {
      success: async (data: any) => {
        const tag = (data?.tag ?? data?.txId ?? '') as string

        try{
          // 신청인 인증 success
          if(tag && tag === applicantTagRef.current){
            console.log('[LegalGuardAgr] applicant success handler tag='+tag+',data=', data);
            const userInfoFromSsob = await dispatch(getAnyIdUserInfoFromSsob({ ssob: data?.ssob, tag })).unwrap() as AnyIdUserInfoFromSsobRVO
            const under14 = isUnder14ByBrdt(userInfoFromSsob?.brdt)
            if (under14 === false) {
              setIsApplicantCertified(false)
              setCi('')
              openModal(t('minorCertifyReminder'))
              return;
            }

            // 14세 미만(또는 판단 불가)인 경우만 입력값 반영
            if (under14 === true || under14 === null) {
              setLegalGuardFormData((prev) => ({
                ...prev,
                userName: userInfoFromSsob?.name ?? prev.userName,
                birthDate: userInfoFromSsob?.brdt ?? prev.birthDate,
                phone: userInfoFromSsob?.phone ?? prev.phone
              }))

              const ciValue = userInfoFromSsob.ci;
              setCi(ciValue ?? '');
              setIsApplicantCertified(true)
            }
            return
          }

          // 법정대리인 인증 success
          if(tag && tag === guardianTagRef.current){
            console.log('[LegalGuardAgr] guardian success handler tag='+tag+',data=', data);
            const userInfoFromSsob = await dispatch(getAnyIdUserInfoFromSsob({ ssob: data?.ssob, tag })).unwrap() as AnyIdUserInfoFromSsobRVO

            setLegalGuardFormData((prev) => ({
              ...prev,
              parentName: userInfoFromSsob?.name ?? prev.parentName,
              parentPhone: userInfoFromSsob?.phone ?? prev.parentPhone,
              ciFromGuardAgr: userInfoFromSsob?.ci ?? prev.ciFromGuardAgr
            }))

            setIsLegalGuardCertified(true)
            return
          }
        }
        catch(error){
          console.error('[LegalGuardAgr] anyid success handler error=', error);
        }
      },
    }

    const configAnyidcJsonUrl = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')}config/config.anyidc.json`
    const seed = Date.now()
    const applicantTxId = `legal-guard-applicant-${seed}`
    const guardianTxId = `legal-guard-guardian-${seed}`
    applicantTagRef.current = applicantTxId
    guardianTagRef.current = guardianTxId

    // 신청인: SDK가 요구하는 id="anyidc" 에만 렌더 (임시 id 스왑 없음)
    window.AnyidC?.LOAD_MODULE?.({
      cfg: configAnyidcJsonUrl,
      txId: applicantTxId,
      tag: applicantTxId,
      lvl: 2,
      bypass: 0,
      toggle: false,
      theme: '4.1.0',
      redirect_uri: window.location.href,
      success: (data: any) => void window.anyidAdaptor?.success?.(data),
      fail: (err: any) => {
        console.error(tRef.current('certifySelfFailed'), err)
        setIsApplicantCertified(false)
        alert(tRef.current('certifySelfFailedReminder'))
      },
      log: (data: any) => {
        console.log('============================ ' + tRef.current('anyIdLog') + ' [APPLICANT] ============================', data)
      },
    })

    const disconnectObserver = observeApplicantRenderDone()
    applicantRenderObserverDisconnectRef.current =
      typeof disconnectObserver === 'function' ? disconnectObserver : null

    return () => {
      applicantRenderObserverDisconnectRef.current?.()
      applicantRenderObserverDisconnectRef.current = null
      window.anyidAdaptor = prevAdaptor
    }
  }, [anyIdReady, dispatch, observeApplicantRenderDone]);

  // 신청인 렌더 완료 직후 Observer 중단 (id 전환과 충돌 방지)
  useEffect(() => {
    if (!isApplicantAnyIdRendered) return
    applicantRenderObserverDisconnectRef.current?.()
    applicantRenderObserverDisconnectRef.current = null
  }, [isApplicantAnyIdRendered]);

  // 법정대리인 렌더 완료 시점에 신청인 id를 anyidc로 되돌림
  useEffect(() => {
    if (!isGuardianAnyIdRendered) return
    if (applicantIdRestoreDoneRef.current) return
    restoreApplicantAnyIdcId()
    applicantIdRestoreDoneRef.current = true
  }, [isGuardianAnyIdRendered]);

  // guardianPhase: id="anyidc" 가 법정대리인 div로 옮긴 직후 LOAD_MODULE (레이아웃 커밋 직후 실행)
  useLayoutEffect(() => {
    if (!isProduction) return
    if (!anyIdReady || !window.AnyidC?.LOAD_MODULE) return
    if (!guardianPhase) return
    if (guardianLoadModuleCalledRef.current) return

    const configAnyidcJsonUrl = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')}config/config.anyidc.json`
    const guardianTxId = guardianTagRef.current

    const runGuardianLoad = (anchor: HTMLElement) => {
      guardianLoadModuleCalledRef.current = true
      releaseApplicantAnyIdcId()
      anchor.innerHTML = ''
      window.AnyidC?.LOAD_MODULE?.({
        cfg: configAnyidcJsonUrl,
        txId: guardianTxId,
        tag: guardianTxId,
        lvl: 2,
        bypass: 0,
        toggle: false,
        theme: '4.1.0',
        redirect_uri: window.location.href,
        success: (data: any) => void window.anyidAdaptor?.success?.(data),
        fail: (err: any) => {
          console.error(tRef.current('certifySelfFailed'), err)
          setIsLegalGuardCertified(false)
          alert(tRef.current('certifySelfFailedReminder'))
        },
        log: (data: any) => {
          console.log('============================ ' + tRef.current('anyIdLog') + ' [GUARDIAN] ============================', data)
        },
      })

      const markRenderedOnce = (): boolean => {
        if (!isApplicantAnyIdDomReady(anchor)) return false
        setIsGuardianAnyIdRendered(true)
        return true
      }

      if (markRenderedOnce()) return

      const observer = new MutationObserver(() => {
        if (markRenderedOnce()) {
          observer.disconnect()
        }
      })
      observer.observe(anchor, { childList: true, subtree: true })
      guardianRenderObserverDisconnectRef.current = () => observer.disconnect()
    }

    const mount = getGuardianAnyIdMountElement()
    if (mount) {
      runGuardianLoad(mount)
      return
    }

    console.warn('[LegalGuardAgr] guardian phase: 법정대리인 #anyidc not found, retry next frame')
    const raf = requestAnimationFrame(() => {
      const m = getGuardianAnyIdMountElement()
      if (m && !guardianLoadModuleCalledRef.current) runGuardianLoad(m)
    })
    return () => {
      cancelAnimationFrame(raf)
      guardianRenderObserverDisconnectRef.current?.()
      guardianRenderObserverDisconnectRef.current = null
    }
  }, [anyIdReady, guardianPhase]);

  // 이름 유효성 검사 (한글과 영문만, 2-30자)
  const validateName = (name: string): string => {
    if (!name || name.trim().length === 0) {
      return t('namePlaceholder');
    }
    const trimmed = name.trim()
    if (trimmed.length < 2 || trimmed.length > 30) {
      return t('nameTwoCharacters');
    }
    // 한글과 영문만 허용
    const namePattern = /^[가-힣a-zA-Z\s]+$/;
    if (!namePattern.test(trimmed)) {
      return t('nameOnlyKoreanAndEnglish');
    }
    return '';
  }

  // 생년월일 유효성 검사 (숫자만, 8자리)
  const validateBirthDate = (birthDate: string): string => {
    if (!birthDate || birthDate.trim().length === 0) {
      return t('birthDateError');
    }
    const trimmed = birthDate.trim()
    if (trimmed.length !== 8) {
      return t('birthDateError');
    }
    // 숫자만 허용
    const numberPattern = /^\d+$/
    if (!numberPattern.test(trimmed)) {
      return t('birthDateError');
    }
    return ''
  }

  // 휴대전화번호 유효성 검사 (숫자만, 11자리 또는 12자리)
  const validatePhone = (phone: string): string => {
    if (!phone || phone.trim().length === 0) {
      return t('phoneError');
    }
    const trimmed = phone.trim()
    // 숫자만 허용
    const numberPattern = /^\d+$/;
    if (!numberPattern.test(trimmed)) {
      return t('phoneError');
    }
    // 10자리 이하 또는 13자리 이상이면 오류
    if (trimmed.length <= 10 || trimmed.length >= 13) {
      return t('phoneError');
    }
    return '';
  }

  // 입력 필드 변경 핸들러
  const handleChange = (field: string, value: string) => {
    setLegalGuardFormData(prev => ({ ...prev, [field]: value }));
    
    // 실시간 유효성 검사
    let error = '';
    if (field === 'userName') {
      error = validateName(value);
    } else if (field === 'birthDate') {
      // 숫자만 입력 허용
      const numericValue = value.replace(/[^0-9]/g, '')
      if (numericValue !== value) {
        setLegalGuardFormData(prev => ({ ...prev, [field]: numericValue }));
      }
      error = validateBirthDate(numericValue);
    } else if (field === 'phone') {
      // 숫자만 입력 허용
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue !== value) {
        setLegalGuardFormData(prev => ({ ...prev, [field]: numericValue }));
      }
      error = validatePhone(numericValue);
    } else if (field === 'parentName') {
      error = validateName(value);
    } else if (field === 'parentPhone') {
      // 숫자만 입력 허용
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue !== value) {
        setLegalGuardFormData(prev => ({ ...prev, [field]: numericValue }));
      }
      error = validatePhone(numericValue);
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  }

  // 생년월일 입력 제한 (8자리)
  const handleBirthDateChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 8);
    handleChange('birthDate', numericValue);
  }

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const userNameError = validateName(legalGuardFormData.userName);
    if (userNameError) newErrors.userName = userNameError;

    const birthDateError = validateBirthDate(legalGuardFormData.birthDate);
    if (birthDateError) newErrors.birthDate = birthDateError;

    const phoneError = validatePhone(legalGuardFormData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const parentNameError = validateName(legalGuardFormData.parentName);
    if (parentNameError) newErrors.parentName = parentNameError;

    if (!legalGuardFormData.relationship || legalGuardFormData.relationship === '') {
      newErrors.relationship = t('selectRelationship');
    }

    const parentPhoneError = validatePhone(legalGuardFormData.parentPhone);
    if (parentPhoneError) newErrors.parentPhone = parentPhoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // 다음단계 버튼 클릭 핸들러
  const handleNextStep = () => {
    if (!validateForm()) {
      return;
    }

    if (isProduction && (!isApplicantCertified || !isLegalGuardCertified)) {
      openModal(t('legalGuardCertifyComplete'));
      return;
    }

    // legalGuardFormData를 sessionStorage에 저장 (뒤로가기 시 유지)
    try {
      sessionStorage.setItem('legalGuardFormData', JSON.stringify(legalGuardFormData));
    } catch (error) {
      console.error('Failed to save form data to storage:', error);
    }

    // 개발환경에서는 ci가 없어도 다음 단계로 진행할 수 있음.
    if (ci || !isProduction) {
      navigate('/pp/ko/auth/SignUpMbrInfo', {
        state: {
          steps,
          legalGuardFormData,
          ci: ci ?? '',
        },
      });
      return;
    }
  }

  // 취소하기 버튼 클릭 핸들러 (만 14세 미만 회원가입 약관동의 페이지로 이동)
  const handleCancel = () => {
    navigate('/pp/ko/auth/JuniorSignUpAgrTrms', { state: { steps, cancelled: true, ci } });
  }

  // 다음단계 버튼 활성화 조건
  const isNextStepEnabled = useMemo(() => {
    // 실제 에러 메시지가 있는지 확인 (빈 문자열은 에러가 아님)
    const hasErrors = Object.values(errors).some(error => error && error.trim() !== '');
    
    const isFormValid =
      legalGuardFormData.userName.trim().length >= 2 &&
      legalGuardFormData.birthDate.trim().length === 8 &&
      legalGuardFormData.phone.trim().length >= 11 &&
      legalGuardFormData.phone.trim().length <= 12 &&
      legalGuardFormData.parentName.trim().length >= 2 &&
      legalGuardFormData.relationship !== '' &&
      legalGuardFormData.parentPhone.trim().length >= 11 &&
      legalGuardFormData.parentPhone.trim().length <= 12 &&
      !hasErrors &&
      (!isProduction || (isApplicantCertified && isLegalGuardCertified))

    // 디버깅용 로그 (개발 환경에서만)
    // if (import.meta.env.DEV) {
    //   console.log('isNextStepEnabled 체크:', {
    //     userName: legalGuardFormData.userName.trim().length >= 2,
    //     birthDate: legalGuardFormData.birthDate.trim().length === 8,
    //     phone: legalGuardFormData.phone.trim().length >= 11 && legalGuardFormData.phone.trim().length <= 12,
    //     parentName: legalGuardFormData.parentName.trim().length >= 2,
    //     relationship: legalGuardFormData.relationship !== '',
    //     parentPhone: legalGuardFormData.parentPhone.trim().length >= 11 && legalGuardFormData.parentPhone.trim().length <= 12,
    //     hasErrors,
    //     isLegalGuardCertified,
    //     errors
    //   });
    // }

    return isFormValid;
  }, [legalGuardFormData, errors, isLegalGuardCertified, isApplicantCertified]);

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
                    
                    {/* 신청인 (만14세 미만) 정보 */}
                    <Box className="bordered-box">
                      <Box component="form" noValidate>
                        <Box className="form-group-wrap">
                          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
                            <Box component="h3" className="sub-title mb5">
                              {t('applyJuniorInfo')}
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: '5px' }}>
                              {t('minorCertifyReminderDescription')}
                            </Typography>
                          </Box>

                          {/* 신청인(만 14세 미만) 본인인증 Any-ID 영역 - 화면 로딩과 함께 표시 */}
                          {showAnyIdArea && (
                            isProduction ? (
                              <Box sx={{ mt: 2 }} data-legal-guard-anyid="applicant">
                                <div id={guardianPhase ? 'anyidc_applicant_done' : 'anyidc'} className="anyidc" />
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
                            )
                          )}

                          <Box className="flex-container flex-half">
                            {/* 이름 (필수) */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="userName" className="label">
                                {t('name')}
                                <Box component="span" className="required" aria-label={t("requiredInput")}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="userName"
                                value={legalGuardFormData.userName}
                                onChange={(e) => handleChange('userName', e.target.value)}
                                placeholder={t('namePlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.userName}
                                helperText={errors.userName || ''}
                                slotProps={{
                                  htmlInput: {
                                    readOnly: true,
                                    'aria-required': 'true',
                                    'aria-describedby': errors.userName ? 'userName-alert' : undefined,
                                    maxLength: 30,
                                  },
                                  formHelperText: {
                                    id: 'userName-alert',
                                    className: errors.userName ? 'error-alert' : '',
                                    role: errors.userName ? 'alert' : undefined,
                                    'aria-live': errors.userName ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                            {/* 생년월일 (필수) */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="birthDate" className="label">
                                {t('birthDate')}
                                <Box component="span" className="required" aria-label={t("requiredInput")}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="birthDate"
                                value={legalGuardFormData.birthDate}
                                onChange={(e) => handleBirthDateChange(e.target.value)}
                                placeholder={t('birthDatePlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.birthDate}
                                helperText={errors.birthDate || ''}
                                slotProps={{
                                  htmlInput: {
                                    readOnly: true,
                                    'aria-required': 'true',
                                    'aria-describedby': errors.birthDate ? 'birthDate-alert' : undefined,
                                    maxLength: 8,
                                    inputMode: 'numeric',
                                  },
                                  formHelperText: {
                                    id: 'birthDate-alert',
                                    className: errors.birthDate ? 'error-alert' : '',
                                    role: errors.birthDate ? 'alert' : undefined,
                                    'aria-live': errors.birthDate ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                          </Box>

                          {/* 휴대전화번호 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="phone" className="label">
                              {t('phone')}
                              <Box component="span" className="required" aria-label={t("requiredInput")}>({t('required')})</Box>
                            </Typography>
                            <TextField
                              id="phone"
                              value={legalGuardFormData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              placeholder={t('phonePlaceholder')}
                              size="large"
                              fullWidth
                              error={!!errors.phone}
                              helperText={errors.phone || ''}
                              slotProps={{
                                htmlInput: {
                                  readOnly: true,
                                  'aria-required': 'true',
                                  'aria-describedby': errors.phone ? 'phone-alert' : undefined,
                                  type: 'tel',
                                  inputMode: 'numeric',
                                  maxLength: 13,
                                },
                                formHelperText: {
                                  id: 'phone-alert',
                                  className: errors.phone ? 'error-alert' : '',
                                  role: errors.phone ? 'alert' : undefined,
                                  'aria-live': errors.phone ? 'polite' : undefined,
                                },
                              }}
                            />
                          </Box>

                          {/* 법정 대리인 정보 */}
                          <Box component="h3" className="sub-title">
                            {t('legalGuardInfo')}
                          </Box>
                          {/* 화면 로딩과 함께 Any-ID 영역 표시 (버튼 클릭과 무관) */}
                          {isProduction ? (
                            <Box sx={{ mt: 2 }} data-legal-guard-anyid="guardian">
                              <div id={guardianPhase ? 'anyidc' : 'anyidcGuardian'} className="anyidc" />
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
                          <Box className="flex-container flex-half">
                            {/* 법정대리인 이름 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="parentName" className="label">
                                {t('name')}
                                <Box component="span" className="required" aria-label={t("requiredInput")}>({t('required')})</Box>
                              </Typography>
                              <TextField
                                id="parentName"
                                value={legalGuardFormData.parentName}
                                onChange={(e) => handleChange('parentName', e.target.value)}
                                placeholder={t('namePlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.parentName}
                                helperText={errors.parentName || ''}
                                slotProps={{
                                  htmlInput: {
                                    readOnly: true,
                                    'aria-required': 'true',
                                    'aria-describedby': errors.parentName ? 'parentName-alert' : undefined,
                                    maxLength: 30,
                                  },
                                  formHelperText: {
                                    id: 'parentName-alert',
                                    className: errors.parentName ? 'error-alert' : '',
                                    role: errors.parentName ? 'alert' : undefined,
                                    'aria-live': errors.parentName ? 'polite' : undefined,
                                  },
                                }}
                              />
                            </Box>
                            {/* 신청인과의 관계 */}
                            <Box className="form-item">
                              <Typography component="label" htmlFor="relationship" className="label">
                                신청인과의 관계
                                <Box component="span" className="required" aria-label={t("requiredInput")}>({t('required')})</Box>
                              </Typography>
                              <FormControl fullWidth size="large" error={!!errors.relationship}>
                                <InputLabel id="relationship-label">선택</InputLabel>
                                <Select
                                  labelId="relationship-label"
                                  id="relationship"
                                  value={legalGuardFormData.relationship}
                                  onChange={(e) => handleChange('relationship', e.target.value)}
                                  label="선택"
                                  inputProps={{
                                    'aria-required': 'true',
                                    'aria-describedby': errors.relationship ? 'relationship-alert' : undefined,
                                  }}
                                  size="large"
                                >
                                  <MenuItem value="">선택</MenuItem>
                                  <MenuItem value="부">부</MenuItem>
                                  <MenuItem value="모">모</MenuItem>
                                  <MenuItem value="조부">조부</MenuItem>
                                  <MenuItem value="조모">조모</MenuItem>
                                  <MenuItem value="친척">친척</MenuItem>
                                  <MenuItem value="기타">기타</MenuItem>
                                </Select>
                                {errors.relationship && (
                                  <Typography
                                    id="relationship-alert"
                                    className="error-alert"
                                    role="alert"
                                    aria-live="polite"
                                    sx={{ mt: 0.5, fontSize: '0.75rem', color: 'error.main' }}
                                  >
                                    {errors.relationship}
                                  </Typography>
                                )}
                              </FormControl>
                            </Box>
                          </Box>

                          {/* 법정대리인 휴대전화번호 */}
                          <Box className="form-item">
                            <Typography component="label" htmlFor="parentPhone" className="label">
                              {t('phone')}
                              <Box component="span" className="required" aria-label={t("requiredInput")}>({t('required')})</Box>
                            </Typography>
                            <Stack direction="row" spacing={1} className="input-with-btn">
                              <TextField
                                id="parentPhone"
                                value={legalGuardFormData.parentPhone}
                                onChange={(e) => handleChange('parentPhone', e.target.value)}
                                placeholder={t('phonePlaceholder')}
                                size="large"
                                fullWidth
                                error={!!errors.parentPhone}
                                helperText={errors.parentPhone || ''}
                                slotProps={{
                                  htmlInput: {
                                    readOnly: true,
                                    'aria-required': 'true',
                                    'aria-describedby': errors.parentPhone ? 'parentPhone-alert' : undefined,
                                    type: 'tel',
                                    inputMode: 'numeric',
                                    maxLength: 13,
                                  },
                                  formHelperText: {
                                    id: 'parentPhone-alert',
                                    className: errors.parentPhone ? 'error-alert' : '',
                                    role: errors.parentPhone ? 'alert' : undefined,
                                    'aria-live': errors.parentPhone ? 'polite' : undefined,
                                  },
                                }}
                              />
                              {/* 본인 인증 버튼 제거: Any-ID 모듈은 로딩 시 자동 표시/인증 */}
                            </Stack>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* 하단 버튼 영역 */}
                    <Box className="btn-group between">
                      <Button variant="outlined02" size="large" onClick={handleCancel}>{t('cancel')}</Button>
                      <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleNextStep}
                        disabled={!isNextStepEnabled}
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
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle component="div" className="modal-title">
          <h2>{t('alert')}</h2>
          <IconButton aria-label={t('close')} onClick={closeModal} className="btn-modal-close">
            <CloseIcon aria-hidden="true" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="modal-content">
          <Typography variant="body1">{modalMessage}</Typography>
        </DialogContent>
        <DialogActions className="modal-footer">
          <Button variant="contained" onClick={closeModal}>{t('confirm')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
