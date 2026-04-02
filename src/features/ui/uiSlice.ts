import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UiAlert = { type: 'info' | 'error' | 'success'; message: string }

export interface UiState {
  globalLoading: boolean
  lastViewedMenuSn: number | null
  alert: UiAlert | null
  internalServerError: boolean
}

const initialState: UiState = {
  globalLoading: false,
  lastViewedMenuSn: null,
  alert: null,
  internalServerError: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLastViewedMenuSn(state, action: PayloadAction<number | null>) {
      state.lastViewedMenuSn = action.payload
    },
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = Boolean(action.payload)
    },
    showAlert(state, action: PayloadAction<UiAlert>) {
      state.alert = action.payload
    },
    clearAlert(state) {
      state.alert = null
    },
    setInternalServerError(state, action) {
      state.internalServerError = action.payload
    }
  }
})

export const { setLastViewedMenuSn, setGlobalLoading, showAlert, clearAlert, setInternalServerError } = uiSlice.actions
export default uiSlice.reducer
