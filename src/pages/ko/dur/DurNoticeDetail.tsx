import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardContent, Divider, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import { BreadcrumbNav } from '@/components/mui'
import PageTitle from '@/components/common/PageTitle'
import SectionSideNav from '@/components/navigation/SectionSideNav'
import { durNoticeListMock, durNoticeDetailMockById } from './durNoticeMock'

export default function DurNoticeDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const sideItems = useMemo(
    () => [
      { key: '/ko/dur/understand', label: 'DUR 이해', disabled: true },
      { key: '/ko/dur/search', label: 'DUR 정보검색', disabled: true },
      { key: '/ko/dur/use', label: '의약품 적정사용정보', disabled: true },
      { key: '/ko/dur/notice', label: '알림 게시판' },
      { key: '/ko/dur/proposal', label: '의견 제안' },
    ],
    [],
  )

  const item = useMemo(() => durNoticeListMock.find((r) => String(r.id) === String(id)), [id])
  const detail = useMemo(() => durNoticeDetailMockById?.[String(id)] ?? null, [id])

  return (
    <div className="ds-page ds-notice ds-dur-notice">
      <div className="ds-container">
        <BreadcrumbNav className="ds-breadcrumb" items={[{ label: '홈' }, { label: 'DUR 정보' }, { label: '알림 게시판' }] } />

        <PageTitle title="알림 게시판" subtitle="DUR 정보" />

        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SectionSideNav title="DUR 정보" items={sideItems} selectedKey="/ko/dur/notice" />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  게시글 보기
                </Typography>
                <Divider sx={{ my: 1.5 }} />

                {!item ? (
                  <Typography variant="body2">게시글을 찾을 수 없습니다.</Typography>
                ) : (
                  <>
                    <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 1.5 }}>
                      <Typography variant="body2">
                        작성자 <b>{item.writer}</b>
                      </Typography>
                      <Typography variant="body2">
                        등록일 <b>{item.date}</b>
                      </Typography>
                      <Typography variant="body2">
                        조회수 <b>{item.views}</b>
                      </Typography>
                    </Stack>

                    <Divider sx={{ my: 1.5 }} />

                    <BoxBody text={detail?.body} />

                    <Divider sx={{ my: 1.5 }} />

                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                      첨부파일
                    </Typography>

                    {detail?.attachments?.length ? (
                      <List dense sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        {detail.attachments.map((f, idx) => (
                          <ListItem key={`${f.name}-${idx}`}>
                            <ListItemText primary={f.name} secondary={f.size ? `[${f.size}]` : undefined} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        첨부파일이 없습니다.
                      </Typography>
                    )}
                  </>
                )}

                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="outlined" onClick={() => navigate('/ko/dur/notice')}>
                    목록
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

function BoxBody({ text }: { text?: string | null }) {
  return (
    <div style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
      {text?.trim() ? text : '(샘플) 본문 내용이 준비되지 않았습니다.'}
    </div>
  )
}
