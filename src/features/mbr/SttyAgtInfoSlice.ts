import { createSlice } from '@reduxjs/toolkit'
import { selectSttyAgtInfoList, getSttyAgtInfo, insertSttyAgtInfo, updateSttyAgtInfo, saveSttyAgtInfo, deleteSttyAgtInfo } from './SttyAgtInfoThunks'
import { mockSttyAgtInfoList, SttyAgtInfoPVO, SttyAgtInfoRVO, SttyAgtInfoListPVO, SttyAgtInfoListRVO, SttyAgtInfoDVO  } from './SttyAgtInfoTypes'

/**
 * 대국민포털_법정대리인정보기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface SttyAgtInfoState {
  list: SttyAgtInfoRVO[]
  totalCount: number | null
  current: SttyAgtInfoRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_법정대리인정보기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: SttyAgtInfoState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const SttyAgtInfoSlice = createSlice({
  name: 'sttyAgtInfo',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectSttyAgtInfoList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectSttyAgtInfoList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectSttyAgtInfoList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getSttyAgtInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getSttyAgtInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getSttyAgtInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertSttyAgtInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertSttyAgtInfo.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertSttyAgtInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert SttyAgtInfo';
      })
      .addCase(updateSttyAgtInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSttyAgtInfo.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateSttyAgtInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update SttyAgtInfo';
      })
      .addCase(saveSttyAgtInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveSttyAgtInfo.fulfilled, (state, action) => {
        state.loading = false;
        //const saved = action.payload;
        //state.current = saved || null;
        //if(saved?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(saved.id));
        //  if(idx >= 0){
        //    state.list[idx] = { ...state.list[idx], ...saved };
        //  }else if(saved) {
        //    state.list = [saved, ...state.list];
        //    state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //  }
        //}
      })
      .addCase(saveSttyAgtInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save SttyAgtInfo';
      })
      .addCase(deleteSttyAgtInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSttyAgtInfo.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteSttyAgtInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete SttyAgtInfo';
      })
  }
});

export const { clearCurrent } = SttyAgtInfoSlice.actions
export default SttyAgtInfoSlice.reducer
