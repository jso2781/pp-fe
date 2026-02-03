import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { getCmsApiPath } from '@/api/cms/CmsApiPaths'
import { mockCmsList, CmsPVO, CmsRVO } from './CmsTypes'


/**
 * 대국민포털_콘텐츠기본 정보 조회 
 */
export const getCms = createAsyncThunk<CmsRVO, CmsPVO, { rejectValue: string }>(
  '/cms/getCms',
  async (params: CmsPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(getCmsApiPath(), params);
      const payload = res.data?.data;

      // 서버가 CmsRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("CmsThunks getCms mockCmsList=", mockCmsList);

      // 'menuSn' 속성이 없으므로 'no'로 변경 (mock 데이터 구조에 맞춤)
      const result = mockCmsList.find((n) => n.contsSn === params.contsSn) || null;

      if (!result) {
        return rejectWithValue('CmsThunks getCms error!!');
      }

      return result;
    }
  }
)
