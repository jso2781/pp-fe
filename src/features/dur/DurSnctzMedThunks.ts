import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurSnctzMedListApiPath, getDurSnctzMedApiPath, insertDurSnctzMedApiPath, updateDurSnctzMedApiPath, saveDurSnctzMedApiPath, deleteDurSnctzMedApiPath } from '@/api/dur/DurSnctzMedApiPaths'
import { mockDurSnctzMedList, DurSnctzMedPVO, DurSnctzMedRVO, DurSnctzMedListPVO, DurSnctzMedListRVO, DurSnctzMedDVO  } from './DurSnctzMedTypes'

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 정보 목록 조회 
 */
export const selectDurSnctzMedList = createAsyncThunk<DurSnctzMedListRVO, DurSnctzMedListPVO | undefined>(
  '/dur/selectDurSnctzMedList',
  async (params: DurSnctzMedListPVO = {}) => {
    try {
      const res = await https.post(selectDurSnctzMedListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurSnctzMed[] 형식으로 주므로 DurSnctzMedListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurSnctzMedListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurSnctzMedThunks selectDurSnctzMedList mockDurSnctzMedList=",mockDurSnctzMedList);
      const filtered = mockDurSnctzMedList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurSnctzMedListRVO = { list: filtered as DurSnctzMedRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 정보 조회 
 */
export const getDurSnctzMed = createAsyncThunk<DurSnctzMedRVO, DurSnctzMedPVO | undefined>(
  '/dur/getDurSnctzMed',
  async (params: DurSnctzMedPVO = {}) => {
    try {
      const res = await https.post(getDurSnctzMedApiPath(), params);

      const payload = res.data;

      // 서버가 DurSnctzMedRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurSnctzMedThunks getDurSnctzMed mockDurSnctzMedList=",mockDurSnctzMedList);
      return (mockDurSnctzMedList).find((n) => 
        String(n.snctzCutnMedSn) === String(params.snctzCutnMedSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 입력 
 */
export const insertDurSnctzMed = createAsyncThunk<number, DurSnctzMedPVO>(
  '/dur/insertDurSnctzMed',
  async (params: DurSnctzMedPVO) => {
    try {
      const res = await https.post(insertDurSnctzMedApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurSnctzMedThunks insertDurSnctzMed");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 수정 
 */
export const updateDurSnctzMed = createAsyncThunk<number, DurSnctzMedPVO>(
  '/dur/updateDurSnctzMed',
  async (params: DurSnctzMedPVO) => {
    try {
      const res = await https.post(updateDurSnctzMedApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurSnctzMedThunks updateDurSnctzMed");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 저장 
 */
export const saveDurSnctzMed = createAsyncThunk<number, DurSnctzMedPVO>(
  '/dur/saveDurSnctzMed',
  async (params: DurSnctzMedPVO) => {
    try {
      const res = await https.post(saveDurSnctzMedApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurSnctzMedThunks saveDurSnctzMed error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 삭제 
 */
export const deleteDurSnctzMed = createAsyncThunk<number, DurSnctzMedDVO>(
  '/dur/deleteDurSnctzMed',
  async (params: DurSnctzMedDVO) => {
    try {
      const res = await https.post(deleteDurSnctzMedApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurSnctzMedThunks deleteDurSnctzMed error!!");
      return -1;
    }
  }
)

