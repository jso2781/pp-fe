import { createSlice } from '@reduxjs/toolkit'
import { exprtAplyChk, updateExprtAprvStts } from './MbcmtApplyThunks'
import type { MbcmtApplyRVO } from './MbcmtApplyTypes'

export interface MbcmtApplyState {
  qualifyResult: MbcmtApplyRVO | null
  applyResult: string | null
  loading: boolean
  error: string | null
}

const initialState: MbcmtApplyState = {
  qualifyResult: null,
  applyResult: null,
  loading: false,
  error: null,
}

const mbcmtApplySlice = createSlice({
  name: 'mbcmtApply',
  initialState,
  reducers: {
    resetMbcmtApply: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // 자격여부 체크
      .addCase(exprtAplyChk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(exprtAplyChk.fulfilled, (state, action) => {
        state.loading = false
        state.qualifyResult = action.payload
      })
      .addCase(exprtAplyChk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error?.message ?? '자격여부 확인 실패'
      })
      // 전환신청
      .addCase(updateExprtAprvStts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateExprtAprvStts.fulfilled, (state, action) => {
        state.loading = false
        state.applyResult = action.payload
      })
      .addCase(updateExprtAprvStts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error?.message ?? '신청 처리 실패'
      })
  },
})

export const { resetMbcmtApply } = mbcmtApplySlice.actions
export default mbcmtApplySlice.reducer
