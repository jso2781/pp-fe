import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurSearchRoomListApiPath } from '@/api/dur/DurSearchRoomPaths'
import { mockDurSearchRoomList, DurSearchRoomListPVO, DurSearchRoomRVO, DurSearchRoomListRVO } from './DurSearchRoomTypes'

/**
 * DUR 정보 검색 
 */
export const selectDurSearchRoomList = createAsyncThunk<DurSearchRoomListRVO, DurSearchRoomListPVO | undefined, { rejectValue: string }>(
  '/dur/selectDurSearchRoomList',
  async (params: DurSearchRoomListPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectDurSearchRoomListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data?.data;

      // 서버가 DurSearchRoomRVO[] 형식으로 주므로 DurSearchRoomListRVO 형식으로 데이터 구조 재조정 
      return {
        list: payload && Array.isArray(payload.list) ? payload.list : [],
        totalCount: payload.totalCount ?? 0,
        totalPages: payload.totalPages ?? 0,
      } as DurSearchRoomListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      console.log("DurSearchRoomThunks selectDurSearchRoomList error!!");
      return rejectWithValue('DurSearchRoomThunks selectDurSearchRoomList error!!');
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      /*
      console.log("DurSearchRoomThunks selectDurSearchRoomList mockDurSearchRoomList=",mockDurSearchRoomList);
      const filtered = mockDurSearchRoomList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurSearchRoomListRVO = {
        list: filtered as DurSearchRoomRVO[], totalCount: filtered.length,
        totalPages: Math.ceil(filtered.length / (params.pageSize ?? 10))
      }
      return result;
      */
    }
  }
)