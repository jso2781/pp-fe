import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectFaqListApiPath } from '@/api/faq/FaqApiPaths'
import { mockFaqList, FaqRVO, FaqListPVO, FaqListRVO } from './FaqTypes'

/**
 * 대국민포털_FAQ기본 정보 목록 조회 
 */
export const selectFaqList = createAsyncThunk<FaqListRVO, FaqListPVO | undefined>(
  '/faq/selectFaqList',
  async (params: FaqListPVO = {}) => {
    try {
      const res = await https.post(selectFaqListApiPath(), params);

      const payload = res.data?.data?.list

      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as FaqListRVO;
    }
    catch (e) {
      console.log("FaqThunks selectFaqList mockFaqList=",mockFaqList);
      const filtered = mockFaqList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: FaqListRVO = { list: filtered as FaqRVO[], totalCount: filtered.length }
      return result;
    }
  }
)


