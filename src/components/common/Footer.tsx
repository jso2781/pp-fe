import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import RelatedSites from './RelatedSites'

type TKey =
  | 'rejectUnAuthorizedEmail'
  | 'directions'
  | 'privacyPolicy'
  | 'termsOfUse'
  | 'cctvPolicy'
  | 'koglLicense'
  | 'youTube'
  | 'instagram'
  | 'blog'
  | 'kakao'
  | 'facebook'
  | 'sitemap'
 
const FOOTER_INFO_LINKS: Array<{ key: string; labelKey: TKey; href: string }> = [
  { key: 'sitemap', labelKey: 'sitemap', href: '#' },
  { key: 'location', labelKey: 'directions', href: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do' },
]

const FOOTER_LEGAL_LINKS: Array<{ key: string; labelKey: TKey; href: string; target: string, className?: string; rel?: string }> = [
  { key: 'privacy', labelKey: 'privacyPolicy', href: '/pp/ko/etc/PrivacyPolicy', target: 'TRMS_STT', className: 'point-link' },
  { key: 'termsOfUse', labelKey: 'termsOfUse', href: '/pp/ko/etc/Terms', target: 'TRMS_STT' },
  { key: 'cctvPolicy', labelKey: 'cctvPolicy', href: '/pp/ko/etc/CctvPolicy', target: 'TRMS_STT' },
  { key: 'koglLicense', labelKey: 'koglLicense', href: 'https://www.kogl.or.kr/info/licenseType1.do', target: 'kogl', rel: 'noopener noreferrer' },
]

const FOOTER_SNS_LINKS: Array<{ key: string; labelKey: TKey; href: string }> = [
  { key: 'blog', labelKey: 'blog', href: 'https://blog.naver.com/drugsafe_official' },
  { key: 'youtube', labelKey: 'youTube', href: 'https://www.youtube.com/@drugsafe_official/featured' },
  { key: 'instagram', labelKey: 'instagram', href: 'https://www.instagram.com/drugsafe_official/' },
  { key: 'kakao', labelKey: 'kakao', href: 'https://pf.kakao.com/_HxdIxgj' },
  { key: 'facebook', labelKey: 'facebook', href: 'https://www.facebook.com/drugsafeofficial/' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  
  //퀵메뉴
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  
  // 메인 페이지 판별: '/', '/pp', '/pp/ko' 인 경우 포함
  const isMainPage =
    location.pathname === '/' ||
    location.pathname === '/pp' ||
    location.pathname === '/pp/ko' ||
    location.pathname === '/pp/ko/'

  const [isVisible, setIsVisible] = useState(false)
  // 타입스크립트 사용 시를 고려한 Ref 설정
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 시 메뉴 표시
      setIsVisible(true)

      // 이전 타이머가 있으면 취소
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // 2초 뒤 숨김 처리
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  return (
    

    <Box component="footer" className="footer">
      {/* 퀵메뉴 */}
      <Box 
        component="aside" 
        className={`quick-menu-wrap ${isVisible ? 'show' : 'hide'}`} 
        aria-label="퀵 메뉴"
      >
        {isMainPage && (
          <Box className="quick-item">
            <button
              type="button"
              className="btn-quick open-popup"
              onClick={() => window.dispatchEvent(new CustomEvent('open-home-popup-once'))}
            >
              <i className="ico-popup" aria-hidden="true" />
            </button>
            <span className="quick-txt">닫힌 팝업<br />다시 열기</span>
          </Box>
        )}

        <Box className="quick-item">
          <button type="button" className="btn-quick faq" onClick={() => navigate('/pp/ko/news/FaqNotice')}>
            <i className="ico-faq" aria-hidden="true" />
          </button>
          <span className="quick-txt">자주 묻는<br />질문</span>
        </Box>

        <Box className="quick-item">
          <button type="button" className="btn-quick chatbot" onClick={() => navigate('#')}>
            <i className="ico-chatbot" aria-hidden="true" />
          </button>
          <span className="quick-txt">챗봇</span>
        </Box>

        <Box className="quick-item">
          <button 
            type="button" 
            className="btn-quick top" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <i className="ico-top" aria-hidden="true" />
          </button>
          <span className="quick-txt">위로가기</span>
        </Box>
      </Box>

      <RelatedSites />
      <Box className="container">

        {/* 로고, SNS */}
        <Box className="footer-brand">
          <Box className="footer-logo-area">
            <Box className="footer-logo">
              <Link to="/" aria-label={t("kidsHomeAria")}>
                <Box
                  component="img"
                  src="/img/footer_logo.png"
                  alt={`KIDS ${t("kidsName")}`}
                />
              </Link>
            </Box>
          </Box>
          <Box className="footer-sns-area">
            <Box className="footer-sns-link">
              <Stack className="sns-group">
                {FOOTER_SNS_LINKS.map((item) => (
                  <MuiLink
                    key={item.key}
                    href={item.href}
                    className={`sns-item ${item.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography component="span" className="sr-only">{t(item.labelKey)}</Typography>
                  </MuiLink>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* 주소정보, 하단 링크 */}
        <Box className="footer-corporate-info">
          <Box className="info-txt-area">
            <Box className="info-txt">
              <Typography className="address">{t("kidsAddress")}</Typography>
              <Typography>{`${t("bizRegNo")} 101-82-21134`}</Typography>
              <Typography>{`${t("mainTel")} 02-2172-6700`}</Typography>
              <Typography>{`${t("fax")} 02-2172-6701`}</Typography>
            </Box>
          </Box>
          
          <Box className="info-link-area">
            <Box className="info-link">
              <Stack className="link-group">
                {FOOTER_INFO_LINKS.map((item) => (
                  <MuiLink
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    {t(item.labelKey)}
                    <ChevronRightIcon className="link-icon" />
                  </MuiLink>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* 정책, 카피라이트 */}
        <Box className="footer-meta-info">
          <Box className="meta-links">
            {FOOTER_LEGAL_LINKS.map((item) => (
              <MuiLink
                key={item.key}
                href={item.href}
                target={item.target || '_blank'}
                rel={item.rel}
                className={`meta-item ${item.className || ''}`}
              >
                {t(item.labelKey)}
              </MuiLink>
            ))}
          </Box>
          
          <Box className="copyright">
            <Typography>
              © Korea Institute of Drug Safety &amp; Risk Management. All rights reserved.
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  )
}
