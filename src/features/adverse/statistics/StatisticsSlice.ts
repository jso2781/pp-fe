import { createSlice } from '@reduxjs/toolkit'
import { selectStatisticsList, selectStatisticsDetail } from './StatisticsThunks'
import type { StatisticsRVO } from './StatisticsTypes'

export interface StatisticsState {
  list: StatisticsRVO[]
  totalCount: number
  current: StatisticsRVO | null
  loading: boolean
  error: string | null
}

const initialState: StatisticsState = {
  list: [],
  totalCount: 0,
  current: null,
  loading: false,
  error: null,
}

const StatisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectStatisticsList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(selectStatisticsList.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.list
        state.totalCount = action.payload.totalCount
      })
      .addCase(selectStatisticsList.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || action.error?.message || '목록 조회 실패'
      })
      .addCase(selectStatisticsDetail.pending, (state) => {
        state.loading = true
        state.error = null
        state.current = null
      })
      .addCase(selectStatisticsDetail.fulfilled, (state, action) => {
        state.loading = false
        state.current = action.payload
      })
      .addCase(selectStatisticsDetail.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || action.error?.message || '상세 조회 실패'
      })
  },
})

export const { clearCurrent } = StatisticsSlice.actions
export default StatisticsSlice.reducer
