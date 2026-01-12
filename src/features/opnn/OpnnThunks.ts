import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectOpnnListApiPath, getOpnnApiPath, insertOpnnApiPath, updateOpnnApiPath, saveOpnnApiPath, deleteOpnnApiPath } from '@/api/opnn/OpnnApiPaths'
import { mockOpnnList, OpnnPVO, OpnnRVO, OpnnListPVO, OpnnListRVO, OpnnDVO  } from './OpnnTypes'

/**
 * 대국민포털_의견제안 입력 
 */
export const insertOpnn = createAsyncThunk<number, OpnnPVO>(
  '/opnn/insertOpnn',
  async (params: OpnnPVO) => {
    try {
      const res = await https.post(insertOpnnApiPath(), params);

      const code = res.data?.code;
      //code값에 따라서 에러처리
      return code;
    }
    catch (e) {
      console.log("OpnnThunks insertOpnn");
      return -1;
    }
  }
)
