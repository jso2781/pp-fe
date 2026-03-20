import { createSlice } from '@reduxjs/toolkit'
import { selectFaqList, getFaqDetail, increaseFaqViewCount } from './FaqCdmThunks'
import { FaqItem } from './FaqCdmTypes'

/**
 * CDM FAQ 결과(Redux 저장 구조)
 */
export interface CdmFaqState {
  list: FaqItem[]
  totalCount: number
  detail: FaqItem | null
  loading: boolean
  error: string | null
}

/**
 * CDM FAQ 결과(Redux 저장 구조 초기상태)
 */
const initialState: CdmFaqState = {
  list: [],
  totalCount: 0,
  detail: null,
  loading: false,
  error: null,
}

const CdmFaqSlice = createSlice({
  name: 'cdmFaq',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.detail = null;
    },
    resetResults: (state) => {
      state.list = [];
      state.totalCount = 0;
      state.detail = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectFaqList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
        state.totalCount = 0;
      })
      .addCase(selectFaqList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectFaqList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load faq list';
      })
      .addCase(getFaqDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.detail = null;
      })
      .addCase(getFaqDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(getFaqDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load faq detail';
      })
      .addCase(increaseFaqViewCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseFaqViewCount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseFaqViewCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to increase view count';
      })
  },
});

export const { clearCurrent, resetResults } = CdmFaqSlice.actions
export default CdmFaqSlice.reducer
