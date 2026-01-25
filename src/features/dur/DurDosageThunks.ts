import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurDosageListApiPath, getDurDosageApiPath, insertDurDosageApiPath, updateDurDosageApiPath, saveDurDosageApiPath, deleteDurDosageApiPath } from '@/api/dur/DurDosageApiPaths'
import { mockDurDosageList, DurDosagePVO, DurDosageRVO, DurDosageListPVO, DurDosageListRVO, DurDosageDVO  } from './DurDosageTypes'

/**
 * 대국민포털_DUR투여기간주의기본 정보 목록 조회 
 */
export const selectDurDosageList = createAsyncThunk<DurDosageListRVO, DurDosageListPVO | undefined>(
  '/dur/selectDurDosageList',
  async (params: DurDosageListPVO = {}) => {
    try {
      const res = await https.post(selectDurDosageListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurDosage[] 형식으로 주므로 DurDosageListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurDosageListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurDosageThunks selectDurDosageList mockDurDosageList=",mockDurDosageList);
      const filtered = mockDurDosageList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurDosageListRVO = { list: filtered as DurDosageRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR투여기간주의기본 정보 조회 
 */
export const getDurDosage = createAsyncThunk<DurDosageRVO, DurDosagePVO | undefined>(
  '/dur/getDurDosage',
  async (params: DurDosagePVO = {}) => {
    try {
      const res = await https.post(getDurDosageApiPath(), params);

      const payload = res.data;

      // 서버가 DurDosageRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurDosageThunks getDurDosage mockDurDosageList=",mockDurDosageList);
      return (mockDurDosageList).find((n) => 
        String(n.adminPrdCutnSn) === String(params.adminPrdCutnSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR투여기간주의기본 입력 
 */
export const insertDurDosage = createAsyncThunk<number, DurDosagePVO>(
  '/dur/insertDurDosage',
  async (params: DurDosagePVO) => {
    try {
      const res = await https.post(insertDurDosageApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurDosageThunks insertDurDosage");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR투여기간주의기본 수정 
 */
export const updateDurDosage = createAsyncThunk<number, DurDosagePVO>(
  '/dur/updateDurDosage',
  async (params: DurDosagePVO) => {
    try {
      const res = await https.post(updateDurDosageApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurDosageThunks updateDurDosage");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR투여기간주의기본 저장 
 */
export const saveDurDosage = createAsyncThunk<number, DurDosagePVO>(
  '/dur/saveDurDosage',
  async (params: DurDosagePVO) => {
    try {
      const res = await https.post(saveDurDosageApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurDosageThunks saveDurDosage error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR투여기간주의기본 삭제 
 */
export const deleteDurDosage = createAsyncThunk<number, DurDosageDVO>(
  '/dur/deleteDurDosage',
  async (params: DurDosageDVO) => {
    try {
      const res = await https.post(deleteDurDosageApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurDosageThunks deleteDurDosage error!!");
      return -1;
    }
  }
)

