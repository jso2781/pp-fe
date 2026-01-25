import { createSlice } from '@reduxjs/toolkit'
import { selectConcBannList, getConcBann, insertConcBann, updateConcBann, saveConcBann, deleteConcBann } from './DurConcBannThunks'
import { mockConcBannList, ConcBannPVO, ConcBannRVO, ConcBannListPVO, ConcBannListRVO, ConcBannDVO  } from './DurConcBannTypes'

/**
 * 대국민포털_DUR병용금기기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface ConcBannState {
  list: ConcBannRVO[]
  totalCount: number | null
  current: ConcBannRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR병용금기기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: ConcBannState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const ConcBannSlice = createSlice({
  name: 'concBann',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectConcBannList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectConcBannList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectConcBannList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getConcBann.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getConcBann.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getConcBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertConcBann.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertConcBann.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertConcBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert ConcBann';
      })
      .addCase(updateConcBann.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConcBann.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateConcBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update ConcBann';
      })
      .addCase(saveConcBann.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveConcBann.fulfilled, (state, action) => {
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
      .addCase(saveConcBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save ConcBann';
      })
      .addCase(deleteConcBann.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConcBann.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteConcBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete ConcBann';
      })
  }
});

export const { clearCurrent } = ConcBannSlice.actions
export default ConcBannSlice.reducer
