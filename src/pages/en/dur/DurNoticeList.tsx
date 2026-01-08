import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import { BreadcrumbNav } from '@/components/mui'
import SectionSideNav from '@/components/navigation/SectionSideNav'
import PageTitle from '@/components/common/PageTitle'
import AgGridTable from '@/components/grid/AgGridTable'
import type { ColDef, ICellRendererParams } from 'ag-grid-community'
import { durNoticeListMock, type DurNoticeListItem } from './durNoticeMock'

export default function DurNoticeList() {
  const navigate = useNavigate()
  const [searchCnd, setSearchCnd] = useState('title')
  const [searchWrd, setSearchWrd] = useState('')

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

  const sampleRows = useMemo(() => durNoticeListMock, [])

  const filteredRows = useMemo(() => {
    const q = searchWrd.trim()
    if (!q) return sampleRows
    return sampleRows.filter((r) => String(r.title ?? '').includes(q))
  }, [sampleRows, searchWrd])

  const columnDefs = useMemo<ColDef<DurNoticeListItem>[]>(
    () => [
      { headerName: 'No', field: 'no', width: 90, cellStyle: { textAlign: 'center' }, sort: 'desc' },
      {
        headerName: 'Title',
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
                if (p.data?.id) navigate(`/en/dur/notice/${p.data.id}`)
              }}
            >
              {String(v)}
            </a>
          )
        },
      },
      { headerName: 'Writer', field: 'writer', width: 140, cellStyle: { textAlign: 'center' } },
      { headerName: 'Date', field: 'date', width: 140, cellStyle: { textAlign: 'center' } },
      { headerName: 'Views', field: 'views', width: 120, cellStyle: { textAlign: 'center' } },
    ],
    [],
  )

  const totalCount = sampleRows.length
  const pageIndex = 1
  const totalPages = 12

  const onSearch = () => {
    window.alert('Sample screen. (Search only works on mock data.)')
  }

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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total <b>{totalCount}</b> posts | page <b>{pageIndex}</b>/{totalPages}
            </Typography>

            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 1.5 }}>
                <AgGridTable rowData={filteredRows} columnDefs={columnDefs} height={520} />
              </CardContent>
            </Card>

            <BoxRow>
              <Select
                size="small"
                value={searchCnd}
                onChange={(e) => setSearchCnd(String(e.target.value))}
                sx={{ width: 160 }}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="content">Content</MenuItem>
              </Select>
              <TextField
                size="small"
                value={searchWrd}
                onChange={(e) => setSearchWrd(e.target.value)}
                placeholder="Keyword"
                sx={{ width: 320 }}
              />
              <Button variant="contained" onClick={onSearch}>Search</Button>
            </BoxRow>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

function BoxRow({ children }: { children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
      {children}
    </Stack>
  )
}
