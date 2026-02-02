import { useMemo, useState } from 'react'
import { Box, Stack, FormControl, InputLabel, Select, MenuItem, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav'
import { useAppSelector } from '@/store/hooks';
import { useSearchParams} from 'react-router-dom';
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_MT_02() {
  const [collapsed, setCollapsed] = useState(false)
  const sideItems = useMemo(
    () => [
      { 
        key: 'sub1', 
        label: '내업무', 
        children: [
          { key: '/2-1', label: '서브메뉴2-1' },
          { key: '/2-2', label: '서브메뉴2-2', isExternal: true },
        ]
      },
    ],
    [],
  )

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

  // 함수 정의가 없으면 오류가 나므로 추가
  const handleFileDownload = (url) => {
    alert(url + " 파일을 다운로드 합니다.");
  };

  //페이징
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page') || 1);
  const { list, totalCount } = useAppSelector((s) => s.pst);
  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));

  // return <ListTemplate screenId="KIDS-PP-US-MT-02" title="내 업무 업무 신청 관리 목록" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-MT-02" title="내 업무 업무 신청 관리 목록" uiType="page">
      <Box className={`page-layout ${collapsed ? 'is-collapsed' : ''}`}>
        <Box className="sub-container">
          <Box className="content-wrap">
            {/* 사이드메뉴 */}
            <Box className="side-nav">
              <CollapsibleSideNav
                title="내업무"
                collapsed={collapsed}
                onToggle={() => setCollapsed((p) => !p)}
                items={sideItems}
                onSelect={(key) => window.alert(`Maps: ${key}`)}
              />
            </Box>
            {/* 서브 컨텐츠 영역 */}
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
    </ScreenShell>
  )
}
