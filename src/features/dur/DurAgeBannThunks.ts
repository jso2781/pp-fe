import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectDurAgeBannListApiPath, getDurAgeBannApiPath, insertDurAgeBannApiPath, updateDurAgeBannApiPath, saveDurAgeBannApiPath, deleteDurAgeBannApiPath } from '@/api/dur/DurAgeBannApiPaths'
import { mockDurAgeBannList, DurAgeBannPVO, DurAgeBannRVO, DurAgeBannListPVO, DurAgeBannListRVO, DurAgeBannDVO  } from './DurAgeBannTypes'

/**
 * 대국민포털_DUR연령금기기본 정보 목록 조회 
 */
export const selectDurAgeBannList = createAsyncThunk<DurAgeBannListRVO, DurAgeBannListPVO | undefined>(
  '/dur/selectDurAgeBannList',
  async (params: DurAgeBannListPVO = {}) => {
    try {
      const res = await https.post(selectDurAgeBannListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 DurAgeBann[] 형식으로 주므로 DurAgeBannListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as DurAgeBannListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurAgeBannThunks selectDurAgeBannList mockDurAgeBannList=",mockDurAgeBannList);
      const filtered = mockDurAgeBannList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: DurAgeBannListRVO = { list: filtered as DurAgeBannRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_DUR연령금기기본 정보 조회 
 */
export const getDurAgeBann = createAsyncThunk<DurAgeBannRVO, DurAgeBannPVO | undefined>(
  '/dur/getDurAgeBann',
  async (params: DurAgeBannPVO = {}) => {
    try {
      const res = await https.post(getDurAgeBannApiPath(), params);

      const payload = res.data;

      // 서버가 DurAgeBannRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("DurAgeBannThunks getDurAgeBann mockDurAgeBannList=",mockDurAgeBannList);
      return (mockDurAgeBannList).find((n) => 
        String(n.ageBannSn) === String(params.ageBannSn)
      ) || null;
    }
  }
)

/**
 * 대국민포털_DUR연령금기기본 입력 
 */
export const insertDurAgeBann = createAsyncThunk<number, DurAgeBannPVO>(
  '/dur/insertDurAgeBann',
  async (params: DurAgeBannPVO) => {
    try {
      const res = await https.post(insertDurAgeBannApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("DurAgeBannThunks insertDurAgeBann");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR연령금기기본 수정 
 */
export const updateDurAgeBann = createAsyncThunk<number, DurAgeBannPVO>(
  '/dur/updateDurAgeBann',
  async (params: DurAgeBannPVO) => {
    try {
      const res = await https.post(updateDurAgeBannApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("DurAgeBannThunks updateDurAgeBann");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR연령금기기본 저장 
 */
export const saveDurAgeBann = createAsyncThunk<number, DurAgeBannPVO>(
  '/dur/saveDurAgeBann',
  async (params: DurAgeBannPVO) => {
    try {
      const res = await https.post(saveDurAgeBannApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("DurAgeBannThunks saveDurAgeBann error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_DUR연령금기기본 삭제 
 */
export const deleteDurAgeBann = createAsyncThunk<number, DurAgeBannDVO>(
  '/dur/deleteDurAgeBann',
  async (params: DurAgeBannDVO) => {
    try {
      const res = await https.post(deleteDurAgeBannApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("DurAgeBannThunks deleteDurAgeBann error!!");
      return -1;
    }
  }
)

