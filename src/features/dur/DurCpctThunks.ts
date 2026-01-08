import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurCpctListApiPath, getDurCpctApiPath, insertDurCpctApiPath, updateDurCpctApiPath, saveDurCpctApiPath, deleteDurCpctApiPath } from '@/api/dur/DurCpctApiPaths'
import { mockDurCpctList, DurCpctPVO, DurCpctRVO, DurCpctListPVO, DurCpctListRVO, DurCpctDVO  } from './DurCpctTypes'

/**
 * 대국민포털_DUR용량주의기본 정보 목록 조회 
 */
export const selectDurCpctList = createAsyncThunk<DurCpctListRVO, DurCpctListPVO | undefined>(
  '/dur/selectDurCpctList',
  async (params: DurCpctListPVO = {}) => {
    try {
      const res = await https.post(selectDurCpctListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurCpct[] 형식으로 주므로 DurCpctListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurCpctListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurCpctThunks selectDurCpctList mockDurCpctList=",mockDurCpctList);
      const filtered = mockDurCpctList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurCpctListRVO = { list: filtered as DurCpctRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR용량주의기본 정보 조회 
 */
export const getDurCpct = createAsyncThunk<DurCpctRVO, DurCpctPVO | undefined>(
  '/dur/getDurCpct',
  async (params: DurCpctPVO = {}) => {
    try {
      const res = await https.post(getDurCpctApiPath(), params);

      const payload = res.data;

      // 서버가 DurCpctRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurCpctThunks getDurCpct mockDurCpctList=",mockDurCpctList);
      return (mockDurCpctList).find((n) => 
        String(n.cpctCutnSn) === String(params.cpctCutnSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR용량주의기본 입력 
 */
export const insertDurCpct = createAsyncThunk<number, DurCpctPVO>(
  '/dur/insertDurCpct',
  async (params: DurCpctPVO) => {
    try {
      const res = await https.post(insertDurCpctApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurCpctThunks insertDurCpct");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR용량주의기본 수정 
 */
export const updateDurCpct = createAsyncThunk<number, DurCpctPVO>(
  '/dur/updateDurCpct',
  async (params: DurCpctPVO) => {
    try {
      const res = await https.post(updateDurCpctApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurCpctThunks updateDurCpct");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR용량주의기본 저장 
 */
export const saveDurCpct = createAsyncThunk<number, DurCpctPVO>(
  '/dur/saveDurCpct',
  async (params: DurCpctPVO) => {
    try {
      const res = await https.post(saveDurCpctApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurCpctThunks saveDurCpct error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR용량주의기본 삭제 
 */
export const deleteDurCpct = createAsyncThunk<number, DurCpctDVO>(
  '/dur/deleteDurCpct',
  async (params: DurCpctDVO) => {
    try {
      const res = await https.post(deleteDurCpctApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurCpctThunks deleteDurCpct error!!");
      return -1;
    }
  }
)

