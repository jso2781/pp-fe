import { useMemo, useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
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


export default function Home() {

 /*  const serviceShortcuts = useMemo(
    () => [
      { title: 'Domestic Adverse Event Reporting', url: 'https://kaers.drugsafe.or.kr' },
      { title: 'International Adverse Event Reporting', url: 'https://www.drugsafe.or.kr' },
      { title: 'Drug Adverse Reaction Relief Program', url: 'https://nedrug.mfds.go.kr' },
      { title: 'Safety Information Disclosure', url: 'https://open.drugsafe.or.kr' },
      { title: 'Medical Data Analysis Network (MOA)', url: 'https://moa.drugsafe.or.kr' },
      { title: 'APEC Pharmacovigilance Training Program', url: 'https://kidscoe.drugsafe.or.kr' },
      { title: 'Drug Safety Officer Training', url: 'https://pvtraining.drugsafe.or.kr' },
    ],
    [] */

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
      { title: 'Domestic Adverse Event Reporting', url: 'https://kaers.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: '의약품부작용피해구제 민원신청', url: 'https://nedrug.mfds.go.kr/cntnts/230', iconUrl: '/img/shortcut_ico01.png' },
      { title: '마약류 통합관리 시스템', url: 'https://www.nims.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: 'Drug Adverse Reaction Relief Program', url: 'https://nedrug.mfds.go.kr/index', iconUrl: '/img/shortcut_ico01.png' },
      { title: '첨단바이오의약품 장기추적조사 시스템', url: 'https://ltfu.mfds.go.kr/main.do', iconUrl: '/img/shortcut_ico01.png' },
      { title: 'Medical Data Analysis Network (MOA)', url: 'https://moa.drugsafe.or.kr/main;jsessionid=BD9ADAD3F45597B4C06571485AB61A8A', iconUrl: '/img/shortcut_ico01.png' },
      { title: 'rug Safety Officer Training', url: 'https://pvtraining.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: 'Safety Information Disclosure', url: 'https://open.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
      { title: 'APEC Pharmacovigilance Training Program', url: 'https://kidscoe.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico01.png' },
    ],
    []
  );

  return (
    <Box className="main-container">

      <Box component="section" className="section main-service-section">
        <Box className="inner">
          <h3 className="section-title">Basic <span>Service</span></h3>
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
      {/* <Box component="section" className="ds-section ds-fullbleed">
        <Box className="ds-container">
          <Box className="ds-section__head">
            <Typography variant="h6" sx={{ m: 0 }}>
              Quick Access to Services Provided by KIDS
            </Typography>
            <Typography variant="body2" sx={{ m: 0, color: 'var(--muted)' }}>
              We introduce our key services.
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
      </Box> */}
    </Box>
  )
}