/**
 * 화면ID: KIDS-PP-US-MT-04
 * 화면명: 전문가 메뉴 - 업무 신청 관리
 * 화면경로: /expert/ExpertApproval
 * 화면설명: 전문가 메뉴 - 업무 신청 관리
 */
import DepsLocation from '@/components/common/DepsLocation';
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav';
import { selectExprtApprovalList } from '@/features/exprt/ExprtApprovalThunks';
import { selectExprtMenus } from '@/features/exprt/ExprtTaskThunks';
import { getLangFromPathname } from '@/routes/lang';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function ExpertApproval() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const lnbStructor = useAppSelector((s) => s.exprtTask.lnbStructor);
  const auth = useAppSelector((s) => s.auth);
  const mbrNo = auth?.userInfo?.mbrNo || '';

  const navigate = useNavigate();
  const location = useLocation();
  const lang = getLangFromPathname(location.pathname) || 'ko'

  // 대국민포털_전문가내업무관리 업무시스템에 해당하는 메뉴 목록 조회
  useEffect(() => {
    if (mbrNo) {
      dispatch(selectExprtMenus({ mbrNo }));
    }
  }, [dispatch, mbrNo]);  

  // LNB
  const [collapsed, setCollapsed] = useState(false);

  // 검색조건
  // 검색 key는 사용할시 추후 설정 (현재는 이름만 검색)
  const [searchCnd, setSearchCnd] = useState(searchParams.get('searchCnd') || 'all');
  const [searchWrd, setSearchWrd] = useState(searchParams.get('searchWrd') || '');  
  const [aprvSttsCode, setAprvSttsCode] = useState(searchParams.get('aprvSttsCode') || 'all');  

  // 페이징 관련
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10) // 화면에 페이지 사이즈 설정이 필요시 setPageSize 활용

  // 대국민포털_전문가업무신청관리 소속 전문가 회원 목록 조회
  useEffect(() => {
    dispatch(selectExprtApprovalList({ pageNum, pageSize, mbrNo, searchCnd, searchWrd, aprvSttsCode }));
  }, [dispatch, pageNum, mbrNo]);

  const onSearch = () => {
    setPageNum(1);
    dispatch(selectExprtApprovalList({ pageNum, pageSize, mbrNo, searchCnd, searchWrd, aprvSttsCode }));
  };

  //페이징
  const { list, totalCount, totalPages } = useAppSelector((s) => s.exprtApproval);

  return (
    <Box className={`page-layout ${collapsed ? 'is-collapsed' : ''}`}>
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="side-nav">
            <CollapsibleSideNav
              title="내 업무"
              collapsed={collapsed}
              onToggle={() => setCollapsed((p) => !p)}
              lnbStructor={lnbStructor}
              onSelect={(key) => {
                if (key.startsWith('http')) {
                  window.open(key, '_blank');
                } else {
                  const dest = key.startsWith('/') ? key : `/${key}`;
                  window.location.assign(dest);
                }
              }}
            />
          </Box>
            <Box className="sub-content">
              <DepsLocation />{/* 상단 현재 위치 정보 */}
              <Box className="content-view" id="content">
                <Box className="page-content">
                  {/* --- 본문 시작 --- */}
                    <h3 className="section-title-work">소속 전문가 회원 현황</h3>
                    <Box component="form" className="search-filter">
                      <Box className="filter-item">
                        <label className="search-label">상태</label> 
                        <Select 
                          size="large" 
                          value={aprvSttsCode}
                          className="search-select"
                          onChange={(e) => setAprvSttsCode(String(e.target.value))}
                        >
                          <MenuItem value="all">전체</MenuItem>
                          <MenuItem value="W">대기</MenuItem>
                          <MenuItem value="R">반려</MenuItem>
                          <MenuItem value="A">승인</MenuItem>
                        </Select>
                      </Box>
                      <Box className="search-input-group">
                        <TextField 
                          size="large" 
                          placeholder="이름을 입력하세요" 
                          className="search-textfield"
                          onChange={(e) => setSearchWrd(String(e.target.value))}
                          value={searchWrd}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onSearch();
                            }
                          }}
                        />
                        <Button variant="contained" size="large" className="btn-search" onClick={onSearch}>
                          검색
                        </Button>
                      </Box>
                    </Box>
                    <Box className="panel-box">
                      <Box className="board-list-area" component="section">
                        <Box className="board-info" aria-label="게시판 검색결과">
                          <Typography className="board-count">
                            검색결과 
                            <Typography component="span" className="count">{totalCount}</Typography>
                            건
                          </Typography>
                        </Box>
    
                        <TableContainer className="system-table-list">
                          <Table aria-label="전문자 회원 현황 목록">
                            <TableHead>
                              <TableRow>
                                <TableCell component="th" scope="col" align="center">No</TableCell>
                                <TableCell component="th" scope="col" align="center">이름</TableCell>
                                <TableCell component="th" scope="col" align="center">기관 이메일</TableCell>
                                <TableCell component="th" scope="col" align="center">업무시스템</TableCell>
                                <TableCell component="th" scope="col" align="center">첨부파일</TableCell>
                                <TableCell component="th" scope="col" align="center">신청 일시</TableCell>
                                <TableCell component="th" scope="col" align="center">승인/반려 일시</TableCell>
                                <TableCell component="th" scope="col" align="center">상태</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {totalCount && totalCount > 0 ? (
                                list.map((item, index) => (
                                  <TableRow key={item.exprtTaskSn || index}>
                                    <TableCell align="center">{totalCount - ((Number(pageNum) - 1) * 10 + index)}</TableCell>                                    
                                    <TableCell align="center" className="underline">                                      
                                      <Link
                                        component={RouterLink}
                                        to={`/pp/${lang}/expert/ExpertApproval/${item.exprtTaskSn}`}
                                        color="inherit"
                                        underline="hover" 
                                        aria-label={`${item.label} 신청 상세보기`}
                                        // sx={{ 
                                        //   display: 'inline-block',
                                        //   width: '100%',
                                        //   fontWeight: 500,
                                        //   cursor: 'pointer'
                                        // }}
                                      >
                                        {item.name}
                                      </Link>                                      
                                    </TableCell>
                                    <TableCell align="center">{item.instEmlNm ?? "-"}</TableCell>
                                    <TableCell align="center">{item.label ?? "-"}</TableCell>
                                    <TableCell align="center">{item.file?.fileExtnNm ?? '-'}</TableCell>
                                    <TableCell align="center">{item.taskApplyRegDt}</TableCell>
                                    <TableCell align="center">{item.taskAprvPrcsDt || '-'}</TableCell>
                                    <TableCell align="center">{item.taskAprvSttsLabel ?? '-'}</TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={9} align="center">
                                    조회된 내역이 없습니다.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
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
                  {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
        </Box>
      </Box>
    </Box>
  );
}
