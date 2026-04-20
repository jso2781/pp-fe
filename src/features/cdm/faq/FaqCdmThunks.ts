import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectFaqListApiPath, getFaqDetailApiPath, getFaqIncreaseViewCount as getFaqIncreaseViewCountApiPath, selectFaqCategoriesApiPath } from '@/api/cdm/faq/FaqCdmApiPaths'
import { FaqItem, FetchFaqListParams, FetchFaqListResponse } from './FaqCdmTypes'

/**
 * FAQ 목록 조회
 */
export const selectFaqList = createAsyncThunk<FetchFaqListResponse, FetchFaqListParams | undefined, { rejectValue: string }>(
  '/community/faq/selectList',
  async (params: FetchFaqListParams = { page: 1, pageSize: '10', bbsId: '', faqSeCd: '', searchKeyword: '', searchType: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(selectFaqListApiPath(), { params });
      return {
        list: res.data?.data || [],
        totalCount: res.data?.total || 0,
      } as FetchFaqListResponse;
    } catch (e) {
      console.error('FaqCdmThunks selectFaqList error!!', e);
      return rejectWithValue('FaqCdmThunks selectFaqList error!!');
    }
  }
)

/**
 * FAQ 상세 조회
 */
export const getFaqDetail = createAsyncThunk<FaqItem, { bbsId: string; faqSn: string } | undefined, { rejectValue: string }>(
  '/community/faq/selectDetail',
  async (params: { bbsId: string; faqSn: string } = { bbsId: 'faq', faqSn: '' }, { rejectWithValue }) => {
    try {
      const res = await https.get(getFaqDetailApiPath(), { params });
      return res.data?.data as FaqItem;
    } catch (e) {
      console.error('FaqCdmThunks getFaqDetail error!!', e);
      return rejectWithValue('FaqCdmThunks getFaqDetail error!!');
    }
  }
)

/**
 * FAQ 분류 공통코드 조회 (CMCMM00005)
 */
export const selectFaqCategories = createAsyncThunk<{ code: string; name: string }[], void, { rejectValue: string }>(
  '/community/faq/selectCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await https.get(selectFaqCategoriesApiPath());
      return (res.data?.data || []) as { code: string; name: string }[];
    } catch (e) {
      console.error('FaqCdmThunks selectFaqCategories error!!', e);
      return rejectWithValue('FaqCdmThunks selectFaqCategories error!!');
    }
  }
)

/**
 * FAQ 조회수 증가
 */
export const increaseFaqViewCount = createAsyncThunk<void, { faqSn: string } | undefined, { rejectValue: string }>(
  '/community/faq/increaseViewCount',
  async (params: { faqSn: string } = { faqSn: '' }, { rejectWithValue }) => {
    try {
      await https.post(getFaqIncreaseViewCountApiPath(), null, { params });
      return;
    } catch (e) {
      console.error('FaqCdmThunks increaseFaqViewCount error!!', e);
      return rejectWithValue('FaqCdmThunks increaseFaqViewCount error!!');
    }
  }
)
