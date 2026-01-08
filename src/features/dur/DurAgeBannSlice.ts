import { createSlice } from '@reduxjs/toolkit'
import { selectDurAgeBannList, getDurAgeBann, insertDurAgeBann, updateDurAgeBann, saveDurAgeBann, deleteDurAgeBann } from './DurAgeBannThunks'
import { mockDurAgeBannList, DurAgeBannPVO, DurAgeBannRVO, DurAgeBannListPVO, DurAgeBannListRVO, DurAgeBannDVO  } from './DurAgeBannTypes'

/**
 * 대국민포털_DUR연령금기기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface DurAgeBannState {
  list: DurAgeBannRVO[]
  totalCount: number | null
  current: DurAgeBannRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_DUR연령금기기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: DurAgeBannState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const DurAgeBannSlice = createSlice({
  name: 'durAgeBann',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurAgeBannList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectDurAgeBannList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectDurAgeBannList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getDurAgeBann.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getDurAgeBann.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getDurAgeBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertDurAgeBann.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertDurAgeBann.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertDurAgeBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert DurAgeBann';
      })
      .addCase(updateDurAgeBann.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDurAgeBann.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateDurAgeBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update DurAgeBann';
      })
      .addCase(saveDurAgeBann.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDurAgeBann.fulfilled, (state, action) => {
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
      .addCase(saveDurAgeBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save DurAgeBann';
      })
      .addCase(deleteDurAgeBann.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDurAgeBann.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteDurAgeBann.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete DurAgeBann';
      })
  }
});

export const { clearCurrent } = DurAgeBannSlice.actions
export default DurAgeBannSlice.reducer
