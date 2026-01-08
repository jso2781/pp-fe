import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectFaqListApiPath, getFaqApiPath, insertFaqApiPath, updateFaqApiPath, saveFaqApiPath, deleteFaqApiPath } from '@/api/faq/FaqApiPaths'
import { mockFaqList, FaqPVO, FaqRVO, FaqListPVO, FaqListRVO, FaqDVO  } from './FaqTypes'

/**
 * 대국민포털_FAQ기본 정보 목록 조회 
 */
export const selectFaqList = createAsyncThunk<FaqListRVO, FaqListPVO | undefined>(
  '/faq/selectFaqList',
  async (params: FaqListPVO = {}) => {
    try {
      const res = await https.post(selectFaqListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 Faq[] 형식으로 주므로 FaqListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as FaqListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
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

/**
 * 대국민포털_FAQ기본 정보 조회 
 */
export const getFaq = createAsyncThunk<FaqRVO, FaqPVO | undefined>(
  '/faq/getFaq',
  async (params: FaqPVO = {}) => {
    try {
      const res = await https.post(getFaqApiPath(), params);

      const payload = res.data;

      // 서버가 FaqRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("FaqThunks getFaq mockFaqList=",mockFaqList);
      return (mockFaqList).find((n) => 
      ) || null;
    }
  }
)

/**
 * 대국민포털_FAQ기본 입력 
 */
export const insertFaq = createAsyncThunk<number, FaqPVO>(
  '/faq/insertFaq',
  async (params: FaqPVO) => {
    try {
      const res = await https.post(insertFaqApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("FaqThunks insertFaq");
      return -1;
    }
  }
)

/**
 * 대국민포털_FAQ기본 수정 
 */
export const updateFaq = createAsyncThunk<number, FaqPVO>(
  '/faq/updateFaq',
  async (params: FaqPVO) => {
    try {
      const res = await https.post(updateFaqApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("FaqThunks updateFaq");
      return -1;
    }
  }
)

/**
 * 대국민포털_FAQ기본 저장 
 */
export const saveFaq = createAsyncThunk<number, FaqPVO>(
  '/faq/saveFaq',
  async (params: FaqPVO) => {
    try {
      const res = await https.post(saveFaqApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("FaqThunks saveFaq error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_FAQ기본 삭제 
 */
export const deleteFaq = createAsyncThunk<number, FaqDVO>(
  '/faq/deleteFaq',
  async (params: FaqDVO) => {
    try {
      const res = await https.post(deleteFaqApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("FaqThunks deleteFaq error!!");
      return -1;
    }
  }
)

