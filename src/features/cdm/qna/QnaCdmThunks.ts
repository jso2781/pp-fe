import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import {
  selectQnaListApiPath,
  getQnaDetailApiPath,
  insertQnaApiPath,
  updateQnaApiPath,
  deleteQnaApiPath,
  getQnaAnswerApiPath,
  increaseQnaViewCountApiPath,
} from '@/api/cdm/qna/QnaCdmApiPaths'
import { QnaItem, FetchQnaListParams, FetchQnaListResponse } from './QnaCdmTypes'

/**
 * QnA 목록 조회
 */
export const selectQnaList = createAsyncThunk<FetchQnaListResponse, FetchQnaListParams | undefined, { rejectValue: string }>(
  '/community/qna/selectList',
  async (params: FetchQnaListParams = { page: 1, pageSize: '10', searchType: '', searchKeyword: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(selectQnaListApiPath(), { params });
      return {
        list: res.data?.data || [],
        totalCount: res.data?.total || 0,
      } as FetchQnaListResponse;
    } catch (e) {
      console.error('QnaCdmThunks selectQnaList error!!', e);
      return rejectWithValue('QnaCdmThunks selectQnaList error!!');
    }
  }
)

/**
 * QnA 상세 조회
 */
export const getQnaDetail = createAsyncThunk<QnaItem, { qstnSn: string; bbsId?: string } | undefined, { rejectValue: string }>(
  '/community/qna/selectDetail',
  async (params: { qstnSn: string; bbsId?: string } = { qstnSn: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(getQnaDetailApiPath(), { params });
      return res.data?.data as QnaItem;
    } catch (e) {
      console.error('QnaCdmThunks getQnaDetail error!!', e);
      return rejectWithValue('QnaCdmThunks getQnaDetail error!!');
    }
  }
)

/**
 * QnA 등록
 */
export const insertQna = createAsyncThunk<void, FormData, { rejectValue: string }>(
  '/community/qna/insertQna',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      await https.post(insertQnaApiPath(), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return;
    } catch (e) {
      console.error('QnaCdmThunks insertQna error!!', e);
      return rejectWithValue('QnaCdmThunks insertQna error!!');
    }
  }
)

/**
 * QnA 수정
 */
export const updateQna = createAsyncThunk<void, FormData, { rejectValue: string }>(
  '/community/qna/updateQna',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      await https.put(updateQnaApiPath(), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return;
    } catch (e) {
      console.error('QnaCdmThunks updateQna error!!', e);
      return rejectWithValue('QnaCdmThunks updateQna error!!');
    }
  }
)

/**
 * QnA 삭제
 */
export const deleteQna = createAsyncThunk<void, { qstnSn: string; ansSn?: number }, { rejectValue: string }>(
  '/community/qna/deleteQna',
  async (params, { rejectWithValue }) => {
    try {
      await https.delete(deleteQnaApiPath(), { data: params });
      return;
    } catch (e) {
      console.error('QnaCdmThunks deleteQna error!!', e);
      return rejectWithValue('QnaCdmThunks deleteQna error!!');
    }
  }
)

/**
 * QnA 답변 조회
 */
export const getQnaAnswer = createAsyncThunk<any, { qstnSn: string } | undefined, { rejectValue: string }>(
  '/community/qna/selectAnswer',
  async (params: { qstnSn: string } = { qstnSn: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(getQnaAnswerApiPath(), { params });
      return res.data?.data;
    } catch (e) {
      console.error('QnaCdmThunks getQnaAnswer error!!', e);
      return rejectWithValue('QnaCdmThunks getQnaAnswer error!!');
    }
  }
)

/**
 * QnA 조회수 증가
 */
export const increaseQnaViewCount = createAsyncThunk<void, { qstnSn: string } | undefined, { rejectValue: string }>(
  '/community/qna/increaseViewCount',
  async (params: { qstnSn: string } = { qstnSn: '' }, { rejectWithValue }) => {
    try {
      await https.post(increaseQnaViewCountApiPath(), null, { params });
      return;
    } catch (e) {
      console.error('QnaCdmThunks increaseQnaViewCount error!!', e);
      return rejectWithValue('QnaCdmThunks increaseQnaViewCount error!!');
    }
  }
)
