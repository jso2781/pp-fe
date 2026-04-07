/**
 * 화면ID: KIDS-PP-US-JM-07
 * 화면명: 만14세미만가입 법정대리인동의
 * 화면경로: /ko/auth/LegalGuardAgr
 * 화면설명: 만 14세 미만 회원가입 전용. 신청인·법정대리인 Any-ID 본인인증을 동일 화면에서 처리하며, 둘 다 통과해야 다음 단계로 진행.
 *
 * ## Any-ID iframe 개발
 */
import React, { useMemo, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material'
import DepsLocation from '@/components/common/DepsLocation'
import { getSignUpSteps } from '@/pages/ko/auth/signUpSteps'
import {
  ANYID_EMBED_PARENT_SOURCE,
  ANYID_EMBED_PROTOCOL_V,
  ANYID_EMBED_CHILD_SOURCE,
  isTrustedEmbedOrigin,
  type AnyidEmbedChildToParent,
  type AnyidEmbedInitParams,
  type AnyidEmbedParentToChild,
} from '@/lib/anyid/anyidEmbedProtocol'
import { shouldLoadAnyIdSdk } from '@/lib/anyid/ensureAnyIdAssets'
import { useAppDispatch } from '@/store/hooks'
import { getAnyIdUserInfoFromSsob } from '@/features/auth/AnyIdThunks'
import type { AnyIdUserInfoFromSsobRVO } from '@/features/auth/AnyIdTypes'
import { resolveCiFromSignUpFlowState, type SignUpFlowUserInfoState } from '@/pages/ko/auth/signUpFlowState'
import { useDialog } from '@/contexts/DialogContext';

/** production 이거나, 개발 시 `VITE_SHOW_ANYID_AREA=true` 로 iframe·postMessage 활성화 (`shouldLoadAnyIdSdk`) */
const showAnyIdArea = shouldLoadAnyIdSdk()

/**
 * `public` 자산 경로 — 반드시 Vite `base`(`import.meta.env.BASE_URL`, 예: `/pp/`)와 맞출 것.
 * `/anyid-embed.html` 처럼 루트만 쓰면 `http://localhost:5173/pp/...` 앱에서 iframe·cfg 가 404 나고 INIT 이 실패한다.
 */
const anyIdPublicBase = `${(import.meta.env.BASE_URL || '/').replace(/\/+$/, '')}/`
const ANYID_EMBED_PAGE = `${anyIdPublicBase}anyid-embed.html`
const ANYID_CONFIG_JSON_URL = `${anyIdPublicBase}config/config.anyidc.json`

// 법정대리인동의 화면의 입력 데이터 JSON 구조 (LegalGuardFormData 타입)
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

/** 생년월일 정규화 함수
 * - 6자리 숫자(yymmdd)를 8자리 숫자(yyyyMMdd)로 변환
 */
const normalizeBirthDate = (input: string): string => {
  const value = String(input).replace(/\D/g, "");

  if (value.length !== 6) {
    return value;
  }

  const yy = parseInt(value.slice(0, 2), 10);
  const mmdd = value.slice(2);

  // 기준:
  // 00 ~ 현재 연도(끝 2자리) => 2000년대
  // 그 외 => 1900년대
  const currentYearYY = new Date().getFullYear() % 100;
  const fullYear = yy <= currentYearYY ? `20${value.slice(0, 2)}` : `19${value.slice(0, 2)}`;

  return fullYear + mmdd;
}

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

export default function LegalGuardAgr() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const currentStep = 2;
  const { lang } = useParams<{ lang: string }>();
  const { showAlert } = useDialog();

  /** Any-ID는 `public/anyid-embed.html` iframe에서만 로드되며, 성공/실패는 postMessage로만 처리한다. */
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

  const signUpFlow = location.state as SignUpFlowUserInfoState | null
  const initialCi = resolveCiFromSignUpFlowState(signUpFlow) ?? ''
  const [ci, setCi] = useState<string>(initialCi)
  console.log('LegalGuardAgr ci(userInfoFromSsob.ci)=', ci)
  
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

  /** 만 14세 미만 전용 화면 — 일반 가입(signUpIsJunior: false)으로 잘못 진입 시에만 일반 약관으로 이동 */
  useEffect(() => {
    if (signUpFlow?.signUpIsJunior === false) {
      navigate('/pp/ko/auth/GeneralSignUpAgrTrms', {
        replace: true,
        state: {
          userInfoFromSsob: signUpFlow.userInfoFromSsob,
          signUpIsJunior: false,
        },
      })
    }
  }, [signUpFlow?.signUpIsJunior, signUpFlow?.userInfoFromSsob, navigate])

  /** Any-ID INIT·콜백 식별용 txId/tag (신청인·법정대리인 각각 고유 문자열). processAnyIdSuccess 에서 어느 iframe 결과인지 구분 */
  const applicantTagRef = useRef<string>('')
  const guardianTagRef = useRef<string>('')
  /** 동일 인증 영역에서 success 가 중복 호출될 수 있어, 한 번만 폼 반영·상태 갱신하도록 막음 */
  const applicantSuccessHandledRef = useRef(false)
  const guardianSuccessHandledRef = useRef(false)
  /** 신청인 Any-ID 복호화 결과 — 다음 화면(SignUpMbrInfo)에 `userInfoFromSsob.ci` 전달용 (라우터 state만으로는 누락될 수 있음) */
  const applicantUserInfoFromSsobRef = useRef<AnyIdUserInfoFromSsobRVO | null>(null)
  /** SDK log 이벤트가 폴링처럼 반복될 때 동일 키를 짧은 간격으로만 1회 출력하기 위한 디듀프 맵 */
  const anyIdLogDedupRef = useRef<Map<string, number>>(new Map())

  /** postMessage 수신 시 event.source 가 어느 iframe 인지 구분할 때 사용 */
  const applicantIframeRef = useRef<HTMLIFrameElement | null>(null)
  const guardianIframeRef = useRef<HTMLIFrameElement | null>(null)

  /** 자식이 READY 보낸 뒤 부모가 INIT(LOAD_MODULE 옵션)을 1회만 보냈는지 */
  const applicantInitSentRef = useRef(false)
  const guardianInitSentRef = useRef(false)

  const logAnyIdEvent = useCallback((phase: 'APPLICANT' | 'GUARDIAN', data: any) => {
    const tx = (data?.txId ?? data?.tag ?? '') as string
    const module = (data?.module ?? '') as string
    const step = (data?.step ?? '') as string
    const group = (data?.group ?? '') as string
    const status = (data?.status ?? '') as string

    // esign-relay 는 SDK 폴링성 로그가 매우 많아 동일 이벤트를 짧은 시간에 반복 출력하지 않는다.
    const dedupKey = `${phase}|${tx}|${module}|${step}|${group}|${status}`
    const now = Date.now()
    const prev = anyIdLogDedupRef.current.get(dedupKey) ?? 0
    const suppressWindowMs = module === 'esign-relay' ? 2000 : 300
    if (now - prev < suppressWindowMs) return
    anyIdLogDedupRef.current.set(dedupKey, now)

    if (anyIdLogDedupRef.current.size > 400) {
      const threshold = now - 60_000
      for (const [k, ts] of anyIdLogDedupRef.current) {
        if (ts < threshold) anyIdLogDedupRef.current.delete(k)
      }
    }

    const compact = {
      txId: tx,
      module,
      step,
      group,
      status,
      vendor: data?.vendor,
      reqLvl: data?.reqLvl,
      type: data?.type,
    }
    console.log(`============================ ${tRef.current('anyIdLog')} [${phase}] ============================`, compact)
  }, [])

  /** `public/anyid-embed.html` iframe → postMessage SUCCESS 페이로드 처리 */
  const processAnyIdSuccess = useCallback(
    async (data: any) => {
      const tag = (data?.tag ?? data?.txId ?? '') as string

      try {
        // 신청인 인증 success
        if(tag && tag === applicantTagRef.current){
          if(applicantSuccessHandledRef.current)return;

          applicantSuccessHandledRef.current = true;
          console.log('[LegalGuardAgr] applicant success handled once. tag=', tag);

          const userInfoFromSsob = (await dispatch(getAnyIdUserInfoFromSsob({ ssob: data?.ssob, tag, isCheckMbr: true })).unwrap()) as AnyIdUserInfoFromSsobRVO;

          // 이미 가입된 사용자인 경우, 알림 모달 표시 후 종료
          if(userInfoFromSsob.existMbrInfo && userInfoFromSsob.existMbrInfo === 'Y'){
            showAlert(t('alreadyRegistered'));
            return;
          }
          else{
            const under14 = isUnder14ByBrdt(userInfoFromSsob?.brdt);

            // 14세 미만이 아닌 경우, 알림 모달 표시 후 종료
            if(under14 === false){
              setIsApplicantCertified(false);
              setCi('');
              openModal(t('minorCertifyReminder'));
              return;
            }

            // 14세 미만이거나 판단 불가인 경우, 입력값 반영
            if(under14 === true || under14 === null){
              applicantUserInfoFromSsobRef.current = userInfoFromSsob;

              setLegalGuardFormData((prev) => ({
                ...prev,
                userName: userInfoFromSsob?.name ?? prev.userName,
                birthDate: normalizeBirthDate(userInfoFromSsob?.brdt ?? prev.birthDate),
                phone: userInfoFromSsob?.phone ?? prev.phone,
              }));
    
              const ciValue = userInfoFromSsob.ci;
              setCi(ciValue ?? '');
              setIsApplicantCertified(true);
              return;
            }
          }
        }

        // 법정대리인 인증 success
        if (tag && tag === guardianTagRef.current){
          if(guardianSuccessHandledRef.current)return;

          guardianSuccessHandledRef.current = true;
          console.log('[LegalGuardAgr] guardian success handled once. tag=', tag);

          const userInfoFromSsob = (await dispatch(getAnyIdUserInfoFromSsob({ ssob: data?.ssob, tag, isCheckMbr: false })).unwrap()) as AnyIdUserInfoFromSsobRVO;

          setLegalGuardFormData((prev) => ({
            ...prev,
            parentName: userInfoFromSsob?.name ?? prev.parentName,
            parentPhone: userInfoFromSsob?.phone ?? prev.parentPhone,
            ciFromGuardAgr: userInfoFromSsob?.ci ?? prev.ciFromGuardAgr,
          }));

          setIsLegalGuardCertified(true);
          return;
        }
      }catch(error){
        console.error('[LegalGuardAgr] anyid success handler error=', error);
      }
    },
    [dispatch]
  )

  // 만 14세 미만 플로우 steps (state 없으면 동일 단계 배열로 보강)
  const steps = useMemo(() => {
    const state = location.state as { steps?: ReturnType<typeof getSignUpSteps> } | null;
    if (state?.steps && Array.isArray(state.steps)) {
      return state.steps;
    }
    return getSignUpSteps(t);
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

  // txId/tag 는 iframe READY 이전에 준비 (부모 INIT 에 사용). Any-ID 번들은 `public/anyid-embed.html` 이 로드.
  useLayoutEffect(() => {
    if (!showAnyIdArea) return
    const seed = Date.now()
    applicantTagRef.current = `legal-guard-applicant-${seed}`
    guardianTagRef.current = `legal-guard-guardian-${seed}`
    applicantSuccessHandledRef.current = false
    guardianSuccessHandledRef.current = false
    applicantInitSentRef.current = false
    guardianInitSentRef.current = false
  }, [])

  /**
   * iframe(`anyid-embed.html`) ↔ 부모 창 `postMessage` 브리지.
   * - 자식이 스크립트 로드 후 READY → 부모가 INIT(LOAD_MODULE 인자) 전달
   * - 이후 LOG / SUCCESS / FAIL / ERROR 는 프로토콜(`anyidEmbedProtocol`)대로 처리
   * - 수신 시 `event.origin`·`event.source` 로 위조·다른 창 메시지 차단
   */
  useEffect(() => {
    if (!showAnyIdArea) return

    /**
     * 자식 iframe 에 보낼 window.AnyidC.LOAD_MODULE 실행시 필요한 초기화 파라메터들을 생성함.
     * `tag`/`txId`는 신청인·법정대리인 구분 및 서버 연동용으로 동일 값 사용.
     */
    const runInitForAnyIdModule = (tag: string): AnyidEmbedInitParams => ({
      cfg: ANYID_CONFIG_JSON_URL,
      txId: tag,
      tag,
      lvl: 2,
      /**
       * SDK(`app.js`): `bypass === 0` 이고 theme 이 4.1.x 이면 `#anyidtoggle`·`#anyidinfo`(사용자 등록/관리)를
       * 항상 마운트한다. `toggle: false` 는 스위치 "미사용" 상태만 줄 뿐 행 전체를 숨기지 않는다.
       * 통합로그인 없이 본인인증만 쓰려면 `bypass: 1`(프로젝트 내 SSO 비연동 흐름과 동일).
       */
      bypass: 1,
      toggle: false,
      /** 토글 행 `toggleSwitch.show` — `bypass:1` 과 함께 이중으로 막음 */
      show: false,
      theme: '4.1.0',
      /** 인증 완료 후 돌아올 부모 페이지 URL (동일 탭 기준) */
      redirect_uri: window.location.href,
    })

    /** 지정 iframe 창에만 `INIT` 메시지 전송. `targetOrigin`은 동일 출처로 고정해 누설 방지 */
    const sendInit = (target: Window, payload: AnyidEmbedInitParams) => {
      const msg: AnyidEmbedParentToChild = {
        source: ANYID_EMBED_PARENT_SOURCE,
        v: ANYID_EMBED_PROTOCOL_V,
        type: 'INIT',
        payload,
      }
      target.postMessage(msg, window.location.origin)
    }

    /** `window` 로 도착하는 모든 `message` 수신 핸들러 */
    const onMessage = (event: MessageEvent) => {
      // 다른 도메인에서 온 메시지 무시
      if (!isTrustedEmbedOrigin(event.origin, window.location.origin)) return
      const d = event.data as AnyidEmbedChildToParent | undefined
      // 우리 프로토콜이 아닌 일반 postMessage(타 라이브러리 등) 무시
      if (!d || d.source !== ANYID_EMBED_CHILD_SOURCE || d.v !== ANYID_EMBED_PROTOCOL_V) return

      const src = event.source as Window | null
      const applicantWin = applicantIframeRef.current?.contentWindow ?? null
      const guardianWin = guardianIframeRef.current?.contentWindow ?? null
      const fromApplicant = src === applicantWin
      const fromGuardian = src === guardianWin
      // 신청인/법정대리인 iframe 이 아닌 source(예: 팝업)면 무시
      if (!fromApplicant && !fromGuardian) return

      // 자식이 manifest·vendor·app 로드 후 AnyidC 준비 완료 → 그때 INIT 1회만 송신
      if (d.type === 'READY') {
        if (fromApplicant && !applicantInitSentRef.current && applicantTagRef.current) {
          applicantInitSentRef.current = true
          sendInit(src!, runInitForAnyIdModule(applicantTagRef.current))
        }
        if (fromGuardian && !guardianInitSentRef.current && guardianTagRef.current) {
          guardianInitSentRef.current = true
          sendInit(src!, runInitForAnyIdModule(guardianTagRef.current))
        }
        return
      }

      // SDK 내부 단계 로그(디버그 콘솔용, 과다 출력은 logAnyIdEvent 쪽에서 디듀프)
      if (d.type === 'LOG') {
        const payload = d.payload as Record<string, unknown> | undefined
        if (d.role === 'applicant') {
          logAnyIdEvent('APPLICANT', payload)
        } else {
          logAnyIdEvent('GUARDIAN', payload)
        }
        return
      }

      // 본인인증 성공 → SSOB 등으로 사용자 정보 조회 후 폼 반영
      if (d.type === 'SUCCESS') {
        void processAnyIdSuccess(d.payload)
        return
      }

      // LOAD_MODULE fail 콜백과 동일: 인증 실패 시 완료 플래그 해제 + 사용자 알림
      if (d.type === 'FAIL') {
        console.error(tRef.current('certifySelfFailed'), d.payload)
        if (d.role === 'applicant') {
          setIsApplicantCertified(false)
        } else {
          setIsLegalGuardCertified(false)
        }
        alert(tRef.current('certifySelfFailedReminder'))
        return
      }

      // 임베드 HTML 내 스크립트 로드 실패·AnyidC 타임아웃 등
      if (d.type === 'ERROR') {
        console.error('[LegalGuardAgr] anyid-embed:', d.message)
        alert(tRef.current('anyIdAssetsLoadFailed'))
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [logAnyIdEvent, processAnyIdSuccess])

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

    if (showAnyIdArea && (!isApplicantCertified || !isLegalGuardCertified)) {
      // 법정 대리인 본인인증을 완료해주세요.
      openModal(t('legalGuardCertifyComplete'));
      return;
    }

    // legalGuardFormData를 sessionStorage에 저장 (뒤로가기 시 유지)
    try {
      sessionStorage.setItem('legalGuardFormData', JSON.stringify(legalGuardFormData));
    } catch (error) {
      console.error('Failed to save form data to storage:', error);
    }

    const mergedUserInfoFromSsob: AnyIdUserInfoFromSsobRVO | undefined = (() => {
      const base = signUpFlow?.userInfoFromSsob
      const fromApplicant = applicantUserInfoFromSsobRef.current
      if (!base && !fromApplicant) return undefined
      return {
        ...base,
        ...fromApplicant,
        ci:
          fromApplicant?.ci ??
          base?.ci ??
          (ci.trim() !== '' ? ci : undefined),
      }
    })()

    navigate('/pp/ko/auth/SignUpMbrInfo', {
      state: {
        steps,
        legalGuardFormData,
        userInfoFromSsob: mergedUserInfoFromSsob,
        signUpIsJunior: true,
      },
    });
  }

  // 취소하기 버튼 클릭 핸들러 (만 14세 미만 회원가입 약관동의 페이지로 이동)
  const handleCancel = () => {
    navigate('/pp/ko/auth/JuniorSignUpAgrTrms', {
      state: {
        steps,
        cancelled: true,
        userInfoFromSsob: signUpFlow?.userInfoFromSsob,
        signUpIsJunior: true,
      },
    });
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
      (!showAnyIdArea || (isApplicantCertified && isLegalGuardCertified));

    return isFormValid;
  }, [legalGuardFormData, errors, isLegalGuardCertified, isApplicantCertified, showAnyIdArea]);

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
                          {showAnyIdArea ? (
                              <Box sx={{ mt: 1 }} data-legal-guard-anyid="applicant">
                                <iframe
                                  ref={applicantIframeRef}
                                  src={`${ANYID_EMBED_PAGE}?role=applicant`}
                                  title={`${t('applyJuniorInfo')} Any-ID`}
                                  style={{ width: '100%', minHeight: 170, border: 'none', display: 'block' }}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  mt: 1,
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
                                <Typography color="text.secondary">
                                  Any-ID iframe 은 비활성입니다. 로컬에서 쓰려면 `.env.development` 에
                                  `VITE_SHOW_ANYID_AREA=true` 를 추가하세요.
                                </Typography>
                              </Box>
                            )
                          }

                          <Box className="flex-container flex-half" sx={{ mt: 1 }}>
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
                          <Box component="h3" className="sub-title mb0 mt40">
                            {t('legalGuardInfo')}
                          </Box>
                          {/* 화면 로딩과 함께 Any-ID 영역 표시 (버튼 클릭과 무관) */}
                          {showAnyIdArea ? (
                            <Box sx={{ mt: 1 }} data-legal-guard-anyid="guardian">
                              <iframe
                                ref={guardianIframeRef}
                                src={`${ANYID_EMBED_PAGE}?role=guardian`}
                                title={`${t('legalGuardInfo')} Any-ID`}
                                style={{ width: '100%', minHeight: 170, border: 'none', display: 'block' }}
                              />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                mt: 1,
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
                              <Typography color="text.secondary">
                                Any-ID iframe 은 비활성입니다. `VITE_SHOW_ANYID_AREA=true` 를 추가하세요.
                              </Typography>
                            </Box>
                          )}
                          <Box className="flex-container flex-half" sx={{ mt: 1 }}>
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
