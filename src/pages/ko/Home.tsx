import { useMemo, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Grid, CardContent, Link, List, ListItem, Tab, Tabs, Typography, IconButton } from '@mui/material';
import { OpenInNew, PlayArrow, Pause } from '@mui/icons-material'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, Grid as SwiperGrid } from 'swiper/modules'; 
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

type TabKey = 'all' | 'youtube' | 'insta' | 'blog';
type SnsItem = { title: string; url: string };
type SnsTab = { label: string; items: SnsItem[] };
type SnsTabs = Record<TabKey, SnsTab>;

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<TabKey>('all');


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

  const serviceShortcuts = useMemo(
    () => [
      { title: '국내 이상사례 온라인 보고', url: 'https://kaers.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: '의약품부작용피해구제 민원신청', url: 'https://nedrug.mfds.go.kr/cntnts/230', iconUrl: '/img/shortcut_ico01.png' },
      { title: '마약류 통합관리 시스템', url: 'https://www.nims.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: '의약품 통합정보 시스템', url: 'https://nedrug.mfds.go.kr/index', iconUrl: '/img/shortcut_ico01.png' },
      { title: '첨단바이오의약품 장기추적조사 시스템', url: 'https://ltfu.mfds.go.kr/main.do', iconUrl: '/img/shortcut_ico01.png' },
      { title: '병원자료 분석네트워크', url: 'https://moa.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: '의약품 안전관리책임자 교육', url: 'https://pvtraining.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: '안전정보공개', url: 'https://open.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: 'APEC 약물감시 전문교육훈련', url: 'https://kidscoe.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
    ],
    []
  );

  // ==========================================
  // SNS 탭
  // ==========================================
  const snsTabs = useMemo(() => {
  const youtube = {
      label: '유튜브',
      items: [
        { type: 'youtube', title: '장애인을 위한 의약품·의약외품 표시 제도 및 서비스', url: 'https://youtu.be', thumbnail: '', desc: '' },
        { type: 'youtube', title: '열탈진과 열사병, 어떻게 다를까요?', url: 'https://youtu.be', thumbnail: '', desc: '' },
        { type: 'youtube', title: '자라나라 머리머리! 두피 건강 꽉! 잡아요!', url: 'https://youtu.be', thumbnail: '', desc: '' },
        { type: 'youtube', title: '간염의 A, B, C!', url: 'https://youtu.be', thumbnail: '', desc: '' },
      ],
    };

    const insta = {
      label: '인스타그램',
      items: [
        { type: 'insta', title: '포스터·카툰 공모전 개최', url: 'https://www.instagram.com', thumbnail: '', desc: '' },
        { type: 'insta', title: '집중호우 상황별 행동수칙', url: 'https://www.instagram.com', thumbnail: '', desc: '' },
        { type: 'insta', title: '폭염대비 온열질환 예방수칙', url: 'https://www.instagram.com', thumbnail: '', desc: '' },
        { type: 'insta', title: '마약류 식욕억제제, 올바르게 사용하는 법', url: 'https://www.instagram.com', thumbnail: '', desc: '' },
      ],
    };

    const blog = {
      label: '블로그',
      items: [
        { type: 'blog', title: '의약품 부작용 피해구제 감동사례 2탄', url: 'https://blog.naver.com', thumbnail: '', desc: '' },
        { type: 'blog', title: '첨단바이오 국내동향', url: 'https://blog.naver.com', thumbnail: '', desc: '' },
        { type: 'blog', title: '병원에서 사용하는 약물은 어떻게 감시되고 있을까?', url: 'https://blog.naver.com', thumbnail: '', desc: '' },
        { type: 'blog', title: '동물용 마약류의 범죄목적 사용 장면', url: 'https://blog.naver.com', thumbnail: '', desc: '' },
      ],
    };

    return {
      all: {
        label: '전체',
        items: [...youtube.items, ...insta.items, ...blog.items],
      },
      youtube,
      insta,
      blog,
    };
  }, []);

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

  const newsData = useMemo(() => ({
    notice: {
      label: '공지사항',
      path: '/ko/notice',
      items: [
        { id: 1, title: '1[입찰공고] 2026년 정보시스템 통합 운영관리(긴급입찰)', date: '2025-12-03' },
        { id: 2, title: '2임상시험용의약품 치료목적사용 상담 및 안내 사업 종료 안내', date: '2025-12-05' },
        { id: 3, title: '3[수의시담] 2026~2027년 마약류통합정보관리센터 정보시스템 운영관리 사업', date: '2025-12-15' },
        { id: 4, title: '4[수의시담] 2026~2027년 마약류통합정보관리센터 정보시스템 운영관리 사업', date: '2025-12-15' },
        { id: 5, title: '5[수의시담] 2026~2027년 마약류통합정보관리센터 정보시스템 운영관리 사업', date: '2025-12-15' },
      ]
    },
    press: {
      label: '보도자료',
      path: '/ko/press',
      items: [
        { id: 1, title: '보도자료: 신규 정보시스템 구축 완료 보고회 개최', date: '2025-12-10' },
        { id: 2, title: '디지털 전환 가속화를 위한 유관기관 협력 강화', date: '2025-12-08' },
      ]
    },
    newsletter: {
      label: '뉴스레터',
      path: '/ko/newsletter',
      items: [
        { id: 1, title: '2025년 12월호: 이달의 주요 IT 트렌드 소식', date: '2025-12-01' },
        { id: 2, title: '뉴스레터 구독자 대상 만족도 조사 결과 안내', date: '2025-11-20' },
      ]
    }
  }), []);

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
  };



  const doSearch = () => {
    const keyword = q.trim()
    navigate(`/ko/search?q=${encodeURIComponent(keyword)}`)
  }


  return (
    <Box className="main-container">
      {/* 메인비쥬얼 */}
      <Box component="section" className="section main-promotion-section">
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
              loop={true}
              key={prevEl1 && nextEl1 ? 'ready1' : 'not-ready1'}
            >
              <SwiperSlide>
                <Box className="slide-item">
                  <img src="/img/img_test_banner01.jpg" alt="프로모션 배너 1" />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box className="slide-item">
                  <img src="/img/img_test_banner02.jpg" alt="프로모션 배너 2" />
                </Box>
              </SwiperSlide>
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
                    slidesPerView={2}
                    grid={{
                      rows: 2,
                      fill: 'row'
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        grid: { rows: 1 } 
                      },
                      640: {
                        slidesPerView: 2,
                        grid: { rows: 2 }
                      }
                    }}
                    navigation={{ prevEl: prevElSns, nextEl: nextElSns }}
                    pagination={{ clickable: true, type: 'fraction', el: '.sns-pagination' }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="sns-swiper"
                  >
                    {snsTabs.all.items.map((it, index) => (
                      <SwiperSlide key={`all-${index}`}>
                        <Card className="sns-card">
                          <CardContent>
                            <Link href={it.url} target="_blank" rel="noreferrer" title="새창 열림" className="sns-link">
                              <Box className="thumb-area">
                                <img src={it.thumbnail || '/img/img_test.png'} alt="" />
                              </Box>
                              <Box className="info-area">
                                <Typography className="sns-title">{it.title}</Typography>
                                <Typography className="sns-desc">
                                  {it.desc || '설명 문구가 들어가는 자리입니다. 데이터에 맞게 표시됩니다.'}
                                </Typography>
                                <Typography className={`sns-label ${it.type}`}>
                                  {it.type === 'youtube' ? '유튜브' : it.type === 'insta' ? '인스타그램' : '블로그'}
                                </Typography>
                              </Box>
                              <Box component="span" className="sr-only"> (새창 열림)</Box>
                            </Link>
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
                  {snsTabs[tab].items.map((it, index) => (
                    <Card key={`${tab}-${index}`} className="sns-card">
                      <CardContent>
                        <Link href={it.url} target="_blank" rel="noreferrer" title="새창 열림" className="sns-link">
                          <Box className="thumb-area">
                            <img src={it.thumbnail || '/img/img_test.png'} alt="" />
                          </Box>
                          <Box className="info-area">
                            <Typography className="sns-title">{it.title}</Typography>
                            <Typography className="sns-desc">
                              {it.desc || '설명 문구가 들어가는 자리입니다.'}
                            </Typography>
                            {/* <Typography className={`sns-label ${it.type}`}>
                              {it.type === 'youtube' ? '유튜브' : it.type === 'insta' ? '인스타그램' : '블로그'}
                            </Typography> */}
                          </Box>
                          <Box component="span" className="sr-only"> (새창 열림)</Box>
                        </Link>
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
                        <ListItem key={item.id} className="board-item" disableGutters>
                          <a href={`${currentNews.path}/${item.id}`} className="board-link">
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
                loop={true}
                key={prevEl3 && nextEl3 ? 'ready3' : 'not-ready3'}
              >
                <SwiperSlide>
                  <Box className="slide-item">
                    <img src="/img/img_test_banner03.png" alt="카드뉴스 1"/>
                    <a href="#none" className="slide-link">
                      <span className="sr-only">카드뉴스 1 상세보러가기</span>
                    </a>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box className="slide-item">
                    <img src="/img/img_test_banner03.png" alt="카드뉴스 2"/>
                    <a href="#none" className="slide-link">
                      <span className="sr-only">카드뉴스 2 상세보러가기</span>
                    </a>
                  </Box>
                </SwiperSlide>
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
