import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// MUI 컴포넌트
import { 
  Box, Button, IconButton, Stack, Typography, Divider, 
  Drawer, Link as MuiLink, Dialog, DialogActions, DialogContent, 
  DialogTitle,
  useTheme, useMediaQuery 
} from '@mui/material';

// MUI 아이콘
import { Language, Menu as MenuIcon, Close, ExpandMore, OpenInNew, ExpandLess } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

import SkipNavigation from './SkipNavigation';
import { getLangFromPathname, langPath } from '@/routes/lang';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMenuList } from '@/features/auth/MenuThunks';
import { clearMenuCache } from '@/features/auth/MenuSlice';
import { useAuth } from '@/contexts/AuthContext';
import { LOCALE_KEY } from '@/i18n/i18n';
import { loginExtend } from '@/features/auth/AuthThunks';

import type { MenuRVO } from '@/features/auth/MenuTypes';
import type { LoginExtendRVO } from '@/features/auth/AuthTypes';

/**
 * 사이트맵 아이템 타입 정의
 */
type SitemapLinkItem = {
  key: string
  label: string
  href?: string
  internal?: boolean
  children?: SitemapLinkItem[]
}

type SitemapSection = {
  key: string
  title: string
  items: SitemapLinkItem[]
}

/**
 * 사이트맵 섹션 데이터 (기존 프로젝트 참조)
 */
