import React, { useEffect, useMemo, useState } from 'react'
import { Box, Typography, Stack, Pagination, Button} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAppDispatch } from '@/store/hooks';
import { useLocation, useSearchParams } from 'react-router-dom';
import { selectPrdctDetailList } from '@/features/dur/DurPrdctDetailThunks';
import { DurPrdctDetailRVO } from '@/features/dur/DurPrdctDetailTypes';

const PAGE_SIZE = 10;

type PopupData = {
  list: DurPrdctDetailRVO[];
  totalCount: number;
  totalPages: number;
  loading: boolean;
};

const initialData: PopupData = {
  list: [],
  totalCount: 0,
  totalPages: 0,
  loading: false,
};

function DurPrdctDetailPopInner() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const igrdNm = searchParams.get('igrdNm') ?? (location.state as { igrdNm?: string } | null)?.igrdNm ?? '';
  const bannTypeCd = searchParams.get('bannTypeCd') ?? (location.state as { bannTypeCd?: string } | null)?.bannTypeCd ?? 'conc';
  const rlvtAge = searchParams.get('rlvtAge') ?? (location.state as { rlvtAge?: string } | null)?.rlvtAge ?? '';
  const condiGrdCd = searchParams.get('condiGrdCd') ?? (location.state as { condiGrdCd?: string } | null)?.condiGrdCd ?? '';
  const maxAdminPrdDayCnt = searchParams.get('maxAdminPrdDayCnt') ?? (location.state as { maxAdminPrdDayCnt?: string } | null)?.maxAdminPrdDayCnt ?? '';
  const dayMaxAdminCpct = searchParams.get('dayMaxAdminCpct') ?? (location.state as { dayMaxAdminCpct?: string } | null)?.dayMaxAdminCpct ?? '';

  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState<PopupData>(initialData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);

  const rows = useMemo(() => {
    return data.list.map((n: DurPrdctDetailRVO, idx: number) => ({
      id: String(idx),
      prdctNm: n.prdctNm ?? '',
      bzentyNm: n.bzentyNm ?? '',
    }));
  }, [data.list]);

  useEffect(() => {
    /* 성분명이 없으면 조회하지 않음 */
    if (!igrdNm?.trim()) return;

    /* 조회전 초기 로딩 상태 설정 */
    setData((prev) => ({ ...prev, loading: true }));

    /* 제품 상세 조회(비동기 데이터 조회) */
    dispatch(selectPrdctDetailList({ pageNum, pageSize: PAGE_SIZE, igrdNm: igrdNm.trim(), bannTypeCd, rlvtAge, condiGrdCd, maxAdminPrdDayCnt, dayMaxAdminCpct }))
      .then((action) => {
        if (selectPrdctDetailList.fulfilled.match(action)) {
          const p = action.payload;
          setData({
            list: p.list ?? [],
            totalCount: p.totalCount ?? 0,
            totalPages: p.totalPages ?? 0,
            loading: false,
          });
        } else {
          setData((prev) => ({ ...prev, loading: false }));
        }
      })
      /* 조회 실패 시 로딩 상태 설정 */
      .catch(() => setData((prev) => ({ ...prev, loading: false })));

  }, [dispatch, pageNum, igrdNm, bannTypeCd, rlvtAge, condiGrdCd, maxAdminPrdDayCnt, dayMaxAdminCpct]);

return (
      <Box className="ingredient-popup-wrapper">
        <Box className="ingredient-result-header">
          <span className="label">성분명</span>
          <span className="name">{igrdNm}</span>
        </Box>

        <Box className="board-info" aria-label="검색결과">
          <Typography className="board-count">
            검색결과 
            <Typography component="span" className="count">{data.totalCount}</Typography>
            건
          </Typography>
        </Box>

        {/* 제품 상세 목록 */}
        <Box className="base-table-container">
          <Box className="table-responsive has-vscroll">
            <table className="base-table">
              <caption className="sr-only">성분명 정보</caption>
              <colgroup>
                <col />
                {/* <col style={{ width: '30%' }} />   */}
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제품명</th>
                  {/* <th scope="col">제약회사</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  rows.length > 0 && rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.prdctNm}</td>
                      {/* <td>
                        {row.bzentyNm}
                      </td> */}
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </Box>
        </Box>
        {data.totalCount > 0 && data.totalCount > PAGE_SIZE && (
          <Stack className="paging-wrap" sx={{ mt: 2 }}>
            <Pagination
              page={pageNum}
              count={data.totalPages}
              onChange={(_: React.ChangeEvent<unknown>, page: number) => {
                setPageNum(page)
              }}
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </Box>

  );
}

export default React.memo(DurPrdctDetailPopInner);
