import { useTranslation } from 'react-i18next'
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom'
import RelatedSites from './RelatedSites'

type TKey =
  | 'cctvPolicy'
  | 'rejectUnAuthorizedEmail'
  | 'directions'
  | 'privacyPolicy'
  | 'termsOfUse'
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

const FOOTER_LEGAL_LINKS: Array<{ key: string; labelKey: TKey; href: string; className?: string }> = [
  { key: 'privacy', labelKey: 'privacyPolicy', href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovPrivacyAgreement.do', className: 'point-link'},
  { key: 'terms', labelKey: 'termsOfUse', href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovUserAgreement.do' },
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

  return (

    <Box component="footer" className="footer">
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
                target="_blank"
                rel="noopener noreferrer"
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
