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
      { title: '국내이상사례보고', url: 'https://kaers.drugsafe.or.kr' },
      { title: '국외이상사례보고', url: 'https://www.drugsafe.or.kr' },
      { title: '의약품 부작용 피해구제', url: 'https://nedrug.mfds.go.kr' },
      { title: '안전정보공개', url: 'https://open.drugsafe.or.kr' },
      { title: '병원자료 분석네트워크 (MOA)', url: 'https://moa.drugsafe.or.kr' },
      { title: 'APEC 약물감시 전문교육훈련', url: 'https://kidscoe.drugsafe.or.kr' },
      { title: '의약품 안전관리책임자 교육', url: 'https://pvtraining.drugsafe.or.kr' },
    ],
    []
  )

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
    <Box className="ds-home">
      <Box component="section" className="ds-hero ds-fullbleed">
        <Box className="ds-container ds-hero__inner">
          <Box className="ds-hero__copy">
            <Typography variant="h4" sx={{ m: 0 }}>
              의약품 안전관리로 국민을 건강하게
            </Typography>
            <Typography variant="body1" className="ds-hero__subtitle">
              국민의 건강과 안전을 확보하고 국제적 수준의 안전관리체계를 마련하는 공공기관의 사명과 책임을 다하겠습니다.
            </Typography>

            <Stack direction="column" spacing={1} sx={{ width: '100%', mt: 1 }}>
              <TextField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="검색"
                size="small"
                InputProps={{
                  startAdornment: <Search fontSize="small" />,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') doSearch()
                }}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button variant="contained" onClick={() => navigate('/ko/notice')}>
                  공지사항
                </Button>
                <Button variant="outlined" onClick={() => navigate('/ko/board')}>
                  게시판
                </Button>
                <Button variant="text" onClick={doSearch}>
                  검색
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
