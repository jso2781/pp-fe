import { createSlice } from '@reduxjs/toolkit'
import { selectFaqList, getFaq, insertFaq, updateFaq, saveFaq, deleteFaq } from './FaqThunks'
import { mockFaqList, FaqPVO, FaqRVO, FaqListPVO, FaqListRVO, FaqDVO  } from './FaqTypes'

/**
 * 대국민포털_FAQ기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface FaqState {
  list: FaqRVO[]
  totalCount: number | null
  current: FaqRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_FAQ기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: FaqState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const FaqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectFaqList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectFaqList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectFaqList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getFaq.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertFaq.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert Faq';
      })
      .addCase(updateFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update Faq';
      })
      .addCase(saveFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveFaq.fulfilled, (state, action) => {
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
      .addCase(saveFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save Faq';
      })
      .addCase(deleteFaq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete Faq';
      })
  }
});

export const { clearCurrent } = FaqSlice.actions
export default FaqSlice.reducer
