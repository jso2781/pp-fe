import https from '@/api/axiosInstance'
import { selectMainContentsPath } from '@/api/main/MainApiPaths'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { MainRVO } from './MainTypes'

/**
 * 대국민포털_메인화면 컨텐츠 조회 
 */
export const selectMainContents = createAsyncThunk<MainRVO, void, { rejectValue: string }>(
  '/api/main',
  async (_, { rejectWithValue }) => {
    try {
      const res = await https.post(selectMainContentsPath(), null);
      const payload = res.data?.data;
      return payload;
    }    
    catch (e) {
      console.log("MainThunks selectMainContents error!!");
      return rejectWithValue('MainThunks selectMainContents error!!');
    }    
  }
)