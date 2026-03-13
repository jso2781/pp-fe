export interface OrgchtPVO {
  deptNo?: string
  langSeCd?: string
}

export interface OrgchtDeptRVO {
  topDeptNo?: string
  topDeptNm?: string
  deptNo?: string
  deptNm?: string
  upDeptNo?: string
  deptLevel?: number
  deptSeq?: number | null
}

export interface OrgchtEmpRVO {
  empNo?: string
  empNm?: string
  deptNo?: string
  deptNm?: string
  jbgdNm?: string
  jbttlNm?: string
  positionNm?: string
  encptEmpTelno?: string
  encptEmpEmlNm?: string
  mainTaskCn?: string
  empSeq?: number | null
}
export interface EmployeeGroup {
  deptNo: string
  deptNm: string
  employees: OrgchtEmpRVO[]
}

export interface OrgchtTreeRVO {
  deptList: OrgchtDeptRVO[]
}

export interface OrgchtEmployeesRVO {
  empList: OrgchtEmpRVO[]
}
