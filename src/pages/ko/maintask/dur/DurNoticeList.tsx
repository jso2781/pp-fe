/**
 * 화면ID: KIDS-PP-US-DI-02
 * 화면명: DUR 정보 > 알림 게시판
 * 화면경로: /ko/maintask/dur/DurNoticeList
 * 화면설명: DUR 정보 > 알림 게시판
 */
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
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
} from '@mui/material';
import { selectPstList } from '@/features/pst/PstThunks';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { BoardKey } from '@/features/pst/PstTypes';
import { useTranslation } from 'react-i18next';

export default function NewsJobNoticeList() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const { list, totalCount, totalPages, loading } = useAppSelector((s) => s.pst);

  const [searchCnd, setSearchCnd] = useState(searchParams.get('searchCnd') || 'title');
  const [searchWrd, setSearchWrd] = useState(searchParams.get('searchWrd') || '');

  // 페이징 관련
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10) // 화면에 페이지 사이즈 설정이 필요시 setPageSize 활용

  // 게시판 식별키, 게시판 ID 추출
  const match = location.pathname.match(/\/maintask\/dur\/([^/]+)/);
  const boardKey = match?.[1] as BoardKey;
  const { bbsId } = useParams<{ bbsId: string }>();

  // Lnb 랜더링용
  const currentUrl = location.pathname;

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);  


  const rows = useMemo(() => {
    const arr = Array.isArray(list) && list.length > 0 ? list : [];
    return arr.map((n: any, idx: number) => {
      const id = n.pstSn ?? String(idx);
      return {
        id,
        title: n.pstTtl ?? '',
        writer: n.wrtrDeptNm  ?? '',
        date: n.regDt ?? '',
        views: n.pstInqCnt ?? 0,
      };
    });
  }, [list]);

  useEffect(() => {
    dispatch(selectPstList({ pageNum, pageSize, bbsId, searchCnd, searchWrd }));
  }, [dispatch, pageNum, bbsId]);

  const onSearch = () => {
    setPageNum(1);
    dispatch(selectPstList({ pageNum, pageSize, bbsId, searchCnd, searchWrd }));
  };

  return (
    <Box className="page-layout">
      <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>{t('menuDur')}</span>
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
                  <Box component="form" className="board-search">
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onSearch();
                          }
                        }}
                        sx={{ flexGrow: 1 }} // 남은 공간을 꽉 채우도록 설정
                      />
                      <Button variant="contained" size="large" className="btn-search" onClick={onSearch}>{t('search')}</Button>
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
                      {/* 1. aria-label로 표의 목적을 설명합니다. */}
                      <Table aria-label={t('menuDurNotice')} sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                          <TableRow>
                            {/* 2. component="th"와 scope="col"을 통해 제목 열임을 명시합니다. */}
                            <TableCell component="th" scope="col" align="center" sx={{ width: '10%' }}>No</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '40%' }}>{t('title')}</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '20%' }}>{t('writer')}</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '20%' }}>{t('date')}</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '10%' }}>{t('views')}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((r, idx) => (
                            <TableRow key={String(r.id)}>
                              {/* 3. 행의 식별자 데이터도 component="th", scope="row"를 권장합니다. */}
                              <TableCell component="th" scope="row" align="center">
                                {(pageNum - 1) * 10 + idx + 1}
                              </TableCell>
                              <TableCell align="center">
                                {/* 4. 동작이 발생하는 요소에 명확한 aria-label을 제공합니다. */}
                                <Link
                                  component={RouterLink}
                                  to={`/ko/maintask/dur/${boardKey}/${bbsId}/${r.id}`}
                                  color="inherit"
                                  underline="hover" // 평소엔 밑줄 없고 마우스 올릴 때만 생성 (접근성 권장)
                                  aria-label={`${r.title} 상세보기`}
                                  sx={{ 
                                    display: 'inline-block',
                                    width: '100%',
                                    fontWeight: 500,
                                    cursor: 'pointer'
                                  }}
                                >
                                  {r.title}
                                </Link>
                              </TableCell>
                              <TableCell align="center">{r.writer}</TableCell>
                              <TableCell align="center">{r.date}</TableCell>
                              <TableCell align="center">{r.views}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Stack className="paging-wrap">
                      <Pagination
                        page={pageNum}
                        count={totalPages ?? 0}
                        onChange={(_: React.ChangeEvent<unknown>, page: number) => {
                          setPageNum(page)
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
