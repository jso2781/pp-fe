import { createSlice } from '@reduxjs/toolkit'
import { selectMbrInfoList, getMbrInfo, insertMbrInfo, updateMbrInfo, saveMbrInfo, deleteMbrInfo } from './MbrInfoThunks'
import { mockMbrInfoList, MbrInfoPVO, MbrInfoRVO, MbrInfoListPVO, MbrInfoListRVO, MbrInfoDVO  } from './MbrInfoTypes'

/**
 * 대국민포털_회원정보기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface MbrInfoState {
  list: MbrInfoRVO[]
  totalCount: number | null
  current: MbrInfoRVO | null
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_회원정보기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: MbrInfoState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const MbrInfoSlice = createSlice({
  name: 'mbrInfo',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectMbrInfoList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectMbrInfoList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(selectMbrInfoList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';
      })
      .addCase(getMbrInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getMbrInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getMbrInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertMbrInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertMbrInfo.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertMbrInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert MbrInfo';
      })
      .addCase(updateMbrInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMbrInfo.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateMbrInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update MbrInfo';
      })
      .addCase(saveMbrInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveMbrInfo.fulfilled, (state, action) => {
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
      .addCase(saveMbrInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save MbrInfo';
      })
      .addCase(deleteMbrInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMbrInfo.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteMbrInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete MbrInfo';
      })
  }
});

export const { clearCurrent } = MbrInfoSlice.actions
export default MbrInfoSlice.reducer
