/**
 * 화면ID: KIDS-PP-US-MT-04
 * 화면명: 전문가 메뉴 - 업무 신청 관리
 * 화면경로: /expert/ExpertApproval
 * 화면설명: 전문가 메뉴 - 업무 신청 관리
 */
import DepsLocation from '@/components/common/DepsLocation';
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav';
import { useDialog } from '@/contexts/DialogContext';
import { refresh } from '@/features/auth/AuthThunks';
import { applyExprtTask, selectExprtInfo, withdrawExprt, withdrawExprtTask, selectExprtMenus } from '@/features/exprt/ExprtTaskThunks';
import { ExprtTaskPVO } from '@/features/exprt/ExprtTaskTypes';
import { getLangFromPathname, langPath } from '@/routes/lang';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

export default function ExpertApproval() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.exprtTask.current);
  const lnbStructor = useAppSelector((s) => s.exprtTask.lnbStructor);
  const auth = useAppSelector((s) => s.auth);
  const mbrNo = auth?.userInfo?.mbrNo || '';

  const { showDialogBackdrop, showAlertBackdrop } = useDialog();

  const navigate = useNavigate();
  const location = useLocation();
  const lang = getLangFromPathname(location.pathname) || 'ko'
  const to = (p: string) => {
    const raw = langPath(lang, p)
    return raw.replace(/\/{2,}/g, '/')
  }

  // 대국민포털_전문가내업무관리 업무시스템에 해당하는 메뉴 목록 조회
  useEffect(() => {
    if (mbrNo) {
      dispatch(selectExprtMenus({ mbrNo }));
    }
  }, [dispatch, mbrNo]);  

  useEffect(() => {
    console.log("lnbStructor", lnbStructor);
  }, []);

  // LNB
  const [collapsed, setCollapsed] = useState(false);

  //페이징
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page') || 1);
  const { list, totalCount } = useAppSelector((s) => s.pst);
  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));  

  // 테스트 데이터
  const [rows, setRows] = useState([
    {
      id: 1,
      userName: '홍길동',
      orgName: '가나다 병원',
      userEmail: 'hong@hospital.com',
      systemName: '임상관리시스템',
      fileUrl: 'license.pdf', // fileName 대신 fileUrl로 통일
      regDate: '2026-02-01 10:00', // requestDate 대신 regDate
      actionDate: '2026-02-02 14:00',
      status: 'approve',
    },
    {
      id: 2,
      userName: '김철수',
      orgName: '에이비씨 연구소',
      userEmail: 'kim@lab.com',
      systemName: '약물감시시스템',
      fileUrl: null,
      regDate: '2026-02-02 09:30',
      actionDate: null,
      status: 'waiting',
    }
  ]);  

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
                  const dest = key.startsWith('/ko/') ? key : '/ko' + key;
                  navigate(dest);
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
                          defaultValue="all" 
                          className="search-select"
                        >
                          <MenuItem value="all">전체</MenuItem>
                          <MenuItem value="waiting">대기</MenuItem>
                          <MenuItem value="reject">반려</MenuItem>
                          <MenuItem value="approve">승인</MenuItem>
                        </Select>
                      </Box>
                      <Box className="search-input-group">
                        <TextField 
                          size="large" 
                          placeholder="검색어를 입력하세요" 
                          className="search-textfield"
                        />
                        <Button variant="contained" size="large" className="search-btn">
                          검색
                        </Button>
                      </Box>
                    </Box>
                    <Box className="panel-box">
                      <Box className="board-list-area" component="section">
                        <Box className="board-info" aria-label="게시판 검색결과">
                          <Typography className="board-count">
                            검색결과 
                            <Typography component="span" className="count">1</Typography>
                            건
                          </Typography>
                        </Box>
    
                        <TableContainer className="system-table-list">
                          <Table aria-label="전문자 회원 현황 목록">
                            <TableHead>
                              <TableRow>
                                <TableCell component="th" scope="col" align="center">No</TableCell>
                                <TableCell component="th" scope="col" align="center">이름</TableCell>
                                <TableCell component="th" scope="col" align="center">기관</TableCell>
                                <TableCell component="th" scope="col" align="center">이메일</TableCell>
                                <TableCell component="th" scope="col" align="center">업무시스템</TableCell>
                                <TableCell component="th" scope="col" align="center">첨부파일</TableCell>
                                <TableCell component="th" scope="col" align="center">신청 일시</TableCell>
                                <TableCell component="th" scope="col" align="center">승인/반려 일시</TableCell>
                                <TableCell component="th" scope="col" align="center">상태</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows && rows.length > 0 ? (
                                rows.map((r, index) => (
                                  <TableRow key={r.id || index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center" className="underline">{r.userName}</TableCell>
                                    <TableCell align="center">{r.orgName}</TableCell>
                                    <TableCell align="center">{r.userEmail}</TableCell>
                                    <TableCell align="center">{r.systemName}</TableCell>
                                    <TableCell align="center">
                                      <Button variant="text" className="btn-file-down">license.pdf</Button>
                                    </TableCell>
                                    <TableCell align="center">{r.regDate}</TableCell>
                                    <TableCell align="center">{r.actionDate || '-'}</TableCell>
                                    <TableCell align="center">
                                      <Box className={`status-badge ${r.status}`}>
                                        {r.status === 'waiting' && '대기'}
                                        {r.status === 'reject' && '반려'}
                                        {r.status === 'approve' && '승인'}
                                      </Box>
                                    </TableCell>
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
                      <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
                        const next = new URLSearchParams(searchParams);
                        next.set('page', String(p));
                        setSearchParams(next);
                      }} />
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
