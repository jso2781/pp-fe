import { createSlice } from '@reduxjs/toolkit'
import { getCms } from './CmsThunks'
import { CmsRVO } from './CmsTypes'

/**
 * 대국민포털_만족도조사기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface CmsState {
  current: CmsRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_만족도조사기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: CmsState = {
  current: null,
  loading: false,
  error: null
}

const CmsSlice = createSlice({
  name: 'Cms',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCms.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getCms.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getCms.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load notice';
      })
  }
});

export const { clearCurrent } = CmsSlice.actions
export default CmsSlice.reducer
