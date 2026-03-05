import https from '@/api/axiosInstance'
import { getPstDetailPath, getPstListPath } from '@/api/pst/PstApiPaths'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { PstListPVO, PstListRVO, PstPVO, PstRVO } from './PstTypes'
import { getLangFromPathname } from '@/routes/lang'

/**
 * 대국민포털_게시물기본 정보 목록 조회 
 */
export const selectPstList = createAsyncThunk<PstListRVO, PstListPVO | undefined, { rejectValue: string }>(
  '/pst/selectPstList',
  async (params: PstListPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(getPstListPath(), params);
      const payload = res.data?.data;

      return {
        list: payload && Array.isArray(payload.list) ? payload.list : [],
        totalCount: payload.totalCount ?? 0,
        totalPages: payload.totalPages ?? 0,
      } as PstListRVO;
    }
    catch (e) {
      const axiosError = e as AxiosError
      const status = axiosError.response?.status
      if (status === 404) {
        const lang = getLangFromPathname(window.location.pathname)
        window.location.replace(`/pp/${lang}/NotFound`)
        return rejectWithValue('NOT_FOUND')
      }
      console.error("PstThunks selectPstList error!!");
      return rejectWithValue('PstThunks selectPstList error!!');
    }    
  }
)

/**
 * 대국민포털_게시물기본 정보 조회 
 */
export const getPst = createAsyncThunk<PstRVO, PstPVO | undefined, { rejectValue: string }>(
  '/pst/getPst',
  async (params: PstPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(getPstDetailPath(), params);
      const payload = res.data?.data?.detailData;
      return payload;
    }
    catch (e) {
      const axiosError = e as AxiosError
      const status = axiosError.response?.status
      if (status === 404) {
        const lang = getLangFromPathname(window.location.pathname)
        window.location.replace(`/pp/${lang}/NotFound`)
        return rejectWithValue('NOT_FOUND')
      }
      console.error("PstThunks getPst error!!");
      return rejectWithValue('PstThunks getPst error!!');
    }    
  }
)
