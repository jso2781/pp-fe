import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectPstListApiPath, getPstApiPath, insertPstApiPath, updatePstApiPath, savePstApiPath, deletePstApiPath } from '@/api/notice/PstApiPaths'
import { mockPstList, PstPVO, PstRVO, PstListPVO, PstListRVO, PstDVO  } from './PstTypes'

/**
 * 대국민포털_게시물기본 정보 목록 조회 
 */
export const selectPstList = createAsyncThunk<PstListRVO, PstListPVO | undefined>(
  '/notice/selectPstList',
  async (params: PstListPVO = {}) => {
    try {
      const res = await https.post(selectPstListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 Pst[] 형식으로 주므로 PstListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as PstListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("PstThunks selectPstList mockPstList=",mockPstList);
      const filtered = mockPstList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: PstListRVO = { list: filtered as PstRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_게시물기본 정보 조회 
 */
export const getPst = createAsyncThunk<PstRVO, PstPVO | undefined>(
  '/notice/getPst',
  async (params: PstPVO = {}) => {
    try {
      const res = await https.post(getPstApiPath(), params);

      const payload = res.data;

      // 서버가 PstRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("PstThunks getPst mockPstList=",mockPstList);
      return (mockPstList).find((n) => 
      ) || null;
    }
  }
)

/**
 * 대국민포털_게시물기본 입력 
 */
export const insertPst = createAsyncThunk<number, PstPVO>(
  '/notice/insertPst',
  async (params: PstPVO) => {
    try {
      const res = await https.post(insertPstApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("PstThunks insertPst");
      return -1;
    }
  }
)

/**
 * 대국민포털_게시물기본 수정 
 */
export const updatePst = createAsyncThunk<number, PstPVO>(
  '/notice/updatePst',
  async (params: PstPVO) => {
    try {
      const res = await https.post(updatePstApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("PstThunks updatePst");
      return -1;
    }
  }
)

/**
 * 대국민포털_게시물기본 저장 
 */
export const savePst = createAsyncThunk<number, PstPVO>(
  '/notice/savePst',
  async (params: PstPVO) => {
    try {
      const res = await https.post(savePstApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("PstThunks savePst error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_게시물기본 삭제 
 */
export const deletePst = createAsyncThunk<number, PstDVO>(
  '/notice/deletePst',
  async (params: PstDVO) => {
    try {
      const res = await https.post(deletePstApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("PstThunks deletePst error!!");
      return -1;
    }
  }
)

