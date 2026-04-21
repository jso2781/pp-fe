import { createSlice } from '@reduxjs/toolkit'
import { getTransctionId } from './NiceThunks'
import { GetTransctionIdRVO } from './NiceTypes'

/**
 * DUR 정보 검색 결과 목록 조회(Redux 저장 구조) 
 */
export interface NiceState {
  requestNo: string
  transactionId: string
  returnCode: string
  uthUrl: string
  loading: boolean
  error: string | null
}

/**
 * DUR 정보 검색 결과 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: NiceState = {
  requestNo: '',
  transactionId: '',
  returnCode: '',
  uthUrl: '',
  loading: false,
  error: null
}

const NiceSlice = createSlice({
  name: 'nice',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.requestNo = '';
      state.transactionId = '';
      state.returnCode = '';
      state.uthUrl = '';
    },
    /** 다른 메뉴로 나갔다가 돌아올 때 조회 결과 제거용 */
    resetResults: (state) => {
      state.requestNo = '';
      state.transactionId = '';
      state.returnCode = '';
      state.uthUrl = '';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransctionId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransctionId.fulfilled, (state, action) => {
        state.loading = false;
        state.requestNo = action.payload.requestNo;
        state.transactionId = action.payload.transactionId;
        state.returnCode = action.payload.returnCode;
        state.uthUrl = action.payload.uthUrl;
      })
      .addCase(getTransctionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load getTransctionId';
      })
  }
});

export const { clearCurrent, resetResults } = NiceSlice.actions
export default NiceSlice.reducer
