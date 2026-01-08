import { createSlice } from '@reduxjs/toolkit'
import { selectOpnnList, getOpnn, insertOpnn, updateOpnn, saveOpnn, deleteOpnn } from './OpnnThunks'
import { mockOpnnList, OpnnPVO, OpnnRVO, OpnnListPVO, OpnnListRVO, OpnnDVO  } from './OpnnTypes'

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
      .addCase(selectOpnnList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectOpnnList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectOpnnList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getOpnn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getOpnn.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getOpnn.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
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
      .addCase(updateOpnn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOpnn.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateOpnn.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update Opnn';
      })
      .addCase(saveOpnn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOpnn.fulfilled, (state, action) => {
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
      .addCase(saveOpnn.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save Opnn';
      })
      .addCase(deleteOpnn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOpnn.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteOpnn.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete Opnn';
      })
  }
});

export const { clearCurrent } = OpnnSlice.actions
export default OpnnSlice.reducer
