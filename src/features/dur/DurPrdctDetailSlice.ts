import { createSlice } from '@reduxjs/toolkit'
import { selectPrdctDetailList } from './DurPrdctDetailThunks'
import { DurPrdctDetailRVO } from './DurPrdctDetailTypes'

/**
 * DUR 제품 상세 조회 결과 목록 조회(Redux 저장 구조) 
 */
export interface DurPrdctDetailState {
  list: DurPrdctDetailRVO[]
  totalCount: number | null
  totalPages: number | null
  current: DurPrdctDetailRVO | null
  loading: boolean
  error: string | null
}

/**
 * DUR 제품 상세 조회 결과 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurPrdctDetailState = {
  list: [],
  totalCount: null,
  totalPages: null,
  current: null,
  loading: false,
  error: null
}

const DurPrdctDetailSlice = createSlice({
  name: 'durPrdctDetail',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    },
    /** 다른 메뉴로 나갔다가 돌아올 때 조회 결과 제거용 */
    resetResults: (state) => {
      state.list = [];
      state.totalCount = null;
      state.totalPages = null;
      state.current = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectPrdctDetailList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectPrdctDetailList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(selectPrdctDetailList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
  }
});

export const { clearCurrent, resetResults } = DurPrdctDetailSlice.actions
export default DurPrdctDetailSlice.reducer
