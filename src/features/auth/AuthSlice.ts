import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, refresh, logout, loginExtend} from './AuthThunks';
import { AuthPVO, AuthRVO } from './AuthTypes';
import { MbrInfoRVO } from '../mbr/MbrInfoTypes';

/**
 * MbrInfoRVO를 AuthRVO로 변환하는 함수
 * MbrInfoRVO에는 없는 tokenId, appId, refreshToken, accessToken은 기존 값 유지
 */
const convertMbrInfoRVOToAuthRVO = (mbrInfo: MbrInfoRVO | null, existingAuthRVO: AuthRVO | null): AuthRVO | null => {
  if (!mbrInfo) {
    return null;
  }

  return {
    mbrNo: mbrInfo.mbrNo,
    mbrId: mbrInfo.mbrId,
    mbrEncptFlnm: mbrInfo.mbrEncptFlnm,
    mbrEncptEml: mbrInfo.mbrEncptEml,
    mbrEnpswd: mbrInfo.mbrEnpswd,
    mbrEncptTelno: mbrInfo.mbrEncptTelno,
    mbrTypeCd: mbrInfo.mbrTypeCd,
    mbrJoinStts: mbrInfo.mbrJoinStts,
    mbrJoinDt: mbrInfo.mbrJoinDt,
    mbrWhdwlRsn: mbrInfo.mbrWhdwlRsn,
    mbrWhdwlDt: mbrInfo.mbrWhdwlDt,
    bfrEnpswd: mbrInfo.bfrEnpswd,
    pswdChgDt: mbrInfo.pswdChgDt,
    pswdErrNmtm: mbrInfo.pswdErrNmtm,
    linkInfoIdntfId: mbrInfo.linkInfoIdntfId,
    certToken: mbrInfo.certToken,
    rgtrId: mbrInfo.rgtrId,
    regDt: mbrInfo.regDt,
    regPrgrmId: mbrInfo.regPrgrmId,
    mdfrId: mbrInfo.mdfrId,
    mdfcnDt: mbrInfo.mdfcnDt,
    mdfcnPrgrmId: mbrInfo.mdfcnPrgrmId,
    // AuthRVO에만 있는 필드들은 기존 값 유지
    tokenId: existingAuthRVO?.tokenId,
    appId: existingAuthRVO?.appId,
    refreshToken: existingAuthRVO?.refreshToken,
    accessToken: existingAuthRVO?.accessToken,
  };
};

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
      
      // MbrInfoRVO를 AuthRVO로 변환
      const authRVO = convertMbrInfoRVOToAuthRVO(action.payload.userInfo, state.userInfo);
      // 변환된 AuthRVO에 토큰 정보 추가 (MbrInfoRVO에는 없는 필드)
      if (authRVO) {
        authRVO.tokenId = action.payload.tokenId ?? undefined;
        authRVO.accessToken = action.payload.accessToken ?? undefined;
        authRVO.refreshToken = action.payload.refreshToken ?? undefined;
      }
      state.userInfo = authRVO;

      // localStorage에 통일된 키로 저장 (AuthContext와 동기화)
      if(authRVO && action.payload.accessToken) {
        const authData = {
          tokenId: action.payload.tokenId,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          pswdErrNmtm: action.payload.pswdErrNmtm,
          userInfo: authRVO
        };
        sessionStorage.setItem("auth", JSON.stringify(authData));
        // 하위 호환성을 위해 refreshToken도 별도로 저장
        if(action.payload.refreshToken){
          sessionStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      }
    },
    setAuthUserInfo: (state, action: PayloadAction<MbrInfoRVO | null>) => {
      // MbrInfoRVO를 AuthRVO로 변환
      const authRVO = convertMbrInfoRVOToAuthRVO(action.payload, state.userInfo);
      state.userInfo = authRVO;
      
      // sessionStorage의 auth 내부 userInfo도 함께 갱신
      try {
        const authDataStr = sessionStorage.getItem("auth");
        if (authDataStr) {
          const authData = JSON.parse(authDataStr);
          authData.userInfo = authRVO;
          sessionStorage.setItem("auth", JSON.stringify(authData));
        } else if (authRVO && state.accessToken) {
          // sessionStorage에 auth 데이터가 없지만 accessToken이 있는 경우 새로 생성
          const authData = {
            userInfo: authRVO,
            tokenId: state.tokenId,
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            pswdErrNmtm: state.pswdErrNmtm,
          };
          sessionStorage.setItem("auth", JSON.stringify(authData));
        }
      } catch (error) {
        console.error('Failed to update sessionStorage auth.userInfo:', error);
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
      sessionStorage.removeItem("legalGuardFormData"); // 회원가입 잔여 데이터 제거 (이전 사용자/다른 흐름 노출 방지)
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
        state.error = (action.payload as string) ?? 'JWT Token 갱신에 실패했습니다.';
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
        sessionStorage.removeItem("legalGuardFormData"); // 회원가입 잔여 데이터 제거
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? '로그아웃에 실패했습니다.';
        state.userInfo = null;
        state.tokenId = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.pswdErrNmtm = null;
        sessionStorage.removeItem("legalGuardFormData"); // 만 14세 미만 회원가입인 경우 법정대리인 동의 step에서 입력한 폼 데이터 제거
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
        state.error = (action.payload as string) ?? '로그인 연장에 실패했습니다.';
      })
    }
  })

export const { setAccessToken, setAuthUserInfo, clearUserInfo } = AuthSlice.actions;
export default AuthSlice.reducer;