import { createSlice } from '@reduxjs/toolkit'
import { getSsoInfo, getAnyIdInit, getAnyIdUserInfo } from './AnyIdThunks'
import { SsoInfoRVO, AnyIdInitRVO, AnyIdUserInfoRVO } from './AnyIdTypes'

/**
 * SSO, ANY-ID 정보(Redux 저장 구조)
 * persist:root 내 anyId 슬라이스에 ssoInfo / anyidInit / anyIdUserInfo 로 저장됨
 */
export interface AnyIdState {
  /** getSsoInfo 결과 (persist 시 'ssoInfo' 키로 저장) */
  ssoInfo: SsoInfoRVO | null
  /** getAnyIdInit 결과 (persist 시 'anyidInit' 키로 저장) */
  anyidInit: AnyIdInitRVO | null
  /** getAnyIdUserInfo 결과 (persist 시 'anyIdUserInfo' 키로 저장) */
  anyIdUserInfo: AnyIdUserInfoRVO | null
  loading: boolean
  error: string | null
}

const initialState: AnyIdState = {
  ssoInfo: null,
  anyidInit: null,
  anyIdUserInfo: null,
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
      state.anyIdUserInfo = null;
    },
    /** 다른 메뉴로 나갔다가 돌아올 때 조회 결과 제거용 */
    resetResults: (state) => {
      state.ssoInfo = null;
      state.anyidInit = null;
      state.anyIdUserInfo = null;
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
        state.anyidInit = action.payload ?? null;
      })
      .addCase(getAnyIdInit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getAnyIdUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnyIdUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.anyIdUserInfo = action.payload ?? null;
      })
      .addCase(getAnyIdUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
  }
});

export const { clearCurrent, resetResults } = AnyIdSlice.actions
export default AnyIdSlice.reducer
