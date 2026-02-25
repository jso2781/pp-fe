import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectTrmsListForSignUpApiPath, selectTrmsSttListApiPath, getTrmsSttLatestApiPath, getTrmsSttApiPath } from '@/api/stt/TrmsSttApiPaths'
import { mockTrmsSttList, TrmsSttPVO, TrmsSttRVO, TrmsSttListPVO, TrmsSttListRVO, TrmsSttDVO, mockTrmsListForSignUp  } from './TrmsSttTypes'

/**
 * 대국민포털 회원가입용 약관법령 목록 조회 
 */
export const selectTrmsListForSignUp = createAsyncThunk<TrmsSttListRVO>(
  '/stt/selectTrmsListForSignUp',
  async () => {
    try {
      const res = await https.post(selectTrmsListForSignUpApiPath());

      console.log("TrmsSttThunks selectTrmsListForSignUp res=", res);
      console.log("TrmsSttThunks selectTrmsListForSignUp res.data=", res.data);

      // ✅ 여기서 "서버 응답"을 표준 형태로 맞춰서 return
      // 서버 응답 구조: {code: '0', msg: '성공', data: {list: [...]}}
      let payload = res.data?.data?.list || [];

      console.log("TrmsSttThunks selectTrmsListForSignUp payload", payload);

      // 서버가 TrmsStt[] 형식으로 주므로 TrmsSttListRVO 형식으로 데이터 구조 재조정 
      return {
        list: payload,
        totalCount: payload.length
      } as TrmsSttListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("TrmsSttThunks selectTrmsListForSignUp error=", e);
      console.log("TrmsSttThunks selectTrmsListForSignUp mockTrmsListForSignUp=",mockTrmsListForSignUp);

      const result: TrmsSttListRVO = { list: mockTrmsListForSignUp as TrmsSttRVO[], totalCount: mockTrmsListForSignUp.length }
      return result;
    }
  }
)

/**
 * 대국민포털_약관법령기본 정보 목록 조회 
 */
export const selectTrmsSttList = createAsyncThunk<TrmsSttListRVO, TrmsSttListPVO, { rejectValue: string }>(
  '/stt/selectTrmsSttList',
  async (params: TrmsSttListPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectTrmsSttListApiPath(), params);
      const payload = res.data?.data?.list || [];

      return {
        list: payload,
        totalCount: payload.length
      } as TrmsSttListRVO;
    }
    catch (e) {
      console.error('!!! TrmsSttThunks > selectTrmsSttList 에러.');
      console.error(e);
      return rejectWithValue('NETWORK_OR_SERVER_ERROR');
    }
  }
)
        
/**
 * 대국민포털_약관법령기본 정보 조회 
 */
export const getTrmsSttLatest = createAsyncThunk<TrmsSttRVO, TrmsSttPVO, { rejectValue: string }>(
  '/stt/getTrmsSttLatest',
  async (params: TrmsSttPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(getTrmsSttLatestApiPath(), params);
      const payload = res.data?.data?.trmsSttRVO;
      
      return payload;
    } catch (e) {
      console.error('!!! TrmsSttThunks > getTrmsSttLatest 에러.');
      console.error(e);
      return rejectWithValue('NETWORK_OR_SERVER_ERROR');
    }
  }
)

/**
 * 대국민포털_약관법령기본 정보 조회 
 */
export const getTrmsStt = createAsyncThunk<TrmsSttRVO, TrmsSttPVO, { rejectValue: string }>(
  '/stt/getTrmsStt',
  async (params: TrmsSttPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(getTrmsSttApiPath(), params);
      const payload = res.data?.data?.trmsSttRVO;
      
      return payload;
    } catch (e) {
      console.error('!!! TrmsSttThunks > getTrmsStt 에러.');
      console.error(e);
      return rejectWithValue('NETWORK_OR_SERVER_ERROR');
    }
  }
)