import { createSlice } from '@reduxjs/toolkit'
import { getIntegratedSearchJson } from './IntegratedSearchThunks'
import { IntegratedSearchRVO } from '@/features/search/IntegratedSearchTypes'

/**
 * 통합검색 결과(전체, 주요업무, 정보공개, 기관소식, 기관소개 탭별 목록 정보 - Redux 저장 구조) 
 */
export interface IntegratedSearchState {
  current: IntegratedSearchRVO | null
  loading: boolean
  error: string | null
}

/**
 * 통합검색 결과(Redux 저장 구조 초기상태) 
 */
const initialState: IntegratedSearchState = {
  current: null,
  loading: false,
  error: null
}

const IntegratedSearchSlice = createSlice({
  name: 'integratedSearch',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    },
    /** 다른 메뉴로 나갔다가 돌아올 때 조회 결과 제거용 */
    resetResults: (state) => {
      state.current = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIntegratedSearchJson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIntegratedSearchJson.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getIntegratedSearchJson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
  }
});

export const { clearCurrent, resetResults } = IntegratedSearchSlice.actions
export default IntegratedSearchSlice.reducer
