import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { insertWorkAccessLogApiPath } from '@/api/log/AccessLogApiPaths'
import { AccessLogPVO } from './AccessLogTypes'

/**
 * 대국민포털_업무별 접속이력 적재
 */
export const insertWorkAccessLog = createAsyncThunk<string, AccessLogPVO | undefined, { rejectValue: string }>(
  '/workAccessLog/insert',
  async (params: AccessLogPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(insertWorkAccessLogApiPath(), params);
      const payload = res.data?.data?.menuUtztnSn; // 채번된 메뉴이용일련번호
      return payload;
    }
    catch (e) {
      console.error("AccessLogThunks insertWorkAccessLog error!!", e);
      return rejectWithValue('AccessLogThunks insertWorkAccessLog error!!');
    }
  }
)