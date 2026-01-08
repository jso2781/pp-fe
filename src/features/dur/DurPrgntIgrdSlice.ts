import { createSlice } from '@reduxjs/toolkit'
import { selectDurPrgntIgrdList, getDurPrgntIgrd, insertDurPrgntIgrd, updateDurPrgntIgrd, saveDurPrgntIgrd, deleteDurPrgntIgrd } from './DurPrgntIgrdThunks'
import { mockDurPrgntIgrdList, DurPrgntIgrdPVO, DurPrgntIgrdRVO, DurPrgntIgrdListPVO, DurPrgntIgrdListRVO, DurPrgntIgrdDVO  } from './DurPrgntIgrdTypes'

/**
 * 대국민포털_DUR임부금기성분기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurPrgntIgrdState {
  list: DurPrgntIgrdRVO[]
  totalCount: number | null
  current: DurPrgntIgrdRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR임부금기성분기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurPrgntIgrdState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurPrgntIgrdSlice = createSlice({
  name: 'durPrgntIgrd',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurPrgntIgrdList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurPrgntIgrdList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurPrgntIgrdList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurPrgntIgrd.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurPrgntIgrd.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurPrgntIgrd.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurPrgntIgrd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurPrgntIgrd.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurPrgntIgrd.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurPrgntIgrd';
      })
      .addCase(updateDurPrgntIgrd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurPrgntIgrd.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurPrgntIgrd.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurPrgntIgrd';
      })
      .addCase(saveDurPrgntIgrd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurPrgntIgrd.fulfilled, (state, action) => {
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
      .addCase(saveDurPrgntIgrd.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurPrgntIgrd';
      })
      .addCase(deleteDurPrgntIgrd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurPrgntIgrd.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurPrgntIgrd.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurPrgntIgrd';
      })
  }
});

export const { clearCurrent } = DurPrgntIgrdSlice.actions
export default DurPrgntIgrdSlice.reducer
