import { createSlice } from '@reduxjs/toolkit'
import { getSsoInfo, getAnyIdInit, postAnyIdLogin, getAnyIdUserInfo, getAnyIdCiFromSsob, getAnyIdUserInfoFromSsob } from './AnyIdThunks'
import { SsoInfoRVO, AnyIdInitRVO, AnyIdLoginRVO, AnyIdUserInfoRVO, AnyIdUserInfoFromSsobRVO } from './AnyIdTypes'

/**
 * SSO, ANY-ID 정보(Redux 저장 구조)
 * persist:root 내 anyId 슬라이스에 ssoInfo / anyidInit / anyIdLoginResult / anyIdUserInfo 로 저장됨
 */
export interface AnyIdState {
  /** getSsoInfo 결과 (persist 시 'ssoInfo' 키로 저장) */
  ssoInfo: SsoInfoRVO | null
  /** getAnyIdInit 결과 (persist 시 'anyidInit' 키로 저장) */
  anyidInit: AnyIdInitRVO | null
  /** postAnyIdLogin 결과 (persist 시 'anyIdLoginResult' 키로 저장) */
  anyIdLoginResult: AnyIdLoginRVO | null
  /** getAnyIdUserInfo 결과 (persist 시 'anyIdUserInfo' 키로 저장) */
  anyIdUserInfo: AnyIdUserInfoRVO | null
  /** getAnyIdCiFromSsob 결과 (persist 시 'ciFromSsob' 키로 저장) */
  ciFromSsob: string | null
  /** getAnyIdUserInfoFromSsob 결과 (persist 시 'userInfoFromSsob' 키로 저장) */
  userInfoFromSsob: AnyIdUserInfoFromSsobRVO | null
  loading: boolean
  error: string | null
}

const initialState: AnyIdState = {
  ssoInfo: null,
  anyidInit: null,
  anyIdLoginResult: null,
  anyIdUserInfo: null,
  ciFromSsob: null,
  userInfoFromSsob: null,
  loading: false,
  error: null
}

const AnyIdSlice = createSlice({
  name: 'anyId',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.ssoInfo = null;
      state.anyidInit = null;
      state.anyIdLoginResult = null;
      state.anyIdUserInfo = null;
      state.ciFromSsob = null;
      state.userInfoFromSsob = null;
    },
    /** 다른 메뉴로 나갔다가 돌아올 때 조회 결과 제거용 */
    resetResults: (state) => {
      state.ssoInfo = null;
      state.anyidInit = null;
      state.anyIdLoginResult = null;
      state.anyIdUserInfo = null;
      state.ciFromSsob = null;
      state.userInfoFromSsob = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSsoInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSsoInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.ssoInfo = action.payload ?? null;
      })
      .addCase(getSsoInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getAnyIdInit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnyIdInit.fulfilled, (state, action) => {
        state.loading = false;
        state.anyidInit = action.payload as AnyIdInitRVO ?? null;
      })
      .addCase(getAnyIdInit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(postAnyIdLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAnyIdLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.anyIdLoginResult = action.payload as AnyIdLoginRVO ?? null;
      })
      .addCase(postAnyIdLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getAnyIdUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnyIdUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.anyIdUserInfo = action.payload as AnyIdUserInfoRVO ?? null;
      })
      .addCase(getAnyIdUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getAnyIdCiFromSsob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnyIdCiFromSsob.fulfilled, (state, action) => {
        state.loading = false;
        state.ciFromSsob = action.payload as string ?? null;
      })
      .addCase(getAnyIdCiFromSsob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getAnyIdUserInfoFromSsob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnyIdUserInfoFromSsob.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfoFromSsob = action.payload as AnyIdUserInfoFromSsobRVO ?? null;
      })
      .addCase(getAnyIdUserInfoFromSsob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
  }
});

export const { clearCurrent, resetResults } = AnyIdSlice.actions
export default AnyIdSlice.reducer
