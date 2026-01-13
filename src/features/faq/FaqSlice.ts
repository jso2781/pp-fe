import { createSlice } from '@reduxjs/toolkit'
import { selectFaqList, sideEffectThunk } from './FaqThunks'
import { FaqResult, FaqRVO } from './FaqTypes'

/**
 * 대국민포털_FAQ기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface FaqState {
  list: FaqResult[]
  totalCount: number | null
  current: FaqRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_FAQ기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: FaqState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const FaqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectFaqList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectFaqList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectFaqList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })

      //테스트용
      .addCase(sideEffectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sideEffectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(sideEffectThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
  }
});

export const { clearCurrent } = FaqSlice.actions
export default FaqSlice.reducer
