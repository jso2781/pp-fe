import { createAsyncThunk } from '@reduxjs/toolkit';
import https from '@/api/axiosInstance';
import { insertOpnnApiPath } from '@/api/opnn/OpnnApiPaths';

/**
 * 대국민포털_의견제안 입력 
 */
export const insertOpnn = createAsyncThunk<void, FormData, { rejectValue: string }>(
  '/opnn/insertOpnn',
  async (params: FormData, { rejectWithValue }) => {
    try {
      const res = await https.post(insertOpnnApiPath(), params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return;
    }
    catch (e) {
      console.error('!!! opnnThunks > getTrmsSttLatest 에러.');
      console.error(e);
      return rejectWithValue('NETWORK_OR_SERVER_ERROR');
    }
  }
)
