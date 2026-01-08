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
      { key: '/en/dur/understand', label: 'Understanding DUR', disabled: true },
      { key: '/en/dur/search', label: 'DUR Information Search', disabled: true },
      { key: '/en/dur/use', label: 'Appropriate use information', disabled: true },
      { key: '/en/dur/notice', label: 'Notification Board' },
      { key: '/en/dur/proposal', label: 'Suggestions' },
    ],
    [],
  )

  const item = useMemo(() => durNoticeListMock.find((r) => String(r.id) === String(id)), [id])
  const detail = useMemo(() => durNoticeDetailMockById?.[String(id)] ?? null, [id])

  return (
    <div className="ds-page ds-notice ds-dur-notice">
      <div className="ds-container">
        <BreadcrumbNav className="ds-breadcrumb" items={[{ title: 'Home' }, { title: 'DUR Information' }, { title: 'Notification Board' }]} />

        <PageTitle title="Notification Board" subtitle="DUR Information" />

        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SectionSideNav title="DUR Information" items={sideItems} selectedKey="/en/dur/notice" />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Post detail
                </Typography>
                <Divider sx={{ my: 1.5 }} />

                {!item ? (
                  <Typography variant="body2">Post not found.</Typography>
                ) : (
                  <>
                    <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 1.5 }}>
                      <Typography variant="body2">
                        Writer <b>{item.writer}</b>
                      </Typography>
                      <Typography variant="body2">
                        Date <b>{item.date}</b>
                      </Typography>
                      <Typography variant="body2">
                        Views <b>{item.views}</b>
                      </Typography>
                    </Stack>

                    <Divider sx={{ my: 1.5 }} />

                    <div style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                      {detail?.body?.trim() ? detail.body : '(Sample) Body text is not available.'}
                    </div>

                    <Divider sx={{ my: 1.5 }} />

                    <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1 }}>
                      Attachments
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
                        No attachments.
                      </Typography>
                    )}
                  </>
                )}

                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="outlined" onClick={() => navigate('/en/dur/notice')}>
                    Back to list
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
