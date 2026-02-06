import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectExprtInfoApiPath, withdrawExprtApiPath, withdrawExprtTaskApiPath, applyExprtTaskApiPath } from '@/api/exprt/ExprtTaskApiPaths'
import { ExprtTaskPVO, ExprtTaskFullVO } from './ExprtTaskTypes'

/**
 * 대국민포털_전문가내업무관리 내 업무 조회
 */
export const selectExprtInfo = createAsyncThunk<ExprtTaskFullVO, ExprtTaskPVO | undefined, { rejectValue: string }>(
  '/exprt/task/info',
  async (params: ExprtTaskPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectExprtInfoApiPath(), params);
      const payload = res.data?.data;
      return payload;
    }
    catch (e) {
      console.error("ExprtTaskThunks selectExprtInfo error!!", e);
      return rejectWithValue('ExprtTaskThunks selectExprtInfo error!!');
    }
  }
)

/**
 * 대국민포털_전문가내업무관리 전문가 회원 전환 신청 취소
 */
export const withdrawExprt = createAsyncThunk<string, ExprtTaskPVO | undefined, { rejectValue: string }>(
  '/exprt/task/apply/withdraw',
  async (params: ExprtTaskPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(withdrawExprtApiPath(), params);
      const payload = res.data?.data?.result;
      return payload;
    }
    catch (e) {
      console.error("ExprtTaskThunks withdrawExprt error!!", e);
      return rejectWithValue('ExprtTaskThunks withdrawExprt error!!');
    }
  }
)

/**
 * 대국민포털_전문가내업무관리 전문가 회원 업무 신청 취소
 */
export const withdrawExprtTask = createAsyncThunk<string, ExprtTaskPVO | undefined, { rejectValue: string }>(
  '/exprt/task/withdraw',
  async (params: ExprtTaskPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(withdrawExprtTaskApiPath(), params);
      const payload = res.data?.data?.result;
      return payload;
    }
    catch (e) {
      console.error("ExprtTaskThunks withdrawExprtTask error!!", e);
      return rejectWithValue('ExprtTaskThunks withdrawExprtTask error!!');
    }
  }
)

/**
 * 대국민포털_전문가내업무관리 전문가 회원 업무 신청
 */
export const applyExprtTask = createAsyncThunk<string, ExprtTaskPVO | undefined, { rejectValue: string }>(
  '/exprt/task/apply',
  async (params: ExprtTaskPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(applyExprtTaskApiPath(), params);
      const payload = res.data?.data?.result;
      return payload;
    }
    catch (e) {
      console.error("ExprtTaskThunks applyExprtTask error!!", e);
      return rejectWithValue('ExprtTaskThunks applyExprtTask error!!');
    }
  }
)