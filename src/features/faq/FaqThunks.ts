import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectFaqListApiPath } from '@/api/faq/FaqApiPaths'
import { FaqListPVO, FaqListRVO } from './FaqTypes'

/**
 * 대국민포털_FAQ기본 정보 목록 조회 
 */
export const selectFaqList = createAsyncThunk<FaqListRVO, FaqListPVO, { rejectValue: string }>(
  '/faq/selectFaqList',
  async (params: FaqListPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectFaqListApiPath(), params);
      const payload = res.data?.data?.list || [];

      return {
        list: payload,
        totalCount: payload.length
      } as FaqListRVO;
    }
    catch (e) {
      console.error('!!! faqThunks > selectFaqList 에러.');
      console.error(e);
      return rejectWithValue('NETWORK_OR_SERVER_ERROR');
    }
  }
)


