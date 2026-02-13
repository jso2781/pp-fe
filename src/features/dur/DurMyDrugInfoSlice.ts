import { createSlice } from '@reduxjs/toolkit'
import { selectDurMyDrugInfoList } from './DurMyDrugInfoThunks'
import { DurMyDrugInfoRVO } from './DurMyDrugInfoTypes'

export interface DurMyDrugInfoState {
  list: DurMyDrugInfoRVO[]
  totalCount: number | null
  totalPages: number | null
  current: DurMyDrugInfoRVO | null
  loading: boolean
  error: string | null
}

const initialState: DurMyDrugInfoState = {
  list: [],
  totalCount: null,
  totalPages: null,
  current: null,
  loading: false,
  error: null,
}

const DurMyDrugInfoSlice = createSlice({
  name: 'durMyDrugInfo',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null
    },
    resetResults: (state) => {
      state.list = []
      state.totalCount = null
      state.totalPages = null
      state.current = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurMyDrugInfoList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(selectDurMyDrugInfoList.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.list
        state.totalCount = action.payload.totalCount
        state.totalPages = action.payload.totalPages
      })
      .addCase(selectDurMyDrugInfoList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error?.message || 'Failed to load dur my drug info list'
      })
  },
})

export const { clearCurrent, resetResults } = DurMyDrugInfoSlice.actions
export default DurMyDrugInfoSlice.reducer
