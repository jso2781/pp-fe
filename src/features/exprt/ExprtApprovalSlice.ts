import { createSlice } from '@reduxjs/toolkit'
import { selectExprtApproval, selectExprtApprovalList, updateExprtApproval } from './ExprtApprovalThunks'
import { ExprtApprovalRVO } from './ExprtApprovalTypes'

/**
 * 대국민포털_전문가업무신청관리 정보 목록 조회(Redux 저장 구조) 
 */
export interface ExprtApprovalState {
  list: ExprtApprovalRVO[]
  totalCount: number | null
  totalPages: number | null
  current: ExprtApprovalRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_전문가업무신청관리 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: ExprtApprovalState = {
  list: [],
  totalCount: null,
  totalPages: null,
  current: null,
  loading: false,
  error: null
}

const ExprtApprovalSlice = createSlice({
  name: 'exprtApproval',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectExprtApprovalList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectExprtApprovalList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(selectExprtApprovalList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load approval list';
      })
      .addCase(selectExprtApproval.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(selectExprtApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(selectExprtApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load approval detail';
      })
      .addCase(updateExprtApproval.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExprtApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateExprtApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update approval status';
      })
  }
});

export const { clearCurrent } = ExprtApprovalSlice.actions
export default ExprtApprovalSlice.reducer