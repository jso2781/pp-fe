import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectSttyAgtInfoListApiPath, getSttyAgtInfoApiPath, insertSttyAgtInfoApiPath, updateSttyAgtInfoApiPath, saveSttyAgtInfoApiPath, deleteSttyAgtInfoApiPath } from '@/api/mbr/SttyAgtInfoApiPaths'
import { mockSttyAgtInfoList, SttyAgtInfoPVO, SttyAgtInfoRVO, SttyAgtInfoListPVO, SttyAgtInfoListRVO, SttyAgtInfoDVO  } from './SttyAgtInfoTypes'

/**
 * 대국민포털_법정대리인정보기본 정보 목록 조회 
 */
export const selectSttyAgtInfoList = createAsyncThunk<SttyAgtInfoListRVO, SttyAgtInfoListPVO | undefined>(
  '/mbr/selectSttyAgtInfoList',
  async (params: SttyAgtInfoListPVO = {}) => {
    try {
      const res = await https.post(selectSttyAgtInfoListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 SttyAgtInfo[] 형식으로 주므로 SttyAgtInfoListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as SttyAgtInfoListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("SttyAgtInfoThunks selectSttyAgtInfoList mockSttyAgtInfoList=",mockSttyAgtInfoList);
      const filtered = mockSttyAgtInfoList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: SttyAgtInfoListRVO = { list: filtered as SttyAgtInfoRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_법정대리인정보기본 정보 조회 
 */
export const getSttyAgtInfo = createAsyncThunk<SttyAgtInfoRVO, SttyAgtInfoPVO | undefined>(
  '/mbr/getSttyAgtInfo',
  async (params: SttyAgtInfoPVO = {}) => {
    try {
      const res = await https.post(getSttyAgtInfoApiPath(), params);

      const payload = res.data;

      // 서버가 SttyAgtInfoRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("SttyAgtInfoThunks getSttyAgtInfo mockSttyAgtInfoList=",mockSttyAgtInfoList);
      return (mockSttyAgtInfoList).find((n) => 
        String(n.mbrNo) === String(params.mbrNo)
      ) || null;
    }
  }
)

/**
 * 대국민포털_법정대리인정보기본 입력 
 */
export const insertSttyAgtInfo = createAsyncThunk<number, SttyAgtInfoPVO>(
  '/mbr/insertSttyAgtInfo',
  async (params: SttyAgtInfoPVO) => {
    try {
      const res = await https.post(insertSttyAgtInfoApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("SttyAgtInfoThunks insertSttyAgtInfo");
      return -1;
    }
  }
)

/**
 * 대국민포털_법정대리인정보기본 수정 
 */
export const updateSttyAgtInfo = createAsyncThunk<number, SttyAgtInfoPVO>(
  '/mbr/updateSttyAgtInfo',
  async (params: SttyAgtInfoPVO) => {
    try {
      const res = await https.post(updateSttyAgtInfoApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("SttyAgtInfoThunks updateSttyAgtInfo");
      return -1;
    }
  }
)

/**
 * 대국민포털_법정대리인정보기본 저장 
 */
export const saveSttyAgtInfo = createAsyncThunk<number, SttyAgtInfoPVO>(
  '/mbr/saveSttyAgtInfo',
  async (params: SttyAgtInfoPVO) => {
    try {
      const res = await https.post(saveSttyAgtInfoApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("SttyAgtInfoThunks saveSttyAgtInfo error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_법정대리인정보기본 삭제 
 */
export const deleteSttyAgtInfo = createAsyncThunk<number, SttyAgtInfoDVO>(
  '/mbr/deleteSttyAgtInfo',
  async (params: SttyAgtInfoDVO) => {
    try {
      const res = await https.post(deleteSttyAgtInfoApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("SttyAgtInfoThunks deleteSttyAgtInfo error!!");
      return -1;
    }
  }
)

