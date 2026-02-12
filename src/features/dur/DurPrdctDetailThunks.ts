import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectPrdctDetailListApiPath } from '@/api/dur/DurPrdctDetailPaths'
import { DurPrdctDetailListRVO, DurPrdctDetailListPVO  } from './DurPrdctDetailTypes'

/**
 * DUR 효능군중복주의 상세 조회 
 */
export const selectPrdctDetailList = createAsyncThunk<DurPrdctDetailListRVO, DurPrdctDetailListPVO | undefined, { rejectValue: string }>(
  '/dur/selectPrdctDetailList',
  async (params: DurPrdctDetailListPVO = { bannTypeCd: 'conc' }, { rejectWithValue }) => {
    try {
      const res = await https.post(selectPrdctDetailListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const data = res.data?.data ?? res.data;
      const rawList = data?.list ?? data?.content ?? (Array.isArray(data) ? data : []);
      const list = Array.isArray(rawList) ? rawList : [];
      const totalCount = Number(data?.totalCount ?? list.length) || 0;
      const pageSize = params?.pageSize ?? 10;
      const totalPages = Number(data?.totalPages ?? Math.ceil(totalCount / pageSize)) || 1;

      return {
        list,
        totalCount,
        totalPages,
      } as DurPrdctDetailListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      console.log("DurPrdctDetailThunks selectPrdctDetailList error!!");
      return rejectWithValue('DurPrdctDetailThunks selectPrdctDetailList error!!');
    }
  }
)