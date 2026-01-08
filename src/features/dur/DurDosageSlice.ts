import { createSlice } from '@reduxjs/toolkit'
import { selectDurDosageList, getDurDosage, insertDurDosage, updateDurDosage, saveDurDosage, deleteDurDosage } from './DurDosageThunks'
import { mockDurDosageList, DurDosagePVO, DurDosageRVO, DurDosageListPVO, DurDosageListRVO, DurDosageDVO  } from './DurDosageTypes'

/**
 * 대국민포털_DUR투여기간주의기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurDosageState {
  list: DurDosageRVO[]
  totalCount: number | null
  current: DurDosageRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR투여기간주의기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurDosageState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurDosageSlice = createSlice({
  name: 'durDosage',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurDosageList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurDosageList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurDosageList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurDosage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurDosage.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurDosage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurDosage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurDosage.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurDosage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurDosage';
      })
      .addCase(updateDurDosage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurDosage.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurDosage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurDosage';
      })
      .addCase(saveDurDosage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurDosage.fulfilled, (state, action) => {
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
      .addCase(saveDurDosage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurDosage';
      })
      .addCase(deleteDurDosage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurDosage.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurDosage.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurDosage';
      })
  }
});

export const { clearCurrent } = DurDosageSlice.actions
export default DurDosageSlice.reducer
