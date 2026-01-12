import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
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
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  TextField,
  Paper,
} from '@mui/material';
import { ExpandLess, ExpandMore, Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';
import PageTitle from '@/components/common/PageTitle';
import { selectPstList } from '@/features/pst/PstThunks';
import { PstRVO } from '@/features/pst/PstTypes';
import DepsLocation from '@/components/common/DepsLocation';

type SideItem = {
  key: string;
  label: string;
  disabled?: boolean;
  children?: SideItem[];
};

function SideNav({ items }: { items: SideItem[] }) {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpenKeys((s) => ({ ...s, [k]: !s[k] }));

  const renderItems = (arr: SideItem[], depth = 0) => (
    <List disablePadding>
      {arr.map((it) => {
        const active = location.pathname === it.key || location.pathname.startsWith(it.key + '/');
        const hasChildren = !!it.children?.length;
        const disabled = !!it.disabled;
        return (
          <Box key={it.key} sx={{ pl: depth * 2 }}>
            <ListItemButton
              selected={active}
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                if (hasChildren) return toggle(it.key);
                if (it.key.startsWith('http')) {
                  window.open(it.key, '_blank');
                  return;
                }
                // keys in source are mostly without lang prefix; normalize:
                const dest = it.key.startsWith('/ko/') ? it.key : '/ko' + it.key;
                window.location.href = dest;
              }}
            >
              <ListItemText primary={it.label} />
              {hasChildren ? (openKeys[it.key] ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
            {hasChildren ? (
              <Collapse in={!!openKeys[it.key]} timeout="auto" unmountOnExit>
                {renderItems(it.children!, depth + 1)}
              </Collapse>
            ) : null}
          </Box>
        );
      })}
    </List>
  );

  return <Box>{renderItems(items)}</Box>;
}

export default function NoticeList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page') || 1);

  const { list, totalCount, loading } = useAppSelector((s) => s.pst);

  const { bbsId } = useParams<{ bbsId: string }>();
  const [searchCnd, setSearchCnd] = useState(searchParams.get('searchCnd') || 'title');
  const [searchWrd, setSearchWrd] = useState(searchParams.get('searchWrd') || '');

  // sample fallback (페이지가 정적일 때도 동작하도록)
  const sampleNotices =[
    { no: 850, title: '[입찰공고]2026년 의약품통합정보시스템 등 유지보수 사업(긴급입찰)(정정공고)', writer: '박혜정', date: '2025-11-07', views: 757 },
    { no: 849, title: '한국의약품안전관리원 정보시스템 네트워크 중단 작업 안내 (\'25.11.7.(금) 19시 ~ 11.8.(토) 12시)', writer: '이주아', date: '2025-11-06', views: 725 },
    { no: 848, title: '2025년 한국의약품안전관리원 포스터·카툰 공모전 수상자 발표', writer: '장선주', date: '2025-10-31', views: 1147 },
  ];

  const sideItems: SideItem[] = useMemo(
    () => [
      { key: '/notice', label: '공지사항' },
      { key: '/jobs', label: '채용게시판', disabled: true },
      {
        key: 'centers_group',
        label: '센터',
        children: [
          { key: '/center/1', label: '센터 소개', disabled: true },
          { key: '/center/2', label: '센터 소식', disabled: true },
        ],
      },
    ],
    [],
  );

  const rows = useMemo(() => {
    const arr = Array.isArray(list) && list.length > 0 ? list : sampleNotices;
    return arr.map((n: any, idx: number) => {
      const id = n.no ?? String(idx);
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
    dispatch(selectPstList({ pageIndex, bbsId, searchCnd, searchWrd }));
  }, [dispatch, pageIndex, bbsId, searchCnd, searchWrd]);

  const onSearch = () => {
    const next = new URLSearchParams();
    next.set('page', '1');
    if (searchCnd) next.set('searchCnd', searchCnd);
    if (searchWrd) next.set('searchWrd', searchWrd);
    setSearchParams(next);
    dispatch(selectPstList({ pageIndex: 1, searchCnd, searchWrd }));
  };

  const totalPages = Math.max(1, Math.ceil((totalCount || rows.length || 1) / 10));

  return (
    <Box className="page-layout">
      <PageTitle title="기관 소식" subtitle="공지사항"/>
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="sub-content">
            <DepsLocation />

            <Box className="content-view" id="content">
              <Box className="sub_lnb">
                <Card variant="outlined" sx={{ p: 1 }}>
                  <SideNav items={sideItems} />
                </Card>
              </Box>

              <Box className="page-content">
                <Box className="ds-board">
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6">공지사항</Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel id="searchCnd-label">검색조건</InputLabel>
                        <Select
                          labelId="searchCnd-label"
                          label="검색조건"
                          value={searchCnd}
                          onChange={(e) => setSearchCnd(String(e.target.value))}
                        >
                          <MenuItem value="title">제목</MenuItem>
                          <MenuItem value="content">내용</MenuItem>
                          <MenuItem value="writer">작성자</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        size="small"
                        placeholder="검색어"
                        value={searchWrd}
                        onChange={(e) => setSearchWrd(e.target.value)}
                      />

                      <Button variant="contained" onClick={onSearch} disabled={loading}>
                        검색
                      </Button>
                    </Stack>
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell width={80} align="center">No</TableCell>
                          <TableCell>제목</TableCell>
                          <TableCell width={120} align="center">작성자</TableCell>
                          <TableCell width={140} align="center">등록일</TableCell>
                          <TableCell width={90} align="center">조회수</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((r, idx) => (
                          <TableRow key={String(r.id)} hover>
                            <TableCell align="center">{(pageIndex - 1) * 10 + idx + 1}</TableCell>
                            <TableCell>
                              <Button
                                variant="text"
                                sx={{ p: 0, textTransform: 'none', justifyContent: 'flex-start' }}
                                onClick={() => navigate(`/ko/notice/${r.id}?page=${pageIndex}`)}
                              >
                                {r.title}
                              </Button>
                            </TableCell>
                            <TableCell align="center">{r.writer}</TableCell>
                            <TableCell align="center">{r.date}</TableCell>
                            <TableCell align="center">{r.views}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                    <Pagination
                      count={totalPages}
                      page={pageIndex}
                      onChange={(_, p) => {
                        const next = new URLSearchParams(searchParams);
                        next.set('page', String(p));
                        setSearchParams(next);
                        dispatch(selectPstList({ pageIndex: p, searchCnd, searchWrd }));
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
