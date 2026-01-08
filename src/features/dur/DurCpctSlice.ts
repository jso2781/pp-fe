import { createSlice } from '@reduxjs/toolkit'
import { selectDurCpctList, getDurCpct, insertDurCpct, updateDurCpct, saveDurCpct, deleteDurCpct } from './DurCpctThunks'
import { mockDurCpctList, DurCpctPVO, DurCpctRVO, DurCpctListPVO, DurCpctListRVO, DurCpctDVO  } from './DurCpctTypes'

/**
 * 대국민포털_DUR용량주의기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurCpctState {
  list: DurCpctRVO[]
  totalCount: number | null
  current: DurCpctRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR용량주의기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurCpctState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurCpctSlice = createSlice({
  name: 'durCpct',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurCpctList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurCpctList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurCpctList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurCpct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurCpct.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurCpct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurCpct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurCpct.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurCpct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurCpct';
      })
      .addCase(updateDurCpct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurCpct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurCpct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurCpct';
      })
      .addCase(saveDurCpct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurCpct.fulfilled, (state, action) => {
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
      .addCase(saveDurCpct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurCpct';
      })
      .addCase(deleteDurCpct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurCpct.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurCpct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurCpct';
      })
  }
});

export const { clearCurrent } = DurCpctSlice.actions
export default DurCpctSlice.reducer
