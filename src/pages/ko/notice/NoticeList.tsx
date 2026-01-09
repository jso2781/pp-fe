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
import Lnb from '@/components/common/Lnb';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

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
      { key: '/notice', label: '공지사항' },
      { key: '/jobs', label: '채용게시판', disabled: true },
      {
        key: 'centers_group',
        label: '센터',
        children: [
          { key: '/center/1', label: '센터 소개', disabled: true },
          { key: '/center/2', label: '센터 소식', disabled: false },
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
                <Box className="sub_cont">
                  
                 {/* --- 본문 시작 --- */}
                  <Box className="board_list_area" component="section">
                    <Stack 
                        direction="row" 
                        spacing={1} // 요소 간 간격을 Antd 느낌으로 좁힘 (8px)
                        alignItems="stretch" // 높이를 동일하게 맞추기 위해 stretch 권장
                        component="form" 
                        className="board_search"
                      >
                      <FormControl size="large" sx={{ minWidth: 140 }}>
                        <InputLabel id="search-condition-label" className="sr_only">검색조건</InputLabel>
                        <Select 
                          value={searchCnd} 
                          labelId="search-condition-label" 
                          onChange={(e) => setSearchCnd(String(e.target.value))}
                        >
                          <MenuItem value="title">제목</MenuItem>
                          <MenuItem value="content">내용</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField 
                        size="large" 
                        placeholder="검색어 입력" 
                        value={searchWrd} 
                        onChange={(e) => setSearchWrd(e.target.value)} 
                        sx={{ flexGrow: 1 }} // 남은 공간을 꽉 채우도록 설정
                      />
                      <Button variant="contained" size="large" sx={{ px: 4, minWidth: 100 }} onClick={() => dispatch(fetchNoticeList({ pageIndex: 1, searchCnd, searchWrd }))}>검색</Button>
                    </Stack>

                    <Box className="board_info" aria-label="게시판 검색결과">
                      <Typography className="board_count">
                        검색결과 
                        <Typography component="span" className="count">1</Typography>
                        건
                      </Typography>
                    </Box>

                    <TableContainer component={Paper} className="bbs_list">
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

                    <Stack direction="row" justifyContent="center" className="paging_wrap">
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
  );
}
