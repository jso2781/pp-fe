/**
 * 화면ID: KIDS-PP-US-MN-01
 * 화면명: 메인(홈)
 * 화면경로: /
 * 화면설명: 메인(홈)
 */
import { useMemo, useState, useRef, useEffect, useCallback} from 'react'
import type { MouseEvent } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Card, Grid, CardContent, Link, List, ListItem, Tab, Tabs, Typography, IconButton } from '@mui/material';
import { OpenInNew, PlayArrow, Pause } from '@mui/icons-material'
import { useTranslation } from 'react-i18next';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, Grid as SwiperGrid } from 'swiper/modules'; 
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMainContents } from '@/features/main/MainThunks';
import type { PostVO } from '@/features/main/MainTypes';
import { Link as RouterLink } from 'react-router-dom';
import { openExternalInNamedWindow } from '@/utils/externalWindow';

type TabKey = 'all' | 'youtube' | 'insta' | 'blog';
type SnsItem = { 
  type: 'youtube' | 'insta' | 'blog';
  title: string; 
  url: string;
  thumbnail: string;
  desc: string;
  videoId?: string;
  data?: PostVO;
};
type SnsTab = { label: string; items: SnsItem[] };
type SnsTabs = Record<TabKey, SnsTab>;

export default function Home() {
  const auth = useAppSelector((s) => s.auth);

  const { lang } = useParams<{ lang: string }>();

  // <title> 홈 페이지에 진입할 때 브라우저 타이틀을 강제로 초기화
  const { t } = useTranslation();
  useEffect(() => {
    document.title = '한국의약품안전관리원';
  }, [t]);


  const dispatch = useAppDispatch();
  const { current } = useAppSelector((s) => s.main);
  useEffect(() => {
    // persist로 복원된 데이터가 있으면 API 호출 스킵
    if (!current) {
      dispatch(selectMainContents());
    }
  }, [dispatch, current]);

  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<TabKey>('all');

  // 썸네일 이미지 URL 생성 헬퍼 함수
  const getThumbnailUrl = (item: { thmbFileNm?: string | null }) => {
    if (item.thmbFileNm) {
      // 백슬래시를 슬래시로 변환하고, 경로 끝의 슬래시 정리
      const normalizedFileName = item.thmbFileNm.replace(/^\/+/, '');
      return `${import.meta.env.VITE_THUMBNAIL_API_BASE_URL || 'api/pp'}/atch/thumb/${normalizedFileName}`;
    }
    return '/fe/img/img_test.png';
  };

  // ==========================================
  // Promotion Zone
  // ==========================================
  const [prevEl1, setPrevEl1] = useState<HTMLButtonElement | null>(null);
  const [nextEl1, setNextEl1] = useState<HTMLButtonElement | null>(null);
  const [isPlaying1, setIsPlaying1] = useState(true);
  const swiperRef1 = useRef<SwiperCore | null>(null);

  const toggleAutoplay1 = () => {
    if (swiperRef1.current?.autoplay) {
      if (isPlaying1) swiperRef1.current.autoplay.stop();
      else swiperRef1.current.autoplay.start();
      setIsPlaying1(!isPlaying1);
    }
  };

  // ==========================================
  // 기본서비스
  // ==========================================
  const [prevEl2, setPrevEl2] = useState<HTMLButtonElement | null>(null);
  const [nextEl2, setNextEl2] = useState<HTMLButtonElement | null>(null);
  const [isPlaying2, setIsPlaying2] = useState(true);
  const swiperRef2 = useRef<SwiperCore | null>(null);

  const toggleAutoplay2 = () => {
    if (swiperRef2.current?.autoplay) {
      if (isPlaying2) swiperRef2.current.autoplay.stop();
      else swiperRef2.current.autoplay.start();


      setIsPlaying2(!isPlaying2);
    }
  };

  const encodedAccessToken = auth?.acsTokenCn
    ? encodeURIComponent(auth.acsTokenCn)
    : '';

  const serviceShortcuts = useMemo(
    () => [
      { title: '국내 이상사례 온라인 보고', url: 'https://kaers.drugsafe.or.kr/', iconUrl: '/fe/img/shortcut_ico01.png' },
      { title: '의약품부작용피해구제 민원신청', url: 'https://nedrug.mfds.go.kr/cntnts/230', iconUrl: '/fe/img/shortcut_ico02.png' },
      { title: '마약류 통합관리 시스템', url: 'https://www.nims.or.kr/', iconUrl: '/fe/img/shortcut_ico03.png' },
      { title: '의약품 통합정보 시스템', url: 'https://nedrug.mfds.go.kr/index', iconUrl: '/fe/img/shortcut_ico04.png' },
      { title: '첨단바이오의약품 장기추적조사 시스템', url: 'https://ltfu.mfds.go.kr/main.do', iconUrl: '/fe/img/shortcut_ico05.png' },
      { title: '병원자료  분석네트워크', url: 'https://moa.drugsafe.or.kr/', iconUrl: '/fe/img/shortcut_ico06.png' },
      { title: '의약품 안전관리책임자 교육', url: `/ued/common/api/check.do?check=${encodedAccessToken}`, iconUrl: '/fe/img/shortcut_ico07.png' },
      { title: '안전정보공개', url: 'https://open.drugsafe.or.kr/', iconUrl: '/fe/img/shortcut_ico08.png' },
      { title: 'APEC 약물감시 전문교육훈련', url: 'https://kidscoe.drugsafe.or.kr/', iconUrl: '/fe/img/shortcut_ico09.png' },
    ],
    []
  );

  // ==========================================
  // SNS 탭
  // ==========================================
  const snsTabs = useMemo(() => {
    const youtube = {
      label: '유튜브',
      items: (current?.youtube || []).map((item) => ({
        type: 'youtube' as const,
        title: item.pstTtl || '',
        url: `https://www.youtube.com/embed/${item.videoId || ''}`,
        thumbnail: getThumbnailUrl(item),
        desc: item.pstCn || '',
        videoId: item.videoId || '',
        data: item,
      })),
    };

    const insta = {
      label: '인스타그램',
      items: (current?.insta || []).map((item) => ({
        type: 'insta' as const,
        title: item.pstTtl || '',
        url: item.videoId || 'https://www.instagram.com',
        thumbnail: getThumbnailUrl(item),
        desc: item.pstCn || '',
        data: item,
      })),
    };

    const blog = {
      label: '블로그',
      items: (current?.blog || []).map((item) => ({
        type: 'blog' as const,
        title: item.pstTtl || '',
        url: item.videoId || 'https://blog.naver.com',
        thumbnail: getThumbnailUrl(item),
        desc: item.pstCn || '',
        data: item,
      })),
    };

    // all_sns 사용
    const allItems: SnsItem[] = (current?.all_sns || []).map((item) => ({
      type: (item.snsType === '유튜브' ? 'youtube' : item.snsType === '인스타' ? 'insta' : 'blog') as 'youtube' | 'insta' | 'blog',
      title: item.pstTtl || '',
      url: item.videoId || (item.videoId ? `https://www.youtube.com/embed/${item.videoId}` : 'https://www.instagram.com'),
      thumbnail: getThumbnailUrl(item),
      desc: item.pstCn || '',
      videoId: item.videoId || '',
      data: item,
    }));

    return {
      all: {
        label: '전체',
        items: allItems,
      },
      youtube,
      insta,
      blog,
    };
  }, [current]);

  // SNS 슬라이드
  const swiperRefSns = useRef<SwiperCore | null>(null);
  const [isPlayingSns, setIsPlayingSns] = useState(true);
  const [prevElSns, setPrevElSns] = useState<HTMLButtonElement | null>(null);
  const [nextElSns, setNextElSns] = useState<HTMLButtonElement | null>(null);

  const toggleAutoplaySns = () => {
    const autoplay = swiperRefSns.current?.autoplay;
    if (autoplay) {
      isPlayingSns ? autoplay.stop() : autoplay.start();
      setIsPlayingSns(!isPlayingSns);
    }
  };

  // ==========================================
  // 기관소식
  // ==========================================
  const [newsTab, setNewsTab] = useState('notice');  

  // 게시판 url 정보 (공지사항, 보도자료, 뉴스레터, 카드뉴스)
  const bbsUrl1 = current?.urlInfos?.find((item) => item.taskCd === 'MN_BBS5')?.menuUrlAddr;
  const bbsUrl2 = current?.urlInfos?.find((item) => item.taskCd === 'MN_BBS6')?.menuUrlAddr;
  const bbsUrl3 = current?.urlInfos?.find((item) => item.taskCd === 'MN_BBS7')?.menuUrlAddr;
  const bbsUrl4 = current?.urlInfos?.find((item) => item.taskCd === 'MN_BBS8')?.menuUrlAddr;

  const newsData = useMemo(() => ({
    notice: {
      label: '공지사항',
      path: bbsUrl1 ?? '/pp/ko',
      items: (current?.notice || []).map((item) => ({
        id: item.pstSn || '',
        title: item.pstTtl || '',
        date: item.regDt ? item.regDt.split(' ')[0] : '',
        pstSn: item.pstSn,
        bbsId: item.bbsId,
      }))
    },
    press: {
      label: '보도자료',
      path: bbsUrl2 ?? '/pp/ko',
      items: (current?.bodo || []).map((item) => ({
        id: item.pstSn || '',
        title: item.pstTtl || '',
        date: item.regDt ? item.regDt.split(' ')[0] : '',
        pstSn: item.pstSn,
        bbsId: item.bbsId,
      }))
    },
    newsletter: {
      label: '뉴스레터',
      path: bbsUrl3 ?? '/pp/ko', 
      items: (current?.news || []).map((item) => ({
        id: item.pstSn || '',
        title: item.pstTtl || '',
        date: item.regDt ? item.regDt.split(' ')[0] : '',
        pstSn: item.pstSn,
        bbsId: item.bbsId,
      }))
    }
  }), [current]);

  // 현재 탭 데이터 추출
  const currentNews = newsData[newsTab as keyof typeof newsData];

  // ==========================================
  // 카드뉴스
  // ==========================================
  const [prevEl3, setPrevEl3] = useState<HTMLButtonElement | null>(null);
  const [nextEl3, setNextEl3] = useState<HTMLButtonElement | null>(null);
  const [isPlaying3, setIsPlaying3] = useState(true);
  const swiperRef3 = useRef<SwiperCore | null>(null);

  const toggleAutoplay3 = () => {
    if (swiperRef3.current?.autoplay) {
      if (isPlaying3) swiperRef3.current.autoplay.stop();
      else swiperRef3.current.autoplay.start();
      setIsPlaying3(!isPlaying3);
    }
  };  const doSearch = () => {
    const keyword = q.trim()
    navigate(`/pp/${lang}/search?q=${encodeURIComponent(keyword)}`)
  }

  // ==========================================
  // 팝업 레이어
  // ==========================================
  const [prevElPopup, setPrevElPopup] = useState<HTMLButtonElement | null>(null);
  const [nextElPopup, setNextElPopup] = useState<HTMLButtonElement | null>(null);
  const swiperRefPopup = useRef<SwiperCore | null>(null);
  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const [isPopupForceOpened, setIsPopupForceOpened] = useState(false);
  
  // 오늘 하루 열지 않기 기능 (로컬 스토리지) - 모든 팝업에 적용
  const POPUP_HIDE_TODAY_KEY = 'popup_hide_today_all';
  const isPopupHiddenToday = () => {
    const hiddenDate = localStorage.getItem(POPUP_HIDE_TODAY_KEY);
    if (!hiddenDate) return false;
    const today = new Date().toDateString();
    return hiddenDate === today;
  };

  const handleHideToday = () => {
    // 모든 팝업을 오늘 하루 숨기기
    const today = new Date().toDateString();
    localStorage.setItem(POPUP_HIDE_TODAY_KEY, today);
    setIsPopupForceOpened(false);
    setIsPopupClosed(true);
  };

  const handleCloseAll = () => {
    // localStorage 건드리지 않고 팝업만 닫기
    setIsPopupForceOpened(false);
    setIsPopupClosed(true);
  };

  useEffect(() => {
    const handleOpenPopupOnce = () => {
      setIsPopupClosed(false);
      setIsPopupForceOpened(true);
    };

    window.addEventListener('open-home-popup-once', handleOpenPopupOnce);
    return () => {
      window.removeEventListener('open-home-popup-once', handleOpenPopupOnce);
    };
  }, []);

  // 표시할 팝업 목록 (오늘 숨김 처리된 것 제외)
  const visiblePopups = useMemo(() => {
    if (isPopupClosed || (!isPopupForceOpened && isPopupHiddenToday())) {
      return [];
    }
    return (current?.popup || []).filter((popup) => popup.thmbFileNm);
  }, [current?.popup, isPopupClosed, isPopupForceOpened]);

  const handlePopupClick = (popup: PostVO) => {
    const url = popup.popupLnkgAddr || '';
    if (url) {
      openExternalInNamedWindow(url);
    }
  };
  

  // ==========================================
  // 팝업 레이어 웹접근성 포커스이동
  // ==========================================
  // 1. 필요한 Ref 선언
  const popupLayerRef = useRef<HTMLDivElement>(null);
  const isKeyboardUser = useRef(false);

  // 2. 입력 수단 감지 (마우스 vs 키보드)
  useEffect(() => {
    const handleKeyDownType = () => (isKeyboardUser.current = true);
    const handleMouseDownType = () => (isKeyboardUser.current = false);
    window.addEventListener('keydown', handleKeyDownType);
    window.addEventListener('mousedown', handleMouseDownType);
    return () => {
      window.removeEventListener('keydown', handleKeyDownType);
      window.removeEventListener('mousedown', handleMouseDownType);
    };
  }, []);

  // 3. 팝업 종료 후 포커스 처리 함수
  const handleFocusAfterClose = useCallback(() => {
    if (isKeyboardUser.current) {
      // [키보드로 닫을 때] 스킵 네비게이션으로 이동
      const skipLink = document.querySelector('#skip-navigation a') as HTMLElement;
      skipLink?.focus();
    } else {
      // [마우스로 닫을 때] 
      // 1. 포커스를 완전히 해제하여 다음 Tab 시 처음부터 시작하게 함
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      // 2. 또는 명시적으로 ex)헤더 로고(첫 번째 포커스 요소)로 보냄
      const logoLink = document.querySelector('.top-link button') as HTMLElement;
      if (logoLink) {
        // 마우스 사용자에게 테두리가 보이지 않도록 포커스만 옮김
        logoLink.focus({ preventScroll: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  // 4. 팝업 상태 감시 및 제어
  useEffect(() => {
    if (visiblePopups.length > 0) {
      const focusTimer = setTimeout(() => {
        popupLayerRef.current?.focus();
      }, 100);
      return () => clearTimeout(focusTimer);
    } else if (isPopupClosed) {
      handleFocusAfterClose();
    }
  }, [visiblePopups.length, isPopupClosed, handleFocusAfterClose]);

  // 5. 키보드 이벤트 핸들러 (포커스 트랩 유지)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      isKeyboardUser.current = true;
      handleCloseAll();
      return;
    }

    if (e.key === 'Tab') {
      if (!popupLayerRef.current) return;
      const focusableElements = popupLayerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement || document.activeElement === popupLayerRef.current) {
          e.preventDefault();
          lastElement.focus();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <Box className="main-container">
      {/* 팝업 레이어 */}
      {visiblePopups.length > 0 && (
        <Box 
          className="popup-layer"
          ref={popupLayerRef}       // 1. Ref 연결
          tabIndex={-1}              // 2. 포커스 가능하게 설정
          role="dialog"              // 3. 대화 상자 역할
          aria-modal="true"          // 4. 모달 처리
          aria-label="공지사항 팝업"  // 5. 스크린 리더 안내
          onKeyDown={handleKeyDown}  // 6. ESC 키 이벤트
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              maxWidth: '1200px',
              width: '100%',
              maxHeight: '90vh',
            }}
          >
            <Swiper
              onSwiper={(swiper) => (swiperRefPopup.current = swiper)}
              key={prevElPopup && nextElPopup ? 'readyPopup' : 'not-readyPopup'}
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={3}
              slidesPerGroup={3}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              }}
              navigation={{ 
                prevEl: prevElPopup, 
                nextEl: nextElPopup 
              }}
              className="popup-swiper"
              style={{ padding: '0 10px' }}
            >
              {visiblePopups.map((popup, index) => (                            
                <SwiperSlide key={`${popup.atchFileNm ?? 'file'}-${index}`} style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                  <Card
                    sx={{
                      cursor: popup.popupLnkgAddr ? 'pointer' : 'default',
                      width: '400px', // 팝업사이즈 고정
                      height: '400px', // 팝업사이즈 고정
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '12px',
                      padding: 0,
                      '& .MuiCardContent-root': {
                        padding: 0,
                        '&:last-child': {
                          paddingBottom: 0,
                        },
                      },
                    }}
                    onClick={() => handlePopupClick(popup)}
                  >
                    <CardContent sx={{ p: 0, m: 0, flex: 1, display: 'flex', flexDirection: 'column', height: '100%', width: '100%', minHeight: 0 }}>
                      {popup.thmbFileNm && (
                        <Box
                          component="img"
                          src={getThumbnailUrl(popup)}
                          alt={popup.popupTtl || ''}
                          sx={{
                            width: '100%',
                            height: '100%',
                            minWidth: 0,
                            minHeight: 0,
                            display: 'block',
                            objectFit: 'cover',
                            flex: '1 1 auto',
                          }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 네비게이션 버튼 (3개 이상일 때만 표시) */}
            {visiblePopups.length >= 3 && (
              <>
                <button
                  ref={setPrevElPopup}
                  className="swiper-button-prev popup-prev"
                  aria-label="이전 팝업"
                  style={{
                    position: 'absolute',
                    left: '-50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                  }}
                />
                <button
                  ref={setNextElPopup}
                  className="swiper-button-next popup-next"
                  aria-label="다음 팝업"
                  style={{
                    position: 'absolute',
                    right: '-50px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                  }}
                />
              </>
            )}

            {/* 하단 버튼 영역 */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={handleHideToday}
                sx={{ 
                  minWidth: '180px',
                  py: 1.5,
                  px: 3,                  
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: '#ebf1fd', // 연한 파란색
                  color: '#0a4fcf',
                  '&:hover': {
                    backgroundColor: '#bccff4',
                  }
                }}
              >
                오늘 하루 열지 않기
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseAll}
                sx={{ 
                  minWidth: '180px',
                  py: 1.5,
                  px: 3,
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: '#246df3', // 진한 파란색
                  '&:hover': {
                    backgroundColor: '#1565C0',
                  }
                }}
              >
                전체 닫기
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* 메인비쥬얼 */}
      <Box 
        id="content"
        component="section" 
        className="section main-promotion-section" 
        sx={{
          // backgroundImage: current?.mainImageUrl 
          //   ? `url("${current.mainImageUrl}")` 
          //   : 'url("/fe/img/main_bg01.png")'
          backgroundImage: `url("${current?.mainImageUrl}")`
        }}
      >
        <Box className="inner">
          <Box className="slogan-group">
            <Typography className="slogan-title">의약품 안전관리로 <span>국민을 건강하게</span></Typography>
            <Typography className="slogan-desc">
              의약품 안전관리로 국민의 건강과 안전을 확보하고 <br />
              국제적 수준 안전관리체계를 마련하여 그 혜택을 여러분께 <br />
              돌려드리는 공공 기관의 사명과 책임을 다할 것입니다.
            </Typography>
          </Box>
          
          <Box className="promotion-area">
            <Swiper
              className="promotion-swiper"
              onSwiper={(swiper) => (swiperRef1.current = swiper)} 
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{ prevEl: prevEl1, nextEl: nextEl1 }}
              pagination={{ clickable: true, type: 'fraction', el: '.promotion-pagination' }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={current?.promotion && current.promotion.length > 1}
              key={prevEl1 && nextEl1 ? 'ready1' : 'not-ready1'}
            >
              {(current?.promotion && current.promotion.length > 0) ? (
                current.promotion.map((item, index) => {
                  const promotionUrl = item.videoId || '';

                  return (
                    <SwiperSlide key={item.pstSn || index}>
                      <Box
                        component={promotionUrl ? 'a' : 'div'}
                        href={promotionUrl || undefined}
                        className="slide-item"
                        sx={{
                          display: 'block',
                          cursor: promotionUrl ? 'pointer' : 'default',
                        }}
                        onClick={(e: MouseEvent<HTMLElement>) => {
                          if (!promotionUrl) return;
                          e.preventDefault();
                          openExternalInNamedWindow(promotionUrl);
                        }}
                      >
                        <img 
                          src={getThumbnailUrl(item)} 
                          alt={item.pstTtl || `프로모션 배너 ${index + 1}`} 
                          style={{
                            width: '100%',
                            height: '100%',
                          }} 
                        />
                        {promotionUrl && (
                          <span className="sr-only">
                            {`${item.pstTtl || `프로모션 배너 ${index + 1}`} 새창 열림`}
                          </span>
                        )}
                      </Box>
                    </SwiperSlide>
                  );
                })
              ) : (
                <>
                  {/* <SwiperSlide>
                    <Box className="slide-item" sx={{ backgroundImage: 'url("/fe/img/img_test_banner01.jpg")' }} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box className="slide-item" sx={{ backgroundImage: 'url("/fe/img/img_test_banner02.jpg")' }} />
                  </SwiperSlide> */}
                </>
              )}
            </Swiper>
            {/* 컨트롤 페이지네이션 , 재생/정지 */}
            <Box className="pagination-wrapper">
              <Typography className="swiper-tag">Promotion Zone</Typography>
              <Box className="promotion-pagination"></Box>
              <Box className="play-control">
                <IconButton 
                  className={`btn-play-pause ${isPlaying1 ? 'is-playing' : 'is-paused'}`} 
                  onClick={toggleAutoplay1} 
                  size="small"
                  aria-label={isPlayingSns ? "자동재생 정지" : "자동재생 시작"}
                >
                  {isPlaying1 ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
                </IconButton>
              </Box>
              <Box className="swiper-nav-group"> 
                <button ref={setPrevEl1} className="swiper-button-prev promotion-prev" aria-label="이전 슬라이드"></button>
                <button ref={setNextEl1} className="swiper-button-next promotion-next" aria-label="다음 슬라이드"></button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 기본서비스 */}
      <Box component="section" className="section main-service-section">
        <Box className="inner">
          <h3 className="section-title">기본<span>서비스</span></h3>
          <Box className="service-area">
            <Swiper
              onSwiper={(swiper) => (swiperRef2.current = swiper)}
              key={prevEl2 && nextEl2 ? 'ready2' : 'not-ready2'}
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={24}
              navigation={{ prevEl: prevEl2, nextEl: nextEl2 }}
              pagination={{ clickable: true, type: 'bullets', el: '.service-pagination' }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={false}
              breakpoints={{
                600: { slidesPerView: 3, slidesPerGroup: 1 }, 
                900: { slidesPerView: 4, slidesPerGroup: 1 },
                1200: { slidesPerView: 5, slidesPerGroup: 1 },
              }}
              className="service-swiper"
            >
              {serviceShortcuts.map((s, index) => (
                <SwiperSlide key={s.title}>
                  <a className="shortcut-item" href={s.url} target="_blank" rel="noreferrer">
                    <Box className="icon-bg" style={{ backgroundImage: `url(${s.iconUrl})` } as React.CSSProperties} aria-hidden="true" />
                    <span className="shortcut-text">{s.title}</span>
                    <Box component="span" className="shortcut-link-box">
                      <span className="shortcut-link-text">바로가기</span>
                      <OpenInNew className="shortcut-icon" />
                    </Box>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* 컨트롤 페이지네이션 , 재생/정지 */}
            <Box className="pagination-wrapper">
              <Box className="service-pagination"></Box>
              <Box className="play-control">
                <IconButton className={`btn-play-pause ${isPlaying2 ? 'is-playing' : 'is-paused'}`} onClick={toggleAutoplay2} size="small">
                  {isPlaying2 ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
                </IconButton>
              </Box>
              <Box className="swiper-nav-group"> 
                <button ref={setPrevEl2} className="swiper-button-prev service-prev" aria-label="이전 슬라이드"></button>
                <button ref={setNextEl2} className="swiper-button-next service-next" aria-label="다음 슬라이드"></button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* SNS */}
      <Box component="section" className="section main-sns-section">
        <Box className="inner">
          <h3 className="section-title">한국의약품안전관리원<span>SNS 지금!</span></h3>
          <Box className="sns-area">
            <Tabs 
              value={tab} 
              onChange={(_, v) => setTab(v)} 
              className="sns-tabs"
              aria-label="SNS 소식 카테고리 선택"
              sx={{
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab className="tab-item tab-all" value="all" label="전체" id="tab-all" aria-controls="panel-all" />
              <Tab className="tab-item tab-youtube" value="youtube" label="유튜브" id="tab-youtube" aria-controls="panel-youtube" />
              <Tab className="tab-item tab-insta" value="insta" label="인스타그램" id="tab-insta" aria-controls="panel-insta" />
              <Tab className="tab-item tab-blog" value="blog" label="블로그" id="tab-blog" aria-controls="panel-blog" />
            </Tabs>

            <Box 
              role="tabpanel" 
              id={`panel-${tab}`} 
              aria-labelledby={`tab-${tab}`}
              tabIndex={0}
              className="sns-tabpanel"
            >
              {tab === 'all' ? (
                /* 전체 탭: 스와이퍼 구조 */
                <Box className="sns-banner">
                  <Swiper
                    onSwiper={(swiper) => (swiperRefSns.current = swiper)}
                    key={prevElSns && nextElSns ? 'readySns' : 'not-readySns'}
                    modules={[Navigation, Pagination, A11y, Autoplay, SwiperGrid]} 
                    spaceBetween={20}
                    slidesPerView={4}
                    slidesPerGroup={4}
                    grid={{
                      rows: 1,
                      fill: 'row'
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        grid: { rows: 1 } 
                      },
                      768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        grid: { rows: 1 }
                      },
                      1200: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        grid: { rows: 1 }
                      }
                    }}
                    navigation={{ prevEl: prevElSns, nextEl: nextElSns }}
                    pagination={{ clickable: true, type: 'fraction', el: '.sns-pagination' }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="sns-swiper"
                  >
                    {snsTabs.all.items.map((it, index) => (
                      <SwiperSlide key={`all-${it.data?.pstSn || index}`}>
                        <Card className="sns-card">
                          <CardContent>
                            {it.type === 'youtube' && it.videoId ? (
                              <Box className="sns-link youtube-embed">
                                <Box className="thumb-area">
                                  <Box
                                    component="iframe"
                                    src={`https://www.youtube.com/embed/${it.videoId}`} 
                                    title={`${it.title} 안내 영상`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    sandbox="allow-scripts allow-same-origin allow-presentation"
                                    allowFullScreen
                                    className="iframe"
                                    sx={{ width: '100%', height: '100%', border: 'none' }}
                                  />
                                </Box>
                                <Box className="info-area">
                                  <Typography className={`sns-label ${it.type}`}>
                                    {it.type === 'youtube' ? '유튜브' : it.type === 'insta' ? '인스타그램' : '블로그'}
                                  </Typography>
                                  <Typography className="sns-title">{it.title}</Typography>
                                  <Typography className="sns-desc">
                                    {it.desc || ''}
                                  </Typography>
                                </Box>
                              </Box>
                            ) : (
                              <Link href={it.url} target="_blank" rel="noreferrer" title="새창 열림" className="sns-link">
                                <Box className="thumb-area">
                                  <img 
                                    src={it.thumbnail || '/fe/img/img_test.png'} 
                                    alt={`${it.title} 썸네일 이미지`}
                                    style={{objectFit: 'unset'}}
                                  />
                                </Box>
                                <Box className="info-area">
                                  <Typography className={`sns-label ${it.type}`}>
                                    {it.type === 'youtube' ? '유튜브' : it.type === 'insta' ? '인스타그램' : '블로그'}
                                  </Typography>
                                  <Typography className="sns-title">{it.title}</Typography>
                                  <Typography className="sns-desc">
                                    {it.desc || ''}
                                  </Typography>
                                </Box>
                                <Box component="span" className="sr-only"> (새창 열림)</Box>
                              </Link>
                            )}
                          </CardContent>
                        </Card>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <Box className="pagination-wrapper">
                    <Box className="sns-pagination"></Box>
                    <Box className="play-control">
                      <IconButton 
                        className={`btn-play-pause ${isPlayingSns ? 'is-playing' : 'is-paused'}`} 
                        onClick={toggleAutoplaySns} 
                        size="small"
                        aria-label={isPlayingSns ? "자동재생 정지" : "자동재생 시작"}
                      >
                        {isPlayingSns ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
                      </IconButton>
                    </Box>
                    <Box className="swiper-nav-group">
                      <button ref={setPrevElSns} className="swiper-button-prev sns-prev" aria-label="이전 슬라이드"></button>
                      <button ref={setNextElSns} className="swiper-button-next sns-next" aria-label="다음 슬라이드"></button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                /* 개별 탭: 리스트 */
                <Box className="sns-list">
                  {(snsTabs[tab]?.items || []).map((it, index) => (
                    <Card key={`${tab}-${it.data?.pstSn || index}`} className="sns-card">
                      <CardContent>
                        {it.type === 'youtube' && it.videoId ? (
                          <Box className="sns-link youtube-embed">
                            <Box className="thumb-area">
                              <Box
                                component="iframe"
                                src={`https://www.youtube.com/embed/${it.videoId}`} 
                                title={`${it.title} 안내 영상`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                sandbox="allow-scripts allow-same-origin allow-presentation"
                                allowFullScreen
                                className="iframe"
                                sx={{ width: '100%', height: '100%', border: 'none' }}
                              />
                            </Box>
                            <Box className="info-area">
                              <Typography className="sns-title">{it.title}</Typography>
                              <Typography className="sns-desc">
                                {it.desc || ''}
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          <Link href={it.url} target="_blank" rel="noreferrer" title="새창 열림" className="sns-link">
                            <Box className="thumb-area">
                              <img 
                                src={it.thumbnail || '/fe/img/img_test.png'} 
                                alt={`${it.title} 썸네일 이미지`}
                                style={{objectFit: 'unset'}}
                              />                              
                            </Box>
                            <Box className="info-area">
                              <Typography className="sns-title">{it.title}</Typography>
                              <Typography className="sns-desc">
                                {it.desc || ''}
                              </Typography>
                            </Box>
                            <Box component="span" className="sr-only"> (새창 열림)</Box>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
            {/* sns-tabpanel */}
          </Box>
        </Box>
      </Box>

      <Box component="section" className="section main-board-section">
        <Box className="inner">
          {/* 기관소식 */}
          <Box className="news-area">
            <h3 className="section-title">기관<span>소식</span></h3>
            <Box className="news-content">
              <Tabs 
                value={newsTab} 
                onChange={(_, v) => setNewsTab(v)} 
                className="news-tabs"
                aria-label="기관소식 카테고리 선택"
                sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
              >
                <Tab className="tab-item" label="공지사항" value="notice" id="news-tab-notice" aria-controls="news-panel-notice" />
                <Tab className="tab-item" label="보도자료" value="press" id="news-tab-press" aria-controls="news-panel-press" />
                <Tab className="tab-item" label="뉴스레터" value="newsletter" id="news-tab-newsletter" aria-controls="news-panel-newsletter" />
              </Tabs>

              <Box 
                role="tabpanel" 
                id={`news-panel-${newsTab}`} 
                aria-labelledby={`news-tab-${newsTab}`}
                tabIndex={0}
                className="news-tabpanel"
              >
                <Box className="news-board-wrap">
                  <Box className="board-header">
                    <Typography className="sr-only">
                      {currentNews.label}
                    </Typography>
                    <button 
                      type="button" 
                      className="btn-more-view"
                      onClick={() => navigate(currentNews.path)}
                      aria-label={`${currentNews.label} 더보기`}
                    >
                      더보기 +
                    </button>
                  </Box>

                  <Box className="board-body">
                    <List className="board-list">
                      {currentNews.items.map((item) => (
                        <ListItem key={item.id || item.pstSn} className="board-item" disableGutters>
                          <a 
                            href={item.pstSn ? `${currentNews.path}/${item.pstSn}` : '#'} 
                            className="board-link"
                            onClick={(e) => {
                              if (item.pstSn) {
                                e.preventDefault();
                                navigate(`${currentNews.path}/${item.pstSn}`);
                              }
                            }}
                          >
                            <Typography className="subject">{item.title}</Typography>
                            <Typography className="date">{item.date}</Typography>
                          </a>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>

              </Box>
            </Box>
          </Box>

          {/* 카드뉴스 */}
          <Box className="card-news-area">
            <h3 className="section-title">카드<span>뉴스</span></h3>
            <Box className="card-news-content">
              <Swiper
                className="card-news-swiper"
                onSwiper={(swiper) => (swiperRef3.current = swiper)}
                modules={[Navigation, Pagination, Autoplay, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{ 
                  prevEl: prevEl3, 
                  nextEl: nextEl3 
                }}
                pagination={{ 
                  clickable: true, 
                  type: 'fraction', 
                  el: '.card-news-pagination' 
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={current?.card && current.card.length > 1}
                // key 값 변경 (리렌더링 시 ref 바인딩을 위함)
                key={prevEl3 && nextEl3 ? 'ready3' : 'not-ready3'}
              >
                {(current?.card && current.card.length > 0) ? (
                  current.card.map((item, index) => (
                    <SwiperSlide key={item.pstSn || index}   style={{
                      minHeight: '100px',
                    }}>
                      <Box
                        component={RouterLink}
                        to={bbsUrl4 ? `${bbsUrl4}/${item.pstSn}` : '/pp/ko'}                        
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={getThumbnailUrl(item)}
                          alt={item.pstTtl || `카드뉴스 이미지 ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                        />
                        <span className="sr-only">{item.pstTtl || `카드뉴스 ${index + 1} 상세보러가기`}</span>
                      </Box>
                    </SwiperSlide>
                  ))
                ) : (
                  <>
                    <SwiperSlide>
                      <Box className="slide-item" sx={{ backgroundImage: 'url("/fe/img/img_test_banner03.png")' }}>
                        <a href="#none" className="slide-link"><span className="sr-only">카드뉴스 1 상세보러가기</span></a>
                      </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Box className="slide-item" sx={{ backgroundImage: 'url("/fe/img/img_test_banner03.png")' }}>
                        <a href="#none" className="slide-link"><span className="sr-only">카드뉴스 2 상세보러가기</span></a>
                      </Box>
                    </SwiperSlide>
                  </>
                )}
              </Swiper>

              <Box className="pagination-wrapper">
                <Box className="card-news-pagination"></Box>
                <Box className="play-control">
                  <IconButton 
                    className={`btn-play-pause ${isPlaying3 ? 'is-playing' : 'is-paused'}`} 
                    onClick={toggleAutoplay3} size="small">
                    {isPlaying3 ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
                  </IconButton>
                </Box>
                <Box className="swiper-nav-group"> 
                  <button ref={setPrevEl3} className="swiper-button-prev card-news-prev" aria-label="이전 슬라이드"></button>
                  <button ref={setNextEl3} className="swiper-button-next card-news-next" aria-label="다음 슬라이드"></button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
