import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurPrgntItemListApiPath, getDurPrgntItemApiPath, insertDurPrgntItemApiPath, updateDurPrgntItemApiPath, saveDurPrgntItemApiPath, deleteDurPrgntItemApiPath } from '@/api/dur/DurPrgntItemApiPaths'
import { mockDurPrgntItemList, DurPrgntItemPVO, DurPrgntItemRVO, DurPrgntItemListPVO, DurPrgntItemListRVO, DurPrgntItemDVO  } from './DurPrgntItemTypes'

/**
 * 대국민포털_DUR임부금기품목기본 정보 목록 조회 
 */
export const selectDurPrgntItemList = createAsyncThunk<DurPrgntItemListRVO, DurPrgntItemListPVO | undefined>(
  '/dur/selectDurPrgntItemList',
  async (params: DurPrgntItemListPVO = {}) => {
    try {
      const res = await https.post(selectDurPrgntItemListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurPrgntItem[] 형식으로 주므로 DurPrgntItemListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurPrgntItemListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurPrgntItemThunks selectDurPrgntItemList mockDurPrgntItemList=",mockDurPrgntItemList);
      const filtered = mockDurPrgntItemList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurPrgntItemListRVO = { list: filtered as DurPrgntItemRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR임부금기품목기본 정보 조회 
 */
export const getDurPrgntItem = createAsyncThunk<DurPrgntItemRVO, DurPrgntItemPVO | undefined>(
  '/dur/getDurPrgntItem',
  async (params: DurPrgntItemPVO = {}) => {
    try {
      const res = await https.post(getDurPrgntItemApiPath(), params);

      const payload = res.data;

      // 서버가 DurPrgntItemRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurPrgntItemThunks getDurPrgntItem mockDurPrgntItemList=",mockDurPrgntItemList);
      return (mockDurPrgntItemList).find((n) => 
        String(n.prgntBannSn) === String(params.prgntBannSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR임부금기품목기본 입력 
 */
export const insertDurPrgntItem = createAsyncThunk<number, DurPrgntItemPVO>(
  '/dur/insertDurPrgntItem',
  async (params: DurPrgntItemPVO) => {
    try {
      const res = await https.post(insertDurPrgntItemApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurPrgntItemThunks insertDurPrgntItem");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR임부금기품목기본 수정 
 */
export const updateDurPrgntItem = createAsyncThunk<number, DurPrgntItemPVO>(
  '/dur/updateDurPrgntItem',
  async (params: DurPrgntItemPVO) => {
    try {
      const res = await https.post(updateDurPrgntItemApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurPrgntItemThunks updateDurPrgntItem");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR임부금기품목기본 저장 
 */
export const saveDurPrgntItem = createAsyncThunk<number, DurPrgntItemPVO>(
  '/dur/saveDurPrgntItem',
  async (params: DurPrgntItemPVO) => {
    try {
      const res = await https.post(saveDurPrgntItemApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurPrgntItemThunks saveDurPrgntItem error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR임부금기품목기본 삭제 
 */
export const deleteDurPrgntItem = createAsyncThunk<number, DurPrgntItemDVO>(
  '/dur/deleteDurPrgntItem',
  async (params: DurPrgntItemDVO) => {
    try {
      const res = await https.post(deleteDurPrgntItemApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurPrgntItemThunks deleteDurPrgntItem error!!");
      return -1;
    }
  }
)

