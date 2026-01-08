import { createSlice } from '@reduxjs/toolkit'
import { selectDurEftgrpItemList, getDurEftgrpItem, insertDurEftgrpItem, updateDurEftgrpItem, saveDurEftgrpItem, deleteDurEftgrpItem } from './DurEftgrpItemThunks'
import { mockDurEftgrpItemList, DurEftgrpItemPVO, DurEftgrpItemRVO, DurEftgrpItemListPVO, DurEftgrpItemListRVO, DurEftgrpItemDVO  } from './DurEftgrpItemTypes'

/**
 * 대국민포털_DUR효능군중복품목기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurEftgrpItemState {
  list: DurEftgrpItemRVO[]
  totalCount: number | null
  current: DurEftgrpItemRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR효능군중복품목기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurEftgrpItemState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurEftgrpItemSlice = createSlice({
  name: 'durEftgrpItem',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurEftgrpItemList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurEftgrpItemList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurEftgrpItemList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurEftgrpItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurEftgrpItem.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurEftgrpItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurEftgrpItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurEftgrpItem.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurEftgrpItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurEftgrpItem';
      })
      .addCase(updateDurEftgrpItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurEftgrpItem.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurEftgrpItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurEftgrpItem';
      })
      .addCase(saveDurEftgrpItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurEftgrpItem.fulfilled, (state, action) => {
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
      .addCase(saveDurEftgrpItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurEftgrpItem';
      })
      .addCase(deleteDurEftgrpItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurEftgrpItem.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurEftgrpItem.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurEftgrpItem';
      })
  }
});

export const { clearCurrent } = DurEftgrpItemSlice.actions
export default DurEftgrpItemSlice.reducer
