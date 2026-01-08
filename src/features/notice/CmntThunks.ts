import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectCmntListApiPath, getCmntApiPath, insertCmntApiPath, updateCmntApiPath, saveCmntApiPath, deleteCmntApiPath } from '@/api/notice/CmntApiPaths'
import { mockCmntList, CmntPVO, CmntRVO, CmntListPVO, CmntListRVO, CmntDVO  } from './CmntTypes'

/**
 * 대국민포털_댓글기본 정보 목록 조회 
 */
export const selectCmntList = createAsyncThunk<CmntListRVO, CmntListPVO | undefined>(
  '/notice/selectCmntList',
  async (params: CmntListPVO = {}) => {
    try {
      const res = await https.post(selectCmntListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 Cmnt[] 형식으로 주므로 CmntListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as CmntListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("CmntThunks selectCmntList mockCmntList=",mockCmntList);
      const filtered = mockCmntList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: CmntListRVO = { list: filtered as CmntRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_댓글기본 정보 조회 
 */
export const getCmnt = createAsyncThunk<CmntRVO, CmntPVO | undefined>(
  '/notice/getCmnt',
  async (params: CmntPVO = {}) => {
    try {
      const res = await https.post(getCmntApiPath(), params);

      const payload = res.data;

      // 서버가 CmntRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("CmntThunks getCmnt mockCmntList=",mockCmntList);
      return (mockCmntList).find((n) => 
      ) || null;
    }
  }
)

/**
 * 대국민포털_댓글기본 입력 
 */
export const insertCmnt = createAsyncThunk<number, CmntPVO>(
  '/notice/insertCmnt',
  async (params: CmntPVO) => {
    try {
      const res = await https.post(insertCmntApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("CmntThunks insertCmnt");
      return -1;
    }
  }
)

/**
 * 대국민포털_댓글기본 수정 
 */
export const updateCmnt = createAsyncThunk<number, CmntPVO>(
  '/notice/updateCmnt',
  async (params: CmntPVO) => {
    try {
      const res = await https.post(updateCmntApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("CmntThunks updateCmnt");
      return -1;
    }
  }
)

/**
 * 대국민포털_댓글기본 저장 
 */
export const saveCmnt = createAsyncThunk<number, CmntPVO>(
  '/notice/saveCmnt',
  async (params: CmntPVO) => {
    try {
      const res = await https.post(saveCmntApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("CmntThunks saveCmnt error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_댓글기본 삭제 
 */
export const deleteCmnt = createAsyncThunk<number, CmntDVO>(
  '/notice/deleteCmnt',
  async (params: CmntDVO) => {
    try {
      const res = await https.post(deleteCmntApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("CmntThunks deleteCmnt error!!");
      return -1;
    }
  }
)

