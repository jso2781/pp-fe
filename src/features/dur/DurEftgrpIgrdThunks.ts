import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurEftgrpIgrdListApiPath, getDurEftgrpIgrdApiPath, insertDurEftgrpIgrdApiPath, updateDurEftgrpIgrdApiPath, saveDurEftgrpIgrdApiPath, deleteDurEftgrpIgrdApiPath } from '@/api/dur/DurEftgrpIgrdApiPaths'
import { mockDurEftgrpIgrdList, DurEftgrpIgrdPVO, DurEftgrpIgrdRVO, DurEftgrpIgrdListPVO, DurEftgrpIgrdListRVO, DurEftgrpIgrdDVO  } from './DurEftgrpIgrdTypes'

/**
 * 대국민포털_DUR효능군중복성분기본 정보 목록 조회 
 */
export const selectDurEftgrpIgrdList = createAsyncThunk<DurEftgrpIgrdListRVO, DurEftgrpIgrdListPVO | undefined>(
  '/dur/selectDurEftgrpIgrdList',
  async (params: DurEftgrpIgrdListPVO = {}) => {
    try {
      const res = await https.post(selectDurEftgrpIgrdListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurEftgrpIgrd[] 형식으로 주므로 DurEftgrpIgrdListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurEftgrpIgrdListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurEftgrpIgrdThunks selectDurEftgrpIgrdList mockDurEftgrpIgrdList=",mockDurEftgrpIgrdList);
      const filtered = mockDurEftgrpIgrdList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurEftgrpIgrdListRVO = { list: filtered as DurEftgrpIgrdRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복성분기본 정보 조회 
 */
export const getDurEftgrpIgrd = createAsyncThunk<DurEftgrpIgrdRVO, DurEftgrpIgrdPVO | undefined>(
  '/dur/getDurEftgrpIgrd',
  async (params: DurEftgrpIgrdPVO = {}) => {
    try {
      const res = await https.post(getDurEftgrpIgrdApiPath(), params);

      const payload = res.data;

      // 서버가 DurEftgrpIgrdRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurEftgrpIgrdThunks getDurEftgrpIgrd mockDurEftgrpIgrdList=",mockDurEftgrpIgrdList);
      return (mockDurEftgrpIgrdList).find((n) => 
        String(n.eftgrpDpcnSn) === String(params.eftgrpDpcnSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복성분기본 입력 
 */
export const insertDurEftgrpIgrd = createAsyncThunk<number, DurEftgrpIgrdPVO>(
  '/dur/insertDurEftgrpIgrd',
  async (params: DurEftgrpIgrdPVO) => {
    try {
      const res = await https.post(insertDurEftgrpIgrdApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurEftgrpIgrdThunks insertDurEftgrpIgrd");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복성분기본 수정 
 */
export const updateDurEftgrpIgrd = createAsyncThunk<number, DurEftgrpIgrdPVO>(
  '/dur/updateDurEftgrpIgrd',
  async (params: DurEftgrpIgrdPVO) => {
    try {
      const res = await https.post(updateDurEftgrpIgrdApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurEftgrpIgrdThunks updateDurEftgrpIgrd");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복성분기본 저장 
 */
export const saveDurEftgrpIgrd = createAsyncThunk<number, DurEftgrpIgrdPVO>(
  '/dur/saveDurEftgrpIgrd',
  async (params: DurEftgrpIgrdPVO) => {
    try {
      const res = await https.post(saveDurEftgrpIgrdApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurEftgrpIgrdThunks saveDurEftgrpIgrd error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR효능군중복성분기본 삭제 
 */
export const deleteDurEftgrpIgrd = createAsyncThunk<number, DurEftgrpIgrdDVO>(
  '/dur/deleteDurEftgrpIgrd',
  async (params: DurEftgrpIgrdDVO) => {
    try {
      const res = await https.post(deleteDurEftgrpIgrdApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurEftgrpIgrdThunks deleteDurEftgrpIgrd error!!");
      return -1;
    }
  }
)

