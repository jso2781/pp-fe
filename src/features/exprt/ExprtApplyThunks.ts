import https from '@/api/axiosInstance'
import { existbyEmailApiPath, existsInstByBrnoApiPath, expertApplyApiPath } from '@/api/exprt/ExprtApplyApiPaths'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ExprtApplyPVO, ExprtApplyRVO } from './ExprtApplyTypes'

/**
 * 대국민포털_전문가회원전환신청관리 사업자등록번호 검증 
 */
export const existsInstByBrno = createAsyncThunk<ExprtApplyRVO, ExprtApplyPVO | undefined, { rejectValue: string }>(
  '/exprt/apply/existbybrno',
  async (params: ExprtApplyPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(existsInstByBrnoApiPath(), params);
      const payload = res.data?.data;
      return payload;
    }
    catch (e) {
      console.log("ExprtInfoThunks getExprtInfo error!!");
      return rejectWithValue('ExprtInfoThunks getExprtInfo error!!');
    }
  }
)

// /**
//  * 대국민포털_전문가회원전환신청관리 이메일 중복체크 
//  */
// export const existbyEmail = createAsyncThunk<ExprtInfoRVO, ExprtInfoPVO | undefined>(
//   '/exprt/getExprtInfo',
//   async (params: ExprtInfoPVO = {}) => {
//     try {
//       const res = await https.post(existbyEmailApiPath(), params);

//       const payload = res.data;

//       return payload;
//     }
//     catch (e) {
//       console.log("ExprtInfoThunks getExprtInfo mockExprtInfoList=",mockExprtInfoList);
//       return (mockExprtInfoList).find((n) => 
//         String(n.mbrNo) === String(params.mbrNo)
//       ) || null;
//     }
//   }
// )

// /**
//  * 대국민포털_전문가회원전환신청관리 전환 신청
//  */
// export const expertApply = createAsyncThunk<number, ExprtInfoPVO>(
//   '/exprt/saveExprtInfo',
//   async (params: ExprtInfoPVO) => {
//     try {
//       const res = await https.post(expertApplyApiPath(), params);

//       const saveCnt = res.data;

//       return saveCnt;
//     }
//     catch (e) {
//       console.log("ExprtInfoThunks saveExprtInfo error!!");
//       return -1;
//     }
//   }
// )
