import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectOpnnListApiPath, getOpnnApiPath, insertOpnnApiPath, updateOpnnApiPath, saveOpnnApiPath, deleteOpnnApiPath } from '@/api/opnn/OpnnApiPaths'
import { mockOpnnList, OpnnPVO, OpnnRVO, OpnnListPVO, OpnnListRVO, OpnnDVO  } from './OpnnTypes'

/**
 * 대국민포털_의견제안 정보 목록 조회 
 */
export const selectOpnnList = createAsyncThunk<OpnnListRVO, OpnnListPVO | undefined>(
  '/opnn/selectOpnnList',
  async (params: OpnnListPVO = {}) => {
    try {
      const res = await https.post(selectOpnnListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 Opnn[] 형식으로 주므로 OpnnListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as OpnnListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("OpnnThunks selectOpnnList mockOpnnList=",mockOpnnList);
      const filtered = mockOpnnList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: OpnnListRVO = { list: filtered as OpnnRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_의견제안 정보 조회 
 */
export const getOpnn = createAsyncThunk<OpnnRVO, OpnnPVO | undefined>(
  '/opnn/getOpnn',
  async (params: OpnnPVO = {}) => {
    try {
      const res = await https.post(getOpnnApiPath(), params);

      const payload = res.data;

      // 서버가 OpnnRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("OpnnThunks getOpnn mockOpnnList=",mockOpnnList);
      return (mockOpnnList).find((n) => 
      ) || null;
    }
  }
)

/**
 * 대국민포털_의견제안 입력 
 */
export const insertOpnn = createAsyncThunk<number, OpnnPVO>(
  '/opnn/insertOpnn',
  async (params: OpnnPVO) => {
    try {
      const res = await https.post(insertOpnnApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("OpnnThunks insertOpnn");
      return -1;
    }
  }
)

/**
 * 대국민포털_의견제안 수정 
 */
export const updateOpnn = createAsyncThunk<number, OpnnPVO>(
  '/opnn/updateOpnn',
  async (params: OpnnPVO) => {
    try {
      const res = await https.post(updateOpnnApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("OpnnThunks updateOpnn");
      return -1;
    }
  }
)

/**
 * 대국민포털_의견제안 저장 
 */
export const saveOpnn = createAsyncThunk<number, OpnnPVO>(
  '/opnn/saveOpnn',
  async (params: OpnnPVO) => {
    try {
      const res = await https.post(saveOpnnApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("OpnnThunks saveOpnn error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_의견제안 삭제 
 */
export const deleteOpnn = createAsyncThunk<number, OpnnDVO>(
  '/opnn/deleteOpnn',
  async (params: OpnnDVO) => {
    try {
      const res = await https.post(deleteOpnnApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("OpnnThunks deleteOpnn error!!");
      return -1;
    }
  }
)

