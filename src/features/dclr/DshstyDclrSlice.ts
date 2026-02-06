import { createSlice } from '@reduxjs/toolkit'
import { selectDshstyDclrList, insertDshstyDclr } from './DshstyDclrThunks'
import { DshstyDclrListRVO, DshstyDclrRVO } from './DshstyDclrTypes'

//DshstyDclr
/**
 * 대국민포털_부정신고 정보 목록 조회(Redux 저장 구조) 
 */
export interface DshstyDclrState {
  list: DshstyDclrRVO[]
  totalCount: number | null
  current: DshstyDclrRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_부정신고 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DshstyDclrState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DshstyDclrSlice = createSlice({
  name: 'dshstyDclr',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDshstyDclrList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(selectDshstyDclrList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDshstyDclrList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
      .addCase(insertDshstyDclr.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDshstyDclr.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(insertDshstyDclr.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })
  }
});

export const { clearCurrent } = DshstyDclrSlice.actions
export default DshstyDclrSlice.reducer
