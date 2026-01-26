import { createSlice } from '@reduxjs/toolkit'
import { selectMbrInfoList, getMbrInfo, insertMbrInfo, updateMbrInfo, saveMbrInfo, deleteMbrInfo, existMbrInfo, verifyPassword, findMbrInfoId, updateMbrInfoPw } from './MbrInfoThunks'
import { mockMbrInfoList, MbrInfoPVO, MbrInfoRVO, MbrInfoListPVO, MbrInfoListRVO, MbrInfoDVO  } from './MbrInfoTypes'

/**
 * 대국민포털_회원정보기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface MbrInfoState {
  list: MbrInfoRVO[]
  totalCount: number | null
  existYn: string | null
  insertCnt: number | null
  updateCnt: number | null
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
  existYn: null,
  insertCnt: null,
  updateCnt: null,
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
      .addCase(verifyPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.existYn = action.payload.existYn as string | null;
      })
      .addCase(verifyPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to verify Password';
      })
      .addCase(existMbrInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(existMbrInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.existYn = action.payload.existYn as string | null;
      })
      .addCase(existMbrInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to exist MbrInfo';
      })
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
        state.error = (action.payload as string) || 'Failed to load notice list';
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
        state.insertCnt = action.payload;
      })
      .addCase(insertMbrInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to insert MbrInfo';
      })
      .addCase(updateMbrInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMbrInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.updateCnt = action.payload.updateCnt;
        state.current = action.payload.userInfo || null;
      })
      .addCase(updateMbrInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to update MbrInfo';
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
      .addCase(findMbrInfoId.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findMbrInfoId.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(findMbrInfoId.rejected, (state, action) => {
        state.loading = false;
        state.error = '에러처리'//TODOjiwoong
      })
      .addCase(updateMbrInfoPw.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMbrInfoPw.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateMbrInfoPw.rejected, (state, action) => {
        state.loading = false;
        state.error = '에러처리'//TODOjiwoong
      })
  }
});

export const { clearCurrent } = MbrInfoSlice.actions
export default MbrInfoSlice.reducer
