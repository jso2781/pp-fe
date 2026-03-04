/**
 * 화면ID: KIDS-PP-US-NO-08
 * 화면명: 일반형 게시판 목록
 * 화면경로: /board/general/:bbsId
 * 화면설명: 일반형 게시판 목록
 */
import ContactArea from '@/components/common/ContactArea';
import DepsLocation from '@/components/common/DepsLocation';
import DgstfnExnm from '@/components/common/DgstfnExnm';
import Lnb from '@/components/common/Lnb';
import LnbSectionTitle from '@/components/common/LnbSectionTitle';
import { useAuth } from '@/contexts/AuthContext';
import { selectPstList } from '@/features/pst/PstThunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';

export default function GeneralBoardList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { list, totalCount, totalPages, loading } = useAppSelector((s) => s.pst);
  const { lnbStructor } = useAppSelector((s) => s.menu);

  const [searchCnd, setSearchCnd] = useState(searchParams.get('searchCnd') || 'title');
  const [searchWrd, setSearchWrd] = useState(searchParams.get('searchWrd') || '');

  // 페이징 관련
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10) // 화면에 페이지 사이즈 설정이 필요시 setPageSize 활용

  // 게시판 ID 추출
  const { bbsId } = useParams<{ bbsId: string }>();

  const { lang } = useParams<{ lang: string }>();

  // Lnb 랜더링용
  const currentUrl = location.pathname;

  // KOGI, 만족도조사, 메뉴 별 담당자/연락처 정보 세팅
  const { getMenuInfo } = useAuth();
  const menuInfo = getMenuInfo(location.pathname);
  const menuSn = menuInfo?.menuSn ?? 0;
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null;
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null;
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null;

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
        fixYn: n.fixYn ?? 'N',
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
                  <LnbSectionTitle />
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
                      <InputLabel id="search-condition-label" className="sr-only">search condition</InputLabel>
                      <Select 
                        size="large" 
                        value={searchCnd} 
                        labelId="search-condition-label" 
                        onChange={(e) => setSearchCnd(String(e.target.value))}
                      >
                        <MenuItem value="title">title</MenuItem>
                        <MenuItem value="content">content</MenuItem>
                      </Select>
                    </FormControl>
                    <Box className="search-input-group">
                      <TextField 
                        size="large" 
                        placeholder="please input search word" 
                        value={searchWrd} 
                        onChange={(e) => setSearchWrd(e.target.value)} 
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onSearch();
                          }
                        }}
                        sx={{ flexGrow: 1 }} // 남은 공간을 꽉 채우도록 설정
                      />
                      <Button variant="contained" size="large" className="btn-search" onClick={onSearch}>Search</Button>
                    </Box>
                  </Box>
                  <Box className="board-list-area" component="section">
                    <Box className="board-info" aria-label="게시판 검색결과">
                      <Typography className="board-count">
                        result count 
                        <Typography component="span" className="count">{totalCount}</Typography>                        
                      </Typography>
                    </Box>

                    <TableContainer component={Paper} className="bbs-list">
                      {/* 1. aria-label로 표의 목적을 설명합니다. */}
                      <Table aria-label="공지사항 목록" sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                          <TableRow>
                            {/* 2. component="th"와 scope="col"을 통해 제목 열임을 명시합니다. */}
                            <TableCell component="th" scope="col" align="center" sx={{ width: '15%' }}>No</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '45%' }}>Title</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '25%' }}>Registrate Date</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '15%' }}>Views</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((r, idx) => (
                            <TableRow key={String(r.id)}>
                              {/* 3. 행의 식별자 데이터도 component="th", scope="row"를 권장합니다. */}
                              <TableCell component="th" scope="row" align="center" sx={{fontWeight: r.fixYn === 'Y' ? 'bold' : 'normal',}}>                                
                                {r.fixYn === 'Y' ? '[Notice]' : (totalCount ?? 0) - ((Number(pageNum) - 1) * 10 + idx)}
                              </TableCell>
                              <TableCell align="center">
                                {/* 4. 동작이 발생하는 요소에 명확한 aria-label을 제공합니다. */}
                                <Link
                                  component={RouterLink}
                                  to={`/pp/${lang}/board/general/${bbsId}/${r.id}`}
                                  color="inherit"
                                  underline="hover" 
                                  aria-label={`${r.title} detail`}
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
                  {/* 만족도 조사 */}
                  <DgstfnExnm menuSn={menuSn} />
                  {/* 업무 담당 부서 및 연락처 */}
                  {contactDepNm && contactPersonNm && contactPhoneNum && (
                    <ContactArea
                      contactDepNm={contactDepNm}
                      contactPersonNm={contactPersonNm}
                      contactPhoneNum={contactPhoneNum}
                    />
                   )
                  }     
                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
      </Box>
    </Box>
  );
}
