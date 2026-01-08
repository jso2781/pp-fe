import { createSlice } from '@reduxjs/toolkit'
import { selectBbsList, getBbs, insertBbs, updateBbs, saveBbs, deleteBbs } from './BbsThunks'
import { mockBbsList, BbsPVO, BbsRVO, BbsListPVO, BbsListRVO, BbsDVO  } from './BbsTypes'

/**
 * 대국민포털_게시판기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface BbsState {
  list: BbsRVO[]
  totalCount: number | null
  current: BbsRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_게시판기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: BbsState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const BbsSlice = createSlice({
  name: 'bbs',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectBbsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectBbsList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectBbsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getBbs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getBbs.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getBbs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertBbs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertBbs.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertBbs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert Bbs';
      })
      .addCase(updateBbs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBbs.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateBbs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update Bbs';
      })
      .addCase(saveBbs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBbs.fulfilled, (state, action) => {
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
      .addCase(saveBbs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save Bbs';
      })
      .addCase(deleteBbs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBbs.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteBbs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete Bbs';
      })
  }
});

export const { clearCurrent } = BbsSlice.actions
export default BbsSlice.reducer
