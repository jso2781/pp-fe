import { createSlice } from '@reduxjs/toolkit'
import { selectDurSnctzMedList, getDurSnctzMed, insertDurSnctzMed, updateDurSnctzMed, saveDurSnctzMed, deleteDurSnctzMed } from './DurSnctzMedThunks'
import { mockDurSnctzMedList, DurSnctzMedPVO, DurSnctzMedRVO, DurSnctzMedListPVO, DurSnctzMedListRVO, DurSnctzMedDVO  } from './DurSnctzMedTypes'

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurSnctzMedState {
  list: DurSnctzMedRVO[]
  totalCount: number | null
  current: DurSnctzMedRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR노인주의해열진통소염제기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurSnctzMedState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurSnctzMedSlice = createSlice({
  name: 'durSnctzMed',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurSnctzMedList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurSnctzMedList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurSnctzMedList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurSnctzMed.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurSnctzMed.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurSnctzMed.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurSnctzMed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurSnctzMed.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurSnctzMed.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurSnctzMed';
      })
      .addCase(updateDurSnctzMed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurSnctzMed.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurSnctzMed.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurSnctzMed';
      })
      .addCase(saveDurSnctzMed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurSnctzMed.fulfilled, (state, action) => {
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
      .addCase(saveDurSnctzMed.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurSnctzMed';
      })
      .addCase(deleteDurSnctzMed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurSnctzMed.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurSnctzMed.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurSnctzMed';
      })
  }
});

export const { clearCurrent } = DurSnctzMedSlice.actions
export default DurSnctzMedSlice.reducer
