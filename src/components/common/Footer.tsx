import { useTranslation } from 'react-i18next'
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import { Link } from 'react-router-dom'
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

const FOOTER_INFO_LINKS: Array<{ key: string; labelKey: TKey; href: string }> = [
  { key: 'cctv', labelKey: 'cctvPolicy', href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovImgInform.do' },
  {
    key: 'email-deny',
    labelKey: 'rejectUnAuthorizedEmail',
    href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovDenialEmailCollect.do',
  },
  { key: 'location', labelKey: 'directions', href: 'https://www.drugsafe.or.kr/iwt/ds/ko/introduction/EgovLocation.do' },
]

const FOOTER_LEGAL_LINKS: Array<{ key: string; labelKey: TKey; href: string }> = [
  { key: 'privacy', labelKey: 'privacyPolicy', href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovPrivacyAgreement.do' },
  { key: 'terms', labelKey: 'termsOfUse', href: 'https://www.drugsafe.or.kr/iwt/ds/ko/member/EgovUserAgreement.do' },
]

const FOOTER_SNS_LINKS: Array<{ key: string; labelKey: TKey; href: string }> = [
  { key: 'youtube', labelKey: 'youTube', href: 'https://www.youtube.com/@drugsafe_official/featured' },
  { key: 'instagram', labelKey: 'instagram', href: 'https://www.instagram.com/drugsafe_official/' },
  { key: 'blog', labelKey: 'blog', href: 'https://blog.naver.com/drugsafe_official' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (

    <Box component="footer" className="footer">
      <RelatedSites />
      <Box className="container">
        
        {/* 로고 영역 */}
        <Box className="footer_logo">
          <Link to="/" aria-label={t("kidsHomeAria")}>
            <Box
              component="img"
              src="/img/footer_logo.png"
              alt={`KIDS ${t("kidsName")}`}
            />
          </Link>
        </Box>

        {/* 주소, 정책 링크 영역 */}
        <Box className="footer_corporate_info">
          <Box className="info_txt">
            <Typography className="address">{t("kidsAddress")}</Typography>
            <Typography>{`${t("bizRegNo")} 101-82-21134`}</Typography>
            <Typography>{`${t("mainTel")} 02-2172-6700`}</Typography>
            <Typography>{`${t("fax")} 02-2172-6701`}</Typography>
          </Box>
          
          <Box className="info_link">
            <Stack className="link_group_1">
              {FOOTER_INFO_LINKS.map((item) => (
                <MuiLink
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {t(item.labelKey)}
                </MuiLink>
              ))}
            </Stack>
            <Stack className="link_group_2">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <MuiLink
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {t(item.labelKey)}
                </MuiLink>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* SNS 링크 */}
        <Box className="footer_sns_link">
          <Stack className="sns_group">
            {FOOTER_SNS_LINKS.map((item) => (
              <MuiLink
                key={item.key}
                href={item.href}
                className={`sns_item ${item.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography component="span">{t(item.labelKey)}</Typography>
              </MuiLink>
            ))}
          </Stack>
        </Box>

        {/* 정책 링크, Copyright */}
        <Box className="footer_meta_info">
          <Box className="meta_links">
            {FOOTER_LEGAL_LINKS.map((item) => (
              <MuiLink
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
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
