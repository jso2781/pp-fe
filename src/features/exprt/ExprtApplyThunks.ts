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

/**
 * 대국민포털_전문가회원전환신청관리 이메일 중복체크 
 */
export const existbyEmail = createAsyncThunk<boolean, ExprtApplyPVO | undefined, { rejectValue: string }>(
  '/exprt/apply/existbyemail',
  async (params: ExprtApplyPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(existbyEmailApiPath(), params);
      const payload = res.data?.data?.isExists;
      return payload;
    }
    catch (e) {
      console.log("ExprtInfoThunks existbyEmail error!!");
      return rejectWithValue('ExprtInfoThunks existbyEmail error!!');
    }
  }
)

/**
 * 대국민포털_전문가회원전환신청관리 전환 신청
 */
export const expertApply = createAsyncThunk<string, FormData, { rejectValue: string }>(
  '/exprt/apply',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await https.post(expertApplyApiPath(), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const payload = res.data?.data?.result;
      return payload;
    }
    catch (e) {
      console.log("ExprtApplyThunks expertApply error!!", e);
      return rejectWithValue('전문가 회원 전환 신청에 실패했습니다.');
    }
  }
)