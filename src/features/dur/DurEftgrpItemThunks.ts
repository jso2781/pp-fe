import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurEftgrpItemListApiPath, getDurEftgrpItemApiPath, insertDurEftgrpItemApiPath, updateDurEftgrpItemApiPath, saveDurEftgrpItemApiPath, deleteDurEftgrpItemApiPath } from '@/api/dur/DurEftgrpItemApiPaths'
import { mockDurEftgrpItemList, DurEftgrpItemPVO, DurEftgrpItemRVO, DurEftgrpItemListPVO, DurEftgrpItemListRVO, DurEftgrpItemDVO  } from './DurEftgrpItemTypes'

/**
 * 대국민포털_DUR효능군중복품목기본 정보 목록 조회 
 */
export const selectDurEftgrpItemList = createAsyncThunk<DurEftgrpItemListRVO, DurEftgrpItemListPVO | undefined>(
  '/dur/selectDurEftgrpItemList',
  async (params: DurEftgrpItemListPVO = {}) => {
    try {
      const res = await https.post(selectDurEftgrpItemListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurEftgrpItem[] 형식으로 주므로 DurEftgrpItemListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurEftgrpItemListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurEftgrpItemThunks selectDurEftgrpItemList mockDurEftgrpItemList=",mockDurEftgrpItemList);
      const filtered = mockDurEftgrpItemList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurEftgrpItemListRVO = { list: filtered as DurEftgrpItemRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복품목기본 정보 조회 
 */
export const getDurEftgrpItem = createAsyncThunk<DurEftgrpItemRVO, DurEftgrpItemPVO | undefined>(
  '/dur/getDurEftgrpItem',
  async (params: DurEftgrpItemPVO = {}) => {
    try {
      const res = await https.post(getDurEftgrpItemApiPath(), params);

      const payload = res.data;

      // 서버가 DurEftgrpItemRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurEftgrpItemThunks getDurEftgrpItem mockDurEftgrpItemList=",mockDurEftgrpItemList);
      return (mockDurEftgrpItemList).find((n) => 
        String(n.eftgrpDpcnSn) === String(params.eftgrpDpcnSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복품목기본 입력 
 */
export const insertDurEftgrpItem = createAsyncThunk<number, DurEftgrpItemPVO>(
  '/dur/insertDurEftgrpItem',
  async (params: DurEftgrpItemPVO) => {
    try {
      const res = await https.post(insertDurEftgrpItemApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurEftgrpItemThunks insertDurEftgrpItem");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복품목기본 수정 
 */
export const updateDurEftgrpItem = createAsyncThunk<number, DurEftgrpItemPVO>(
  '/dur/updateDurEftgrpItem',
  async (params: DurEftgrpItemPVO) => {
    try {
      const res = await https.post(updateDurEftgrpItemApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurEftgrpItemThunks updateDurEftgrpItem");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복품목기본 저장 
 */
export const saveDurEftgrpItem = createAsyncThunk<number, DurEftgrpItemPVO>(
  '/dur/saveDurEftgrpItem',
  async (params: DurEftgrpItemPVO) => {
    try {
      const res = await https.post(saveDurEftgrpItemApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurEftgrpItemThunks saveDurEftgrpItem error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복품목기본 삭제 
 */
export const deleteDurEftgrpItem = createAsyncThunk<number, DurEftgrpItemDVO>(
  '/dur/deleteDurEftgrpItem',
  async (params: DurEftgrpItemDVO) => {
    try {
      const res = await https.post(deleteDurEftgrpItemApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurEftgrpItemThunks deleteDurEftgrpItem error!!");
      return -1;
    }
  }
)

