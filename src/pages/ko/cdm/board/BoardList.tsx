/**
 * CDM 게시판 목록
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Paper,
  Link,
} from '@mui/material';
import { useParams, Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import { BOARD_CONFIG, type BoardType } from '@/api/cdm/boardConfig';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectBoardList } from '@/features/cdm/board/BoardCdmThunks';

export default function BoardList() {
  const { t } = useTranslation();

  const { boardType, lang } = useParams<{ boardType: string; lang: string }>();

  const [searchCnd, setSearchCnd] = useState('title');
  const [searchWrd, setSearchWrd] = useState('');

  // 페이징 관련
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;

  const dispatch = useAppDispatch();
  const { list: boardData, totalCount } = useAppSelector((s) => s.cdmBoard);

  const config = BOARD_CONFIG[boardType as BoardType];

  // Lnb 랜더링용
  const { pathname: currentUrl } = useLocation();

  const prevBoardTypeRef = useRef<string | undefined>(undefined);
  // 검색 버튼으로 실제 제출된 값 (입력 중인 값과 분리)
  const committedRef = useRef({ cnd: 'title', wrd: '' });

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);

  // 목록 조회 (boardType 변경 시 검색 초기화 포함)
  useEffect(() => {
    if (!boardType) return;

    const isBoardTypeChanged = prevBoardTypeRef.current !== boardType;
    prevBoardTypeRef.current = boardType;

    if (isBoardTypeChanged) {
      committedRef.current = { cnd: 'title', wrd: '' };
      setSearchCnd('title');
      setSearchWrd('');
      setPageNum(1);
      dispatch(selectBoardList({
        bbsId: config?.bbsId || boardType || "",
        page: 1,
        pageSize: String(pageSize),
        searchType: 'title',
        searchKeyword: '',
      }));
    } else {
      // 페이지 이동 시 — 마지막으로 검색 버튼을 눌렀을 때의 값으로 조회
      dispatch(selectBoardList({
        bbsId: config?.bbsId || boardType || "",
        page: pageNum,
        pageSize: String(pageSize),
        searchType: committedRef.current.cnd,
        searchKeyword: committedRef.current.wrd,
      }));
    }
  }, [boardType, pageNum]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const today = new Date().toISOString().replaceAll("-", "").substring(0, 8);

  const rows = useMemo(() => {
    return boardData.map((n, idx: number) => ({
      id: n.pstSn ?? String(idx),
      title: n.pstTtl ?? '',
      writer: n.rgtrId ?? '',
      date: n.regDt ?? '',
      views: n.pstInqCnt ?? 0,
      isActiveNotice:
        n.fixYn === 'Y' &&
        !!n.fixBgngYmd &&
        !!n.fixEndYmd &&
        today >= n.fixBgngYmd &&
        today <= n.fixEndYmd,
    }));
  }, [boardData]);

  const onSearch = () => {
    // 검색 버튼 클릭 시 현재 입력값을 commit
    committedRef.current = { cnd: searchCnd, wrd: searchWrd };
    if (pageNum === 1) {
      // pageNum이 이미 1이면 effect가 발동하지 않으므로 직접 dispatch
      dispatch(selectBoardList({
        bbsId: config?.bbsId || boardType || "",
        page: 1,
        pageSize: String(pageSize),
        searchType: searchCnd,
        searchKeyword: searchWrd,
      }));
    } else {
      // pageNum을 1로 리셋 → effect 발동 → committedRef 값으로 조회
      setPageNum(1);
    }
  };

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>{t('menuCdm')}</span>
              </Typography>
              <Box className="lnb-list">
                <Lnb currentUrl={currentUrl} />
              </Box>
            </Box>
          </Box>

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}
                <Box
                  component="form"
                  className="board-search"
                  onSubmit={(e) => { e.preventDefault(); onSearch(); }}
                >
                  <FormControl size="large" className="search-condition">
                    <InputLabel id="search-condition-label" className="sr-only">{t('searchCondition')}</InputLabel>
                    <Select
                      size="large"
                      value={searchCnd}
                      labelId="search-condition-label"
                      onChange={(e) => setSearchCnd(String(e.target.value))}
                    >
                      <MenuItem value="title">{t('title')}</MenuItem>
                      <MenuItem value="content">{t('content')}</MenuItem>
                    </Select>
                  </FormControl>
                  <Box className="search-input-group">
                    <TextField
                      size="large"
                      placeholder={t('searchKeywordInput')}
                      value={searchWrd}
                      onChange={(e) => setSearchWrd(e.target.value)}
                      sx={{ flexGrow: 1 }}
                      slotProps={{
                        htmlInput: { 'aria-label': t('searchKeywordInput') }
                      }}
                    />
                    <Button type="submit" variant="contained" size="large" className="btn-search">{t('search')}</Button>
                  </Box>
                </Box>

                <Box className="board-list-area" component="section">
                  <Box className="board-info" aria-label={t('boardSearchResult')}>
                    <Typography className="board-count">
                      {t('searchResult')}
                      <Typography component="span" className="count">{totalCount}</Typography>
                      건
                    </Typography>
                  </Box>

                  <TableContainer component={Paper} className="bbs-list">
                    <Table aria-label={config?.title ?? t('board')} sx={{ tableLayout: 'fixed' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '10%' }}>No</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '40%' }}>{t('title')}</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '20%' }}>{t('writer')}</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '20%' }}>{t('date')}</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '10%' }}>{t('views')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                              게시물이 존재하지 않습니다.
                            </TableCell>
                          </TableRow>
                        ) : (
                          rows.map((r, idx) => (
                            <TableRow key={String(r.id)}>
                              <TableCell component="th" scope="row" align="center">
                                {r.isActiveNotice ? '[공지]' : (pageNum - 1) * pageSize + idx + 1}
                              </TableCell>
                              <TableCell align="center">
                                <Link
                                  component={RouterLink}
                                  to={`/pp/${lang}/cdm/board/${boardType}/detail/${r.id}`}
                                  color="inherit"
                                  underline="hover"
                                  aria-label={`${r.title} 상세보기`}
                                  sx={{
                                    display: 'inline-block',
                                    width: '100%',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                  }}
                                >
                                  {r.title}
                                </Link>
                              </TableCell>
                              <TableCell align="center">{r.writer}</TableCell>
                              <TableCell align="center">{r.date}</TableCell>
                              <TableCell align="center">{r.views}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Stack className="paging-wrap">
                    <Pagination
                      page={pageNum}
                      count={totalPages}
                      onChange={(_: React.ChangeEvent<unknown>, page: number) => {
                        setPageNum(page);
                      }}
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                </Box>
              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
