import { createSlice } from '@reduxjs/toolkit'
import { insertWorkAccessLog } from './AccessLogThunks'

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
      .addCase(insertWorkAccessLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertWorkAccessLog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(insertWorkAccessLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load insertWorkAccessLog';
      })
  }
});

export default AccessLogSlice.reducer