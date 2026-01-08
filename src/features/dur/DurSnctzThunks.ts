import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurSnctzListApiPath, getDurSnctzApiPath, insertDurSnctzApiPath, updateDurSnctzApiPath, saveDurSnctzApiPath, deleteDurSnctzApiPath } from '@/api/dur/DurSnctzApiPaths'
import { mockDurSnctzList, DurSnctzPVO, DurSnctzRVO, DurSnctzListPVO, DurSnctzListRVO, DurSnctzDVO  } from './DurSnctzTypes'

/**
 * 대국민포털_DUR노인주의기본 정보 목록 조회 
 */
export const selectDurSnctzList = createAsyncThunk<DurSnctzListRVO, DurSnctzListPVO | undefined>(
  '/dur/selectDurSnctzList',
  async (params: DurSnctzListPVO = {}) => {
    try {
      const res = await https.post(selectDurSnctzListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurSnctz[] 형식으로 주므로 DurSnctzListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurSnctzListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurSnctzThunks selectDurSnctzList mockDurSnctzList=",mockDurSnctzList);
      const filtered = mockDurSnctzList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurSnctzListRVO = { list: filtered as DurSnctzRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR노인주의기본 정보 조회 
 */
export const getDurSnctz = createAsyncThunk<DurSnctzRVO, DurSnctzPVO | undefined>(
  '/dur/getDurSnctz',
  async (params: DurSnctzPVO = {}) => {
    try {
      const res = await https.post(getDurSnctzApiPath(), params);

      const payload = res.data;

      // 서버가 DurSnctzRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurSnctzThunks getDurSnctz mockDurSnctzList=",mockDurSnctzList);
      return (mockDurSnctzList).find((n) => 
        String(n.snctzCutnSn) === String(params.snctzCutnSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR노인주의기본 입력 
 */
export const insertDurSnctz = createAsyncThunk<number, DurSnctzPVO>(
  '/dur/insertDurSnctz',
  async (params: DurSnctzPVO) => {
    try {
      const res = await https.post(insertDurSnctzApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurSnctzThunks insertDurSnctz");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR노인주의기본 수정 
 */
export const updateDurSnctz = createAsyncThunk<number, DurSnctzPVO>(
  '/dur/updateDurSnctz',
  async (params: DurSnctzPVO) => {
    try {
      const res = await https.post(updateDurSnctzApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurSnctzThunks updateDurSnctz");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR노인주의기본 저장 
 */
export const saveDurSnctz = createAsyncThunk<number, DurSnctzPVO>(
  '/dur/saveDurSnctz',
  async (params: DurSnctzPVO) => {
    try {
      const res = await https.post(saveDurSnctzApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurSnctzThunks saveDurSnctz error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR노인주의기본 삭제 
 */
export const deleteDurSnctz = createAsyncThunk<number, DurSnctzDVO>(
  '/dur/deleteDurSnctz',
  async (params: DurSnctzDVO) => {
    try {
      const res = await https.post(deleteDurSnctzApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurSnctzThunks deleteDurSnctz error!!");
      return -1;
    }
  }
)

