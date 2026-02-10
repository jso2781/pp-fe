import { createSlice } from '@reduxjs/toolkit'
import { selectDurSearchRoomList } from './DurSearchRoomThunks'
import { DurSearchRoomRVO } from './DurSearchRoomTypes'

/**
 * DUR 정보 검색 결과 목록 조회(Redux 저장 구조) 
 */
export interface DurSearchRoomState {
  list: DurSearchRoomRVO[]
  totalCount: number | null
  totalPages: number | null
  current: DurSearchRoomRVO | null
  loading: boolean
  error: string | null
}

/**
 * DUR 정보 검색 결과 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurSearchRoomState = {
  list: [],
  totalCount: null,
  totalPages: null,
  current: null,
  loading: false,
  error: null
}

const DurSearchRoomSlice = createSlice({
  name: 'durSearchRoom',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurSearchRoomList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurSearchRoomList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(selectDurSearchRoomList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
  }
});

export const { clearCurrent } = DurSearchRoomSlice.actions
export default DurSearchRoomSlice.reducer
