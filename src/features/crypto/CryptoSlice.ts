import { createSlice } from '@reduxjs/toolkit'
import { decrypto } from './CryptoThunks'
import type { CryptoEncryptoRVO } from './CryptoTypes'

export interface CryptoState {
  /** 마지막 `decrypto` 성공 결과(복호화된 필드) */
  decryptoResult: CryptoEncryptoRVO | null
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  decryptoResult: null,
  loading: false,
  error: null
}

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    clearDecryptoResult: (state) => {
      state.decryptoResult = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(decrypto.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(decrypto.fulfilled, (state, action) => {
        state.loading = false
        state.decryptoResult = action.payload
      })
      .addCase(decrypto.rejected, (state, action) => {
        state.loading = false
        state.error =
          (action.payload as string) || action.error?.message || 'decrypto failed'
      })
  }
})

export const { clearDecryptoResult } = cryptoSlice.actions
export default cryptoSlice.reducer
