import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
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
import { fetchNoticeList } from '@/features/notice/noticeThunks';
import { Notice } from '@/features/notice/noticeTypes';
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
                const dest = it.key.startsWith('/en/') ? it.key : '/en' + it.key;
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

  const { list, totalCount, loading } = useAppSelector((s) => s.notice);

  const [searchCnd, setSearchCnd] = useState(searchParams.get('searchCnd') || 'title');
  const [searchWrd, setSearchWrd] = useState(searchParams.get('searchWrd') || '');

  // sample fallback (페이지가 정적일 때도 동작하도록)
  const sampleNotices: Notice[] = [
    { id: 850, title: '[입찰공고]2026년 의약품통합정보시스템 등 유지보수 사업(긴급입찰)(정정공고)', writer: '박혜정', date: '2025-11-07', views: 757 },
    { id: 849, title: '한국의약품안전관리원 정보시스템 네트워크 중단 작업 안내 (\'25.11.7.(금) 19시 ~ 11.8.(토) 12시)', writer: '이주아', date: '2025-11-06', views: 725 },
    { id: 848, title: '2025년 한국의약품안전관리원 포스터·카툰 공모전 수상자 발표', writer: '장선주', date: '2025-10-31', views: 1147 },
  ];

  const sideItems: SideItem[] = useMemo(
    () => [
      { key: '/notice', label: 'Notice' },
      { key: '/jobs', label: 'Jobs', disabled: true },
      {
        key: 'centers_group',
        label: 'Centers',
        children: [
          { key: '/center/1', label: 'About', disabled: true },
          { key: '/center/2', label: 'News', disabled: true },
        ],
      },
    ],
    [],
  );

  const rows = useMemo(() => {
    const arr = Array.isArray(list) && list.length > 0 ? list : sampleNotices;
    return arr.map((n: any, idx: number) => {
      const id = n.id ?? n.nttId ?? idx;
      return {
        id,
        title: n.title ?? n.nttSj ?? '',
        writer: n.writer ?? n.frstRegisterNm ?? '',
        date: n.date ?? n.frstRegisterPnttm ?? '',
        views: n.views ?? n.inqireCo ?? 0,
      };
    });
  }, [list]);

  useEffect(() => {
    dispatch(fetchNoticeList({ pageIndex, searchCnd, searchWrd }));
  }, [dispatch, pageIndex, searchCnd, searchWrd]);

  const onSearch = () => {
    const next = new URLSearchParams();
    next.set('page', '1');
    if (searchCnd) next.set('searchCnd', searchCnd);
    if (searchWrd) next.set('searchWrd', searchWrd);
    setSearchParams(next);
    dispatch(fetchNoticeList({ pageIndex: 1, searchCnd, searchWrd }));
  };

  const totalPages = Math.max(1, Math.ceil((totalCount || rows.length || 1) / 10));

  return (
    <Box className="page-layout">
      <PageTitle />
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
                    <Typography variant="h6">Notice</Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel id="searchCnd-label">Filter</InputLabel>
                        <Select
                          labelId="searchCnd-label"
                          label="Filter"
                          value={searchCnd}
                          onChange={(e) => setSearchCnd(String(e.target.value))}
                        >
                          <MenuItem value="title">Title</MenuItem>
                          <MenuItem value="content">Content</MenuItem>
                          <MenuItem value="writer">Writer</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        size="small"
                        placeholder="Keyword"
                        value={searchWrd}
                        onChange={(e) => setSearchWrd(e.target.value)}
                      />

                      <Button variant="contained" onClick={onSearch} disabled={loading}>
                        Search
                      </Button>
                    </Stack>
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell width={80} align="center">No</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell width={120} align="center">Writer</TableCell>
                          <TableCell width={140} align="center">Date</TableCell>
                          <TableCell width={90} align="center">Views</TableCell>
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
                                onClick={() => navigate(`/en/notice/${r.id}?page=${pageIndex}`)}
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
                        dispatch(fetchNoticeList({ pageIndex: p, searchCnd, searchWrd }));
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
