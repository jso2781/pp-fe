import { createSlice } from '@reduxjs/toolkit'
import { selectCmntList, getCmnt, insertCmnt, updateCmnt, saveCmnt, deleteCmnt } from './CmntThunks'
import { mockCmntList, CmntPVO, CmntRVO, CmntListPVO, CmntListRVO, CmntDVO  } from './CmntTypes'

/**
 * 대국민포털_댓글기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface CmntState {
  list: CmntRVO[]
  totalCount: number | null
  current: CmntRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_댓글기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: CmntState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const CmntSlice = createSlice({
  name: 'cmnt',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectCmntList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectCmntList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectCmntList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getCmnt.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getCmnt.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getCmnt.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertCmnt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertCmnt.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertCmnt.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert Cmnt';
      })
      .addCase(updateCmnt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCmnt.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateCmnt.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update Cmnt';
      })
      .addCase(saveCmnt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCmnt.fulfilled, (state, action) => {
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
      .addCase(saveCmnt.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save Cmnt';
      })
      .addCase(deleteCmnt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCmnt.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteCmnt.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete Cmnt';
      })
  }
});

export const { clearCurrent } = CmntSlice.actions
export default CmntSlice.reducer
