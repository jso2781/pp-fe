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

import type { GnbDepth1Item, MenuRVO } from '@/features/auth/MenuTypes';
import type { LoginExtendRVO } from '@/features/auth/AuthTypes';
import { gnbListToSitemapSections, SITEMAP_SECTIONS, type SitemapLinkItem, type SitemapSection } from '@/components/common/SitemapSectionArr';

/**
 * 사이트맵 아이템 컴포넌트
 * @param onInternalNavigate - 내부 라우팅 링크 클릭 시 호출 (예: 사이트맵 Drawer 닫기)
 */
function SitemapItem({ item, onInternalNavigate }: { item: SitemapLinkItem; onInternalNavigate?: () => void }) {
  const location = useLocation()
  const curLang = useMemo(() => getLangFromPathname(location.pathname), [location.pathname])
  const to = useMemo(() => (p: string) => langPath(p, curLang), [curLang])

  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  const internal = item.internal || (typeof item.href === 'string' && item.href.startsWith('/'))

  const isInternal = item.internal || (typeof item.href === 'string' && item.href.startsWith('/'));
  const isExternal = (item as any).isExternal === true;

  const handleInternalClick = () => {
    onInternalNavigate?.()
  }

  return (
    <Box sx={{ marginBottom: 1 }}>
      <Box sx={{ fontWeight: 500 }}>
        {item.href && item.href !== '#' ? (
          isInternal && !isExternal ? (
            <MuiLink component={NavLink} to={to(item.href)} sx={{ color: 'inherit', textDecoration: 'none' }} onClick={handleInternalClick}>
              {item.label}
            </MuiLink>
          ) : (
            <MuiLink 
              href={item.href}
              target="_blank" 
              rel="noopener noreferrer" 
              className="sitemap-link" 
              sx={{ color: 'inherit' }}
            >
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
                <SitemapItem item={child} onInternalNavigate={onInternalNavigate} />
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
  const { gnbList } = useAppSelector((s) => s.menu);

  // gnbList가 변경될 때마다 사이트맵 섹션 자동 변환 (미로드 시 폴백 데이터 사용)
  const sitemapSections = useMemo<SitemapSection[]>(
    () => (gnbList?.length ? gnbListToSitemapSections(gnbList) : SITEMAP_SECTIONS),
    [gnbList]
  )

  const lang = getLangFromPathname(location.pathname) || 'ko'
  const to = (p: string) => {
    const raw = langPath(p, lang)
    // Normalize accidental double slashes (e.g. "//") which breaks react-router Link
    return raw.replace(/\/{2,}/g, '/')
  }

  // 드롭다운 메뉴 상태 관리
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({})
  // 사이트맵 Drawer 상태 관리
  const [sitemapOpen, setSitemapOpen] = useState(false)
  
  // Footer에서 'open-sitemap'이라는 신호를 보내면 실행됨
  useEffect(() => {
    const handleOpenSitemap = () => {
      setSitemapOpen(true); 
    };

    window.addEventListener('open-sitemap', handleOpenSitemap);
    return () => {
      window.removeEventListener('open-sitemap', handleOpenSitemap);
    };
  }, [])

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

  // Rest API 호출 - 언어 변경 시 메뉴 목록 재조회
  useEffect(() => {
    // 언어가 바뀔 때마다 해당 언어 메뉴 재조회
    dispatch(selectMenuList({ langSeCd: i18nInstance.language }))
  }, [dispatch, i18nInstance.language])

  const onToggleLang = () => {
    const nextLang = i18nInstance.language === 'ko' ? 'en' : 'ko'

    // 홈(/, /pp, /pp/ko) 포함 모든 케이스에서 안전하게 언어 세그먼트 교체/삽입
    const segments = location.pathname.split('/').filter(Boolean)
    let nextPath = ''
    if (segments[0] !== 'pp') {
      nextPath = `/pp/${nextLang}`
    } else if (segments.length === 1) {
      nextPath = `/pp/${nextLang}`
    } else {
      if (segments[1] === 'ko' || segments[1] === 'en') {
        segments[1] = nextLang
      } else {
        segments.splice(1, 0, nextLang)
      }
      nextPath = `/${segments.join('/')}`
    }

    // Rest API 호출 - 토글할 때마다 메뉴 목록을 무조건 다시 불러오게 캐시 초기화
    dispatch(clearMenuCache())

    console.log('Header toggleLang curLang=' + i18nInstance.language + ', next=' + nextLang)

    sessionStorage.setItem(LOCALE_KEY, nextLang) // ✅ APP_LOCALE 저장
    i18nInstance.changeLanguage(nextLang) // ✅ UI 즉시 반영
    navigate(`${nextPath}${location.search}${location.hash}`) // ✅ 경로 이동
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
              <Button size="small" onClick={() => navigate(to(`/pp/ko/screens`))}>Screens</Button>
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
              <Link to={to('/pp')}>
                <img
                  src={i18nInstance.language === 'ko' ? '/img/logo.png' : '/img/logo_eng02.png'}
                  alt={`KIDS ${t('kidsName')}`}
                />
              </Link>
            </h1>
            <Box className="util-menu">
              {i18nInstance.language === 'ko' && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button size="small" onClick={() => navigate(to(`/pp/${i18nInstance.language}/search/IntegratedSearch`))} className="btn-util search">
                    {t('integratedSearch')} {/* 통합검색 */}
                  </Button>

                  {isAuthenticated && user && user.userInfo?.expertYn === 'Y' ? (
                    <Button size="small" onClick={() => navigate(to(`/pp/${i18nInstance.language}/expert/ExpertMyWork`))} className="btn-util user-reg">
                    {t('expertMyWork')} {/* 내 업무 */}
                  </Button>
                  ) : (
                    <Button size="small" onClick={() => navigate(to(`/pp/${i18nInstance.language}/expert/ExpertMemberApply`))} className="btn-util user-reg">
                    {t('usrSwtReg')} {/* 전문가 회원 전환 신청 */}
                  </Button>
                  )}

                  {user && user.userInfo?.cnstnMbcmtYn === 'Y' ? (
                    <Button size="small" onClick={() => window.open('https://www.drugsafe.or.kr/expert/main/main.do', '_blank', 'noopener,noreferrer')} className="btn-util adv-task">
                      {t('advTask')} {/* 자문위원 업무 */}
                    </Button>
                  ) : (
                    <Button size="small" onClick={() => navigate(to(`/pp/${i18nInstance.language}/expert/ExpertApproval`))} className="btn-util user-adv">
                      {t('advAppReg')} {/* 자문위원신청 */}
                    </Button>
                  )}

                  {!isAuthenticated ? (
                    <Button size="small" onClick={() => navigate(to(`/pp/${i18nInstance.language}/auth/SignUpSel`))} className="btn-util signup">
                      {t('signUp')} {/* 회원가입 */}
                    </Button>
                  ) : (
                    <Button size="small" onClick={() => navigate(to(`/pp/${i18nInstance.language}/auth/PasswordConfirm`))} className="btn-util edit-profile">
                      {t('editProfile')} {/* 회원정보수정 */}
                    </Button>
                  )}

                  {!isAuthenticated ? (
                    <Button
                      size="small"
                      onClick={() => {
                        const path = to(`/pp/${i18nInstance.language}/auth/LoginMethod`)
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
                        navigate(to('/pp'), { replace: true })
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
                <>
                {!isAuthenticated ? (
                  <Button
                    onClick={() => navigate(to(`/pp/${i18nInstance.language}/auth/LoginMethod`))}
                    className="btn-util login"
                  >
                    {t('login')}
                  </Button>
                ) : (
                  <Button
                    onClick={() => { logoutContext(); navigate(to(`/pp/${i18nInstance.language}`), { replace: true }); }}
                    className="btn-util logout"
                  >
                    {t('logout')}
                  </Button>
                )}
                </>
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
                                onClick={menu2.url ? closeAll : undefined}
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
                                          onClick={closeAll}
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
        PaperProps={{ className: 'lang-ko' }}
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
        {/* 상단 헤더 - 링크/버튼 클릭 시 Drawer 닫기 */}
        <Box className="mo-drawer-header">
          <Box className="mo-drawer-top">
            <Button size="small" onClick={() => { onToggleLang(); setMobileMenuOpen(false); }} startIcon={<Language />}>
                {i18nInstance.language === 'ko' ? 'English' : '한국어'}
              </Button>
            <Button size="small" onClick={() => { navigate(to(`/pp/${i18nInstance.language}/search/IntegratedSearch`)); setMobileMenuOpen(false); }} className="btn-util search">
              {t('integratedSearch')} {/* 통합검색 */}
            </Button>
          </Box>

          <Box className="mo-drawer-util">
            {i18nInstance.language === 'ko' && (
              <Box className="user-info-area">
                {isAuthenticated && user && user.userInfo ? (
                  <p className="user-name">{user?.userInfo.encptMbrFlnm}님</p>
                ) : (
                  <p className="user-msg">로그인해주세요.</p>
                )}
              </Box>
            )}

            {i18nInstance.language === 'ko' && (
              <Stack direction="row" spacing={1} alignItems="center" className="util-buttons">

                <>
                {isAuthenticated && user && user.userInfo?.expertYn === 'Y' ? (
                  <Button size="small" onClick={() => { navigate(to(`/pp/${i18nInstance.language}/expert/ExpertMyWork`)); setMobileMenuOpen(false); }} className="btn-util my-task">
                    {t('expertMyWork')} {/* 내업무 */}
                  </Button>
                ) : (
                  <Button size="small" onClick={() => { navigate(to(`/pp/${i18nInstance.language}/expert/ExpertMemberApply`)); setMobileMenuOpen(false); }} className="btn-util user-reg">
                  {t('usrSwtReg')} {/* 전문가 회원 전환 신청 */}
                </Button>
                )}

                {isAuthenticated && user && user.userInfo?.cnstnMbcmtYn === 'Y' ? (
                  <Button size="small" onClick={() => { window.open('https://www.drugsafe.or.kr/expert/main/main.do', '_blank', 'noopener,noreferrer'); setMobileMenuOpen(false); }} className="btn-util adv-task">
                    {t('advTask')} {/* 자문위원 업무 */}
                  </Button>
                ) : (
                  <Button size="small" onClick={() => { navigate(to(`/pp/${i18nInstance.language}/expert/ExpertApproval`)); setMobileMenuOpen(false); }} className="btn-util user-adv">
                    {t('advAppReg')} {/* 자문위원신청 */}
                  </Button>
                )}

                {!isAuthenticated ? (
                  <Button size="small" onClick={() => { navigate(to(`/pp/${i18nInstance.language}/auth/SignUpSel`)); setMobileMenuOpen(false); }} className="btn-util signup">
                    {t('signUp')} {/* 회원가입 */}
                  </Button>
                ) : (
                  <Button size="small" onClick={() => { navigate(to(`/pp/${i18nInstance.language}/auth/PasswordConfirm`)); setMobileMenuOpen(false); }} className="btn-util edit-profile">
                    {t('editProfile')} {/* 회원정보수정 */}
                  </Button>
                )}

                {!isAuthenticated ? (
                  <Button size="small" onClick={() => { navigate(to(`/pp/${i18nInstance.language}/auth/LoginMethod`)); setMobileMenuOpen(false); }} className="btn-util logout">
                    {t('login')} {/* 로그인 */}
                  </Button>
                ) : (
                  <Button size="small" onClick={() => { logoutContext(); navigate(to(`/pp/${i18nInstance.language}`), { replace: true }); setMobileMenuOpen(false); }} className="btn-util logout">
                    {t('logout')} {/* 로그아웃 */}
                  </Button>
                )}
                </>
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
                                } else {
                                  // 2-depth에 화면 링크만 있을 때: 링크 이동 후 모바일 Drawer 닫기
                                  setMobileMenuOpen(false);
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
        anchor="top"
        open={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
        PaperProps={{
          className: 'lang-ko',
          sx: {
            height: '82vh',
            maxHeight: '82vh',
            
          },
        }}
      >
        <Box className="sitemap-container">
          <Box className="sitemap-header">
            <Box className="inner">
              <Typography className="header-title">전체메뉴</Typography>
              <IconButton onClick={() => setSitemapOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </Box>

          <Box className="sitemap-header">
            {sitemapSections.map((section) => (
              <Box key={section.key} className="section-box">
                {/* 1Depth 타이틀 */}
                <Typography className="depth1-title">
                  {section.title}
                </Typography>

                {/* 2Depth */}
                <Box className="grid-wrapper">
                  {section.items.map((item) => (
                    <Box key={item.key} className="item-group">
                      {/* 2Depth 타이틀: href 있으면 링크로 렌더 */}
                      {item.href && item.href !== '#' ? (
                        (item.internal !== false && !item.href.startsWith('http://') && !item.href.startsWith('https://')) ? (
                          <MuiLink
                            component={NavLink}
                            to={to(item.href)}
                            className="depth2-title"
                            sx={{ color: 'inherit', textDecoration: 'none' }}
                            onClick={() => setSitemapOpen(false)}
                          >
                            {item.label}
                          </MuiLink>
                        ) : (
                          <MuiLink
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="depth2-title"
                            sx={{ color: 'inherit' }}
                          >
                            {item.label}
                          </MuiLink>
                        )
                      ) : (
                        <Typography className="depth2-title">{item.label}</Typography>
                      )}

                      {/* 3, 4 Depth 하위 메뉴 리스트 */}
                      <Box className="sitemap-sub-list">
                        {item.children?.map((sub) => (
                          <div key={sub.key} className="sitemap-link-item">
                            <SitemapItem item={sub} onInternalNavigate={() => setSitemapOpen(false)} />
                          </div>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
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
              navigate(to('/pp'), { replace: true })
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
