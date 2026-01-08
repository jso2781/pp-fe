import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { getBoardListPath } from '@/api/boardApi'

export const fetchBoardList = createAsyncThunk<unknown, void>('board/fetchList', async () => {
  const res = await https.get(getBoardListPath())
  return res.data
})
