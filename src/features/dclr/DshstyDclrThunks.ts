import { createAsyncThunk } from '@reduxjs/toolkit';
import https from '@/api/axiosInstance';
import { selectDshstyDclrListApiPath, insertDshstyDclrApiPath } from '@/api/dclr/DshstyDclrApiPaths';
import { DshstyDclrListRVO, DshstyDclrListPVO, DshstyDclrPVO } from './DshstyDclrTypes';

/**
 * 대국민포털_부정신고 정보 목록 조회 
 */
export const selectDshstyDclrList = createAsyncThunk<DshstyDclrListRVO, DshstyDclrListPVO, { rejectValue: string }>(
  '/dshstyDclr/selectDshstyDclrList',
  async (params: DshstyDclrListPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectDshstyDclrListApiPath(), params);
      const payload = res.data?.data?.list || [];

      return {
        list: payload,
        totalCount: payload.length
      } as DshstyDclrListRVO;
    }
    catch (e) {
      console.error('!!! DshstyDclrThunks > selectDshstyDclrList 에러.');
      console.error(e);
      return rejectWithValue('NETWORK_OR_SERVER_ERROR');
    }
  }
)

/**
 * 대국민포털_부정신고 입력 
 */
export const insertDshstyDclr = createAsyncThunk<void, DshstyDclrPVO, { rejectValue: string }>(
  '/dshstyDclr/insertDshstyDclr',
  async (params: DshstyDclrPVO, { rejectWithValue }) => {
    try {
      await https.post(insertDshstyDclrApiPath(), params);

      return;
    }
    catch (e) {
      console.error('!!! DshstyDclrThunks > insertDshstyDclr 에러.');
      console.error(e);
      return rejectWithValue('NETWORK_OR_SERVER_ERROR');
    }
  }
)
