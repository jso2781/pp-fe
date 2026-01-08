import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectBbsListApiPath, getBbsApiPath, insertBbsApiPath, updateBbsApiPath, saveBbsApiPath, deleteBbsApiPath } from '@/api/notice/BbsApiPaths'
import { mockBbsList, BbsPVO, BbsRVO, BbsListPVO, BbsListRVO, BbsDVO  } from './BbsTypes'

/**
 * 대국민포털_게시판기본 정보 목록 조회 
 */
export const selectBbsList = createAsyncThunk<BbsListRVO, BbsListPVO | undefined>(
  '/notice/selectBbsList',
  async (params: BbsListPVO = {}) => {
    try {
      const res = await https.post(selectBbsListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 Bbs[] 형식으로 주므로 BbsListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as BbsListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("BbsThunks selectBbsList mockBbsList=",mockBbsList);
      const filtered = mockBbsList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: BbsListRVO = { list: filtered as BbsRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_게시판기본 정보 조회 
 */
export const getBbs = createAsyncThunk<BbsRVO, BbsPVO | undefined>(
  '/notice/getBbs',
  async (params: BbsPVO = {}) => {
    try {
      const res = await https.post(getBbsApiPath(), params);

      const payload = res.data;

      // 서버가 BbsRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("BbsThunks getBbs mockBbsList=",mockBbsList);
      return (mockBbsList).find((n) => 
        String(n.bbsId) === String(params.bbsId)
      ) || null;
    }
  }
)

/**
 * 대국민포털_게시판기본 입력 
 */
export const insertBbs = createAsyncThunk<number, BbsPVO>(
  '/notice/insertBbs',
  async (params: BbsPVO) => {
    try {
      const res = await https.post(insertBbsApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("BbsThunks insertBbs");
      return -1;
    }
  }
)

/**
 * 대국민포털_게시판기본 수정 
 */
export const updateBbs = createAsyncThunk<number, BbsPVO>(
  '/notice/updateBbs',
  async (params: BbsPVO) => {
    try {
      const res = await https.post(updateBbsApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("BbsThunks updateBbs");
      return -1;
    }
  }
)

/**
 * 대국민포털_게시판기본 저장 
 */
export const saveBbs = createAsyncThunk<number, BbsPVO>(
  '/notice/saveBbs',
  async (params: BbsPVO) => {
    try {
      const res = await https.post(saveBbsApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("BbsThunks saveBbs error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_게시판기본 삭제 
 */
export const deleteBbs = createAsyncThunk<number, BbsDVO>(
  '/notice/deleteBbs',
  async (params: BbsDVO) => {
    try {
      const res = await https.post(deleteBbsApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("BbsThunks deleteBbs error!!");
      return -1;
    }
  }
)

