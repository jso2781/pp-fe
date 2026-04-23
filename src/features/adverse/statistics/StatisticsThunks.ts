import https from '@/api/axiosInstance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  selectStatisticsListApiPath,
  selectStatisticsDetailApiPath,
  saveStatisticsApiPath,
  deleteStatisticsApiPath,
  generateStatisticsApiPath,
  selectRprsDatasetApiPath,
  saveRprsDatasetApiPath,
  selectDatasetsWithRprsApiPath,
  selectUserRoleApiPath,
} from '@/api/adverse/statistics/StatisticsApiPaths'
import type {
  DatasetRVO,
  DatasetWithRprsRVO,
  StatisticsListPVO,
  StatisticsListRVO,
  StatisticsRVO,
  StatisticsSavePVO,
} from './StatisticsTypes'

/**
 * 이상사례 통계 목록 조회
 */
export const selectStatisticsList = createAsyncThunk<StatisticsListRVO, StatisticsListPVO | undefined, { rejectValue: string }>(
  '/statistics/selectStatisticsList',
  async (params: StatisticsListPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.get(selectStatisticsListApiPath(), { params })
      const data = res.data
      return {
        list: Array.isArray(data.list) ? data.list : [],
        totalCount: data.totalCount ?? 0,
      } as StatisticsListRVO
    } catch (e) {
      console.error('StatisticsThunks selectStatisticsList error!!', e)
      return rejectWithValue('통계 목록 조회 실패')
    }
  }
)

/**
 * 이상사례 통계 상세 조회
 */
export const selectStatisticsDetail = createAsyncThunk<StatisticsRVO, string, { rejectValue: string }>(
  '/statistics/selectStatisticsDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await https.get(selectStatisticsDetailApiPath(id))
      return res.data
    } catch (e) {
      console.error('StatisticsThunks selectStatisticsDetail error!!', e)
      return rejectWithValue('통계 상세 조회 실패')
    }
  }
)

/**
 * 이상사례 통계 저장
 */
export const saveStatistics = createAsyncThunk<
  { success: boolean; statsDsetMngSn: number },
  StatisticsSavePVO,
  { rejectValue: string }
>(
  '/statistics/saveStatistics',
  async (data, { rejectWithValue }) => {
    try {
      const res = await https.post(saveStatisticsApiPath(), data)
      return res.data
    } catch (e) {
      console.error('StatisticsThunks saveStatistics error!!', e)
      return rejectWithValue('통계 저장 실패')
    }
  }
)

/**
 * 이상사례 통계 삭제
 */
export const deleteStatistics = createAsyncThunk<
  { success: boolean; deletedCount: number; message: string },
  number[],
  { rejectValue: string }
>(
  '/statistics/deleteStatistics',
  async (ids, { rejectWithValue }) => {
    try {
      const res = await https.delete(deleteStatisticsApiPath(), { data: ids })
      return res.data
    } catch (e) {
      console.error('StatisticsThunks deleteStatistics error!!', e)
      return rejectWithValue('통계 삭제 실패')
    }
  }
)

/**
 * 이상사례 통계 생성 요청
 */
export const generateStatistics = createAsyncThunk<
  { success: boolean; message: string },
  string,
  { rejectValue: string }
>(
  '/statistics/generateStatistics',
  async (id, { rejectWithValue }) => {
    try {
      const res = await https.post(generateStatisticsApiPath(id))
      return res.data
    } catch (e: any) {
      console.error('StatisticsThunks generateStatistics error!!', e)
      return rejectWithValue(e?.response?.data?.message || '통계 생성 요청 실패')
    }
  }
)

/**
 * 대표 데이터셋 조회
 */
export const selectRprsDataset = createAsyncThunk<
  { dataset: DatasetRVO | null; message: string },
  string,
  { rejectValue: string }
>(
  '/statistics/selectRprsDataset',
  async (domstForgnSeCd, { rejectWithValue }) => {
    try {
      const res = await https.get(selectRprsDatasetApiPath(), { params: { domstForgnSeCd } })
      if (res.data?.exists === false) {
        return { dataset: null, message: res.data.message || '대표 데이터셋이 지정되지 않았습니다.' }
      }
      return { dataset: res.data, message: '' }
    } catch (e) {
      console.error('StatisticsThunks selectRprsDataset error!!', e)
      return rejectWithValue('대표 데이터셋 조회 실패')
    }
  }
)

/**
 * 포털 회원 역할/권한 조회
 */
export const selectUserRole = createAsyncThunk<
  { role: string; menuAuthMap: Record<string, string> },
  void,
  { rejectValue: string }
>(
  '/statistics/selectUserRole',
  async (_, { rejectWithValue }) => {
    try {
      const res = await https.get(selectUserRoleApiPath())
      return {
        role: res.data?.role || '',
        menuAuthMap: res.data?.menuAuthMap || {},
      }
    } catch (e) {
      console.error('StatisticsThunks selectUserRole error!!', e)
      return rejectWithValue('')
    }
  }
)

/**
 * 대표 데이터셋 포함 데이터셋 목록 조회
 */
export const selectDatasetsWithRprs = createAsyncThunk<
  DatasetWithRprsRVO[],
  void,
  { rejectValue: string }
>(
  '/statistics/selectDatasetsWithRprs',
  async (_, { rejectWithValue }) => {
    try {
      const res = await https.get(selectDatasetsWithRprsApiPath())
      return res.data
    } catch (e) {
      console.error('StatisticsThunks selectDatasetsWithRprs error!!', e)
      return rejectWithValue('데이터셋 목록 조회 실패')
    }
  }
)

/**
 * 대표 데이터셋 지정 (저장)
 */
export const saveRprsDataset = createAsyncThunk<
  { success: boolean; message: string },
  { domstForgnSeCd: string; dsetMngSn: number },
  { rejectValue: string }
>(
  '/statistics/saveRprsDataset',
  async (data, { rejectWithValue }) => {
    try {
      const res = await https.post(saveRprsDatasetApiPath(), data)
      return res.data
    } catch (e: any) {
      console.error('StatisticsThunks saveRprsDataset error!!', e)
      return rejectWithValue(e?.response?.data?.message || '대표 데이터셋 지정 실패')
    }
  }
)
