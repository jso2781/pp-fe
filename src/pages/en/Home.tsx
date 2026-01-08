import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardActions, CardContent, Link, List, ListItem, ListItemText, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import { ChevronRight, Search } from '@mui/icons-material'

type TabKey = 'youtube' | 'insta' | 'blog';
type SnsItem = { title: string; url: string };
type SnsTab = { label: string; items: SnsItem[] };
type SnsTabs = Record<TabKey, SnsTab>;

export default function Home() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabKey>('youtube')
  const [q, setQ] = useState('')

  const systemCards = useMemo(
    () => [
      {
        title: 'Integrated Narcotics Management System',
        url: 'https://www.nims.or.kr',
        desc:
          'The Korea Institute of Drug Safety & Risk Management has been designated as the Integrated Narcotics Information Management Center in accordance with the Act on the Control of Narcotics.',
      },
      {
        title: 'Integrated Drug Information System',
        url: 'https://nedrug.mfds.go.kr',
        desc:
          'This system is operated under delegation from the Ministry of Food and Drug Safety in accordance with the Pharmaceutical Affairs Act.',
      },
      {
        title: 'Advanced Biopharmaceutical Long-term Follow-up System',
        url: 'https://ltfu.mfds.go.kr',
        desc:
          'This system is operated as the Regulatory Science Center for Advanced Biopharmaceuticals in accordance with the Act on Advanced Regenerative Medicine and Advanced Biopharmaceuticals.',
      },
    ],
    []
  )

  const serviceShortcuts = useMemo(
    () => [
      { title: 'Domestic Adverse Event Reporting', url: 'https://kaers.drugsafe.or.kr' },
      { title: 'International Adverse Event Reporting', url: 'https://www.drugsafe.or.kr' },
      { title: 'Drug Adverse Reaction Relief Program', url: 'https://nedrug.mfds.go.kr' },
      { title: 'Safety Information Disclosure', url: 'https://open.drugsafe.or.kr' },
      { title: 'Medical Data Analysis Network (MOA)', url: 'https://moa.drugsafe.or.kr' },
      { title: 'APEC Pharmacovigilance Training Program', url: 'https://kidscoe.drugsafe.or.kr' },
      { title: 'Drug Safety Officer Training', url: 'https://pvtraining.drugsafe.or.kr' },
    ],
    []
  )

  const snsTabs = useMemo<SnsTabs>(
    () => ({
      youtube: {
        label: 'YouTube',
        items: [
          {
            title: 'Drug & Quasi-drug Labeling and Services for Persons with Disabilities',
            url: 'https://youtu.be',
          },
          { title: 'Heat Exhaustion vs. Heat Stroke: What’s the Difference?', url: 'https://youtu.be' },
          { title: 'Grow Your Hair! Take Care of Your Scalp Health!', url: 'https://youtu.be' },
          { title: 'Hepatitis A, B, and C Explained', url: 'https://youtu.be' },
        ],
      },
      insta: {
        label: 'Instagram',
        items: [
          { title: 'Poster & Cartoon Contest Announcement', url: 'https://www.instagram.com' },
          { title: 'Heavy Rain Emergency Action Guidelines', url: 'https://www.instagram.com' },
          { title: 'Heatwave Safety Tips to Prevent Heat-related Illness', url: 'https://www.instagram.com' },
          { title: 'How to Properly Use Narcotic Appetite Suppressants', url: 'https://www.instagram.com' },
        ],
      },
      blog: {
        label: 'Blog',
        items: [
          { title: 'Touching Stories from the Drug Adverse Reaction Relief Program (Part 2)', url: 'https://blog.naver.com' },
          { title: 'Domestic Trends in Advanced Biopharmaceuticals', url: 'https://blog.naver.com' },
          { title: 'How Are Drugs Used in Hospitals Monitored?', url: 'https://blog.naver.com' },
          { title: 'Criminal Misuse of Veterinary Narcotics', url: 'https://blog.naver.com' },
        ],
      },
    }),
    []
  )

  const notices = useMemo(
    () => [
      { title: '[Bid Notice] Integrated Information System Operation & Maintenance for 2026 (Emergency Bid)', date: '2025-12-03' },
      { title: 'Notice of Termination: Consultation & Guidance Program for Compassionate Use of Investigational Drugs', date: '2025-12-05' },
      { title: '[Veterinary Tender] 2026–2027 Integrated Narcotics Information Management Center System Operation Project', date: '2025-12-15' }
    ],
    []
  )

  const doSearch = () => {
    const keyword = q.trim()
    navigate(`/en/search?q=${encodeURIComponent(keyword)}`)
  }

  return (
    <Box className="ds-home">
      <Box component="section" className="ds-hero ds-fullbleed">
        <Box className="ds-container ds-hero__inner">
          <Box className="ds-hero__copy">
            <Typography variant="h4" sx={{ m: 0 }}>
              Promoting Public Health Through Drug Safety Management
            </Typography>
            <Typography variant="body1" className="ds-hero__subtitle">
              We are committed to fulfilling our mission and responsibility as a public institution to safeguard public health and safety and to establish an internationally recognized safety management system.
            </Typography>

            <Stack direction="column" spacing={1} sx={{ width: '100%', mt: 1 }}>
              <TextField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                size="small"
                InputProps={{
                  startAdornment: <Search fontSize="small" />,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') doSearch()
                }}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button variant="contained" onClick={() => navigate('/en/notice')}>
                  Announcement
                </Button>
                <Button variant="outlined" onClick={() => navigate('/en/board')}>
                  Board
                </Button>
                <Button variant="text" onClick={doSearch}>
                  Search
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box component="section" className="ds-section ds-fullbleed">
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
                      View Details <ChevronRight fontSize="small" />
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
      </Box>

      <Box component="section" className="ds-section ds-fullbleed">
        <Box className="ds-container">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Card className="ds-card" variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Korea Institute of Drug Safety & Risk Management (KIDS) #Social Media
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
                  <Typography variant="h6">Announcement</Typography>
                  <Button size="small" variant="text" onClick={() => navigate('/en/notice')}>
                    View More
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