import { useState, useCallback, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Pagination,
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
  getSearchWithPageFunction,
  getCodeTypeLabel,
} from '@/features/adverse/statistics/CodeSearchService'
import type { CodeSearchRVO, CodeSearchType, CodeSearchPageRVO } from '@/features/adverse/statistics/CodeSearchTypes'

interface CodeSearchDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (codes: string[]) => void
  type: CodeSearchType
  multiSelect?: boolean
  existingCodes?: string[]
}

const PAGE_SIZE = 10

export default function CodeSearchDialog({
  open,
  onClose,
  onSelect,
  type,
  multiSelect = true,
  existingCodes = [],
}: CodeSearchDialogProps) {
  const [keyword, setKeyword] = useState('')
  const [searchKeyword, setSearchKeyword] = useState<string | null>(null)
  const [results, setResults] = useState<CodeSearchRVO[]>([])
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const loadData = useCallback(async (kw: string | null, p: number) => {
    setLoading(true)
    try {
      const searchFn = getSearchWithPageFunction(type)
      const data: CodeSearchPageRVO = await searchFn(kw, p, PAGE_SIZE)
      setResults(data.list)
      setTotalCount(data.totalCount)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('코드 검색 오류:', error)
      setResults([])
      setTotalCount(0)
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }, [type])

  useEffect(() => {
    if (open) {
      setKeyword('')
      setSearchKeyword(null)
      setSelectedCodes(new Set(existingCodes))
      setPage(0)
      loadData(null, 0)
    }
  }, [open, loadData, existingCodes])

  const handleSearch = useCallback(() => {
    const kw = keyword.trim() || null
    setSearchKeyword(kw)
    setPage(0)
    loadData(kw, 0)
  }, [keyword, loadData])

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, newPage: number) => {
    const p = newPage - 1
    setPage(p)
    loadData(searchKeyword, p)
  }, [searchKeyword, loadData])

  const toggleCode = useCallback((code: string) => {
    if (!multiSelect) {
      onSelect([code])
      onClose()
      return
    }
    setSelectedCodes(prev => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }, [multiSelect, onSelect, onClose])

  const handleConfirm = useCallback(() => {
    onSelect(Array.from(selectedCodes))
    onClose()
  }, [selectedCodes, onSelect, onClose])

  const typeLabel = getCodeTypeLabel(type)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth
      slotProps={{ paper: { sx: { minHeight: '60vh' } } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
        <Typography variant="h6">{typeLabel} 검색</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="코드 또는 명칭으로 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
          />
          <Button variant="outlined" onClick={handleSearch} disabled={loading} size="small" sx={{ minWidth: 70 }}>
            검색
          </Button>
        </Box>

        {multiSelect && selectedCodes.size > 0 && (
          <Box sx={{ mb: 1, textAlign: 'right' }}>
            <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
              선택: {selectedCodes.size}건
            </Typography>
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : results.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">검색 결과가 없습니다.</Typography>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {multiSelect && <TableCell padding="checkbox" sx={{ width: 40 }} />}
                    <TableCell align="center" sx={{ fontWeight: 600 }}>코드</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>한글명</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>영문명</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row) => (
                    <TableRow
                      key={row.code}
                      hover
                      onClick={() => toggleCode(row.code)}
                      selected={selectedCodes.has(row.code)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {multiSelect && (
                        <TableCell padding="checkbox">
                          <Checkbox size="small" checked={selectedCodes.has(row.code)} />
                        </TableCell>
                      )}
                      <TableCell align="center">{row.code}</TableCell>
                      <TableCell>{row.nameKor || '-'}</TableCell>
                      <TableCell>{row.nameEng || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {totalPages > 1 && (
              <Stack alignItems="center" sx={{ mt: 2 }}>
                <Pagination
                  page={page + 1}
                  count={totalPages}
                  onChange={handlePageChange}
                  showFirstButton
                  showLastButton
                  size="small"
                />
              </Stack>
            )}

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'right' }}>
              총 {totalCount}건
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" size="small">
          {multiSelect ? '취소' : '닫기'}
        </Button>
        {multiSelect && (
          <Button onClick={handleConfirm} variant="contained" size="small" disabled={selectedCodes.size === 0}>
            선택 ({selectedCodes.size}건)
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
