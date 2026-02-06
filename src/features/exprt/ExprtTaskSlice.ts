import { createSlice } from '@reduxjs/toolkit'
import { selectExprtInfo, withdrawExprt, withdrawExprtTask, applyExprtTask } from './ExprtTaskThunks'
import { ExprtTaskFullVO } from './ExprtTaskTypes'

/**
 * 대국민포털_전문가내업무관리 정보 조회(Redux 저장 구조) 
 */
export interface ExprtTaskState {
  current: ExprtTaskFullVO | null
  withdrawExprtResult: string | null
  withdrawExprtTaskResult: string | null
  applyExprtTaskResult: string | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_전문가내업무관리 정보 조회(Redux 저장 구조 초기상태) 
 */
const initialState: ExprtTaskState = {
  current: null,
  withdrawExprtResult: null,
  withdrawExprtTaskResult: null,
  applyExprtTaskResult: null,
  loading: false,
  error: null
}

const ExprtTaskSlice = createSlice({
  name: 'exprtTask',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectExprtInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectExprtInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(selectExprtInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load exprt info';
      })
      .addCase(withdrawExprt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawExprt.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawExprtResult = action.payload || null;
      })
      .addCase(withdrawExprt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to withdraw exprt';
      })
      .addCase(withdrawExprtTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawExprtTask.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawExprtTaskResult = action.payload || null;
      })
      .addCase(withdrawExprtTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to withdraw exprt task';
      })
      .addCase(applyExprtTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyExprtTask.fulfilled, (state, action) => {
        state.loading = false;
        state.applyExprtTaskResult = action.payload || null;
      })
      .addCase(applyExprtTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to apply exprt task';
      })
  }
});

export const { clearCurrent } = ExprtTaskSlice.actions
export default ExprtTaskSlice.reducer
