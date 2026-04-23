import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { getTransctionIdApiPath } from '@/api/auth/NiceApiPaths'
import { mockGetTransctionId, GetTransctionIdPVO, GetTransctionIdRVO } from './NiceTypes'

/**
 * 나이스 본인인증(PASS) 기본설정 조회
 */
export const getTransctionId = createAsyncThunk<GetTransctionIdRVO, GetTransctionIdPVO | undefined, { rejectValue: string }>(
  '/niceid/getTransctionId',
  async (params: GetTransctionIdPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(getTransctionIdApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data?.data;

      // 서버가 DurSearchRoomRVO[] 형식으로 주므로 DurSearchRoomListRVO 형식으로 데이터 구조 재조정 
      return {
        requestNo: payload.requestNo ?? '',
        transactionId: payload.transactionId ?? '',
        returnCode: payload.returnCode ?? '',
        uthUrl: payload.uthUrl ?? '',
      } as GetTransctionIdRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      console.log("NiceThunks getTransctionId error!!");
      return rejectWithValue('NiceThunks getTransctionId error!!');
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      /*
      console.log("NiceThunks getTransctionId mockGetTransctionId=",mockGetTransctionId);
      return mockGetTransctionId;
      */
    }
  }
)