import { createSlice } from '@reduxjs/toolkit'
import { selectBoardList, getBoardDetail, increaseBoardViewCount } from './BoardCdmThunks'
import { BoardItem } from './BoardCdmTypes'

export interface CdmBoardState {
  list: BoardItem[]
  totalCount: number
  detail: BoardItem | null
  loading: boolean
  error: string | null
}

const initialState: CdmBoardState = {
  list: [],
  totalCount: 0,
  detail: null,
  loading: false,
  error: null,
}

const CdmBoardSlice = createSlice({
  name: 'cdmBoard',
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
      .addCase(selectBoardList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
        state.totalCount = 0;
      })
      .addCase(selectBoardList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectBoardList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load board list';
      })
      .addCase(getBoardDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.detail = null;
      })
      .addCase(getBoardDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(getBoardDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load board detail';
      })
      .addCase(increaseBoardViewCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseBoardViewCount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(increaseBoardViewCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to increase board view count';
      })
  },
});

export const { clearCurrent, resetResults } = CdmBoardSlice.actions
export default CdmBoardSlice.reducer
