import React, { useMemo, useState } from 'react';
import { Box, Stack, FormControl, InputLabel, Select, MenuItem, TextField, Button, Pagination, Typography, Grid, Link } from '@mui/material';
import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_NO_08() {
  const [searchCnd, setSearchCnd] = useState('title');
  const [searchWrd, setSearchWrd] = useState('');
  const [page, setPage] = useState(1);

  // 사이드 메뉴 설정
  const sideItems = useMemo(() => [
    { key: '/1', label: '공지사항' },
    { key: '/2', label: '채용게시판' },
    { key: '/3', label: 'FAQ' },
    { key: '/4', label: '고객문의' },
    { key: '/5', label: '보도자료' },
    { key: '/6', label: '뉴스레터' },
    { key: '/7', label: '카드뉴스' },
    { key: '/8', label: '동영상' },
    { key: '/9', label: '자료실' },
  ], []);

  // 퍼블리싱 확인용
  const cardList = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `[카드뉴스] 제 ${i + 1}호 아동 권리 증진을 위한 콘텐츠 제목...`,
    writer: '교육홍보팀',
    date: '2026-01-01',
    views: 120 + i,
  }));
  
  return (
    <ScreenShell screenId="KIDS-PP-US-NO-08" title="갤러리 게시판 목록 카드뉴스" uiType="page">
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>기관 소식</span>
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
                  <Box component="form" className="board-search">
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
                        sx={{ flexGrow: 1 }}
                      />
                      <Button variant="contained" size="large" className="btn-search">검색</Button>
                    </Box>
                  </Box>
                  <Box className="board-list-area" component="section">
                    {/* 검색 결과 요약 */}
                    <Box className="board-info" aria-label="게시판 검색결과">
                      <Typography className="board-count">
                        검색결과 
                        <Typography component="span" className="count">{cardList.length}</Typography>
                        건
                      </Typography>
                    </Box>

                    {/* 카드뉴스 리스트 영역*/}
                    <Box className="board-card-list">
                      <Grid container component="ul" className="card-list-wrap">
                        {cardList.map((item) => (
                          <Grid component="li" key={item.id} className="card-item-li">
                            <Link href="#" className="card-item-link" underline="none">
                              <Box className="thumb-area">
                                <Box className="thumb-box">
                                  <img src="/img/img_test.png" alt="썸네일설명" aria-hidden="true" />
                                </Box>
                              </Box>
                              <Box className="info-area">
                                <Typography className="title-text" component="strong">
                                  {item.title}
                                </Typography>
                                <Box className="meta-group">
                                  <span className="writer-name">
                                    <span className="sr-only">작성자</span>{item.writer}
                                  </span>
                                  <span className="reg-date">
                                    <span className="sr-only">등록일</span>{item.date}
                                  </span>
                                  <span className="view-count">
                                    <span className="sr-only">조회수</span>{item.views}
                                  </span>
                                </Box>
                              </Box>
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    {/* 페이지네이션 */}
                    <Stack className="paging-wrap">
                      <Pagination 
                        count={10} 
                        page={page} 
                        onChange={(_, p) => setPage(p)} 
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
    </ScreenShell>
  );
}