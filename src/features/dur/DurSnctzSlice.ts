import { createSlice } from '@reduxjs/toolkit'
import { selectDurSnctzList, getDurSnctz, insertDurSnctz, updateDurSnctz, saveDurSnctz, deleteDurSnctz } from './DurSnctzThunks'
import { mockDurSnctzList, DurSnctzPVO, DurSnctzRVO, DurSnctzListPVO, DurSnctzListRVO, DurSnctzDVO  } from './DurSnctzTypes'

/**
 * 대국민포털_DUR노인주의기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurSnctzState {
  list: DurSnctzRVO[]
  totalCount: number | null
  current: DurSnctzRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR노인주의기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurSnctzState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurSnctzSlice = createSlice({
  name: 'durSnctz',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurSnctzList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurSnctzList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurSnctzList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurSnctz.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurSnctz.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurSnctz.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurSnctz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurSnctz.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurSnctz.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurSnctz';
      })
      .addCase(updateDurSnctz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurSnctz.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurSnctz.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurSnctz';
      })
      .addCase(saveDurSnctz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurSnctz.fulfilled, (state, action) => {
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
      .addCase(saveDurSnctz.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurSnctz';
      })
      .addCase(deleteDurSnctz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurSnctz.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurSnctz.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurSnctz';
      })
  }
});

export const { clearCurrent } = DurSnctzSlice.actions
export default DurSnctzSlice.reducer
