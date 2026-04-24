/**
 * 화면ID: KIDS-PP-US-AE-01
 * 화면명: 이상사례 통계 목록
 * 화면경로: /adverse/statistics/StatisticsList
 * 화면설명: 이상사례 통계 목록 (외부용)
 */
import ContactArea from '@/components/common/ContactArea';
import DepsLocation from '@/components/common/DepsLocation';
import DgstfnExnm from '@/components/common/DgstfnExnm';
import Lnb from '@/components/common/Lnb';
import LnbSectionTitle from '@/components/common/LnbSectionTitle';
import { useAuth } from '@/contexts/AuthContext';
import { deleteStatistics, selectStatisticsList, selectUserRole } from '@/features/adverse/statistics/StatisticsThunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Box,
  Button,
  Checkbox,
  Link,
  Pagination,
  Paper,
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
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';

const PAGE_SIZE = 10;

const formatDate = (ymd: string | null | undefined) => {
  if (!ymd) return '-';
  if (ymd.length === 8) return `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
  return ymd.slice(0, 10);
};

const formatDomstForgn = (cd: string | null | undefined) => {
  if (cd === '01') return '국내';
  if (cd === '02') return '국외';
  return '-';
};

export default function StatisticsList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();

  const { list, totalCount, loading } = useAppSelector((s) => s.statistics);

  const currentUrl = location.pathname;

  const { getMenuInfo } = useAuth();
  const menuInfo = getMenuInfo(location.pathname);
  const menuSn = menuInfo?.menuSn ?? 0;
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null;
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null;
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null;

  const [searchWrd, setSearchWrd] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [menuAuthMap, setMenuAuthMap] = useState<Record<string, string>>({});

  const listAuth = (menuAuthMap['/bo/statistics/list'] ?? '').split(',').map(s => s.trim()).filter(Boolean);
  const detailAuth = (menuAuthMap['/bo/statistics/:id'] ?? '').split(',').map(s => s.trim()).filter(Boolean);
  const hasAuth = (code: string) => listAuth.includes(code);
  const hasDetailAuth = (code: string) => detailAuth.includes(code);
  const canCreate = hasAuth('BTN_APLY') || hasAuth('BTN_APLY_APRV');
  const canViewDetail = hasAuth('CLCK_DTL') || hasAuth('CLCK_DTL_M');
  const canDelete = hasDetailAuth('BTN_DEL') || hasDetailAuth('BTN_DEL_M');

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  useEffect(() => {
    dispatch(selectUserRole()).unwrap().then(({ menuAuthMap: m }) => {
      setMenuAuthMap(m);
    }).catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedIds([]);
  }, [pageNum]);

  useEffect(() => {
    dispatch(selectStatisticsList({
      statsNm: searchWrd || undefined,
      limit: PAGE_SIZE,
      offset: (pageNum - 1) * PAGE_SIZE,
    }));
  }, [dispatch, pageNum]);

  const onSearch = () => {
    setPageNum(1);
    setSelectedIds([]);
    dispatch(selectStatisticsList({
      statsNm: searchWrd || undefined,
      limit: PAGE_SIZE,
      offset: 0,
    }));
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (selectedIds.length === list.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(list.map((r) => r.statsDsetMngSn));
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`선택한 ${selectedIds.length}건을 삭제하시겠습니까?`)) return;
    try {
      await dispatch(deleteStatistics(selectedIds)).unwrap();
      alert('삭제가 완료되었습니다.');
      setSelectedIds([]);
      dispatch(selectStatisticsList({
        statsNm: searchWrd || undefined,
        limit: PAGE_SIZE,
        offset: (pageNum - 1) * PAGE_SIZE,
      }));
    } catch {
      alert('삭제에 실패했습니다.');
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
                    <Box className="search-input-group">
                      <TextField
                        size="large"
                        placeholder="통계명 검색"
                        slotProps={{
                          htmlInput: { 'aria-label': '통계명 검색' }
                        }}
                        value={searchWrd}
                        onChange={(e) => setSearchWrd(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            onSearch();
                          }
                        }}
                        sx={{ flexGrow: 1 }}
                      />
                      <Button variant="contained" size="large" className="btn-search" onClick={onSearch}>검색</Button>
                    </Box>
                  </Box>
                  <Box className="board-list-area" component="section">
                    <Box className="board-info" aria-label="이상사례 통계 검색결과" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography className="board-count">
                        검색결과
                        <Typography component="span" className="count">{totalCount}</Typography>
                        건
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {canDelete && (
                          <Button variant="outlined" size="small" color="error"
                            disabled={selectedIds.length === 0}
                            onClick={handleDelete}>
                            삭제
                          </Button>
                        )}
                        {canCreate && (
                          <Button variant="contained" size="small"
                            onClick={() => navigate(`/pp/${lang}/adverse/statistics/StatisticsCreate`)}>
                            통계 생성
                          </Button>
                        )}
                      </Stack>
                    </Box>

                    <TableContainer component={Paper} className="bbs-list">
                      <Table aria-label="이상사례 통계 목록" sx={{ tableLayout: 'fixed' }}>
                        <TableHead>
                          <TableRow>
                            {canDelete && (
                              <TableCell component="th" scope="col" align="center" sx={{ width: '5%' }}>
                                <Checkbox
                                  size="small"
                                  checked={list.length > 0 && selectedIds.length === list.length}
                                  indeterminate={selectedIds.length > 0 && selectedIds.length < list.length}
                                  onChange={handleToggleAll}
                                  inputProps={{ 'aria-label': '전체 선택' }}
                                />
                              </TableCell>
                            )}
                            <TableCell component="th" scope="col" align="center" sx={{ width: canDelete ? '6%' : '7%' }}>No</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '9%' }}>구분</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: canDelete ? '28%' : '30%' }}>통계명</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: canDelete ? '25%' : '26%' }}>자료기간</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '13%' }}>등록일</TableCell>
                            <TableCell component="th" scope="col" align="center" sx={{ width: '14%' }}>상태</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {!loading && list.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={canDelete ? 7 : 6} align="center" sx={{ py: 6 }}>
                                등록된 통계 자료가 없습니다.
                              </TableCell>
                            </TableRow>
                          )}
                          {list.map((r, idx) => (
                            <TableRow key={r.statsDsetMngSn}>
                              {canDelete && (
                                <TableCell align="center">
                                  <Checkbox
                                    size="small"
                                    checked={selectedIds.includes(r.statsDsetMngSn)}
                                    onChange={() => handleToggleSelect(r.statsDsetMngSn)}
                                    inputProps={{ 'aria-label': `${r.statsNm} 선택` }}
                                  />
                                </TableCell>
                              )}
                              <TableCell component="th" scope="row" align="center">
                                {totalCount - ((pageNum - 1) * PAGE_SIZE + idx)}
                              </TableCell>
                              <TableCell align="center">{formatDomstForgn(r.domstForgnSeCd)}</TableCell>
                              <TableCell align="left">
                                {canViewDetail ? (
                                  <Link
                                    component={RouterLink}
                                    to={`/pp/${lang}/adverse/statistics/StatisticsDetail/${r.statsDsetMngSn}`}
                                    color="inherit"
                                    underline="hover"
                                    aria-label={`${r.statsNm} 상세보기`}
                                    sx={{
                                      display: 'inline-block',
                                      width: '100%',
                                      fontWeight: 500,
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {r.statsNm}
                                  </Link>
                                ) : (
                                  <Typography sx={{ fontWeight: 500 }}>{r.statsNm}</Typography>
                                )}
                              </TableCell>
                              <TableCell align="center">{formatDate(r.rptDataBgngYmd)} ~ {formatDate(r.rptDataEndYmd)}</TableCell>
                              <TableCell align="center">{formatDate(r.regDt)}</TableCell>
                              <TableCell align="center">
                                {r.status === '03' ? '생성완료'
                                  : r.status === '02' ? '생성 중'
                                  : r.status === '04' ? '실패'
                                  : '미생성'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Stack className="paging-wrap">
                      <Pagination
                        page={pageNum}
                        count={totalPages}
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
                  )}
                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
      </Box>
    </Box>
  );
}
