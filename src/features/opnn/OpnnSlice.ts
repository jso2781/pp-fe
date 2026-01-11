import { createSlice } from '@reduxjs/toolkit'
import { insertOpnn } from './OpnnThunks'
import { OpnnRVO } from './OpnnTypes'

/**
 * 대국민포털_의견제안 정보 목록 조회(Redux 저장 구조) 
 */
export interface OpnnState {
  list: OpnnRVO[]
  totalCount: number | null
  current: OpnnRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_의견제안 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: OpnnState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const OpnnSlice = createSlice({
  name: 'opnn',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertOpnn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertOpnn.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertOpnn.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert Opnn';
      })
  }
});

export const { clearCurrent } = OpnnSlice.actions
export default OpnnSlice.reducer
