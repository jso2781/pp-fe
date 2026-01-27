import { createSlice } from '@reduxjs/toolkit'
import { existsInstByBrno, existbyEmail, expertApply } from './ExprtApplyThunks'
import { ExprtApplyRVO } from './ExprtApplyTypes'

/**
 * 대국민포털_전문가회원전환신청관리 정보 목록 조회(Redux 저장 구조) 
 */
export interface ExprtApplyState {
  current: ExprtApplyRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_전문가회원전환신청관리 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: ExprtApplyState = {
  current: null,
  loading: false,
  error: null
}

const ExprtApplySlice = createSlice({
  name: 'exprtApply',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(existsInstByBrno.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(existsInstByBrno.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(existsInstByBrno.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load Brno';
      })
  }
});

export const { clearCurrent } = ExprtApplySlice.actions
export default ExprtApplySlice.reducer