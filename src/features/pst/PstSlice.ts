import { createSlice } from '@reduxjs/toolkit'
import { selectPstList, getPst } from './PstThunks'
import { mockPstList, PstPVO, PstRVO, PstListPVO, PstListRVO, PstDVO  } from './PstTypes'

/**
 * 대국민포털_게시물기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface PstState {
  list: PstRVO[]
  totalCount: number | null
  current: PstRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_게시물기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: PstState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const PstSlice = createSlice({
  name: 'pst',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectPstList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectPstList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectPstList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getPst.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getPst.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getPst.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
  }
});

export const { clearCurrent } = PstSlice.actions
export default PstSlice.reducer