const SITEMAP_SECTIONS: SitemapSection[] = [
  {
    key: 'main-tasks',
    title: '주요 업무',
    items: [
      {
        key: 'safety-report',
        label: '의약품 이상사례보고',
        children: [
          {
            key: 'safety-report-online1',
            label: '이상사례보고',
            children: [
              {
                key: 'safety-report-online11',
                label: '이상사례 보고란?',
                href: '/safety/report1',
                internal: true,
              },
              {
                key: 'safety-report-online12',
                label: 'KAERS란?',
                href: '/safety/report2',
                internal: true,
              },
            ],
          },
          {
            key: 'safety-report-online2',
            label: '온라인 보고',
            children: [
              {
                key: 'safety-report-online21',
                label: '의약품이상사례',
                href: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReport',
              },
              {
                key: 'safety-report-online22',
                label: '의약외품(생리대 등)',
                href: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReportQuasiDrug',
              },
            ],
          },
          {
            key: 'safety-report-offline',
            label: '오프라인 보고',
            href: '/safety/report5',
            internal: true,
          },
          {
            key: 'safety-report-archive',
            label: '이상사례보고자료실',
            href: '/safety/report6',
            internal: true,
          },
          {
            key: 'safety-report-guide',
            label: '온라인보고방법 안내',
            href: '/safety/report7',
            internal: true,
          },
        ],
      },
      {
        key: 'side-effects-report',
        label: '의약품 부작용 보고 자료',
        children: [
          { key: 'side-effects-report1', label: '의약품 부작용 보고1', href: '#' },
          { key: 'side-effects-report2', label: '의약품 부작용 보고2', href: '#' },
          { key: 'side-effects-report3', label: '의약품 부작용 보고3', href: '#' },
        ],
      },
      {
        key: 'safety-mgmt',
        label: '의약품 안전관리',
        children: [
          { key: 'safety-terms', label: '약물감시용어', href: '#' },
          { key: 'safety-causality', label: '부작용 인과관계규명', href: '#' },
          { key: 'safety-related', label: '유관기관', href: '#' },
        ],
      },
      {
        key: 'pharma-linkage-analysis',
        label: '의약품.의료정보.연계분석',
        children: [
          { key: 'pharma-linkage-analysis1', label: '의약품.의료정보.연계분석1', href: '#' },
          { key: 'pharma-linkage-analysis2', label: '의약품.의료정보.연계분석2', href: '#' },
          { key: 'pharma-linkage-analysis3', label: '의약품.의료정보.연계분석3', href: '#' },
        ],
      },
      {
        key: 'dur',
        label: 'DUR 정보',
        children: [
          { key: 'dur-understand', label: 'DUR 이해', href: '#' },
          {
            key: 'dur-search-room',
            label: 'DUR 정보검색방',
            children: [
              { key: 'dur-search-room1', label: 'DUR 통합검색', href: '#' },
              { key: 'dur-search-room2', label: '병용금기', href: '#' },
              { key: 'dur-search-room3', label: '특정연령대금기', href: '#' },
              { key: 'dur-search-room4', label: '임부금기', href: '#' },
              { key: 'dur-search-room5', label: '효능군중복주의', href: '#' },
              { key: 'dur-search-room6', label: '용량주의', href: '#' },
              { key: 'dur-search-room7', label: '투여기간주의', href: '#' },
              { key: 'dur-search-room8', label: '노인주의', href: '#' },
            ],
          },
          {
            key: 'dur-appropriate-use',
            label: '의약품 적정사용 정보방',
            children: [
              { key: 'dur-appropriate-use1', label: '노인 적정사용정보집', href: '#' },
              { key: 'dur-appropriate-use2', label: '소아 적정사용정보집', href: '#' },
              { key: 'dur-appropriate-use3', label: '임부 적정사용정보집', href: '#' },
              { key: 'dur-appropriate-use4', label: '간질환 적정사용정보집', href: '#' },
              { key: 'dur-appropriate-use5', label: '신질환 적정사용정보집', href: '#' },
            ],
          },
          { key: 'dur-notice', label: 'DUR 게시판', href: '/dur/notice', internal: true },
          { key: 'dur-proposal', label: 'DUR 제안', href: '/dur/proposal', internal: true },
        ],
      },
      {
        key: 'relief',
        label: '부작용 피해구제',
        children: [
          { key: 'relief-system', label: '제도소개', href: '#' },
          { key: 'relief-apply', label: '피해구제 신청', href: '#' },
          { key: 'relief-news', label: '뉴스/소식', href: '#' },
          { key: 'relief-faq', label: '자주하는 질문', href: 'https://nedrug.mfds.go.kr' },
        ],
      },
      {
        key: 'clinical-trial',
        label: '임상시험안전지원',
        children: [
          { key: 'clinical-trial1', label: '임상시험안전지원기관', href: '#' },
          { key: 'clinical-trial2', label: '협약 안내', href: '#' },
          { key: 'clinical-trial3', label: '중앙IRB신청', href: '#' },
          { key: 'clinical-trial4', label: '임상시험헬프데스크', href: '#' },
          { key: 'clinical-trial5', label: '공지사항', href: '#' },
          { key: 'clinical-trial6', label: '자료실', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'open',
    title: '정보공개',
    items: [
      {
        key: 'open-info',
        label: '정보공개',
        children: [
          { key: 'open-info1', label: '업무처리절차', href: '#' },
          { key: 'open-info2', label: '정보공개 청구', href: 'https://open.go.kr' },
          { key: 'open-info3', label: '임직원국외출장', href: '#' },
          { key: 'open-info4', label: '원장 업무추진비 집행내역', href: '#' },
        ],
      },
      { key: 'open-data', label: '공공데이터 개방', href: '#' },
      {
        key: 'open-mgmt',
        label: '경영공시',
        children: [
          { key: 'open-mgmt1', label: '부패행위 징계현황', href: '#' },
          { key: 'open-mgmt2', label: '징계기준', href: '#' },
          { key: 'open-mgmt3', label: '징계현황', href: '#' },
        ],
      },
      { key: 'open-bizname', label: '사업실명제', href: '#' },
    ],
  },
  {
    key: 'notice',
    title: '기관소식',
    items: [
      { key: 'notice-list', label: '공지사항', href: '/notice', internal: true },
      { key: 'notice-jobs', label: '채용게시판', href: '#' },
      { key: 'notice-faq', label: 'FAQ', href: '#' },
      { key: 'notice-petition', label: '국민신문고', href: '#' },
      { key: 'notice-press', label: '보도자료', href: '#' },
      {
        key: 'notice-newsletter',
        label: '뉴스레터',
        children: [
          { key: 'notice-bio-focus', label: '첨단바이오 포커스', href: 'https://ltfu.mfds.go.kr' },
          { key: 'notice-safe-info', label: '마약류 안전정보지', href: '#' },
          { key: 'notice-leaflet', label: '리플릿', href: '#' },
        ],
      },
      { key: 'notice-card', label: '카드뉴스', href: '#' },
      { key: 'notice-video', label: '동영상', href: '#' },
      { key: 'notice-archive', label: '자료실', href: '#' },
    ],
  },
  {
    key: 'about',
    title: '기관소개',
    items: [
      { key: 'about-greeting', label: '기관장 인사말', href: '#' },
      { key: 'about-former', label: '역대 기관장', href: '#' },
      { key: 'about-history', label: '연혁', href: '#' },
      { key: 'about-vision', label: '비전 및 목표', href: '#' },
      { key: 'about-org', label: '조직도', href: '#' },
      { key: 'about-law', label: '설립근거 및 관련법령', href: '#' },
      { key: 'about-charter', label: '고객헌장', href: '#' },
      { key: 'about-news', label: '우리원동정', href: '#' },
      { key: 'about-ci', label: 'CI소개', href: '#' },
      {
        key: 'about-ethics',
        label: '윤리경영',
        children: [{ key: 'about-ethics-clean', label: '클린신고센터', href: '#' }],
      },
      { key: 'about-character', label: '캐릭터소개', href: '#' },
      {
        key: 'about-map',
        label: '오시는 길',
        href: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do',
      },
    ],
  },
] as const

/**
 * 사이트맵 아이템 컴포넌트
 */
function SitemapItem({ item }: { item: SitemapLinkItem }) {
  const location = useLocation()
  const curLang = useMemo(() => getLangFromPathname(location.pathname), [location.pathname])
  const to = useMemo(() => (p: string) => langPath(curLang, p), [curLang])

  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  const internal = item.internal || (typeof item.href === 'string' && item.href.startsWith('/'))

  return (
    <Box sx={{ marginBottom: 1 }}>
      <Box sx={{ fontWeight: 500 }}>
        {item.href && item.href !== '#' ? (
          internal ? (
            <MuiLink component={NavLink} to={to(item.href)} sx={{ color: 'inherit', textDecoration: 'none' }}>
              {item.label}
            </MuiLink>
          ) : (
            <MuiLink href={to(item.href)} target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit' }}>
              {item.label}
            </MuiLink>
          )
        ) : (
          <Typography variant="body2">{item.label}</Typography>
        )}
      </Box>

      {hasChildren && (
        <Box sx={{ paddingLeft: 1.5, marginTop: 0.75 }}>
          <Stack direction="column" spacing={0.5}>
            {item.children?.map((child) => (
              <Box key={child.key} sx={{ lineHeight: 1.4 }}>
                <SitemapItem item={child} />
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default function Header({ onOpenNav }: { onOpenNav: () => void }) {
  const { t, i18n: i18nInstance } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, logoutContext } = useAuth();

  useEffect(() => {
    console.log('========================= Header isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  // Rest API 호출로 메뉴 가져오기
  const { gnbList } = useAppSelector((s) => s.menu)

  const lang = getLangFromPathname(location.pathname) || 'ko'
  const to = (p: string) => {
    const raw = langPath(lang, p)
    // Normalize accidental double slashes (e.g. "//") which breaks react-router Link
    return raw.replace(/\/{2,}/g, '/')
  }

  // 드롭다운 메뉴 상태 관리
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({})
  // 사이트맵 Drawer 상태 관리
  const [sitemapOpen, setSitemapOpen] = useState(false)
  // 서브메뉴 닫기 타임아웃 관리
  const closeTimeoutsRef = useRef<{ [key: string]: NodeJS.Timeout }>({})
  
  // 세션 타이머 관리 (초 단위, 30분 = 1800초)
  const [sessionTime, setSessionTime] = useState<number>(1800);         // 타이머 초기값 30:00
  const [showSessionWarning, setShowSessionWarning] = useState(false);  // 세션 경고 팝업 상태 관리
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);         // 세션 타이머 인터벌 관리
  const lastActivityRef = useRef<number>(Date.now());                   // 마지막 사용자 활동 시간(milliseconds)
  const isLoginExtendingRef = useRef<boolean>(false);                   // loginExtend 요청 진행 중 플래그
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);        // 디바운스 타이머
  
  // 시간 포맷팅 함수 (초를 MM:SS로 변환)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // 타이머 리셋 함수
  const resetTimer = () => {
    // 로그인 연장 요청
    setSessionTime(1800) // 30:00으로 리셋

    // 5분 잔여 타이머 알림 창이 열려있으면 닫기
    if(showSessionWarning){
      setShowSessionWarning(false)
    }

    lastActivityRef.current = Date.now() // 마지막 활동 시간 업데이트

    // 이미 loginExtend 요청이 진행 중이면 중복 호출 방지
    if (isLoginExtendingRef.current) {
      return;
    }

    // loginExtend 요청 시작 플래그 설정
    isLoginExtendingRef.current = true;

    try{
      dispatch(loginExtend()).unwrap()
      .then((response: LoginExtendRVO | null) => {
        // response가 있고 code가 '0'인 경우에만 처리
        if (response?.code === '0') {
          console.log("loginExtend response.code=0 Redis Idle key 리셋 성공!!");
        }
      })
      .catch((error: unknown) => {
        console.log("loginExtend error=", error);
      })
      .finally(() => {
        // 요청 완료 후 플래그 리셋
        isLoginExtendingRef.current = false;
      });
    }catch(error){
      console.log("loginExtend error=", error);
      // 에러 발생 시에도 플래그 리셋
      isLoginExtendingRef.current = false;
    }
  }

  // 버튼 클릭 시 호출되는 핸들러 (디바운스 타이머 취소 후 즉시 실행)
  const handleResetTimerClick = (e?: React.MouseEvent) => {
    // 이벤트 전파 중지 (handleUserActivity 트리거 방지)
    if (e) {
      e.stopPropagation();
    }
    
    // 디바운스 타이머가 있으면 취소 (handleUserActivity에서 설정된 타이머 취소, dispatch(loginExtend()) 요청 2번 실행 방지 )
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    
    // 즉시 resetTimer 실행
    resetTimer();
  }
  
  // 사용자 활동 감지 함수 (디바운싱 적용)
  const handleUserActivity = () => {
    // 로그인 상태에서 활동 감지(event listener)되면, 활동 감지 시간을 지정함.(마지막 활동 시간 업데이트)
    if(isAuthenticated) {
      // 기존 디바운스 타이머가 있으면 취소
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      // 500ms 후에 resetTimer 호출 (디바운싱)
      // 짧은 시간 내 여러 이벤트가 발생해도 마지막 이벤트만 처리
      debounceTimerRef.current = setTimeout(() => {
        // 시간연장 타이머를 리셋함.(마지막 활동 시간 업데이트 포함)
        resetTimer();
        debounceTimerRef.current = null;
      }, 500);
    }
  }
  
  // 로그인 상태가 변경될 때 타이머 초기화
  useEffect(() => {
    if (isAuthenticated) {
      resetTimer()
    } else {
      // 로그아웃 시 타이머 정리
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }

      // 타이머의 시간 30분으로 초기화
      setSessionTime(1800);

      // 5분 잔여 타이머 알림 창을 닫기
      setShowSessionWarning(false);

      // 활동시간을 로그아웃된 시점으로 리켓시킴
      lastActivityRef.current = Date.now()
    }
  }, [isAuthenticated])
  
  // 사용자 활동 이벤트 리스너 등록 (idle 상태 감지)
  useEffect(() => {
    if (!isAuthenticated) {
      return
    }
    
    // 사용자 활동 이벤트 리스너(mousemove, scroll event는 제외외)
    const events = ['mousedown', 'keypress', 'touchstart', 'click']
    
    const activityHandler = () => {
      handleUserActivity()
    }
    
    // 이벤트 리스너 등록
    events.forEach((event) => {
      document.addEventListener(event, activityHandler, true)
    })
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 디바운스 타이머 정리
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, activityHandler, true)
      })
      // 디바운스 타이머 정리
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    }
  }, [isAuthenticated])
  
  // 타이머 실행 (로그인 상태일 때만, idle 상태 감지)
  useEffect(() => {
    if (!isAuthenticated) {
      return
    }
    
    // 기존 타이머 정리
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }
    
    // 1초마다 타이머 감소 및 idle 상태 체크
    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const idleTime = Math.floor((now - lastActivityRef.current) / 1000); // 초 단위 idle 시간
      
      setSessionTime((prev) => {
        // idle 시간이 30분(1800초) 이상이면 자동 로그아웃
        if (idleTime >= 1800) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          // 자동 로그아웃 처리
          logoutContext();
          const currentLang = getLangFromPathname(location.pathname) || 'ko';
          navigate(`/${currentLang}`, { replace: true });
          return 0;
        }
        
        // idle 시간을 타이머에 반영 (마지막 활동 후 경과 시간)
        const newTime = 1800 - idleTime;
        
        // 0초 이하가 되면 자동 로그아웃
        if (newTime <= 0) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          // 자동 로그아웃 처리, 한글 홈(/ko)으로 이동
          logoutContext();
          const currentLang = getLangFromPathname(location.pathname) || 'ko';
          navigate(`/${currentLang}`, { replace: true });
          return 0;
        }
        
        return newTime;
      })
    }, 1000)
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  }, [isAuthenticated, navigate, logoutContext, location.pathname])
  
  // 5분(300초) 남았을 때 경고 팝업 표시 (한 번만)
  useEffect(() => {
    if (isAuthenticated && sessionTime === 300 && !showSessionWarning) {
      setShowSessionWarning(true)
    }
  }, [isAuthenticated, sessionTime, showSessionWarning])

  /**
   * 목업 데이터 - 주석처리 (Rest API 사용 시)
   * menuItems1: menuData.json에서 추출한 메뉴 데이터
   * 화면에 메뉴로 표기할 때 필요한 속성값만 포함 (menuSn, menuNm, menuUrlAddr, upMenuSn, menuSeq, menuTypeCd, depLevel)
   */
  const menuItems1: MenuRVO[] = [
    { menuSn: 1000, menuNm: '주요 업무', upMenuSn: undefined, menuSeq: 1, menuTypeCd: 'MENU', depLevel: 1 },
    { menuSn: 1001, menuNm: '의약품 이상사례보고', upMenuSn: 1000, menuSeq: 1, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1010, menuNm: '이상사례보고', upMenuSn: 1001, menuSeq: 1, menuTypeCd: 'MENU', depLevel: 3 },
    { menuSn: 1020, menuNm: '이상사례 보고란?', menuUrlAddr: '/safety/report1', upMenuSn: 1010, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1021, menuNm: 'KAERS란?', menuUrlAddr: '/safety/report2', upMenuSn: 1010, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1011, menuNm: '온라인 보고', upMenuSn: 1001, menuSeq: 2, menuTypeCd: 'MENU', depLevel: 3 },
    { menuSn: 1030, menuNm: '의약품이상사례', menuUrlAddr: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReport', upMenuSn: 1011, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1031, menuNm: '의약외품(생리대 등)', menuUrlAddr: 'https://nedrug.mfds.go.kr/CCCBA03F010/getReportQuasiDrug', upMenuSn: 1011, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1012, menuNm: '오프라인 보고', menuUrlAddr: '/safety/report5', upMenuSn: 1001, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1013, menuNm: '이상사례보고자료실', menuUrlAddr: '/safety/report6', upMenuSn: 1001, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1014, menuNm: '온라인보고방법 안내', menuUrlAddr: '/safety/report7', upMenuSn: 1001, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1002, menuNm: '의약품 부작용 보고 자료', upMenuSn: 1000, menuSeq: 2, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1040, menuNm: '의약품 부작용 보고1', upMenuSn: 1002, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1041, menuNm: '의약품 부작용 보고2', upMenuSn: 1002, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1042, menuNm: '의약품 부작용 보고3', upMenuSn: 1002, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1003, menuNm: '의약품 안전관리', upMenuSn: 1000, menuSeq: 3, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1050, menuNm: '약물감시용어', upMenuSn: 1003, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1051, menuNm: '부작용 인과관계규명', upMenuSn: 1003, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1052, menuNm: '유관기관', upMenuSn: 1003, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1004, menuNm: '의약품.의료정보.연계분석', upMenuSn: 1000, menuSeq: 4, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1060, menuNm: '의약품.의료정보.연계분석1', upMenuSn: 1004, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1061, menuNm: '의약품.의료정보.연계분석2', upMenuSn: 1004, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1062, menuNm: '의약품.의료정보.연계분석3', upMenuSn: 1004, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1005, menuNm: 'DUR 정보', upMenuSn: 1000, menuSeq: 5, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1070, menuNm: 'DUR 이해', upMenuSn: 1005, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1071, menuNm: 'DUR 정보검색방', upMenuSn: 1005, menuSeq: 2, menuTypeCd: 'MENU', depLevel: 3 },
    { menuSn: 1080, menuNm: 'DUR 통합검색', upMenuSn: 1071, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1081, menuNm: '병용금기', upMenuSn: 1071, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1082, menuNm: '특정연령대금기', upMenuSn: 1071, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1083, menuNm: '임부금기', upMenuSn: 1071, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1084, menuNm: '효능군중복주의', upMenuSn: 1071, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1085, menuNm: '용량주의', upMenuSn: 1071, menuSeq: 6, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1086, menuNm: '투여기간주의', upMenuSn: 1071, menuSeq: 7, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1087, menuNm: '노인주의', upMenuSn: 1071, menuSeq: 8, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1088, menuNm: '수유부주의', upMenuSn: 1071, menuSeq: 9, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1072, menuNm: '의약품 적정사용 정보방', upMenuSn: 1005, menuSeq: 3, menuTypeCd: 'MENU', depLevel: 3 },
    { menuSn: 1090, menuNm: '노인 적정사용정보집', upMenuSn: 1072, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1091, menuNm: '소아 적정사용정보집', upMenuSn: 1072, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1092, menuNm: '임부 적정사용정보집', upMenuSn: 1072, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1093, menuNm: '간질환 적정사용정보집', upMenuSn: 1072, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1094, menuNm: '신질환 적정사용정보집', upMenuSn: 1072, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 4 },
    { menuSn: 1073, menuNm: 'DUR 게시판', menuUrlAddr: '/dur/notice', upMenuSn: 1005, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1074, menuNm: 'DUR 제안', menuUrlAddr: '/dur/proposal', upMenuSn: 1005, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1006, menuNm: '부작용 피해구제', upMenuSn: 1000, menuSeq: 6, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1110, menuNm: '제도소개', upMenuSn: 1006, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1111, menuNm: '피해구제 신청', upMenuSn: 1006, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1112, menuNm: '뉴스/소식', upMenuSn: 1006, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1113, menuNm: '자주하는 질문', menuUrlAddr: 'https://nedrug.mfds.go.kr', upMenuSn: 1006, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1007, menuNm: '임상시험안전지원', upMenuSn: 1000, menuSeq: 7, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 1120, menuNm: '임상시험안전지원기관', upMenuSn: 1007, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1121, menuNm: '협약 안내', upMenuSn: 1007, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1122, menuNm: '중앙IRB신청', upMenuSn: 1007, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1123, menuNm: '임상시험헬프데스크', upMenuSn: 1007, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1124, menuNm: '공지사항', upMenuSn: 1007, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1125, menuNm: '자료실', upMenuSn: 1007, menuSeq: 6, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 1100, menuNm: '정보공개', upMenuSn: undefined, menuSeq: 2, menuTypeCd: 'MENU', depLevel: 1 },
    { menuSn: 2000, menuNm: '정보공개', upMenuSn: 1100, menuSeq: 1, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 2010, menuNm: '업무처리절차', upMenuSn: 2000, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2011, menuNm: '정보공개 청구', menuUrlAddr: 'https://open.go.kr', upMenuSn: 2000, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2012, menuNm: '임직원국외출장', upMenuSn: 2000, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2013, menuNm: '원장 업무추진비 집행내역', upMenuSn: 2000, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2001, menuNm: '공공데이터 개방', upMenuSn: 1100, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 2002, menuNm: '경영공시', upMenuSn: 1100, menuSeq: 3, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 2020, menuNm: '부패행위 징계현황', upMenuSn: 2002, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2021, menuNm: '징계기준', upMenuSn: 2002, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2022, menuNm: '징계현황', upMenuSn: 2002, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 2003, menuNm: '사업실명제', upMenuSn: 1100, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 1200, menuNm: '기관소식', upMenuSn: undefined, menuSeq: 3, menuTypeCd: 'MENU', depLevel: 1 },
    { menuSn: 3000, menuNm: '공지사항', menuUrlAddr: '/notice', upMenuSn: 1200, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3001, menuNm: '채용게시판', upMenuSn: 1200, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3002, menuNm: 'FAQ', upMenuSn: 1200, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3003, menuNm: '국민신문고', upMenuSn: 1200, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3004, menuNm: '보도자료', upMenuSn: 1200, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3005, menuNm: '뉴스레터', upMenuSn: 1200, menuSeq: 6, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 3010, menuNm: '첨단바이오 포커스', menuUrlAddr: 'https://ltfu.mfds.go.kr', upMenuSn: 3005, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 3011, menuNm: '마약류 안전정보지', upMenuSn: 3005, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 3012, menuNm: '리플릿', upMenuSn: 3005, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 3006, menuNm: '카드뉴스', upMenuSn: 1200, menuSeq: 7, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3007, menuNm: '동영상', upMenuSn: 1200, menuSeq: 8, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 3008, menuNm: '자료실', upMenuSn: 1200, menuSeq: 9, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 1300, menuNm: '기관소개', upMenuSn: undefined, menuSeq: 4, menuTypeCd: 'MENU', depLevel: 1 },
    { menuSn: 4000, menuNm: '기관장 인사말', upMenuSn: 1300, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4001, menuNm: '역대 기관장', upMenuSn: 1300, menuSeq: 2, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4002, menuNm: '연혁', upMenuSn: 1300, menuSeq: 3, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4003, menuNm: '비전 및 목표', upMenuSn: 1300, menuSeq: 4, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4004, menuNm: '조직도', upMenuSn: 1300, menuSeq: 5, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4005, menuNm: '설립근거 및 관련법령', upMenuSn: 1300, menuSeq: 6, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4006, menuNm: '고객헌장', upMenuSn: 1300, menuSeq: 7, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4007, menuNm: '우리원동정', upMenuSn: 1300, menuSeq: 8, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4008, menuNm: 'CI소개', upMenuSn: 1300, menuSeq: 9, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4009, menuNm: '윤리경영', upMenuSn: 1300, menuSeq: 10, menuTypeCd: 'MENU', depLevel: 2 },
    { menuSn: 4012, menuNm: '클린신고센터', upMenuSn: 4009, menuSeq: 1, menuTypeCd: 'PAGE', depLevel: 3 },
    { menuSn: 4010, menuNm: '캐릭터소개', upMenuSn: 1300, menuSeq: 11, menuTypeCd: 'PAGE', depLevel: 2 },
    { menuSn: 4011, menuNm: '오시는 길', menuUrlAddr: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do', upMenuSn: 1300, menuSeq: 12, menuTypeCd: 'PAGE', depLevel: 2 },
  ];

  /**
   * 목업 데이터 - 주석처리 (Rest API 사용 시)
   * expertMyWorkMenuItem을 MenuRVO 형식으로 변환
   */
  const expertMyWorkMenuItem: MenuRVO = {
    menuSn: 2001,
    menuNm: t('expertMyWork'),
    menuUrlAddr: '/expert/my-work',
    upMenuSn: undefined,
    menuSeq: 0,
    menuTypeCd: 'PAGE',
    depLevel: 1,
  };

  // 목업 데이터 - 주석처리 (Rest API 사용 시)
  // 권한별 분기 - 목업 데이터로 사용
  const menuItems2 = [
    // 필요하면 "전문가" 상위 그룹을 따로 두고 그 안에 넣어도 되고,
    // 지금은 최상위에 단일 메뉴로 추가하는 예시
    expertMyWorkMenuItem,

    ...menuItems1
  ];
  
  // const { rootMenus, byParent } = useMemo(() => buildMenuTree(menuItems1), [menuItems1]);

  // Rest API 호출 - 언어 변경 시 메뉴 목록 재조회
  useEffect(() => {
    // 언어가 바뀔 때마다 해당 언어 메뉴 재조회
    dispatch(selectMenuList({ langSeCd: i18nInstance.language }))
  }, [dispatch, i18nInstance.language])

  const onToggleLang = () => {
    const nextLang = i18nInstance.language === 'ko' ? 'en' : 'ko'

    // 현재 경로에서 lang segment 교체
    const pathSegments = location.pathname.split('/')
    pathSegments[1] = nextLang
    const nextPath = pathSegments.join('/')

    // Rest API 호출 - 토글할 때마다 메뉴 목록을 무조건 다시 불러오게 캐시 초기화
    dispatch(clearMenuCache())

    console.log('Header toggleLang curLang=' + i18nInstance.language + ', next=' + nextLang)

    sessionStorage.setItem(LOCALE_KEY, nextLang) // ✅ APP_LOCALE 저장
    i18nInstance.changeLanguage(nextLang) // ✅ UI 즉시 반영
    navigate(nextPath) // ✅ 경로 이동
  }

  // =======================================
  // 웹 GNB
  // =======================================

  // 메뉴 렌더링 상태 관리
  const [activeDepth1, setActiveDepth1] = useState<number | null>(null);  /* 1뎁스 메뉴 활성화 상태 */
  const [activeDepth2, setActiveDepth2] = useState<number | null>(null);  /* 2뎁스 메뉴 활성화 상태 */

  // 메뉴 열기 함수 (마우스/키보드 공용)
  const openMenu = (idx: number) => {
    setActiveDepth1(idx);
    setActiveDepth2(0); // 탭 진입 시 첫 번째 2뎁스 활성화
  };

  // 닫기 함수
  const closeAll = () => {
    setActiveDepth1(null);
    setActiveDepth2(null);
  };

  // blur 이벤트를 이용한 웹 접근성 처리
  // 탭 키가 메뉴 영역 전체를 벗어날 때만 닫히도록 설정(1뎁스 Root 메뉴 영역만 남기고 나머지 메뉴 영역은 닫히도록 설정)
  const handleBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      closeAll();
    }
  };

  // =======================================
  // 모바일 GNB 
  // =======================================
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileSub, setOpenMobileSub] = useState<number | null>(0);
  const [openMobileDepth3, setOpenMobileDepth3] = useState<number | null>(null);

  // 테마와 미디어 쿼리 설정
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1200px)');

  // 변수들이 모두 선언된 후 useEffect를 작성합니다.
  useEffect(() => {
    if (isDesktop && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isDesktop, mobileMenuOpen]);

  // 1뎁스 클릭 시
  const handleMobileMenuClick = (index: number) => {
    setOpenMobileSub(index);
    setOpenMobileDepth3(null);
  };

  // 2뎁스 클릭 시 (3뎁스가 있을 때만 실행됨)
  const handleDepth2Click = (idx: number) => {
    setOpenMobileDepth3(openMobileDepth3 === idx ? null : idx);
  };
  
  return (
    <>
      <SkipNavigation />
      
      <Box component="header" className="header">
        {/* 정부 배지 영역 */}
        <Box className="gov-badge">
          <Box className="container">
            <Typography className="txt">{t("shutcutTitle")}</Typography>
          </Box>
        </Box>
        {/* 상단 바(로그아웃 타이머, 언어 토글) */}
        <Box className="header-topbar">
          <Box className="container">
            <Box className="top-link">
              {isAuthenticated && (
                <Box className="timer_box">
                  <span className="time_text">{formatTime(sessionTime)}</span>
                  <Button size="small" className="btn_extend" onClick={handleResetTimerClick}>시간연장</Button>
                </Box>
              )}
              <Button size="small" onClick={() => navigate('/screens')}>Screens</Button>
              <Button size="small" onClick={onToggleLang} startIcon={<Language />}>
                {i18nInstance.language === 'ko' ? 'English' : '한국어'}
              </Button>
            </Box>
          </Box>
        </Box>
        {/* 로고, 유틸메뉴 */}
        <Box className="header_menu">
          <Box className="container">
            <h1 className="logo">
              <Link to={to('/')}>
                <img
                  src={i18nInstance.language === 'ko' ? '/img/logo.png' : '/img/logo_eng02.png'}
                  alt={`KIDS ${t('kidsName')}`}
                />
              </Link>
            </h1>
            <Box className="util-menu">
              {i18nInstance.language === 'ko' && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button size="small" onClick={() => navigate(to('/search'))} className="btn-util search">
                    {t('integratedSearch')} {/* 통합검색 */}
                  </Button>

                  <Button size="small" onClick={() => navigate(to('/expert/ExpertMemberApply'))} className="btn-util user-reg">
                    {t('usrSwtReg')} {/* 전문가 회원 전환 신청 */}
                  </Button>

                  {user && user.userInfo?.cnstnMbcmtYn === 'Y' ? (
                    <Button size="small" onClick={() => navigate(to('/'))} className="btn-util adv-task">
                      {t('advTask')} {/* 자문위원 업무 */}
                    </Button>
                  ) : (
                    <Button size="small" onClick={() => navigate(to('/'))} className="btn-util user-adv">
                      {t('advAppReg')} {/* 자문위원신청 */}
                    </Button>
                  )}

                  {!isAuthenticated ? (
                    <Button size="small" onClick={() => navigate(to('/auth/SignUpSel'))} className="btn-util signup">
                      {t('signUp')} {/* 회원가입 */}
                    </Button>
                  ) : (
                    <Button size="small" onClick={() => navigate(to('/auth/PasswordConfirm'))} className="btn-util edit-profile">
                      {t('editProfile')} {/* 회원정보수정 */}
                    </Button>
                  )}

                  {!isAuthenticated ? (
                    <Button
                      size="small"
                      onClick={() => {
                        const path = to('/auth/LoginMethod')
                        console.log('Header login button clicked, current lang:', lang, 'navigating to:', path)
                        navigate(path, { replace: false })
                      }}
                      className="btn-util login"
                    >
                      {t('login')} {/* 로그인 */}
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      onClick={() => {
                        logoutContext()
                        navigate(to('/'), { replace: true })
                      }}
                      className="btn-util logout"
                    >
                      {t('logout')} {/* 로그아웃 */}
                    </Button>
                  )}
                </Stack>
              )}
            </Box>
            <Box className="mo-header-util">
              {i18nInstance.language === 'ko' && (
                <Button
                  onClick={() => navigate(to('/auth/LoginMethod'))}
                  className="btn-util login"
                >
                  {t('login')}
                </Button>
              )}
              
              <Button
                aria-label="모바일메뉴 열기"
                onClick={() => setMobileMenuOpen(true)}
                className="btn-mo-menu" 
              >
                전체메뉴
              </Button>
            </Box>
          </Box>
        </Box>

        {/* 웹 상단 메뉴(GNB) */}
        <Box className="navigation" aria-label="주요 메뉴">
          <nav 
            className="gnb-wrapper" 
            onMouseLeave={closeAll} 
            onBlur={handleBlur} // 키보드 포커스가 메뉴를 완전히 벗어나면 닫힘
          >
            <div className="gnb-container">
              <ul className="depth1-list">
                {gnbList.map((menu1, idx1) => (
                  <li key={idx1} className="depth1-item" onMouseEnter={() => openMenu(idx1)}>
                    <Link
                      to={(menu1 as any).url || "#"}
                      className={`depth1-link ${activeDepth1 === idx1 ? 'active' : ''}`}
                      onFocus={() => openMenu(idx1)} 
                    >
                      {menu1.title}
                    </Link>

                    {activeDepth1 === idx1 && (
                      <div className="sub-menu-container">
                        <ul className="depth2-list">
                          {menu1.depth2.map((menu2: any, idx2: number) => (
                            <li key={idx2} className="depth2-item" onMouseEnter={() => setActiveDepth2(idx2)}>
                              <Link
                                to={menu2.url || "#"}
                                className={`depth2-link ${activeDepth2 === idx2 ? 'on' : ''}`}
                                onFocus={() => setActiveDepth2(idx2)} 
                              >
                                {menu2.title}
                              </Link>

                              {/* 3뎁스 영역 */}
                              {(activeDepth2 === idx2 || (activeDepth2 === null && idx2 === 0)) && menu2.depth3.length > 0 && (
                                <ul className="depth3-list">
                                  {menu2.depth3.map((menu3: any, idx3: number) => {
                                    const isObj = typeof menu3 === 'object' && menu3 !== null;
                                    const isNewWindow = isObj && menu3.isNewWindow;
                                    
                                    return (
                                      <li key={idx3}>
                                        <Link
                                          to={isObj ? menu3.url : "#"}
                                          onFocus={() => setActiveDepth2(idx2)} 
                                          target={isNewWindow ? "_blank" : "_self"}
                                          rel={isNewWindow ? "noopener noreferrer" : undefined}
                                          className={isNewWindow ? "ico-new" : ""}
                                        >
                                          {isObj ? menu3.name : menu3}
                                          {isNewWindow && (
                                            <OpenInNew
                                              sx={{
                                                fontSize: '16px',
                                                marginLeft: '4px',
                                                verticalAlign: 'middle',
                                                color: 'inherit'
                                              }}
                                            />
                                          )}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                        {/* GNB 배경 */}
                        <div className="gnb-bg" />
                      </div>
                    )}
                  </li>
                ))}
              </ul> 
              {/* 사이트맵열기버튼 */}
              <Box className="sitemap-open-btn">
                <IconButton aria-label="사이트맵 열기" onClick={() => setSitemapOpen(true)} edge="end" sx={{ ml: 1 }}>
                  <MenuIcon />
                </IconButton>
              </Box>
            </div>
          </nav>
        </Box>
        {/* e :: GNB */}
      </Box>
      {/* e :: header */}

      {/* 모바일 메뉴 */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#fff',
            boxSizing: 'border-box',
          },
          display: { xs: 'block', lg: 'none' } 
        }}
      >
        {/* 상단 헤더 */}
        <Box className="mo-drawer-header">
          <Box className="mo-drawer-top">
            <Button size="small" onClick={onToggleLang} startIcon={<Language />}>
                {i18nInstance.language === 'ko' ? 'English' : '한국어'}
              </Button>
            <Button size="small" onClick={() => navigate(to('/search'))} className="btn-util search">
              {t('integratedSearch')} {/* 통합검색 */}
            </Button>
          </Box>

          <Box className="mo-drawer-util">
            {i18nInstance.language === 'ko' && (
              <Box className="user-info-area">
                {!isAuthenticated ? (
                  <p className="user-msg">로그인해주세요.</p>
                ) : (
                  <p className="user-name">홍길동님</p>
                )}
              </Box>
            )}

            {i18nInstance.language === 'ko' && (
              <Stack direction="row" spacing={1} alignItems="center" className="util-buttons">
                {!isAuthenticated ? (
                  <Button size="small" onClick={() => navigate(to('/auth/SignUpSel'))} className="btn-util signup">
                    {t('signUp')} {/* 회원가입 */}
                  </Button>
                ) : (
                  <>
                  <Button size="small" onClick={() => navigate(to('/'))} className="btn-util my-task">
                    {t('myTask')} {/* 내업무 */}
                  </Button>
                  <Button size="small" onClick={() => navigate(to('/auth/PasswordConfirm'))} className="btn-util edit-profile">
                    {t('editProfile')} {/* 회원정보수정 */}
                  </Button>
                  <Button size="small" onClick={() => { logoutContext(); navigate(to('/'), { replace: true }); }} className="btn-util logout">
                    {t('logout')} {/* 로그아웃 */}
                  </Button>
                  </>
                )}
              </Stack>
            )}
          </Box>
          <Box className="mobile-drawer-close">
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* 모바일GNB */}
        <div className="mobile-gnb-container" role="navigation">
          <ul className="mobile-depth1-area">
            {gnbList.map((menu1, idx1) => (
              <li key={idx1} className={`depth1-item ${openMobileSub === idx1 ? 'active' : ''}`}>
                <Link 
                  to="#"
                  className="depth1-btn"
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleMobileMenuClick(idx1);
                  }}
                >
                  {menu1.title}
                </Link>

                {openMobileSub === idx1 && (
                  <div className="mobile-sub-area">
                    <ul className="depth2-list">
                      {menu1.depth2.map((menu2: any, idx2: number) => {
                        const hasDepth3 = menu2.depth3 && menu2.depth3.length > 0;
                        return (
                          <li key={idx2} className="depth2-item">
                            <Link 
                              to={hasDepth3 ? "#" : (menu2.url || "/")} 
                              className={`depth2-btn ${openMobileDepth3 === idx2 ? 'active' : ''}`}
                              onClick={(e) => {
                                if (hasDepth3) {
                                  e.preventDefault();
                                  handleDepth2Click(idx2);
                                }
                              }}
                            >
                              {menu2.title}
                              {hasDepth3 && (openMobileDepth3 === idx2 ? <ExpandLess /> : <ExpandMore />)}
                            </Link>

                            {hasDepth3 && openMobileDepth3 === idx2 && (
                              <ul className="depth3-list">
                                {menu2.depth3.map((menu3: any, idx3: number) => {
                                  const isObj = typeof menu3 === 'object' && menu3 !== null;
                                  const isNewWindow = isObj && menu3.isNewWindow; // 새창 여부 확인
                                  
                                  return (
                                    <li key={idx3} className="depth3-item">
                                      <Link 
                                        to={isObj ? menu3.url : "#"} 
                                        className={`depth3-btn ${isNewWindow ? "ico-new" : ""}`}
                                        target={isNewWindow ? "_blank" : "_self"}
                                        rel={isNewWindow ? "noopener noreferrer" : undefined}
                                        onClick={() => !isNewWindow && setMobileMenuOpen(false)} 
                                      >
                                        {isObj ? menu3.name : menu3}
                                        {/* 새창 열기 아이콘 */}
                                        {isNewWindow && (
                                          <OpenInNew 
                                            sx={{ 
                                              fontSize: '16px', 
                                              marginLeft: '4px',
                                              verticalAlign: 'middle',
                                              color: 'inherit' 
                                            }} 
                                          />
                                        )}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
     
      {/* 사이트맵 Drawer */}
      <Drawer
        anchor="bottom"
        open={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
        PaperProps={{
          sx: {
            height: '82vh',
            maxHeight: '82vh',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Drawer 헤더 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography
                component={Link}
                to={to('/')}
                variant="h6"
                sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}
              >
                KIDS
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('allSitemap')}
              </Typography>
            </Stack>

            <IconButton onClick={() => setSitemapOpen(false)} aria-label="닫기">
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* 로그인/회원가입 버튼 */}
          {i18nInstance.language === 'ko' && (
            <Box sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {!isAuthenticated ? (
                  <>
                    <Button variant="contained" component={NavLink} to={to('/auth/LoginMethod')}>
                      {t('login')}
                    </Button>
                    <Button variant="outlined" component={NavLink} to={to('/signup')}>
                      {t('signup')}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      // AuthContext의 logout이 Redux 액션을 dispatch하므로 중복 호출 불필요
                      logoutContext()
                      // 로그아웃 후 홈으로 이동
                      navigate(to('/'), { replace: true })
                    }}
                  >
                    {t('logout')}
                  </Button>
                )}
              </Stack>
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          {/* 사이트맵 본문: 섹션을 여러 컬럼으로 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 2,
            }}
          >
            {SITEMAP_SECTIONS.map((section) => (
              <Box key={section.title}>
                <Typography variant="h6" sx={{ mb: 1.25, fontWeight: 800 }}>
                  {section.title}
                </Typography>
                <Box>
                  {section.items.map((item) => (
                    <SitemapItem key={item.key} item={item} />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 외부 링크 */}
          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <MuiLink
              href="https://www.drugsafe.or.kr/ko/index.do"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main' }}
            >
              {t('kidsLink')}
            </MuiLink>
            <MuiLink
              href="https://kaers.drugsafe.or.kr/index.do"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main' }}
            >
              {t('reportLink')}
            </MuiLink>
          </Stack>
        </Box>
      </Drawer>

      {/* 세션 경고 팝업 (5분 남았을 때) */}
      <Dialog
        open={showSessionWarning}
        onClose={() => setShowSessionWarning(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: undefined,
          },
          className: 'modal-small',
        }}
      >
        <DialogTitle component="div" className="modal-title">
          <h2>{t('sessionWarningTitle')}</h2>
          <IconButton
            aria-label="닫기"
            onClick={() => setShowSessionWarning(false)}
            className="btn-modal-close"
          >
            <CloseIcon aria-hidden="true" />
          </IconButton>
        </DialogTitle>

        <DialogContent className="modal-content">
          <Box className="modal-status">
            <Box className="status-row">
              <Typography component="span" variant="body2" className="label">{t('sessionWarningTime')} : </Typography>
              <Typography component="span" variant="body2" className="time">
                {Math.floor(sessionTime / 60)}{t('minutes')} {sessionTime % 60}{t('seconds')}
              </Typography>
            </Box>
          </Box>
          <Box className="modal-desc">
            <p>{t('sessionWarningDescription')}</p>
            <p>{t('sessionWarningExtend')}</p>
          </Box>
        </DialogContent>

        <DialogActions className="modal-footer">
          <Button 
            variant="outlined" 
            onClick={() => {
              logoutContext()
              setShowSessionWarning(false)
              navigate(to('/'), { replace: true })
            }}
          >
            {t('logout')}
          </Button>
          <Button 
            variant="contained" 
            onClick={(e) => {
              handleResetTimerClick(e)
              setShowSessionWarning(false)
            }}
          >
            {t('loginExtend')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
