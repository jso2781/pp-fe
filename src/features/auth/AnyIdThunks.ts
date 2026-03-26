import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { getIntegratedSearchJsonApiPath } from '@/api/search/IntegratedSearchPaths'
import { IntegratedSearchPVO, IntegratedSearchRVO } from '@/features/search/IntegratedSearchTypes'
import { AnyIdCiFromSsobPVO, AnyIdInitPVO, AnyIdInitRVO, AnyIdLoginPVO, AnyIdLoginRVO, AnyIdUserInfoFromSsobPVO, AnyIdUserInfoFromSsobRVO, AnyIdUserInfoRVO, SsoInfoPVO, SsoInfoRVO } from './AnyIdTypes'
import { anyIdCiFromSsobApiPath, anyIdInitApiPath, anyIdLoginApiPath, anyIdUserInfoApiPath, anyIdUserInfoFromSsobApiPath, ssoInfoApiPath } from '@/api/auth/AnyIdApiPaths'

/**
 * SSO 기본 정보 조회
 */
export const getSsoInfo = createAsyncThunk<SsoInfoRVO, SsoInfoPVO | undefined, { rejectValue: string }>(
  '/auth/anyid/ssoInfo',
  async (params: SsoInfoPVO | undefined, { rejectWithValue }) => {
    try {
      const res = await https.post(ssoInfoApiPath(), params ?? {});

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data?.data?.result;
      return payload as SsoInfoRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      console.log("AnyIdThunks getSsoInfo error!!");
      return rejectWithValue('AnyIdThunks getSsoInfo error!!');
    }
  }
)

/**
 * ANY-ID 초기화 정보 조회
 */
export const getAnyIdInit = createAsyncThunk<AnyIdInitRVO, AnyIdInitPVO | undefined, { rejectValue: string }>(
  '/auth/anyid/init',
  async (params: AnyIdInitPVO | undefined, { rejectWithValue }) => {
    try {
      const res = await https.post(anyIdInitApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data?.data?.result;
      return payload as AnyIdInitRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      console.log("AnyIdThunks getAnyIdInit error!!");
      return rejectWithValue('AnyIdThunks getAnyIdInit error!!');
    }
  }
)

/**
 * ANY-ID 로그인 조회 (POST /auth/anyid/login, 응답 res.data?.data 는 AnyIdLoginRVO 형식으로 반환)
 */
export const postAnyIdLogin = createAsyncThunk<AnyIdLoginRVO, AnyIdLoginPVO, { rejectValue: string }>(
  '/auth/anyid/login',
  async (params: AnyIdLoginPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(anyIdLoginApiPath(), params ?? {});
      const payload = res.data?.data;
      return payload as AnyIdLoginRVO;
    } catch (e) {
      console.log('AnyIdThunks postAnyIdLogin error!!', e);
      return rejectWithValue('AnyIdThunks postAnyIdLogin error!!');
    }
  }
);

/**
 * ANY-ID 사용자 정보 조회
 * (SSO 사용자 정보와 Any-ID 세션 정보를 조회)
 */
export const getAnyIdUserInfo = createAsyncThunk<AnyIdUserInfoRVO, undefined, { rejectValue: string }>(
  '/auth/anyid/userInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await https.post(anyIdUserInfoApiPath(), {});

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data?.data?.result;
      return payload as AnyIdUserInfoRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      console.log("AnyIdThunks getAnyIdUserInfo error!!");
      return rejectWithValue('AnyIdThunks getAnyIdUserInfo error!!');
    }
  }
)

/**
 * ANY-ID 인증완료 후 전달받은 ssob를 복호화 후 ssob 정보중에 CI 정보를 추출 요청
 */
export const getAnyIdCiFromSsob = createAsyncThunk<string, AnyIdCiFromSsobPVO, { rejectValue: string }>(
  '/auth/anyid/getCiFromSsob',
  async (params: AnyIdCiFromSsobPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(anyIdCiFromSsobApiPath(), params);
      const ci = res.data?.data?.ci;
      return ci as string;
    }
    catch (e) {
      console.log("AnyIdThunks getAnyIdCiFromSsob error!!");
      return rejectWithValue('AnyIdThunks getAnyIdCiFromSsob error!!');
    }
  }  
)

/**
 * ANY-ID 인증완료 후 전달받은 ssob를 복호화 후 ssob 내용 전체(JSON)를 추출 요청
 */
export const getAnyIdUserInfoFromSsob = createAsyncThunk<AnyIdUserInfoFromSsobRVO, AnyIdUserInfoFromSsobPVO, { rejectValue: string }>(
  '/auth/anyid/getUserInfoFromSsob',
  async (params: AnyIdUserInfoFromSsobPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(anyIdUserInfoFromSsobApiPath(), params);
      const userInfo = res.data?.data;
      return userInfo as AnyIdUserInfoFromSsobRVO;
    }
    catch (e) {
      console.log("AnyIdThunks getAnyIdUserInfoFromSsob error!!");
      return rejectWithValue('AnyIdThunks getAnyIdUserInfoFromSsob error!!');
    }
  }  
)