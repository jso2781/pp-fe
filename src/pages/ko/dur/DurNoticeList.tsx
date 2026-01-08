import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import { BreadcrumbNav } from '@/components/mui'
import SectionSideNav from '@/components/navigation/SectionSideNav'
import PageTitle from '@/components/common/PageTitle'
import AgGridTable from '@/components/grid/AgGridTable'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { durNoticeListMock, type DurNoticeListItem } from './durNoticeMock'

/**
 * DUR 정보 > 알림 게시판
 * - 원본 화면: https://www.drugsafe.or.kr/iwt/ds/ko/bbs/EgovBbs.do?bbsId=BBSMSTR_000000000101
 */
export default function DurNoticeList() {
  const navigate = useNavigate()
  const [searchCnd, setSearchCnd] = useState('title')
  const [searchWrd, setSearchWrd] = useState('')

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

  const sampleRows = useMemo(() => durNoticeListMock, [])

  const filteredRows = useMemo(() => {
    const q = searchWrd.trim()
    if (!q) return sampleRows
    const key = searchCnd === 'content' ? 'title' : 'title'
    return sampleRows.filter((r) => String(r[key] ?? '').includes(q))
  }, [sampleRows, searchCnd, searchWrd])

  const columnDefs = useMemo<ColDef<DurNoticeListItem>[]>(
    () => [
      { headerName: '번호', field: 'no', width: 90, cellStyle: { textAlign: 'center' }, sort: 'desc' },
      {
        headerName: '제목',
        field: 'title',
        minWidth: 420,
        cellRenderer: (p: ICellRendererParams<DurNoticeListItem>) => {
          const v = p.value ?? ''
          return (
            <a
              className="ds-board-link"
              style={{ display: 'inline-block', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (p.data?.id) navigate(`/ko/dur/notice/${p.data.id}`)
              }}
            >
              {String(v)}
            </a>
          )
        },
      },
      { headerName: '작성자', field: 'writer', width: 140, cellStyle: { textAlign: 'center' } },
      { headerName: '등록일', field: 'date', width: 140, cellStyle: { textAlign: 'center' } },
      { headerName: '조회수', field: 'views', width: 120, cellStyle: { textAlign: 'center' } },
    ],
    [],
  )

  const totalCount = sampleRows.length // 원본 화면의 총 게시물 수 표기를 참고한 예시 ex) old 113
  const pageIndex = 1
  const totalPages = 12

  const onSearch = () => {
    window.alert('샘플 화면입니다. (검색은 샘플 데이터에서만 동작)')
  }

  return (
    <div className="ds-page ds-notice ds-dur-notice">
      <div className="ds-container">
        <BreadcrumbNav className="ds-breadcrumb" items={[{ label: '홈' }, { label: 'DUR 정보' }, { label: '알림 게시판' }]} />

        <PageTitle title="알림 게시판" subtitle="DUR 정보" />

        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SectionSideNav title="DUR 정보" items={sideItems} selectedKey="/ko/dur/notice" />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <div className="ds-board-top">
              <Typography variant="body2" color="text.secondary">
                총 <b>{totalCount}</b>개의 게시물이 있습니다 | page <b>{pageIndex}</b>/{totalPages}
              </Typography>
            </div>

            <Card className="ds-board-list" variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 1.5 }}>
                <AgGridTable rowData={filteredRows} columnDefs={columnDefs} height={520} />
              </CardContent>
            </Card>

            <div className="ds-board-search">
              <Stack direction="row" spacing={1} alignItems="center">
                <Select
                  size="small"
                  value={searchCnd}
                  onChange={(e) => setSearchCnd(String(e.target.value))}
                  sx={{ width: 140 }}
                >
                  <MenuItem value="title">제목</MenuItem>
                  <MenuItem value="content">내용</MenuItem>
                </Select>
                <TextField
                  size="small"
                  value={searchWrd}
                  onChange={(e) => setSearchWrd(e.target.value)}
                  placeholder="검색어"
                  sx={{ width: 320 }}
                />
                <Button variant="contained" onClick={onSearch}>
                  검색
                </Button>
              </Stack>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
