import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectMbrInfoListApiPath, getMbrInfoApiPath, insertMbrInfoApiPath, updateMbrInfoApiPath, saveMbrInfoApiPath, deleteMbrInfoApiPath, verifyPasswordApiPath, updateMbrInfoPwApiPath } from '@/api/mbr/MbrInfoApiPaths'
import { mockMbrInfoList, MbrInfoPVO, MbrInfoRVO, MbrInfoListPVO, MbrInfoListRVO, MbrInfoDVO, ExistMbrInfoPVO, ExistMbrInfoRVO, VerifyPasswordRVO, VerifyPasswordPVO, UpdateMbrInfoRVO } from './MbrInfoTypes'
import { existMbrInfoApiPath } from '@/api/mbr/MbrInfoApiPaths'


/**
 * 대국민포털_회원정보기본 기존 아이디, 패스워드 기준으로 데이터 존재 여부 조회
 */
export const verifyPassword = createAsyncThunk<VerifyPasswordRVO, VerifyPasswordPVO, { rejectValue: string }>(
  '/mbr/verifyPassword',
  async (params: VerifyPasswordPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(verifyPasswordApiPath(), params);
      const payload = res.data?.data;
      return {
        existYn: payload?.existYn
      } as VerifyPasswordRVO;
    }
    catch(e) {
      console.log("MbrInfoThunks verifyPassword error!!");
      return rejectWithValue('MbrInfoThunks verifyPassword error!!');
    }
  }
)

/**
 * 대국민포털_회원정보기본 존재여부 조회 
 */
export const existMbrInfo = createAsyncThunk<ExistMbrInfoRVO, ExistMbrInfoPVO | undefined, { rejectValue: string }>(
  '/mbr/existMbrInfo',
  async (params: ExistMbrInfoPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(existMbrInfoApiPath(), params);
      const payload = res.data?.data;
      return {
        existYn: payload?.existYn as string
      } as ExistMbrInfoRVO;
    }
    catch(e) {
      console.log("MbrInfoThunks existMbrInfo error!!");
      return rejectWithValue('MbrInfoThunks existMbrInfo error!!');
    }
  }
)

/**
 * 대국민포털_회원정보기본 정보 목록 조회 
 */
export const selectMbrInfoList = createAsyncThunk<MbrInfoListRVO, MbrInfoListPVO | undefined>(
  '/mbr/selectMbrInfoList',
  async (params: MbrInfoListPVO = {}) => {
    try {
      const res = await https.post(selectMbrInfoListApiPath(), params);

      // ✅ 여기서 “서버 응답”을 표준 형태로 맞춰서 return
      const payload = res.data;

      // 서버가 MbrInfo[] 형식으로 주므로 MbrInfoListRVO 형식으로 데이터 구조 재조정 
      return {
        list: Array.isArray(payload) ? payload : [],
        totalCount: Array.isArray(payload) ? payload.length : 0
      } as MbrInfoListRVO;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("MbrInfoThunks selectMbrInfoList mockMbrInfoList=",mockMbrInfoList);
      const filtered = mockMbrInfoList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const result: MbrInfoListRVO = { list: filtered as MbrInfoRVO[], totalCount: filtered.length }
      return result;
    }
  }
)

/**
 * 대국민포털_회원정보기본 정보 조회 
 */
export const getMbrInfo = createAsyncThunk<MbrInfoRVO, MbrInfoPVO, { rejectValue: string }>(
  '/mbr/getMbrInfo',
  async (params: MbrInfoPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(getMbrInfoApiPath(), params);

      const payload = res.data?.data as MbrInfoRVO;

      // 서버가 MbrInfoRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      // console.log("MbrInfoThunks getMbrInfo mockMbrInfoList=",mockMbrInfoList);
      // return (mockMbrInfoList).find((n) => 
      //   String(n.mbrNo) === String(params.mbrNo)
      // ) as MbrInfoRVO;
      return rejectWithValue('MbrInfoThunks getMbrInfo error!!');
    }
  }
)

/**
 * 대국민포털_회원정보기본 입력 
 */
export const insertMbrInfo = createAsyncThunk<number, MbrInfoPVO, { rejectValue: string }>(
  '/mbr/insertMbrInfo',
  async (params: MbrInfoPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(insertMbrInfoApiPath(), params);

      const insertCnt = (res.data?.data?.insertCnt as number) ?? -1;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("MbrInfoThunks insertMbrInfo");
      return rejectWithValue('MbrInfoThunks insertMbrInfo error!!');
    }
  }
)

/**
 * 대국민포털_회원정보기본 수정 
 */
export const updateMbrInfo = createAsyncThunk<UpdateMbrInfoRVO, MbrInfoPVO, { rejectValue: string }>(
  '/mbr/updateMbrInfo',
  async (params: MbrInfoPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(updateMbrInfoApiPath(), params);

      // 수정된 건수 반환함. 
      return res.data?.data as UpdateMbrInfoRVO
    }
    catch (e) {
      console.log("MbrInfoThunks updateMbrInfo error!!");
      return rejectWithValue('MbrInfoThunks updateMbrInfo error!!');
    }
  }
)

/**
 * 대국민포털_회원정보기본 저장 
 */
export const saveMbrInfo = createAsyncThunk<number, MbrInfoPVO>(
  '/mbr/saveMbrInfo',
  async (params: MbrInfoPVO) => {
    try {
      const res = await https.post(saveMbrInfoApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("MbrInfoThunks saveMbrInfo error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_회원정보기본 삭제 
 */
export const deleteMbrInfo = createAsyncThunk<number, MbrInfoDVO>(
  '/mbr/deleteMbrInfo',
  async (params: MbrInfoDVO) => {
    try {
      const res = await https.post(deleteMbrInfoApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("MbrInfoThunks deleteMbrInfo error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_회원정보기본 CI값 기준으로 PW 수정
 */
export const updateMbrInfoPw = createAsyncThunk<VerifyPasswordRVO, MbrInfoPVO, { rejectValue: string }>(
  '/mbr/updateMbrInfoPw',
  async (params: MbrInfoPVO, { rejectWithValue }) => {
    try {
      const res = await https.post(updateMbrInfoPwApiPath(), params);
      const payload = res.data?.data;
      return {
        existYn: payload?.existYn
      } as VerifyPasswordRVO;
    }
    catch(e) {
      console.error("MbrInfoThunks updateMbrInfoPw error!!");
      return rejectWithValue('MbrInfoThunks updateMbrInfoPw error!!');
    }
  }
)
