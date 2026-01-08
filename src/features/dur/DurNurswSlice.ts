import { createSlice } from '@reduxjs/toolkit'
import { selectDurNurswList, getDurNursw, insertDurNursw, updateDurNursw, saveDurNursw, deleteDurNursw } from './DurNurswThunks'
import { mockDurNurswList, DurNurswPVO, DurNurswRVO, DurNurswListPVO, DurNurswListRVO, DurNurswDVO  } from './DurNurswTypes'

/**
 * 대국민포털_DUR수유부주의기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurNurswState {
  list: DurNurswRVO[]
  totalCount: number | null
  current: DurNurswRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR수유부주의기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurNurswState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurNurswSlice = createSlice({
  name: 'durNursw',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurNurswList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurNurswList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurNurswList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurNursw.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurNursw.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurNursw.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurNursw.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurNursw.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurNursw.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurNursw';
      })
      .addCase(updateDurNursw.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurNursw.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurNursw.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurNursw';
      })
      .addCase(saveDurNursw.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurNursw.fulfilled, (state, action) => {
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
      .addCase(saveDurNursw.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurNursw';
      })
      .addCase(deleteDurNursw.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurNursw.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurNursw.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurNursw';
      })
  }
});

export const { clearCurrent } = DurNurswSlice.actions
export default DurNurswSlice.reducer
