import { useMemo } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';import type { SelectChangeEvent } from '@mui/material/Select'
import { useTranslation } from 'react-i18next'

const RelatedSites = () => {
  const { t, i18n } = useTranslation()
  const langDep = i18n.resolvedLanguage ?? i18n.language

  const GOV_SITES = useMemo(
    () => [
      { label: t('mfdsGoKr'), value: 'https://www.mfds.go.kr' },
      { label: t('nedrugMfdsGoKr'), value: 'https://nedrug.mfds.go.kr' },
      { label: t('mohwGoKr'), value: 'https://www.mohw.go.kr' },
    ],
    [langDep, t]
  )

  const ORG_SITES = useMemo(
    () => [
      { label: t('kpanetOrKr'), value: 'https://www.kpanet.or.kr' },
      { label: t('kpbmaOrKr'), value: 'http://www.kpbma.or.kr' },
      { label: t('kodcOrKr'), value: 'https://www.kodc.or.kr' },
    ],
    [langDep, t]
  )

  const handleSelect = (e: SelectChangeEvent) => {
    const url = e.target.value
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="footer_related">
      <div className="container">
        <Grid container spacing={1.5} alignItems="center" justifyContent="flex-end">
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="gov-site-label">{t('goToRelGov')}</InputLabel>
              <Select
                labelId="gov-site-label"
                label={t('goToRelGov')}
                value=""
                onChange={handleSelect}
              >
                <MenuItem value="">
                  <em>{t('goToRelGov')}</em>
                </MenuItem>
                {GOV_SITES.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="org-site-label">{t('goToRelOrg')}</InputLabel>
              <Select
                labelId="org-site-label"
                label={t('goToRelOrg')}
                value=""
                onChange={handleSelect}
              >
                <MenuItem value="">
                  <em>{t('goToRelOrg')}</em>
                </MenuItem>
                {ORG_SITES.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default RelatedSites
