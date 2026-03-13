import { createSlice } from '@reduxjs/toolkit'
import { OrgchtDeptRVO, OrgchtEmpRVO } from './OrgchtTypes'
import { selectOrgchtEmployees, selectOrgchtTree } from './OrgchtThunks'

export interface OrgchtState {
  tree: OrgchtDeptRVO[]
  employees: OrgchtEmpRVO[]
  treeLoading: boolean
  employeeLoading: boolean
  error: string | null
}

const initialState: OrgchtState = {
  tree: [],
  employees: [],
  treeLoading: false,
  employeeLoading: false,
  error: null,
}

const OrgchtSlice = createSlice({
  name: 'orgcht',
  initialState,
  reducers: {
    clearOrgchtEmployees: (state) => {
      state.employees = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectOrgchtTree.pending, (state) => {
        state.treeLoading = true
        state.error = null
      })
      .addCase(selectOrgchtTree.fulfilled, (state, action) => {
        state.treeLoading = false
        state.tree = action.payload.deptList
      })
      .addCase(selectOrgchtTree.rejected, (state, action) => {
        state.treeLoading = false
        state.error = action.payload || action.error.message || '조직도 조회에 실패했습니다.'
      })
      .addCase(selectOrgchtEmployees.pending, (state) => {
        state.employeeLoading = true
        state.error = null
      })
      .addCase(selectOrgchtEmployees.fulfilled, (state, action) => {
        state.employeeLoading = false
        state.employees = action.payload.empList
      })
      .addCase(selectOrgchtEmployees.rejected, (state, action) => {
        state.employeeLoading = false
        state.error = action.payload || action.error.message || '직원 정보 조회에 실패했습니다.'
      })
  },
})

export const { clearOrgchtEmployees } = OrgchtSlice.actions
export default OrgchtSlice.reducer
