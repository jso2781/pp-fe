import { createAsyncThunk } from '@reduxjs/toolkit'
import { https } from '@shared/utils/https'
import { exprtAplyChkApiPath, updateExprtAprvSttsApiPath } from '@/api/advice/MbcmtApplyApiPaths'
import type { MbcmtApplyPVO, MbcmtApplyRVO } from './MbcmtApplyTypes'

/** 자문위원 자격여부 체크 */
export const exprtAplyChk = createAsyncThunk<MbcmtApplyRVO, MbcmtApplyPVO, { rejectValue: string }>(
  'advice/exprtAplyChk',
  async (params, { rejectWithValue }) => {
    try {
      const res = await https.post(exprtAplyChkApiPath(), params)
      return res.data?.data as MbcmtApplyRVO
    } catch (e) {
      console.error('exprtAplyChk error', e)
      return rejectWithValue('자격여부 확인 중 오류가 발생했습니다.')
    }
  }
)

/** 자문위원 전환신청 (신청하기) */
export const updateExprtAprvStts = createAsyncThunk<string, MbcmtApplyPVO, { rejectValue: string }>(
  'advice/updateExprtAprvStts',
  async (params, { rejectWithValue }) => {
    try {
      const res = await https.post(updateExprtAprvSttsApiPath(), params)
      return res.data?.data?.result ?? 'SUCCESS'
    } catch (e) {
      console.error('updateExprtAprvStts error', e)
      return rejectWithValue('신청 처리 중 오류가 발생했습니다.')
    }
  }
)
