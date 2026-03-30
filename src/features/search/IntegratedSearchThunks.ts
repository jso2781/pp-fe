import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { getIntegratedSearchJsonApiPath } from '@/api/search/IntegratedSearchPaths'
import { IntegratedSearchPVO, IntegratedSearchRVO } from '@/features/search/IntegratedSearchTypes'

/**
 * DUR 정보 검색 
 */
export const getIntegratedSearchJson = createAsyncThunk<IntegratedSearchRVO, IntegratedSearchPVO | undefined, { rejectValue: string }>(
  '/search/getIntegratedSearchJson',
  async (params: IntegratedSearchPVO = { searchText: '', sortBy: 'relevance', langSeCd: 'KOR' }, { rejectWithValue }) => {
    try {
      const res = await https.post(getIntegratedSearchJsonApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data?.data?.result;
      return payload as IntegratedSearchRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      console.log("IntegratedSearchThunks getIntegratedSearchJson error!!");
      return rejectWithValue('IntegratedSearchThunks getIntegratedSearchJson error!!');
    }
  }
)