import { useMemo, useState } from 'react'
import { Box, Button, Card, CardContent, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, ListTemplateConfig, ListButtonConfig, ListSearchFieldConfig } from './templateTypes'
import type { ColDef } from 'ag-grid-community'

type Values = Record<string, unknown>

export default function ListTemplate({ screenId, title, config }: TemplateBaseProps<ListTemplateConfig>) {
  const [values, setValues] = useState<Values>({})

  const columnDefs = useMemo<ColDef<Record<string, unknown>>[]>(() => {
    return (config?.columns?.length
      ? (config.columns as ColDef<Record<string, unknown>>[])
      : [
          { headerName: '컬럼1', field: 'col1', flex: 1 },
          { headerName: '컬럼2', field: 'col2', flex: 1 },
          { headerName: '컬럼3', field: 'col3', flex: 1 },
        ])
  }, [config])

  const rowData = useMemo(() => {
    return (config?.rowData?.length
      ? config.rowData
      : config?.sampleData?.length
      ? config.sampleData
      : [{ col1: '샘플', col2: '데이터', col3: '입니다' }]) as Record<string, unknown>[]
  }, [config])

  const searchFields = useMemo<ListSearchFieldConfig[]>(() => {
    return config?.searchFields?.length
      ? config.searchFields
      : [
          { key: 'keyword', label: '키워드', type: 'input', placeholder: '검색어' },
          {
            key: 'status',
            label: '상태',
            type: 'select',
            options: [
              { label: '전체', value: '' },
              { label: '사용', value: 'Y' },
              { label: '미사용', value: 'N' },
            ],
          },
        ]
  }, [config])

  const footerButtons = useMemo<ListButtonConfig[]>(() => {
    return (config?.footerButtons?.length
      ? config.footerButtons
      : [
          { key: 'create', label: '등록', type: 'primary', onClick: config?.onCreate },
          { key: 'excel', label: '엑셀다운로드', onClick: config?.onExport },
        ]) as ListButtonConfig[]
  }, [config])

  const gridHeight = (config?.height as number | undefined) || (config?.gridHeight as number | undefined) || 520

  const onSearch = () => {
    ;(config?.onSearch as ((vals: unknown) => void) | undefined)?.(values)
  }

  return (
    <ScreenShell screenId={screenId} title={title} uiType="list">
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            {searchFields.map((f) => (
              <Grid key={f.key} size={{ xs: 12, md: 4 }}>
                {f.type === 'select' ? (
                  <Box>
                    <Typography variant="body2" fontWeight={700} sx={{ mb: 0.5 }}>{f.label}</Typography>
                    <Select
                      size="small"
                      fullWidth
                      value={(values[f.key] as string) ?? ''}
                      onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
                    >
                      {(f.options ?? []).map((o) => (
                        <MenuItem key={String(o.value)} value={o.value as any}>
                          {o.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                ) : (
                  <TextField
                    label={f.label}
                    size="small"
                    placeholder={f.placeholder}
                    value={(values[f.key] as string) ?? ''}
                    onChange={(e) => setValues((p) => ({ ...p, [f.key]: e.target.value }))}
                    fullWidth
                  />
                )}
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={onSearch}>조회</Button>
            <Button variant="outlined" onClick={() => setValues({})}>초기화</Button>
            {config?.extraActions as any}
          </Stack>

          {config?.hint ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {typeof config.hint === 'string' ? config.hint : String(config.hint)}
            </Typography>
          ) : null}
        </CardContent>
      </Card>

      <Box sx={{ height: 12 }} />

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <div className="ag-theme-quartz" style={{ height: gridHeight, width: '100%' }}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              rowSelection={(config?.rowSelection as 'single' | 'multiple' | undefined) || 'single'}
              animateRows
            />
          </div>

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
            {footerButtons.map((b) => (
              <Button
                key={b.key}
                variant={b.type === 'primary' ? 'contained' : 'outlined'}
                onClick={b.onClick}
                disabled={b.disabled}
              >
                {b.label}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </ScreenShell>
  )
}
