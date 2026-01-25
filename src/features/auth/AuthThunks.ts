import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import https from '@/api/axiosInstance';
import { loginApiPath, logoutApiPath, refreshApiPath, loginExtendApiPath } from '@/api/auth/AuthApiPaths';
import { LoginExtendRVO, LoginPVO, LoginRVO, LogoutPVO, LogoutRVO, RefreshPVO, RefreshRVO } from './AuthTypes';
import { MbrInfoRVO } from '../mbr/MbrInfoTypes';

/**
 * 대국민포털_로그인 요청
 */
export const login = createAsyncThunk<
  LoginRVO,
  LoginPVO | undefined,
  { rejectValue: string }
>(
  '/auth/login',
  async (params: LoginPVO | undefined, { rejectWithValue }) => {
    try {
      const res = await https.post(loginApiPath(), params);

      console.log("login res.data=",res.data);
      // ✅ 여기서 "서버 응답"을 표준 형태로 맞춰서 return
      const userInfo = res.data?.data?.userInfo;
      const tokenId = res.data?.data?.tokenId;
      const accessToken = res.data?.data?.accessToken;
      const refreshToken = res.data?.data?.refreshToken;
      const pswdErrNmtm = res.data?.data?.pswdErrNmtm;
      
      // 서버가 AuthRVO 형식으로 주므로 AuthRVO 형식으로 데이터 구조 재조정 
      return { userInfo: userInfo as MbrInfoRVO, tokenId: tokenId ?? null, accessToken: accessToken ?? null, refreshToken: refreshToken ?? null, pswdErrNmtm: pswdErrNmtm ?? null };
    } catch (error) {
      console.log("AuthThunks login catch error=",error);
      // AxiosError 에러 객체 구조:
      // - error.response: 서버가 응답을 반환한 경우 (4xx, 5xx 등)
      //   - error.response.data: 서버 응답 본문
      //   - error.response.status: HTTP 상태 코드 (예: 400, 401, 500)
      //   - error.response.headers: 응답 헤더
      // - error.request: 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 에러)
      // - error.message: 에러 메시지
      // - error.config: 요청 설정 정보
      
      const error1 = error as AxiosError<unknown>;
      
      // 서버 응답이 있는 경우 (4xx, 5xx 에러)
      if (error1.response) {
        const errorData = error1.response.data as { code: string, data: any, msg: string };
        
        // 에러 정보를 반환 (문자열로 직렬화)
        return rejectWithValue(JSON.stringify({
          code: errorData.code == '-1' ? -1 : errorData.code,
          data: errorData.data,
          msg: errorData.msg
        }));
      }
      
      // 요청은 보냈지만 응답을 받지 못한 경우 (네트워크 에러)
      if (error1.request) {
        if(error1.status && error1.status == 500){
          // 에러 정보를 반환 (문자열로 직렬화)
          return rejectWithValue(JSON.stringify({ 
            code: -1,
            data: {},
            msg: error1.response
          }));
        }

        return rejectWithValue('네트워크 오류가 발생했습니다. 연결을 확인해주세요.');
      }
      
      // 기타 에러
      return rejectWithValue('로그인에 실패했습니다.');
    }
  }
)

/**
 * 대국민포털_로그인 JWT Token 갱신 요청
 */
export const refresh = createAsyncThunk<RefreshRVO, RefreshPVO | undefined, { rejectValue: string }>(
  '/auth/refresh',
  async (params: RefreshPVO | undefined, { rejectWithValue }) => {
    try {
      const res = await https.post(refreshApiPath(), params);

      const payload = res.data?.data;

      return {
        tokenId: payload.tokenId ?? null,
        accessToken: payload.accessToken ?? null,
        refreshToken: payload.refreshToken ?? null,
        pswdErrNmtm: payload.pswdErrNmtm ?? null,
        userInfo: (payload.userInfo as MbrInfoRVO) ?? null
      };
    } catch (e) {
      console.log("AuthThunks refresh catch e=", e);
      return rejectWithValue('JWT Token 갱신에 실패했습니다.');
    }
  }
)

/**
 * 대국민포털_로그아웃 요청
 */
export const logout = createAsyncThunk<LogoutRVO, LogoutPVO | undefined, { rejectValue: string }>(
  '/auth/logout',
  async (params: LogoutPVO | undefined, { rejectWithValue }) => {
    try {
      const res = await https.post(logoutApiPath(), params);

      const payload = res.data?.data;

      return {
        code: payload.code ?? '',
        msg: payload.msg ?? ''
      };
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (error) {
      console.log("AuthThunks logout catch error=",error);

      const axiosError = error as AxiosError<{ 
        code?: string; 
        msg?: string;
      }>;

      // 서버 응답이 있는 경우 (4xx, 5xx 에러)
      if (axiosError.response) {
        const errorData = axiosError.response.data as any;
        const code = errorData?.code ?? errorData?.data?.code;
        const msg = errorData?.msg ?? errorData?.data?.msg;
        return rejectWithValue(msg);
      }

      // 요청은 보냈지만 응답을 받지 못한 경우 (네트워크 에러)
      if (axiosError.request) {
        return rejectWithValue('네트워크 오류가 발생했습니다. 연결을 확인해주세요.');
      }
      
      // 기타 에러
      return rejectWithValue(axiosError.message || '로그아웃에 실패했습니다.');
    }
  }
)

/**
 * 대국민포털_로그인 연장 요청
 */
export const loginExtend = createAsyncThunk<LoginExtendRVO, undefined, { rejectValue: string }>(
  '/auth/extend',
  async (_, { rejectWithValue }) => {
    try {
      const res = await https.post(loginExtendApiPath());
      const payload = res.data?.data;

      return {
        code: payload.code ?? '',
        msg: payload.msg ?? ''
      };
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      console.log("AuthThunks loginExtend catch e=", e);
      return rejectWithValue('로그인 연장에 실패했습니다.');
    }
  }
)