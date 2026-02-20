import React from "react";
import { useTranslation } from 'react-i18next'
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

type TKey =
  | 'youTube'
  | 'instagram'
  | 'blog'
  | 'kakao'
  | 'facebook'
  | 'sitemap'
  | 'ContactUs'
 
const FOOTER_LEGAL_LINKS: Array<{ key: string; labelKey: TKey; href: string; className?: string }> = [
  { key: 'terms', labelKey: 'ContactUs', href: '' },
]

const FOOTER_SNS_LINKS: Array<{ key: string; labelKey: TKey; href: string }> = [
  { key: 'blog', labelKey: 'blog', href: 'https://blog.naver.com/drugsafe_official' },
  { key: 'youtube', labelKey: 'youTube', href: 'https://www.youtube.com/@drugsafe_official/featured' },
  { key: 'instagram', labelKey: 'instagram', href: 'https://www.instagram.com/drugsafe_official/' },
  { key: 'kakao', labelKey: 'kakao', href: 'https://pf.kakao.com/_HxdIxgj' },
  { key: 'facebook', labelKey: 'facebook', href: 'https://www.facebook.com/drugsafeofficial/' },
]

export default function EngFooter() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    
    <Box component="footer" className="footer">
      <Box className="container">

        {/* 정책 */}
        <Box className="footer-meta-info">
          <Box className="meta-links">
            {FOOTER_LEGAL_LINKS.map((item) => (
              <MuiLink
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`meta-item ${item.className || ''}`}
              >
                {t(item.labelKey)}
              </MuiLink>
            ))}
          </Box>
        </Box>

        {/* 주소정보 */}
        <Box className="footer-corporate-info">
          <Box className="info-txt-area">
            <Box className="info-txt">
              <Typography className="address">Korea Institute of Drug Safety & Risk Management</Typography>
              <Typography>5th Fl., 30, Burim-ro 169beon-gil, Dongan-gu, Anyang-si, Gyeonggi-do, Republic of Korea</Typography>
              <Typography>ADR call center   Tel. +82-2-2172-6700    Fax. +82-2-2172-6701</Typography>
            </Box>
          </Box>
        </Box>

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

      </Box>
    </Box>
  )
}
