/**
 * 화면ID: KIDS-PP-US-NO-08
 * 화면명: 동영상 게시판 목록
 * 화면경로: /board/video/:bbsId
 * 화면설명: 동영상 게시판 목록
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
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useParams, useSearchParams } from 'react-router-dom';

export default function VideoBoardList() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { list, totalCount, totalPages, loading } = useAppSelector((s) => s.pst);

  const [searchCnd, setSearchCnd] = useState(searchParams.get('searchCnd') || 'title');
  const [searchWrd, setSearchWrd] = useState(searchParams.get('searchWrd') || '');

  const baseUrl = import.meta.env.VITE_ANY_ID_STATIC_URL || '';
  
  // 페이징 관련
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(12) // 화면에 페이지 사이즈 설정이 필요시 setPageSize 활용
  
  // 게시판 ID 추출
  const { bbsId } = useParams<{ bbsId: string }>();

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
        thmbFileNm: n.thmbFileNm ?? '',
        thmbFilePath: n.thmbFilePath && n.thmbFileNm
          ? `${baseUrl}/api/atch/thumb/${n.thmbFilePath}${n.thmbFileNm}`
          : '/img/img_no_thmb.png',          
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onSearch();
                          }
                        }}
                        sx={{ flexGrow: 1 }} // 남은 공간을 꽉 채우도록 설정
                      />
                      <Button variant="contained" size="large" className="btn-search" onClick={onSearch}>검색</Button>
                    </Box>
                  </Box>
                  <Box className="board-list-area" component="section">
                    <Box className="board-info" aria-label="게시판 검색결과">
                      <Typography className="board-count">
                        검색결과 
                        <Typography component="span" className="count">{totalCount}</Typography>
                        건
                      </Typography>
                    </Box>

                    <Box className="board-card-list">
                      <Grid container component="ul" className="card-list-wrap">
                        {rows.map((item, index) => (
                          <Grid component="li" key={item.id} className="card-item-li">
                            <Link
                              component={RouterLink}
                              className='card-item-link'                              
                              to={`/ko/board/video/${bbsId}/${item.id}`}
                              underline="none"
                              aria-label={`${item.title} 상세보기`}
                            >
                              <Box className="thumb-area">
                                <Box className="thumb-box">
                                  <img src={item.thmbFilePath} alt={`썸네일 이미지 ${index+1}`} aria-hidden="true" />
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
                  <ContactArea
                    contactDepNm={contactDepNm}
                    contactPersonNm={contactPersonNm}
                    contactPhoneNum={contactPhoneNum}
                  />                                    
                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
      </Box>
    </Box>
  );
}
