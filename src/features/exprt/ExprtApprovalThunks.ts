import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectExprtApprovalListApiPath, selectExprtApprovalApiPath, selectTaskAuthListApiPath, updateExprtApprovalApiPath, withdrawExprtApprovalApiPath } from '@/api/exprt/ExprtApprovalApiPaths'
import { ExprtApprovalPVO, ExprtApprovalRVO, ExprtApprovalDetailRVO, ExprtApprovalListRVO, ExprtTaskAuthRVO, ExprtApprovalUVO } from './ExprtApprovalTypes'

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
export const selectExprtApproval = createAsyncThunk<ExprtApprovalDetailRVO, ExprtApprovalPVO | undefined, { rejectValue: string }>(
  '/exprt/approval/get',
  async (params: ExprtApprovalPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectExprtApprovalApiPath(), params);
      const payload = res.data?.data;

      return {
        detail: payload && payload.detail ? payload.detail : {} as ExprtApprovalRVO,
        authList: payload && Array.isArray(payload.authList) ? payload.authList : []
      } as ExprtApprovalDetailRVO;
    }
    catch (e) {
      console.error("ExprtApprovalThunks selectExprtApproval error!!", e);
      return rejectWithValue('ExprtApprovalThunks selectExprtApproval error!!');
    }
  }
)

/**
 * 대국민포털_전문가업무신청관리 업무시스템 권한 목록 조회
 */
export const selectTaskAuthList = createAsyncThunk<ExprtTaskAuthRVO[], ExprtApprovalPVO | undefined, { rejectValue: string }>(
  '/exprt/approval/auth/list',
  async (params: ExprtApprovalPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectTaskAuthListApiPath(), params);
      const payload = res.data?.data?.authListAll;
      return payload;
    }
    catch (e) {
      console.error("ExprtApprovalThunks selectTaskAuthList error!!", e);
      return rejectWithValue('ExprtApprovalThunks selectTaskAuthList error!!');
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

/**
 * 대국민포털_전문가업무신청관리 소속 전문가 회원 탈퇴 처리
 */
export const withdrawExprtApproval = createAsyncThunk<string, ExprtApprovalUVO | undefined, { rejectValue: string }>(
  '/exprt/approval/withdraw',
  async (params: ExprtApprovalUVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(withdrawExprtApprovalApiPath(), params);
      const payload = res.data?.data?.result;
      return payload;
    }
    catch (e) {
      console.error("ExprtApprovalThunks withdrawExprtApproval error!!", e);
      return rejectWithValue('ExprtApprovalThunks withdrawExprtApproval error!!');
    }
  }
)