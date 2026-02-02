import { createSlice } from '@reduxjs/toolkit'
import { selectTrmsListForSignUp, selectTrmsSttList, getTrmsSttLatest } from './TrmsSttThunks'
import { TrmsSttRVO } from './TrmsSttTypes'

/**
 * 대국민포털_약관법령기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface TrmsSttState {
  list: TrmsSttRVO[]
  totalCount: number | null
  current: TrmsSttRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_약관법령기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: TrmsSttState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const TrmsSttSlice = createSlice({
  name: 'trmsStt',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    },
    setCurrent: (state, action) => {
      state.current = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(selectTrmsListForSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectTrmsListForSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectTrmsListForSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      //다건
      .addCase(selectTrmsSttList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
        state.list = [];
      })
      .addCase(selectTrmsSttList.fulfilled, (state, action) => {
        const list = action.payload.list
        state.loading = false;
        state.list = list;
        if(Array.isArray(list) && list.length > 0) {
          state.current = list[0];
        }
      })
      .addCase(selectTrmsSttList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      //단건
      .addCase(getTrmsSttLatest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
        state.list = [];
      })
      .addCase(getTrmsSttLatest.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getTrmsSttLatest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
  }
});

export const { clearCurrent, setCurrent, setLoading } = TrmsSttSlice.actions
export default TrmsSttSlice.reducer
