import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectFaqListApiPath, getFaqApiPath, insertFaqApiPath, updateFaqApiPath, saveFaqApiPath, deleteFaqApiPath } from '@/api/faq/FaqApiPaths'
import { mockFaqList, FaqPVO, FaqRVO, FaqListPVO, FaqListRVO, FaqDVO  } from './FaqTypes'

export const sideEffectThunk = createAsyncThunk(
  '/faq/test',
  async () => {
    const func = () => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          throw new Error('비동기 작업중 에러');
          rej('무조건실패');
        }, 3000);
      });
    }
    try {
      await func();

    } catch (err){
      console.error(err);
    }
  });

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


