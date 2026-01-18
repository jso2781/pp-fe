import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, refresh, logout, loginExtend} from './AuthThunks';
import { AuthPVO, AuthRVO } from './AuthTypes';
import { MbrInfoRVO } from '../mbr/MbrInfoTypes';

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
    setAccessToken(state, action: PayloadAction<{ tokenId: number | null, accessToken: string | null, refreshToken: string | null, pswdErrNmtm: number | null, userInfo: MbrInfoRVO | null }>) {
      state.tokenId = action.payload.tokenId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.pswdErrNmtm = action.payload.pswdErrNmtm;
      state.userInfo = action.payload.userInfo;

      // localStorage에 통일된 키로 저장 (AuthContext와 동기화)
      if(state.userInfo && action.payload.accessToken) {
        const authData = {
          tokenId: action.payload.tokenId,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          pswdErrNmtm: action.payload.pswdErrNmtm,
          userInfo: action.payload.userInfo
        };
        sessionStorage.setItem("auth", JSON.stringify(authData));
        // 하위 호환성을 위해 refreshToken도 별도로 저장
        if(action.payload.refreshToken){
          sessionStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      }
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      state.tokenId = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.pswdErrNmtm = null;
      // sessionStorage에서 통일된 키 제거
      sessionStorage.removeItem("auth");
      sessionStorage.removeItem("refreshToken"); // 하위 호환성을 위해 유지
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
        
        // sessionStorage에 통일된 키로 저장 (AuthContext와 동기화)
        if (action.payload.userInfo && action.payload.accessToken) {
          const authData = {
            userInfo: action.payload.userInfo,
            tokenId: action.payload.tokenId,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            pswdErrNmtm: action.payload.pswdErrNmtm,
          };
          sessionStorage.setItem("auth", JSON.stringify(authData));
          // 하위 호환성을 위해 refreshToken도 별도로 저장
          if (action.payload.refreshToken) {
            sessionStorage.setItem("refreshToken", action.payload.refreshToken);
          }
        }
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
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.pswdErrNmtm = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
        state.tokenId = action.payload.tokenId;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.pswdErrNmtm = action.payload.pswdErrNmtm;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'JWT Token 갱신에 실패했습니다.';
        state.userInfo = null;
        state.tokenId = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.pswdErrNmtm = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.tokenId = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.pswdErrNmtm = null;
        // sessionStorage에서 통일된 키 제거
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("refreshToken");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? '로그아웃에 실패했습니다.';
        state.userInfo = null;
        state.tokenId = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.pswdErrNmtm = null;
      })
      .addCase(loginExtend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginExtend.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginExtend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? '로그인 연장에 실패했습니다.';
      })
    }
  })

export const { setAccessToken, clearUserInfo } = AuthSlice.actions;
export default AuthSlice.reducer;