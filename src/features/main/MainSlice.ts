import { createSlice } from '@reduxjs/toolkit'
import { MainRVO } from './MainTypes'
import { selectMainContents } from './MainThunks'

/**
 * 대국민포털_메인화면 컨텐츠 조회 (Redux 저장 구조) 
 */
export interface MainState {
  current: MainRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_메인화면 컨텐츠 조회 (Redux 저장 구조 초기상태) 
 */
const initialState: MainState = {
  current: null,
  loading: false,
  error: null
}

const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectMainContents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectMainContents.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(selectMainContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load main contents';
      })  
  }
});

export const { clearCurrent } = MainSlice.actions
export default MainSlice.reducer