import { useEffect, useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import ContactArea from '@/components/common/ContactArea'
import DepsLocation from '@/components/common/DepsLocation'
import DgstfnExnm from '@/components/common/DgstfnExnm'
import KoglLicense from '@/components/common/KoglLicense'
import Lnb from '@/components/common/Lnb'
import LnbSectionTitle from '@/components/common/LnbSectionTitle'
import { useAuth } from '@/contexts/AuthContext'
import { clearOrgchtEmployees } from '@/features/dep/OrgchtSlice'
import { OrgchtDeptRVO, EmployeeGroup } from '@/features/dep/OrgchtTypes'
import { selectOrgchtEmployees, selectOrgchtTree } from '@/features/dep/OrgchtThunks'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useLocation } from 'react-router-dom'

// 조직도 박스 안에서 button을 링크처럼 보이게 쓰기 위한 공통 초기 스타일이다.
const buttonResetSx: SxProps<Theme> = {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'center',
}

export default function AboutOrg() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { getMenuInfo } = useAuth()
  const { tree, employees, treeLoading, employeeLoading } = useAppSelector((s) => s.orgcht)
  const [selectedDeptNo, setSelectedDeptNo] = useState<string | null>(null)
  const menuInfo = getMenuInfo(location.pathname)
  const menuSn = menuInfo?.menuSn ?? 0
  const menuKoglCprgtTypeCd = menuInfo?.menuKoglCprgtTypeCd ?? '4'
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null

  useEffect(() => {
    dispatch(selectOrgchtTree({ langSeCd: 'ko' }))
    return () => {
      dispatch(clearOrgchtEmployees())
    }
  }, [dispatch])

  // 선택된 부서와 조회 결과를 빠르게 찾을 수 있도록 부서번호 기준 맵을 만든다.
  const deptMap = useMemo(() => {
    return tree.reduce<Record<string, OrgchtDeptRVO>>((acc, dept) => {
      if (dept.deptNo) {
        acc[dept.deptNo] = dept
      }
      return acc
    }, {})
  }, [tree])

  // 하위부서를 가진 부서번호를 모아 감사팀(최상위 직속 + 리프노드) 식별에 사용한다.
  const parentDeptNoSet = useMemo(() => {
    return new Set(
      tree
        .map((dept) => dept.upDeptNo)
        .filter((deptNo): deptNo is string => Boolean(deptNo))
    )
  }, [tree])

  // 최상위 바로 아래 부서 중 하위부서가 없는 부서를 감사팀으로 본다.
  const auditDept = useMemo(
    () =>
      tree.find(
        (dept) =>
          dept.deptLevel === 1 &&
          !!dept.deptNo &&
          !parentDeptNoSet.has(dept.deptNo)
      ) ?? null,
    [parentDeptNoSet, tree]
  )

  // 감사팀을 제외한 최상위 직속 부서를 본부 컬럼으로 노출한다.
  const rootDivisions = useMemo(
    () =>
      tree.filter(
        (dept) =>
          dept.deptLevel === 1 &&
          dept.deptNo !== auditDept?.deptNo
      ),
    [auditDept?.deptNo, tree]
  )

  // 각 본부(topDeptNo) 아래에 속한 하위 팀 목록을 화면 컬럼별로 묶는다.
  const childDeptMap = useMemo(() => {
    return tree
      .filter((dept) => (dept.deptLevel ?? 0) > 1 && dept.topDeptNo)
      .reduce<Record<string, OrgchtDeptRVO[]>>((acc, dept) => {
        const key = dept.topDeptNo as string
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(dept)
        return acc
      }, {})
  }, [tree])

  const selectedDept = selectedDeptNo ? deptMap[selectedDeptNo] : null

  // 본부 클릭 시 내려온 직원 목록을 실제 소속 팀별로 다시 묶어 표에 출력한다.
  const employeeGroups = useMemo(() => {
    const groups: EmployeeGroup[] = []
    const groupMap = new Map<string, EmployeeGroup>()

    employees.forEach((employee) => {
      const deptNo = employee.deptNo ?? ''
      const deptNm = employee.deptNm ?? selectedDept?.deptNm ?? ''

      if (!groupMap.has(deptNo)) {
        const group = {
          deptNo,
          deptNm,
          employees: [],
        }
        groupMap.set(deptNo, group)
        groups.push(group)
      }

      groupMap.get(deptNo)?.employees.push(employee)
    })

    return groups
  }, [employees, selectedDept])

  const handleSelectDept = (deptNo?: string) => {
    if (!deptNo) {
      return
    }

    setSelectedDeptNo(deptNo)
    dispatch(selectOrgchtEmployees({ deptNo }))
  }

  // 본부/팀/감사팀 박스에 공통 클릭 UI를 주고, 선택 상태에 따라 강조 스타일만 분기한다.
  const renderDeptButton = (dept: OrgchtDeptRVO, variant: 'division' | 'team' | 'audit' = 'team') => {
    const isSelected = selectedDeptNo === dept.deptNo
    const sx: SxProps<Theme> =
      variant === 'division'
        ? {
            ...buttonResetSx,
            borderRadius: '8px',
            backgroundColor: isSelected ? '#087C80' : 'transparent',
          }
        : variant === 'audit'
          ? {
              ...buttonResetSx,
              borderRadius: '8px',
              backgroundColor: isSelected ? 'rgba(34, 156, 145, 0.12)' : 'transparent',
            }
          : {
              all: 'unset',
              cursor: 'pointer',
              color: isSelected ? '#087C80' : 'inherit',
              fontWeight: isSelected ? 700 : 400,
            }

    return (
      <Box component="button" type="button" sx={sx} onClick={() => handleSelectDept(dept.deptNo)}>
        {dept.deptNm}
      </Box>
    )
  }

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <LnbSectionTitle />
              </Typography>
              <Box className="lnb-list">
                <Lnb currentUrl={location.pathname} />
              </Box>
            </Box>
          </Box>

          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                <section className="pageCont-AboutOrg">
                  <div className="org-tree">
                    <div className="org-top-section">
                      <div className="node-boss">
                        <span>원장</span>
                      </div>

                      <div className="board-audit-group">
                        <div className="node-board">
                          <span>이사회</span>
                        </div>
                        <div className="node-audit">
                          {auditDept ? renderDeptButton(auditDept, 'audit') : <span>감사팀</span>}
                        </div>
                      </div>
                    </div>

                    <div className="org-division-row">
                      {treeLoading ? (
                        <div className="division-column">
                          <div className="team-container">조직도 정보를 불러오는 중입니다.</div>
                        </div>
                      ) : (
                        rootDivisions.map((division) => (
                          <div className="division-column" key={division.deptNo}>
                            <div className="division-header">{renderDeptButton(division, 'division')}</div>
                            <div className="team-container">
                              <ul className="team-list">
                                {(childDeptMap[division.deptNo ?? ''] ?? []).map((dept) => (
                                  <li className="team-item" key={dept.deptNo}>
                                    {renderDeptButton(dept)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {selectedDeptNo && (
                    <div className="org-info-display">
                      <h3 className="info-title">{selectedDept?.deptNm ?? '부서 정보'}</h3>

                      {employeeGroups.length > 0 ? (
                        employeeGroups.map((group) => (
                          <Box key={group.deptNo} sx={{ mt: 3 }}>
                            {employeeGroups.length > 1 && (
                              <Typography component="h4" sx={{ fontSize: '20px', fontWeight: 700, mb: 1.5 }}>
                                {group.deptNm}
                              </Typography>                              
                            )}
                            <Box className="base-table-container">
                              <Box className="table-responsive">
                                <table className="base-table table-type-2">
                                  <caption className="sr-only">{group.deptNm} 직원 정보</caption>
                                  <colgroup>
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '15%' }} />
                                    <col style={{ width: '20%' }} />
                                    <col style={{ width: 'auto' }} />
                                  </colgroup>
                                  <thead>
                                    <tr>
                                      <th scope="col">직책</th>
                                      <th scope="col">성명</th>
                                      <th scope="col">전화번호</th>
                                      <th scope="col">주요업무</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {group.employees.map((employee) => (
                                      <tr key={employee.empNo}>
                                        <td>{employee.positionNm || '-'}</td>
                                        <td>{employee.empNm || '-'}</td>
                                        <td>{employee.encptEmpTelno || '-'}</td>
                                        <td className="tal">{employee.mainTaskCn || '-'}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </Box>
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <Box className="base-table-container">
                          <Box className="table-responsive">
                            <table className="base-table table-type-2">
                              <caption className="sr-only">직원 정보 없음</caption>
                              <tbody>
                                <tr>
                                  <td>등록된 직원 정보가 없습니다.</td>
                                </tr>
                              </tbody>
                            </table>
                          </Box>
                        </Box>
                      )}
                    </div>
                  )}
                </section>
                {menuKoglCprgtTypeCd && <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />}
                <DgstfnExnm menuSn={menuSn} />
                {contactDepNm && contactPersonNm && contactPhoneNum && (
                  <ContactArea
                    contactDepNm={contactDepNm}
                    contactPersonNm={contactPersonNm}
                    contactPhoneNum={contactPhoneNum}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
