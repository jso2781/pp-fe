import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectConcBannListApiPath, getConcBannApiPath, insertConcBannApiPath, updateConcBannApiPath, saveConcBannApiPath, deleteConcBannApiPath } from '@/api/dur/ConcBannApiPaths'
import { mockConcBannList, ConcBannPVO, ConcBannRVO, ConcBannListPVO, ConcBannListRVO, ConcBannDVO  } from './DurConcBannTypes'

/**
 * 대국민포털_DUR병용금기기본 정보 목록 조회 
 */
export const selectConcBannList = createAsyncThunk<ConcBannListRVO, ConcBannListPVO | undefined>(
  '/dur/selectConcBannList',
  async (params: ConcBannListPVO = {}) => {
    try {
      const res = await https.post(selectConcBannListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 ConcBann[] 형식으로 주므로 ConcBannListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as ConcBannListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("ConcBannThunks selectConcBannList mockConcBannList=",mockConcBannList);
      const filtered = mockConcBannList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: ConcBannListRVO = { list: filtered as ConcBannRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR병용금기기본 정보 조회 
 */
export const getConcBann = createAsyncThunk<ConcBannRVO, ConcBannPVO | undefined>(
  '/dur/getConcBann',
  async (params: ConcBannPVO = {}) => {
    try {
      const res = await https.post(getConcBannApiPath(), params);

      const payload = res.data;

      // 서버가 ConcBannRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("ConcBannThunks getConcBann mockConcBannList=",mockConcBannList);
      return (mockConcBannList).find((n) => 
        String(n.concBannSn) === String(params.concBannSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR병용금기기본 입력 
 */
export const insertConcBann = createAsyncThunk<number, ConcBannPVO>(
  '/dur/insertConcBann',
  async (params: ConcBannPVO) => {
    try {
      const res = await https.post(insertConcBannApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("ConcBannThunks insertConcBann");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR병용금기기본 수정 
 */
export const updateConcBann = createAsyncThunk<number, ConcBannPVO>(
  '/dur/updateConcBann',
  async (params: ConcBannPVO) => {
    try {
      const res = await https.post(updateConcBannApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("ConcBannThunks updateConcBann");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR병용금기기본 저장 
 */
export const saveConcBann = createAsyncThunk<number, ConcBannPVO>(
  '/dur/saveConcBann',
  async (params: ConcBannPVO) => {
    try {
      const res = await https.post(saveConcBannApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("ConcBannThunks saveConcBann error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR병용금기기본 삭제 
 */
export const deleteConcBann = createAsyncThunk<number, ConcBannDVO>(
  '/dur/deleteConcBann',
  async (params: ConcBannDVO) => {
    try {
      const res = await https.post(deleteConcBannApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("ConcBannThunks deleteConcBann error!!");
      return -1;
    }
  }
)

