import { createSlice } from '@reduxjs/toolkit'
import { selectQnaList, getQnaDetail, getQnaAnswer, increaseQnaViewCount, selectQnaStatusCodes } from './QnaCdmThunks'
import { QnaItem } from './QnaCdmTypes'

export interface CdmQnaState {
  list: QnaItem[]
  totalCount: number
  detail: QnaItem | null
  answer: any | null
  statusCodeMap: Record<string, string>
  loading: boolean
  error: string | null
}

const initialState: CdmQnaState = {
  list: [],
  totalCount: 0,
  detail: null,
  answer: null,
  statusCodeMap: {},
  loading: false,
  error: null,
}

const CdmQnaSlice = createSlice({
  name: 'cdmQna',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.detail = null;
      state.answer = null;
    },
    resetResults: (state) => {
      state.list = [];
      state.totalCount = 0;
      state.detail = null;
      state.answer = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectQnaList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
        state.totalCount = 0;
      })
      .addCase(selectQnaList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectQnaList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load qna list';
      })
      .addCase(getQnaDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.detail = null;
      })
      .addCase(getQnaDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(getQnaDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load qna detail';
      })
      .addCase(getQnaAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.answer = null;
      })
      .addCase(getQnaAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answer = action.payload;
      })
      .addCase(getQnaAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load qna answer';
      })
      .addCase(increaseQnaViewCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseQnaViewCount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseQnaViewCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to increase qna view count';
      })
      .addCase(selectQnaStatusCodes.fulfilled, (state, action) => {
        state.statusCodeMap = action.payload;
      })
  },
});

export const { clearCurrent, resetResults } = CdmQnaSlice.actions
export default CdmQnaSlice.reducer
