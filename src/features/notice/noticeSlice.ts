import { createSlice } from '@reduxjs/toolkit'
import { fetchNoticeDetail, fetchNoticeList } from './noticeThunks'
import { Notice } from './noticeTypes'

export interface NoticeState {
  list: Notice[]
  totalCount: number | null
  current: Notice | null
  loading: boolean
  error: string | null
}

const initialState: NoticeState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null
}

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNoticeList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNoticeList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
        /*
        const payload = action.payload as any

        // payload 형태 대응: (1) 배열, (2) { list, totalCount }
        if (Array.isArray(payload)) {
          state.list = payload
          state.totalCount = payload.length
          return
        }

        const list = Array.isArray(payload?.list) ? payload.list : []
        state.list = list
        state.totalCount =
          typeof payload?.totalCount === 'number'
            ? payload.totalCount
            : typeof payload?.totCnt === 'number'
              ? payload.totCnt
              : list.length
        */
      })
      .addCase(fetchNoticeList.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to load notice list'
      })
      .addCase(fetchNoticeDetail.pending, (state) => {
        state.loading = true
        state.error = null
        state.current = null
      })
      .addCase(fetchNoticeDetail.fulfilled, (state, action) => {
        state.loading = false
        state.current = action.payload || null
      })
      .addCase(fetchNoticeDetail.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice detail'
      })
  }
})

export const { clearCurrent } = noticeSlice.actions
export default noticeSlice.reducer
