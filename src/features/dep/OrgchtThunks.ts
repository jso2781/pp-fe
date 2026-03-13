import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import https from '@/api/axiosInstance'
import { selectOrgchtEmployeesApiPath, selectOrgchtTreeApiPath } from '@/api/dep/OrgchtApiPaths'
import { OrgchtEmployeesRVO, OrgchtPVO, OrgchtTreeRVO } from './OrgchtTypes'

export const selectOrgchtTree = createAsyncThunk<OrgchtTreeRVO, OrgchtPVO | undefined, { rejectValue: string }>(
  '/dep/selectOrgchtTree',
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await https.post(selectOrgchtTreeApiPath(), params)
      const payload = res.data?.data

      return {
        deptList: Array.isArray(payload?.deptList) ? payload.deptList : [],
      }
    } catch (e) {
      const axiosError = e as AxiosError
      console.error('OrgchtThunks selectOrgchtTree error!!', axiosError)
      return rejectWithValue('조직도 조회에 실패했습니다.')
    }
  }
)

export const selectOrgchtEmployees = createAsyncThunk<OrgchtEmployeesRVO, OrgchtPVO, { rejectValue: string }>(
  '/dep/selectOrgchtEmployees',
  async (params, { rejectWithValue }) => {
    try {
      const res = await https.post(selectOrgchtEmployeesApiPath(), params)
      const payload = res.data?.data

      return {
        empList: Array.isArray(payload?.empList) ? payload.empList : [],
      }
    } catch (e) {
      const axiosError = e as AxiosError
      console.error('OrgchtThunks selectOrgchtEmployees error!!', axiosError)
      return rejectWithValue('직원 정보 조회에 실패했습니다.')
    }
  }
)
