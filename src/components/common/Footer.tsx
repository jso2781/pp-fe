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
    <footer className="footer">
      <RelatedSites />
      <div className="container">
        <Grid container spacing={1.5} className="footer_logo" alignItems="center" justifyContent="space-between">
          <Grid size={{ xs: 12 }}>
            <Link to="/" aria-label={t('kidsHomeAria')}>
              <img src="/img/footer_logo.png" alt={`KIDS ${t('kidsName')}`} style={{ cursor: 'pointer' }} />
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={1.5} className="footer_corporate_info">
          <Grid className="info_txt" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }} size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" className="address">{t('kidsAddress')}</Typography>
            <Typography variant="body2">{`${t('bizRegNo')} 101-82-21134`}</Typography>
            <Typography variant="body2">{`${t('mainTel')} 02-2172-6700`}</Typography>
            <Typography variant="body2">{`${t('fax')} 02-2172-6701`}</Typography>
          </Grid>

          <Grid className="info_link" sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }} size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              {FOOTER_INFO_LINKS.map((item) => (
                <MuiLink key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" underline="hover">
                  {t(item.labelKey)}
                </MuiLink>
              ))}
            </Stack>
            <Stack spacing={1}>
              {FOOTER_LEGAL_LINKS.map((item) => (
                <MuiLink key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" underline="hover">
                  {t(item.labelKey)}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={1.5} className="footer_sns_link">
          <Grid size={{ xs: 12 }}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {FOOTER_SNS_LINKS.map((item) => (
                <MuiLink
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`sns_item ${item.key}`}
                  underline="hover"
                >
                  <span>{t(item.labelKey)}</span>
                </MuiLink>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={1.5} className="footer_meta_info" alignItems="center">
          <Grid size={{ xs: 12 }}>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <MuiLink key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" underline="hover">
                  {t(item.labelKey)}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid className="copyright" size={{ xs: 12 }}>
            <Typography variant="body2">
              Copyright © Korea Institute of Drug Safety &amp; Risk Management. All Rights Reserved.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" color="text.secondary">
              © {year}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </footer>
  )
}
