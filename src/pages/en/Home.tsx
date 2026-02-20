import { useMemo, useState, useRef} from 'react'
import { Box, IconButton,Typography } from '@mui/material';
import { OpenInNew, PlayArrow, Pause } from '@mui/icons-material'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, Grid as SwiperGrid } from 'swiper/modules'; 
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

export default function Home() {
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
      { title: '의약품부작용피해구제 민원신청', url: 'https://nedrug.mfds.go.kr/cntnts/230', iconUrl: '/img/shortcut_ico02.png' },
      { title: '마약류 통합관리 시스템', url: 'https://www.nims.or.kr/', iconUrl: '/img/shortcut_ico03.png' },
      { title: 'Drug Adverse Reaction Relief Program', url: 'https://nedrug.mfds.go.kr/index', iconUrl: '/img/shortcut_ico04.png' },
      { title: '첨단바이오의약품 장기추적조사 시스템', url: 'https://ltfu.mfds.go.kr/main.do', iconUrl: '/img/shortcut_ico05.png' },
      { title: 'Medical Data Analysis Network (MOA)', url: 'https://moa.drugsafe.or.kr/main;jsessionid=BD9ADAD3F45597B4C06571485AB61A8A', iconUrl: '/img/shortcut_ico06.png' },
      { title: 'rug Safety Officer Training', url: 'https://pvtraining.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico07.png' },
      { title: 'Safety Information Disclosure', url: 'https://open.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico08.png' },
      { title: 'APEC Pharmacovigilance Training Program', url: 'https://kidscoe.drugsafe.or.kr/', iconUrl: '/img/shortcut_ico09.png' },
    ],
    []
  );

  return (
    <Box className="main-container">
      <Box component="section" className="section main-visual-section">
        <Box className="inner">
          <Box className="slogan-group">
            <Typography className="slogan-title">
              The Korea Institute of Drug <br/>Safety and Risk Management
            </Typography>
            <Typography className="slogan-desc">
              Manages drug safety issues systematically by <br/>evaluating drug risk and promoting safe drug use
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box component="section" className="section main-service-section">
        <Box className="inner">
          <h3 className="section-title">Basic Service</h3>
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
                      <span className="shortcut-link-text">Detail</span>
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
    </Box>
  )
}