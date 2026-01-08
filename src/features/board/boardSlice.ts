import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchBoardList } from './boardThunks'

export type BoardRow = Record<string, unknown>

export interface BoardState {
  list: BoardRow[]
  loading: boolean
  error: string | null
  editor: {
    title: string
    content: string
  }
}

const initialState: BoardState = {
  list: [],
  loading: false,
  error: null,
  editor: {
    title: '',
    content: ''
  }
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.editor.title = action.payload
    },
    setContent(state, action: PayloadAction<string>) {
      state.editor.content = action.payload
    },
    clearEditor(state) {
      state.editor.title = ''
      state.editor.content = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardList.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBoardList.fulfilled, (state, action) => {
        state.loading = false
        state.list = Array.isArray(action.payload) ? (action.payload as BoardRow[]) : []
      })
      .addCase(fetchBoardList.rejected, (state, action) => {
        state.loading = false
        state.error = action.error?.message || 'Failed to load board list'
      })
  }
})

export const { setTitle, setContent, clearEditor } = boardSlice.actions
export default boardSlice.reducer
