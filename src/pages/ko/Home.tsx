import { useMemo, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardActions, CardContent, Link, List, ListItem, ListItemText, Stack, Tab, Tabs, TextField, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ChevronRight, OpenInNew, PlayArrow, Pause } from '@mui/icons-material'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper'; // 타입 지원
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type TabKey = 'youtube' | 'insta' | 'blog';
type SnsItem = { title: string; url: string };
type SnsTab = { label: string; items: SnsItem[] };
type SnsTabs = Record<TabKey, SnsTab>;

export default function Home() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabKey>('youtube')
  const [q, setQ] = useState('')

  // service-swiper 버튼 엘리먼트를 담을 상태 선언
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  // 섹션 1 상단 배너
  const [isPlaying1, setIsPlaying1] = useState(true);
  const swiperRef1 = useRef<SwiperCore | null>(null);

  const toggleAutoplay1 = () => {
    if (swiperRef1.current?.autoplay) {
      if (isPlaying1) swiperRef1.current.autoplay.stop();
      else swiperRef1.current.autoplay.start();
      setIsPlaying1(!isPlaying1);
    }
  };

  // 섹션 2 서비스 슬라이더
  const [isPlaying2, setIsPlaying2] = useState(true);
  const swiperRef2 = useRef<SwiperCore | null>(null);

  const toggleAutoplay2 = () => {
    if (swiperRef2.current?.autoplay) {
      if (isPlaying2) swiperRef2.current.autoplay.stop();
      else swiperRef2.current.autoplay.start();
      setIsPlaying2(!isPlaying2);
    }
  };

  const systemCards = useMemo(
    () => [
      {
        title: '마약류통합관리시스템',
        url: 'https://www.nims.or.kr',
        desc:
          '한국의약품안전관리원은 마약류관리에 관한 법률에 따라 마약류통합정보관리센터로 지정되었습니다.',
      },
      {
        title: '의약품 통합정보시스템',
        url: 'https://nedrug.mfds.go.kr',
        desc:
          '약사법에 따라 식품의약품안전처로부터 의약품통합정보시스템을 위탁받아 운영하고 있습니다.',
      },
      {
        title: '첨단바이오의약품 장기추적조사 시스템',
        url: 'https://ltfu.mfds.go.kr',
        desc:
          '첨단재생바이오법에 따라 첨단바이오의약품 규제과학센터로 지정되어 운영합니다.',
      },
    ],
    []
  )

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

  const snsTabs = useMemo<SnsTabs>(
    () => ({
      youtube: {
        label: '유튜브',
        items: [
          { title: '장애인을 위한 의약품·의약외품 표시 제도 및 서비스', url: 'https://youtu.be' },
          { title: '열탈진과 열사병, 어떻게 다를까요?', url: 'https://youtu.be' },
          { title: '자라나라 머리머리! 두피 건강 꽉! 잡아요!', url: 'https://youtu.be' },
          { title: '간염의 A, B, C!', url: 'https://youtu.be' },
        ],
      },
      insta: {
        label: '인스타그램',
        items: [
          { title: '포스터·카툰 공모전 개최', url: 'https://www.instagram.com' },
          { title: '집중호우 상황별 행동수칙', url: 'https://www.instagram.com' },
          { title: '폭염대비 온열질환 예방수칙', url: 'https://www.instagram.com' },
          { title: '마약류 식욕억제제, 올바르게 사용하는 법', url: 'https://www.instagram.com' },
        ],
      },
      blog: {
        label: '블로그',
        items: [
          { title: '의약품 부작용 피해구제 감동사례 2탄', url: 'https://blog.naver.com' },
          { title: '첨단바이오 국내동향', url: 'https://blog.naver.com' },
          { title: '병원에서 사용하는 약물은 어떻게 감시되고 있을까?', url: 'https://blog.naver.com' },
          { title: '동물용 마약류의 범죄목적 사용 장면', url: 'https://blog.naver.com' },
        ],
      },
    }),
    []
  )

  const notices = useMemo(
    () => [
      { title: '[입찰공고] 2026년 정보시스템 통합 운영관리(긴급입찰)', date: '2025-12-03' },
      { title: '임상시험용의약품 치료목적사용 상담 및 안내 사업 종료 안내', date: '2025-12-05' },
      { title: '[수의시담] 2026~2027년 마약류통합정보관리센터 정보시스템 운영관리 사업', date: '2025-12-15' },
    ],
    []
  )

  const doSearch = () => {
    const keyword = q.trim()
    navigate(`/ko/search?q=${encodeURIComponent(keyword)}`)
  }


  return (
    <Box className="main-container">
      {/* 메인비쥬얼 */}
      <Box component="section" className="section-01">
        <Box className="inner">
          <Box className="slogan-group">
            <Typography className="slogan-title">
              의약품 안전관리로 <span>국민을 건강하게</span>
            </Typography>
            <Typography className="slogan-desc">
              의약품 안전관리로 국민의 건강과 안전을 확보하고 <br />
              국제적 수준 안전관리체계를 마련하여 그 혜택을 여러분께 <br />
              돌려드리는 공공 기관의 사명과 책임을 다할 것입니다.
          </Typography>
          </Box>
          <Box className="promotion-banner" component="section" aria-label="홍보존 슬라이드 배너" sx={{ position: 'relative' }}>
            <Swiper
              // [변경] swiperRef1 연결
              onSwiper={(swiper) => (swiperRef1.current = swiper)} 
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true, type: 'fraction' }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              a11y={{ enabled: true, prevSlideMessage: '이전 슬라이드', nextSlideMessage: '다음 슬라이드' }}
            >
              <SwiperSlide><Box sx={{ height: '494px', backgroundImage: 'url("/img/img_test_banner01.jpg")', backgroundSize: 'cover' }} /></SwiperSlide>
              <SwiperSlide><Box sx={{ height: '494px', backgroundImage: 'url("/img/img_test_banner02.jpg")', backgroundSize: 'cover' }} /></SwiperSlide>
            </Swiper>

            <Box className="banner-control-box">
              <IconButton 
                className="banner-control-btn"
                // [변경] toggleAutoplay1 및 isPlaying1 사용
                onClick={toggleAutoplay1} 
                aria-label={isPlaying1 ? "슬라이드 일시정지" : "슬라이드 재생"}
              >
                {isPlaying1 ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 기본서비스 */}
      <Box component="section" className="section-02">
        <Box className="inner">
          <h3 className="section-title">기본<span>서비스</span></h3>
          <Box className="service-banner">
            <Swiper
              onSwiper={(swiper) => (swiperRef2.current = swiper)}
              key={prevEl && nextEl ? 'ready' : 'not-ready'} 
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={24}
              slidesPerView={2}
              navigation={{ prevEl, nextEl }}
              pagination={{ clickable: true, type: 'fraction' }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              a11y={{ enabled: true, prevSlideMessage: '이전 슬라이드', nextSlideMessage: '다음 슬라이드' }}
              role="region"
              aria-roledescription="서비스 목록 슬라이더"
              breakpoints={{
                600: { slidesPerView: 3, slidesPerGroup: 3 }, 
                900: { slidesPerView: 4, slidesPerGroup: 4 },
                1200: { slidesPerView: 5, slidesPerGroup: 5 },
              }}
              className="service-swiper"
            >
              {serviceShortcuts.map((s, index) => (
                <SwiperSlide key={s.title} role="group" aria-roledescription="서비스 항목" aria-label={`${serviceShortcuts.length}개 중 ${index + 1}번째 서비스`}>
                  <a className="shortcut-item" href={s.url} target="_blank" rel="noreferrer">
                    <Box className="icon-bg" style={{ backgroundImage: `url(${s.iconUrl})` } as React.CSSProperties} aria-hidden="true" />
                    <span className="shortcut-text">{s.title}</span>
                    <Box component="span" className="shortcut-link-box">
                      <span className="shortcut-link-text">바로가기</span>
                      <OpenInNew className="shortcut-icon" aria-hidden="true" />
                    </Box>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <Box className="service-control-group"> 
              <button ref={setPrevEl} className="swiper-button-prev service-prev" aria-label="이전 슬라이드"></button>
              <button ref={setNextEl} className="swiper-button-next service-next" aria-label="다음 슬라이드"></button>

              <Box className="banner-control-box">
                <IconButton 
                  className={`banner-control-btn ${isPlaying2 ? 'is-playing' : 'is-paused'}`}
                  onClick={toggleAutoplay2} 
                  aria-label={isPlaying2 ? "슬라이드 일시정지" : "슬라이드 재생"}
                  size="small"
                >
                  {isPlaying2 ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

      </Box>


      <Box component="section" className="">
        <Box className="ds-container">
          <Grid container spacing={2}>
            {systemCards.map((c) => (
              <Grid key={c.title} size={{ xs: 12, md: 4 }}>
                <Card className="ds-card" variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {c.title}
                    </Typography>
                    <Typography variant="body2">{c.desc}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={c.url} target="_blank" rel="noreferrer" underline="hover">
                      자세히보기 <ChevronRight fontSize="small" />
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box component="section" className="ds-section ds-fullbleed">
        <Box className="ds-container">
          <Box className="ds-section__head">
            <Typography variant="h6" sx={{ m: 0 }}>
              한국의약품안전관리원 제공 서비스 바로가기
            </Typography>
            <Typography variant="body2" sx={{ m: 0, color: 'var(--muted)' }}>
              주요 서비스를 안내해 드립니다.
            </Typography>
          </Box>

          <Grid container spacing={1.5}>
            {serviceShortcuts.map((s) => (
              <Grid key={s.title} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <a className="ds-shortcut" href={s.url} target="_blank" rel="noreferrer">
                  {s.title} <ChevronRight fontSize="small" />
                </a>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box component="section" className="ds-section ds-fullbleed">
        <Box className="ds-container">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Card className="ds-card" variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    한국의약품안전관리원 #누리소통망
                  </Typography>

                  <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 1 }}>
                    <Tab value="youtube" label={snsTabs.youtube.label} />
                    <Tab value="insta" label={snsTabs.insta.label} />
                    <Tab value="blog" label={snsTabs.blog.label} />
                  </Tabs>

                  <List dense>
                    {snsTabs[tab].items.map((it) => (
                      <ListItem key={it.title} disableGutters>
                        <Link href={it.url} target="_blank" rel="noreferrer" underline="hover">
                          {it.title}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <Card className="ds-card" variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
                  <Typography variant="h6">공지사항</Typography>
                  <Button size="small" variant="text" onClick={() => navigate('/ko/notice')}>
                    더보기
                  </Button>
                </CardContent>
                <CardContent sx={{ pt: 0 }}>
                  <List dense>
                    {notices.map((n) => (
                      <ListItem key={n.title} disableGutters>
                        <ListItemText primary={n.title} secondary={n.date} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
