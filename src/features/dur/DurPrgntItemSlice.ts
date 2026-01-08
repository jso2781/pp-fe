import { createSlice } from '@reduxjs/toolkit'
import { selectDurPrgntItemList, getDurPrgntItem, insertDurPrgntItem, updateDurPrgntItem, saveDurPrgntItem, deleteDurPrgntItem } from './DurPrgntItemThunks'
import { mockDurPrgntItemList, DurPrgntItemPVO, DurPrgntItemRVO, DurPrgntItemListPVO, DurPrgntItemListRVO, DurPrgntItemDVO  } from './DurPrgntItemTypes'

/**
 * 대국민포털_DUR임부금기품목기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurPrgntItemState {
  list: DurPrgntItemRVO[]
  totalCount: number | null
  current: DurPrgntItemRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR임부금기품목기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurPrgntItemState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurPrgntItemSlice = createSlice({
  name: 'durPrgntItem',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurPrgntItemList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurPrgntItemList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurPrgntItemList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurPrgntItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurPrgntItem.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurPrgntItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurPrgntItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurPrgntItem.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurPrgntItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurPrgntItem';
      })
      .addCase(updateDurPrgntItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurPrgntItem.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurPrgntItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurPrgntItem';
      })
      .addCase(saveDurPrgntItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurPrgntItem.fulfilled, (state, action) => {
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
      .addCase(saveDurPrgntItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurPrgntItem';
      })
      .addCase(deleteDurPrgntItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurPrgntItem.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurPrgntItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurPrgntItem';
      })
  }
});

export const { clearCurrent } = DurPrgntItemSlice.actions
export default DurPrgntItemSlice.reducer
