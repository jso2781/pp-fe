import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import { BreadcrumbNav } from '@/components/mui'
import PageTitle from '@/components/common/PageTitle'
import SectionSideNav from '@/components/navigation/SectionSideNav'
import { fetchNoticeDetail, fetchNoticeList } from '@/features/notice/noticeThunks'

export default function NoticeDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const pageIndex = Number(searchParams.get('page') || 1)

  const { list, current, loading } = useAppSelector((s) => s.notice)

  useEffect(() => {
    if (id) dispatch(fetchNoticeDetail(id))
  }, [dispatch, id])

  useEffect(() => {
    if (!list?.length) dispatch(fetchNoticeList({ pageIndex }))
  }, [dispatch, list?.length, pageIndex])

  const sideItems = useMemo(
    () => [
      { key: '/ko/notice', label: '공지사항' },
      { key: '/ko/jobs', label: '채용게시판', disabled: true },
      { key: '/ko/centers', label: '지역의약품안전센터', disabled: true },
      { key: '/ko/faq', label: 'FAQ', disabled: true },
      { key: '/ko/qna', label: '고객문의', disabled: true },
    ],
    [],
  )

  const data: any = current || list?.find((n: any) => String(n.id ?? n.nttId) === String(id))
  const html = data?.contentHtml || data?.nttCn || data?.content || ''
  const isHtml = typeof html === 'string' && /<\/?[a-z][\s\S]*>/i.test(html)
  const isPopup = searchParams.get('popup') === '1'

  return (
    <div className="ds-page ds-notice">
      <div className="ds-container">
        {!isPopup && (
          <>
            <BreadcrumbNav className="ds-breadcrumb" items={[{ title: '홈' }, { title: '알림마당' }, { title: '공지사항' }]} />
            <PageTitle title="공지사항" subtitle="알림마당" />
          </>
        )}

        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          {!isPopup && (
            <Grid size={{ xs: 12, md: 3 }}>
              <SectionSideNav title="알림마당" items={sideItems} selectedKey="/ko/notice" />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: isPopup ? 12 : 9 }}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                {loading && !data ? (
                  <Typography variant="body2" color="text.secondary">
                    로딩 중...
                  </Typography>
                ) : !data ? (
                  <Typography variant="body2">게시글을 찾을 수 없습니다.</Typography>
                ) : (
                  <>
                    <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
                      {data.title || data.nttSj || '-'}
                    </Typography>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 1.5 }}>
                      <Typography variant="body2">작성자 <b>{data.writer || data.frstRegisterNm || '-'}</b></Typography>
                      <Typography variant="body2">등록일 <b>{data.date || data.frstRegisterPnttm || '-'}</b></Typography>
                      <Typography variant="body2">조회수 <b>{data.views ?? data.inqireCo ?? '-'}</b></Typography>
                    </Stack>

                    <Divider sx={{ my: 1.5 }} />

                    <Box sx={{ '& img': { maxWidth: '100%' } }}>
                      {isHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                      ) : (
                        <div style={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>{String(html || '')}</div>
                      )}
                    </Box>
                  </>
                )}

                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="outlined" onClick={() => navigate(`/ko/notice?page=${pageIndex}`)}>
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
