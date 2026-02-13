import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { DurMyDrugInfoListRVO, DurMyDrugInfoPVO } from './DurMyDrugInfoTypes'

export const selectDurMyDrugInfoList = createAsyncThunk<DurMyDrugInfoListRVO, DurMyDrugInfoPVO | undefined, { rejectValue: string }>(
  '/dur/mydrug/selectDurMyDrugInfoList',
  async (params: DurMyDrugInfoPVO = {}, { rejectWithValue }) => {
    try {
      const res = await https.post('/dur/mydrug/select/result', params)
      const payload = res.data?.data

      return {
        list: payload && Array.isArray(payload.list) ? payload.list : [],
        totalCount: Number(payload?.totalCount ?? 0),
        totalPages: Number(payload?.totalPages ?? 0),
      } as DurMyDrugInfoListRVO
    } catch (e) {
      console.log('DurMyDrugInfoThunks selectDurMyDrugInfoList error!!')
      return rejectWithValue('DurMyDrugInfoThunks selectDurMyDrugInfoList error!!')
    }
  }
)
