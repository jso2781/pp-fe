import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import {
  selectAsmtPrpListApiPath,
  getAsmtPrpDetailApiPath,
  insertAsmtPrpApiPath,
  updateAsmtPrpApiPath,
  deleteAsmtPrpApiPath,
  getAsmtPrpAnswerApiPath,
  increaseAsmtPrpViewCountApiPath,
} from '@/api/cdm/asmtprp/AsmtprpCdmApiPaths'
import { AsmtPrpItem, FetchAsmtPrpListParams, FetchAsmtPrpListResponse } from './AsmtprpCdmTypes'

/**
 * 과제제안 목록 조회
 */
export const selectAsmtPrpList = createAsyncThunk<FetchAsmtPrpListResponse, FetchAsmtPrpListParams | undefined, { rejectValue: string }>(
  '/community/asmtprp/selectList',
  async (params: FetchAsmtPrpListParams = { page: 1, pageSize: '10', searchType: '', searchKeyword: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(selectAsmtPrpListApiPath(), { params });
      return {
        list: res.data?.data || [],
        totalCount: res.data?.total || 0,
      } as FetchAsmtPrpListResponse;
    } catch (e) {
      console.error('AsmtprpCdmThunks selectAsmtPrpList error!!', e);
      return rejectWithValue('AsmtprpCdmThunks selectAsmtPrpList error!!');
    }
  }
)

/**
 * 과제제안 상세 조회
 */
export const getAsmtPrpDetail = createAsyncThunk<AsmtPrpItem, { asmtPrpSn: string } | undefined, { rejectValue: string }>(
  '/community/asmtprp/selectDetail',
  async (params: { asmtPrpSn: string } = { asmtPrpSn: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(getAsmtPrpDetailApiPath(), { params });
      return res.data?.data as AsmtPrpItem;
    } catch (e) {
      console.error('AsmtprpCdmThunks getAsmtPrpDetail error!!', e);
      return rejectWithValue('AsmtprpCdmThunks getAsmtPrpDetail error!!');
    }
  }
)

/**
 * 과제제안 등록
 */
export const insertAsmtPrp = createAsyncThunk<void, FormData, { rejectValue: string }>(
  '/community/asmtprp/insertAsmtPrp',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      await https.post(insertAsmtPrpApiPath(), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return;
    } catch (e) {
      console.error('AsmtprpCdmThunks insertAsmtPrp error!!', e);
      return rejectWithValue('AsmtprpCdmThunks insertAsmtPrp error!!');
    }
  }
)

/**
 * 과제제안 수정
 */
export const updateAsmtPrp = createAsyncThunk<void, FormData, { rejectValue: string }>(
  '/community/asmtprp/updateAsmtPrp',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      await https.put(updateAsmtPrpApiPath(), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return;
    } catch (e) {
      console.error('AsmtprpCdmThunks updateAsmtPrp error!!', e);
      return rejectWithValue('AsmtprpCdmThunks updateAsmtPrp error!!');
    }
  }
)

/**
 * 과제제안 삭제
 */
export const deleteAsmtPrp = createAsyncThunk<void, { asmtPrpSn: string; ansSn?: string }, { rejectValue: string }>(
  '/community/asmtprp/deleteAsmtPrp',
  async (params, { rejectWithValue }) => {
    try {
      await https.delete(deleteAsmtPrpApiPath(), { params });
      return;
    } catch (e) {
      console.error('AsmtprpCdmThunks deleteAsmtPrp error!!', e);
      return rejectWithValue('AsmtprpCdmThunks deleteAsmtPrp error!!');
    }
  }
)

/**
 * 과제제안 답변 조회
 */
export const getAsmtPrpAnswer = createAsyncThunk<any, { asmtPrpSn: string } | undefined, { rejectValue: string }>(
  '/community/asmtprp/selectAnswer',
  async (params: { asmtPrpSn: string } = { asmtPrpSn: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(getAsmtPrpAnswerApiPath(), { params });
      return res.data?.data;
    } catch (e) {
      console.error('AsmtprpCdmThunks getAsmtPrpAnswer error!!', e);
      return rejectWithValue('AsmtprpCdmThunks getAsmtPrpAnswer error!!');
    }
  }
)

/**
 * 과제제안 조회수 증가
 */
export const increaseAsmtPrpViewCount = createAsyncThunk<void, { asmtPrpSn: string } | undefined, { rejectValue: string }>(
  '/community/asmtprp/increaseViewCount',
  async (params: { asmtPrpSn: string } = { asmtPrpSn: '' }, { rejectWithValue }) => {
    try {
      await https.post(increaseAsmtPrpViewCountApiPath(), null, { params });
      return;
    } catch (e) {
      console.error('AsmtprpCdmThunks increaseAsmtPrpViewCount error!!', e);
      return rejectWithValue('AsmtprpCdmThunks increaseAsmtPrpViewCount error!!');
    }
  }
)
