import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurPrgntIgrdListApiPath, getDurPrgntIgrdApiPath, insertDurPrgntIgrdApiPath, updateDurPrgntIgrdApiPath, saveDurPrgntIgrdApiPath, deleteDurPrgntIgrdApiPath } from '@/api/dur/DurPrgntIgrdApiPaths'
import { mockDurPrgntIgrdList, DurPrgntIgrdPVO, DurPrgntIgrdRVO, DurPrgntIgrdListPVO, DurPrgntIgrdListRVO, DurPrgntIgrdDVO  } from './DurPrgntIgrdTypes'

/**
 * 대국민포털_DUR임부금기성분기본 정보 목록 조회 
 */
export const selectDurPrgntIgrdList = createAsyncThunk<DurPrgntIgrdListRVO, DurPrgntIgrdListPVO | undefined>(
  '/dur/selectDurPrgntIgrdList',
  async (params: DurPrgntIgrdListPVO = {}) => {
    try {
      const res = await https.post(selectDurPrgntIgrdListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurPrgntIgrd[] 형식으로 주므로 DurPrgntIgrdListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurPrgntIgrdListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurPrgntIgrdThunks selectDurPrgntIgrdList mockDurPrgntIgrdList=",mockDurPrgntIgrdList);
      const filtered = mockDurPrgntIgrdList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurPrgntIgrdListRVO = { list: filtered as DurPrgntIgrdRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR임부금기성분기본 정보 조회 
 */
export const getDurPrgntIgrd = createAsyncThunk<DurPrgntIgrdRVO, DurPrgntIgrdPVO | undefined>(
  '/dur/getDurPrgntIgrd',
  async (params: DurPrgntIgrdPVO = {}) => {
    try {
      const res = await https.post(getDurPrgntIgrdApiPath(), params);

      const payload = res.data;

      // 서버가 DurPrgntIgrdRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurPrgntIgrdThunks getDurPrgntIgrd mockDurPrgntIgrdList=",mockDurPrgntIgrdList);
      return (mockDurPrgntIgrdList).find((n) => 
        String(n.prgntBannSn) === String(params.prgntBannSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR임부금기성분기본 입력 
 */
export const insertDurPrgntIgrd = createAsyncThunk<number, DurPrgntIgrdPVO>(
  '/dur/insertDurPrgntIgrd',
  async (params: DurPrgntIgrdPVO) => {
    try {
      const res = await https.post(insertDurPrgntIgrdApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurPrgntIgrdThunks insertDurPrgntIgrd");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR임부금기성분기본 수정 
 */
export const updateDurPrgntIgrd = createAsyncThunk<number, DurPrgntIgrdPVO>(
  '/dur/updateDurPrgntIgrd',
  async (params: DurPrgntIgrdPVO) => {
    try {
      const res = await https.post(updateDurPrgntIgrdApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurPrgntIgrdThunks updateDurPrgntIgrd");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR임부금기성분기본 저장 
 */
export const saveDurPrgntIgrd = createAsyncThunk<number, DurPrgntIgrdPVO>(
  '/dur/saveDurPrgntIgrd',
  async (params: DurPrgntIgrdPVO) => {
    try {
      const res = await https.post(saveDurPrgntIgrdApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurPrgntIgrdThunks saveDurPrgntIgrd error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR임부금기성분기본 삭제 
 */
export const deleteDurPrgntIgrd = createAsyncThunk<number, DurPrgntIgrdDVO>(
  '/dur/deleteDurPrgntIgrd',
  async (params: DurPrgntIgrdDVO) => {
    try {
      const res = await https.post(deleteDurPrgntIgrdApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurPrgntIgrdThunks deleteDurPrgntIgrd error!!");
      return -1;
    }
  }
)

