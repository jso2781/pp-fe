import { createSlice } from '@reduxjs/toolkit'
import { selectDurMyDrugInfoList, selectDurMyDrugSearchList } from './DurMyDrugInfoThunks'
import { DurMyDrugInfoRVO, DurMyDrugSearchRVO } from './DurMyDrugInfoTypes'

export interface DurMyDrugInfoState {
  searchList: DurMyDrugSearchRVO[]
  list: DurMyDrugInfoRVO[]
  totalCount: number | null
  totalPages: number | null
  current: DurMyDrugInfoRVO | null
  searchLoading: boolean
  resultLoading: boolean
  error: string | null
}

const initialState: DurMyDrugInfoState = {
  searchList: [],
  list: [],
  totalCount: null,
  totalPages: null,
  current: null,
  searchLoading: false,
  resultLoading: false,
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
      state.searchList = []
      state.list = []
      state.totalCount = null
      state.totalPages = null
      state.current = null
      state.error = null
      state.searchLoading = false
      state.resultLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectDurMyDrugSearchList.pending, (state) => {
        state.searchLoading = true
        state.error = null
      })
      .addCase(selectDurMyDrugSearchList.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchList = action.payload.list
      })
      .addCase(selectDurMyDrugSearchList.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.payload || action.error?.message || 'Failed to load dur my drug search list'
      })
      .addCase(selectDurMyDrugInfoList.pending, (state) => {
        state.resultLoading = true
        state.error = null
      })
      .addCase(selectDurMyDrugInfoList.fulfilled, (state, action) => {
        state.resultLoading = false
        state.list = action.payload.list
        state.totalCount = action.payload.totalCount
        state.totalPages = action.payload.totalPages
      })
      .addCase(selectDurMyDrugInfoList.rejected, (state, action) => {
        state.resultLoading = false
        state.error = action.payload || action.error?.message || 'Failed to load dur my drug info list'
      })
  },
})

export const { clearCurrent, resetResults } = DurMyDrugInfoSlice.actions
export default DurMyDrugInfoSlice.reducer
