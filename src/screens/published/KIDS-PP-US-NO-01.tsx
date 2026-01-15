import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Stack, FormControl, InputLabel, Select, MenuItem, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination, Typography } from '@mui/material';
import { fetchNoticeList } from '@/features/notice/noticeThunks';
import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export default function KIDS_PP_US_NO_01() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // --- 기존 로직 유지 ---
  const pageIndex = Number(searchParams.get('page') || 1);
  const { list, totalCount, loading } = useAppSelector((s) => s.notice);
  const [searchCnd, setSearchCnd] = useState(searchParams.get('searchCnd') || 'title');
  const [searchWrd, setSearchWrd] = useState(searchParams.get('searchWrd') || '');

  const sideItems = useMemo(() => [
    { key: '/notice', label: '공지사항' },
    { key: '/jobs', label: '채용게시판' },
    { key: 'centers_group', label: '센터', children: [{ key: '/center/1', label: '센터 소개' }] },
  ], []);

  const rows = useMemo(() => {
    const sample = [{ id: 850, title: '샘플 데이터', writer: '관리자', date: '2025-11-07', views: 0 }];
    const arr = Array.isArray(list) && list.length > 0 ? list : sample;
    return arr.map((n: any, idx: number) => ({
      id: n.id ?? n.nttId ?? idx,
      title: n.title ?? n.nttSj ?? '',
      writer: n.writer ?? n.frstRegisterNm ?? '',
      date: n.date ?? n.frstRegisterPnttm ?? '',
      views: n.views ?? n.inqireCo ?? 0,
    }));
  }, [list]);

  useEffect(() => {
    dispatch(fetchNoticeList({ pageIndex, searchCnd, searchWrd }));
  }, [dispatch, pageIndex, searchCnd, searchWrd]);

  const totalPages = Math.max(1, Math.ceil((totalCount || rows.length || 1) / 10));

  return (
    <ScreenShell screenId="KIDS-PP-US-NO-01" title="일반 게시판 목록 공지사항" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>알림마당</span>
                </Typography>
                <Box className="lnb-list">
                  <Lnb items={sideItems} />
                </Box>
              </Box>
            </Box>

            {/* 컨텐츠 본문 영역 */}
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                  
                 {/* --- 본문 시작 --- */}
                  <Box className="board-list-area" component="section">
                    <Stack component="form" className="board-search">
                      <FormControl size="large" className="search-condition">
                        <InputLabel id="search-condition-label" className="sr-only">검색조건</InputLabel>
                        <Select 
                          size="large" 
                          value={searchCnd} 
                          labelId="search-condition-label" 
                          onChange={(e) => setSearchCnd(String(e.target.value))}
                        >
                          <MenuItem value="title">제목</MenuItem>
                          <MenuItem value="content">내용</MenuItem>
                        </Select>
                      </FormControl>
                      <Box className="search-input-group">
                        <TextField 
                          size="large" 
                          placeholder="검색어 입력" 
                          value={searchWrd} 
                          onChange={(e) => setSearchWrd(e.target.value)} 
                          sx={{ flexGrow: 1 }} // 남은 공간을 꽉 채우도록 설정
                        />
                        <Button variant="contained" size="large" className="btn-search" onClick={() => dispatch(fetchNoticeList({ pageIndex: 1, searchCnd, searchWrd }))}>검색</Button>
                      </Box>
                    </Stack>

                    <Box className="board-info" aria-label="게시판 검색결과">
                      <Typography className="board-count">
                        검색결과 
                        <Typography component="span" className="count">1</Typography>
                        건
                      </Typography>
                    </Box>

                    <TableContainer component={Paper} className="bbs-list">
                      {/* 1. aria-label로 표의 목적을 설명합니다. */}
                      <Table aria-label="공지사항 목록">
                        <TableHead>
                          <TableRow>
                            {/* 2. component="th"와 scope="col"을 통해 제목 열임을 명시합니다. */}
                            <TableCell component="th" scope="col" align="center">No</TableCell>
                            <TableCell component="th" scope="col" align="center">제목</TableCell>
                            <TableCell component="th" scope="col" align="center">작성자</TableCell>
                            <TableCell component="th" scope="col" align="center">등록일</TableCell>
                            <TableCell component="th" scope="col" align="center">조회수</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((r, idx) => (
                            <TableRow key={String(r.id)}>
                              {/* 3. 행의 식별자 데이터도 component="th", scope="row"를 권장합니다. */}
                              <TableCell component="th" scope="row" align="center">
                                {(pageIndex - 1) * 10 + idx + 1}
                              </TableCell>
                              <TableCell>
                                {/* 4. 동작이 발생하는 요소에 명확한 aria-label을 제공합니다. */}
                                <Link
                                  component={RouterLink}
                                  to={`/ko/notice/${r.id}`}
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
                      <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
                        const next = new URLSearchParams(searchParams);
                        next.set('page', String(p));
                        setSearchParams(next);
                      }} />
                    </Stack>
                  </Box>
                   {/* --- 본문 끝 --- */}

                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScreenShell>
  );
}