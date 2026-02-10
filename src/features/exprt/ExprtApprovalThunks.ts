import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectExprtApprovalListApiPath, selectExprtApprovalApiPath, updateExprtApprovalApiPath } from '@/api/exprt/ExprtApprovalApiPaths'
import { ExprtApprovalPVO, ExprtApprovalRVO, ExprtApprovalListRVO, ExprtApprovalUVO } from './ExprtApprovalTypes'

/**
 * 대국민포털_전문가업무신청관리 소속 전문가 회원 목록 조회
 */
export const selectExprtApprovalList = createAsyncThunk<ExprtApprovalListRVO, ExprtApprovalPVO | undefined, { rejectValue: string }>(
  '/exprt/approval/list',
  async (params: ExprtApprovalPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectExprtApprovalListApiPath(), params);
      const payload = res.data?.data;

      return {
        list: payload && Array.isArray(payload.list) ? payload.list : [],
        totalCount: payload.totalCount ?? 0,
        totalPages: payload.totalPages ?? 0,
      } as ExprtApprovalListRVO;
    }
    catch (e) {
      console.error("ExprtApprovalThunks selectExprtApprovalList error!!", e);
      return rejectWithValue('ExprtApprovalThunks selectExprtApprovalList error!!');
    }    
  }
)

/**
 * 대국민포털_전문가업무신청관리 소속 전문가 회원 상세 조회
 */
export const selectExprtApproval = createAsyncThunk<ExprtApprovalRVO, ExprtApprovalPVO | undefined, { rejectValue: string }>(
  '/exprt/approval/get',
  async (params: ExprtApprovalPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectExprtApprovalApiPath(), params);
      const payload = res.data?.data?.detail;
      return payload;
    }
    catch (e) {
      console.error("ExprtApprovalThunks selectExprtApproval error!!", e);
      return rejectWithValue('ExprtApprovalThunks selectExprtApproval error!!');
    }
  }
)

/**
 * 대국민포털_전문가업무신청관리 소속 전문가 회원 승인 상태 업데이트
 */
export const updateExprtApproval = createAsyncThunk<string, ExprtApprovalUVO | undefined, { rejectValue: string }>(
  '/exprt/approval/update',
  async (params: ExprtApprovalUVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(updateExprtApprovalApiPath(), params);
      const payload = res.data?.data?.result;
      return payload;
    }
    catch (e) {
      console.error("ExprtApprovalThunks updateExprtApproval error!!", e);
      return rejectWithValue('ExprtApprovalThunks updateExprtApproval error!!');
    }
  }
)
