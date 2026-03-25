import { createSlice } from '@reduxjs/toolkit'
import { insertAccessLog } from './AccessLogThunks'

/**
 * 대국민포털_업무별 접속이력 적재 (Redux 저장 구조) 
 */
export interface AccessLogState {
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_업무별 접속이력 적재 (Redux 저장 구조 초기상태) 
 */
const initialState: AccessLogState = {
  loading: false,
  error: null
}

const AccessLogSlice = createSlice({
  name: 'accessLog',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertAccessLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertAccessLog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(insertAccessLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load inertAccessLog';
      })
  }
});

export default AccessLogSlice.reducer