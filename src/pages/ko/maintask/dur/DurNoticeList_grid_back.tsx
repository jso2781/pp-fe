/**
 * 화면ID: KIDS-PP-US-DI-02
 * 화면명: DUR 정보 > 알림 게시판
 * 화면경로: /ko/maintask/dur/DurNoticeList
 * 화면설명: DUR 정보 > 알림 게시판
 */
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import AgGridTable from '@/components/grid/AgGridTable'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { durNoticeListMock, type DurNoticeListItem } from './durNoticeMock'
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import { useTranslation } from 'react-i18next';

export default function DurNoticeList() {
  const navigate = useNavigate()
  const location = useLocation();
  const { t } = useTranslation();
  
  const [searchCnd, setSearchCnd] = useState('title')
  const [searchWrd, setSearchWrd] = useState('')


    // Lnb 랜더링용
  const currentUrl = location.pathname;

  const sampleRows = useMemo(() => durNoticeListMock, [])

  const filteredRows = useMemo(() => {
    const q = searchWrd.trim()
    if (!q) return sampleRows
    const key = searchCnd === 'content' ? 'title' : 'title'
    return sampleRows.filter((r) => String(r[key] ?? '').includes(q))
  }, [sampleRows, searchCnd, searchWrd])

  const columnDefs = useMemo<ColDef<DurNoticeListItem>[]>(
    () => [
      { headerName: t('no'), field: 'no', width: 90, cellStyle: { textAlign: 'center' }, sort: 'desc' },
      {
        headerName: t('title'),
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
                if (p.data?.id) navigate(`/ko/maintask/dur/DurNoticeList/${p.data.id}`)
              }}
            >
              {String(v)}
            </a>
          )
        },
      },
      { headerName: t('writer'), field: 'writer', width: 140, cellStyle: { textAlign: 'center' } },
      { headerName: t('date'), field: 'date', width: 140, cellStyle: { textAlign: 'center' } },
      { headerName: t('views'), field: 'views', width: 120, cellStyle: { textAlign: 'center' } },
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
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>{t('durInfo')}</span>
              </Typography>
              <Box className="lnb-list">
                <Lnb currentUrl={currentUrl}/>
              </Box>
            </Box>
          </Box>

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}

              <Grid size={{ xs: 12, md: 9 }}>
                <div className="ds-board-top">
                  <Typography variant="body2" color="text.secondary">
                    {t('total')} <b>{totalCount}</b> {t('posts')} | {t('page')} <b>{pageIndex}</b>/{totalPages}
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
                      <MenuItem value="title">{t('title')}</MenuItem>
                      <MenuItem value="content">{t('content')}</MenuItem>
                    </Select>
                    <TextField
                      size="small"
                      value={searchWrd}
                      onChange={(e) => setSearchWrd(e.target.value)}
                      placeholder={t('searchKeyword')}
                      sx={{ width: 320 }}
                    />
                    <Button variant="contained" onClick={onSearch}>
                      {t('search')}
                    </Button>
                  </Stack>
                </div>
              </Grid>

              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

