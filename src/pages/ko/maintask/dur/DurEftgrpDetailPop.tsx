import React, { useEffect, useMemo, useState } from 'react'
import { Box, Typography, Stack, Pagination, Button} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAppDispatch } from '@/store/hooks';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { selectEftgrpDetailList } from '@/features/dur/DurEftgrpDetailThunks';
import { DurEftgrpDetailRVO } from '@/features/dur/DurEftgrpDetailTypes';

const PAGE_SIZE = 10;

type PopupData = {
  list: DurEftgrpDetailRVO[];
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

function DurEftgrpDetailPopInner() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const effGroupNm = searchParams.get('effGroupNm') ?? (location.state as { effGroupNm?: string } | null)?.effGroupNm ?? '';
  const groupNm = searchParams.get('groupNm') ?? (location.state as { groupNm?: string } | null)?.groupNm ?? '';
  const igrdNm = searchParams.get('igrdNm') ?? (location.state as { igrdNm?: string } | null)?.igrdNm ?? '';

  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState<PopupData>(initialData);
  const { lang } = useParams<{ lang: string }>();

  /** 제품검색 클릭 시 DurPrdctDetailPop을 팝업 창으로 열고, igrdNm을 쿼리로 전달 */
  const openPrdctDetailPop = (igrdNm: string, bannTypeCd: string) => {
    const base = `${window.location.origin}/pp/${lang ?? 'ko'}/maintask/dur/DurPrdctDetailPop`;
    const url = `${base}?igrdNm=${encodeURIComponent(igrdNm)}&bannTypeCd=${encodeURIComponent(bannTypeCd)}`;
    const width = 800;
    const height = 600;
    const left = Math.round((window.screen.width - width) / 1.5);
    const top = Math.round((window.screen.height - height) / 1.5);
    const features = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,popup=1`;
    window.open(url, 'DurPrdctDetailPop', features);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNum]);

  const rows = useMemo(() => {
    return data.list.map((n: DurEftgrpDetailRVO, idx: number) => ({
      id: String(idx),
      effGroupNm: n.effGroupNm ?? '',
      groupNm: n.groupNm ?? '',
      igrdNm: n.igrdNm ?? '',
    }));
  }, [data.list]);

  useEffect(() => {
    /* 성분명이 없으면 조회하지 않음 */
    if (!igrdNm?.trim()) return;

    /* 조회전 초기 로딩 상태 설정 */
    setData((prev) => ({ ...prev, loading: true }));

    /* 효능군중복주의 상세 조회(비동기 데이터 조회) */
    dispatch(selectEftgrpDetailList({ pageNum, pageSize: PAGE_SIZE, effGroupNm: effGroupNm.trim(), groupNm: groupNm.trim(), igrdNm: igrdNm.trim() }))
      .then((action) => {
        if (selectEftgrpDetailList.fulfilled.match(action)) {
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

  }, [dispatch, pageNum, igrdNm, effGroupNm, groupNm]);

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

        {/* 효능군중복주의 상세 목록 */}
        <Box className="base-table-container">
          <Box className="table-responsive has-vscroll">
            <table className="base-table">
              <caption className="sr-only">성분명 정보</caption>
              <colgroup>
                <col style={{ width: '20%' }} /> 
                <col style={{ width: '30%' }} /> 
                <col style={{ width: '50%' }} /> 
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">중복주의 효능군</th>
                  <th scope="col">중복주의 계열</th>
                  <th scope="col">성분</th> 
                </tr>
              </thead>
              <tbody>
                {
                  rows.length > 0 && rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.effGroupNm}</td>
                      <td>{row.groupNm}</td>
                      <td>
                        <Box className="detail-info-row">
                          <p className="text">{row.igrdNm}</p>
                          <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />} onClick={() => openPrdctDetailPop(row.igrdNm, 'eftgrp')}>
                            제품검색
                          </Button>
                        </Box>
                      </td>
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

export default React.memo(DurEftgrpDetailPopInner);
