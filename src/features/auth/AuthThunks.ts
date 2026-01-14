import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import https from '@/api/axiosInstance';
import { loginApiPath, logoutApiPath, refreshTokenApiPath } from '@/api/auth/AuthApiPaths';
import { AuthPVO, AuthRVO, LoginRVO } from './AuthTypes';

/**
 * 대국민포털_로그인 요청
 */
export const login = createAsyncThunk<
  LoginRVO,
  AuthPVO | undefined,
  { rejectValue: string }
>(
  '/auth/login',
  async (params: AuthPVO | undefined, { rejectWithValue }) => {
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
      return { userInfo: userInfo as AuthRVO, tokenId: tokenId ?? null, accessToken: accessToken ?? null, refreshToken: refreshToken ?? null, pswdErrNmtm: pswdErrNmtm ?? null };
    } catch (error) {
      // Axios 에러 객체 구조:
      // - error.response: 서버가 응답을 반환한 경우 (4xx, 5xx 등)
      //   - error.response.data: 서버 응답 본문
      //   - error.response.status: HTTP 상태 코드 (예: 400, 401, 500)
      //   - error.response.headers: 응답 헤더
      // - error.request: 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 에러)
      // - error.message: 에러 메시지
      // - error.config: 요청 설정 정보
      
      const axiosError = error as AxiosError<{ message?: string; error?: string }>;
      
      // 서버 응답이 있는 경우 (4xx, 5xx 에러)
      if (axiosError.response) {
        const errorMessage = 
          axiosError.response.data?.message || 
          axiosError.response.data?.error || 
          `서버 오류 (${axiosError.response.status})`;
        return rejectWithValue(errorMessage);
      }
      
      // 요청은 보냈지만 응답을 받지 못한 경우 (네트워크 에러)
      if (axiosError.request) {
        return rejectWithValue('네트워크 오류가 발생했습니다. 연결을 확인해주세요.');
      }
      
      // 기타 에러
      return rejectWithValue(axiosError.message || '로그인에 실패했습니다.');
    }
  }
)
