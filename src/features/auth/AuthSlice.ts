import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './AuthThunks';
import { AuthPVO, AuthRVO } from './AuthTypes';

/**
 * 대국민포털_로그인 정보(Redux 저장 구조) 
 */
export interface AuthState {
  userInfo: AuthRVO | null;
  tokenId: number | null;
  accessToken: string | null;
  refreshToken: string | null;
  pswdErrNmtm: number | null;
  loading: boolean;
  error: string | null;
}

/**
 * 대국민포털_로그인 정보(Redux 저장 구조 초기상태) 
 */
const initialState: AuthState = {
  userInfo: null,
  tokenId: null,
  accessToken: null,
  refreshToken: null,
  pswdErrNmtm: null,
  loading: false,
  error: null,

}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<{ tokenId: number | null, accessToken: string | null, refreshToken: string | null, pswdErrNmtm: number | null }>) {
      state.tokenId = action.payload.tokenId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.pswdErrNmtm = null;
    },
    logout(state) {
      state.userInfo = null;
      state.tokenId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.pswdErrNmtm = null;
      localStorage.removeItem("refreshToken");
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.tokenId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.pswdErrNmtm = null;
      localStorage.removeItem("refreshToken");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.pswdErrNmtm = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
        state.tokenId = action.payload.tokenId;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.pswdErrNmtm = action.payload.pswdErrNmtm;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // rejectWithValue로 반환된 에러 메시지 또는 기본 에러 메시지(AuthThunks.ts login 함수에서 rejectWithValue 사용하지 않았을 때 action.error?.message 사용)
        // state.error = action.payload || action.error?.message || '로그인에 실패했습니다.';

        // AuthThunks.ts login 함수에서 모든 에러를 rejectWithValue로 처리하므로 action.payload가 항상 존재
        state.error = action.payload ?? '로그인에 실패했습니다.';
        state.userInfo = null;
        state.tokenId = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.pswdErrNmtm = null;
      })
    }
  })

export const { setAccessToken, logout, clearUserInfo } = AuthSlice.actions;
export default AuthSlice.reducer;