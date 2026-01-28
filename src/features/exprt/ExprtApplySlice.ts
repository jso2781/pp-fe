import { createSlice } from '@reduxjs/toolkit'
import { existbyEmail, existsInstByBrno, expertApply } from './ExprtApplyThunks'
import { ExprtApplyRVO } from './ExprtApplyTypes'

/**
 * 대국민포털_전문가회원전환신청관리 정보 목록 조회(Redux 저장 구조) 
 */
export interface ExprtApplyState {
  current: ExprtApplyRVO | null
  existEmailYn: boolean | null
  applyResult: string | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_전문가회원전환신청관리 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: ExprtApplyState = {
  current: null,
  existEmailYn: null,
  applyResult: null,
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
      .addCase(existbyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(existbyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.existEmailYn = action.payload || false;
      })
      .addCase(existbyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load Email';
      })      
      .addCase(expertApply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(expertApply.fulfilled, (state, action) => {
        state.loading = false;
        state.applyResult = action.payload || null;
      })
      .addCase(expertApply.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to Apply';
      })            
  }
});

export const { clearCurrent } = ExprtApplySlice.actions
export default ExprtApplySlice.reducer