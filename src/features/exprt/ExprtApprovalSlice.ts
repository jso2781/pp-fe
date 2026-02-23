import { createSlice } from '@reduxjs/toolkit'
import { selectExprtApproval, selectExprtApprovalList, selectTaskAuthList, updateExprtApproval, withdrawExprtApproval } from './ExprtApprovalThunks'
import { ExprtApprovalRVO, ExprtTaskAuthRVO } from './ExprtApprovalTypes'

/**
 * 대국민포털_전문가업무신청관리 정보 목록 조회(Redux 저장 구조) 
 */
export interface ExprtApprovalState {
  list: ExprtApprovalRVO[]
  totalCount: number | null
  totalPages: number | null
  current: ExprtApprovalRVO | null
  authList: ExprtTaskAuthRVO[] | null
  defenseYn: boolean | null
  authListAll: ExprtTaskAuthRVO[] | null
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
  defenseYn: null,
  authList: [],
  authListAll: [],
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
        state.current = action.payload.detail || null;
        state.authList = action.payload.authList || [];
        state.defenseYn = action.payload.defenseYn || false;
      })
      .addCase(selectExprtApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load approval detail';
      })
      .addCase(selectTaskAuthList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectTaskAuthList.fulfilled, (state, action) => {
        state.loading = false;
        state.authListAll = action.payload || [];
      })
      .addCase(selectTaskAuthList.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load task auth list';
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
      .addCase(withdrawExprtApproval.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawExprtApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(withdrawExprtApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to withdraw approval';
      })      
  }
});

export const { clearCurrent } = ExprtApprovalSlice.actions
export default ExprtApprovalSlice.reducer