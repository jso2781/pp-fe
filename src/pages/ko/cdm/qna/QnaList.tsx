/**
 * CDM Q&A 목록
 */
import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
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
  Typography,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import type { QnaItem } from '@/api/cdm/communityInterface.ts';
import { fetchQnaList } from '@/api/cdm/communityApi';
import { useAppSelector } from '@/store/hooks';

const QNA_BBS_ID = 'BBS0000001';

/** 진행 상태 표시 (API 코드: "01" = 답변대기, "02" = 답변완료) */
function QnaStatusChip({ status }: { status: string }) {
  const s = status?.trim() ?? '';
  if (s === '02') return <Chip size="small" label="답변완료" color="success" />;
  return <Chip size="small" label="답변대기" color="warning" />;
}

export default function QnaList() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUrl = location.pathname;
  const userInfo = useAppSelector((s) => s.auth.userInfo) ?? { mbrId: 'admin' } as any; // 🚧 임시 - 원복 시 ?? { mbrId: 'admin' } as any 제거

  // 검색 폼
  const [searchCnd, setSearchCnd] = useState('title');
  const [searchWrd, setSearchWrd] = useState('');
  const [appliedCnd, setAppliedCnd] = useState('title');
  const [appliedWrd, setAppliedWrd] = useState('');

  // 페이징
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;

  // 목록 데이터
  const [qnaData, setQnaData] = useState<QnaItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);

  // 목록 조회
  useEffect(() => {
    fetchQnaList({
      bbsId: QNA_BBS_ID,
      page: pageNum,
      pageSize: String(pageSize),
      searchType: appliedCnd,
      searchKeyword: appliedWrd,
    }).then((res) => {
      setQnaData(res.list ?? []);
      setTotalCount(res.totalCount ?? 0);
    });
  }, [pageNum, appliedCnd, appliedWrd]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const rows = useMemo(() => {
    return qnaData.map((item: QnaItem, idx: number) => ({
      qstnSn: item.qstnSn ?? String(idx),
      title: item.pstTtl ?? '',
      writer: item.rgtrId ?? '',
      date: item.regDt ?? '',
      views: item.pstInqCnt ?? 0,
      hasFile: item.hasFile ?? 'N',
      status: item.qstnPrgrsSttsCd ?? '',
    }));
  }, [qnaData]);

  const onSearch = () => {
    setAppliedCnd(searchCnd);
    setAppliedWrd(searchWrd);
    setPageNum(1);
  };

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>CDM</span>
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

                {/* 안내문 */}
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: 'warning.50',
                    border: '1px solid',
                    borderColor: 'warning.200',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, textAlign: 'center', width: '100%' }}>
                    개인정보 유출, 타인에 대한 비방과 허위 사실 적시, 욕설 등의 게시물은 「정보통신망 이용촉진 및 정보보호 등에 관한
                    법률」에 의거 처벌을 받을 수 있습니다.
                  </Typography>
                </Box>

                {/* 검색 영역 */}
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
                      placeholder="검색어를 입력해주세요."
                      value={searchWrd}
                      onChange={(e) => setSearchWrd(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
                      sx={{ flexGrow: 1 }}
                    />
                    <Button variant="contained" size="large" className="btn-search" onClick={onSearch}>
                      검색
                    </Button>
                  </Box>
                </Box>

                <Box className="board-list-area" component="section">
                  <Box className="board-info" aria-label="게시판 검색결과 정보">
                    <Typography className="board-count">
                      검색결과
                      <Typography component="span" className="count">{totalCount}</Typography>
                      건
                    </Typography>
                    {userInfo?.mbrId && (
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={() => navigate(`/pp/${lang}/cdm/qna/member/qnaWrite`)}
                      >
                        등록
                      </Button>
                    )}
                  </Box>

                  <TableContainer component={Paper} className="bbs-list">
                    <Table aria-label="Q&A 목록" sx={{ tableLayout: 'fixed' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '8%' }}>No</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '38%' }}>제목</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '8%' }}>파일</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '12%' }}>진행</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '18%' }}>작성일</TableCell>
                          <TableCell component="th" scope="col" align="center" sx={{ width: '8%' }}>조회수</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                              게시물이 존재하지 않습니다.
                            </TableCell>
                          </TableRow>
                        ) : (
                          rows.map((r, idx) => (
                            <TableRow
                              key={r.qstnSn}
                              hover
                              sx={{ cursor: 'pointer' }}
                              onClick={() => navigate(`/pp/${lang}/cdm/qna/member/qnaDetail/${r.qstnSn}`)}
                            >
                              <TableCell component="th" scope="row" align="center">
                                {totalCount - ((pageNum - 1) * pageSize + idx)}
                              </TableCell>
                              <TableCell align="left" sx={{ fontWeight: 500 }}>
                                {r.title}
                              </TableCell>
                              <TableCell align="center">
                                {r.hasFile === 'Y' && (
                                  <img src="/images/common/ico-attfile.svg" width={20} height={20} alt="첨부파일" />
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <QnaStatusChip status={r.status} />
                              </TableCell>
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
                      onChange={(_: React.ChangeEvent<unknown>, page: number) => setPageNum(page)}
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
