import { useEffect, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import ContactArea from '@/components/common/ContactArea'
import DepsLocation from '@/components/common/EngDepsLocation'
import DgstfnExnm from '@/components/common/EngDgstfnExnm'
import KoglLicense from '@/components/common/KoglLicense'
import Lnb from '@/components/common/EngLnb'
import LnbSectionTitle from '@/components/common/EngLnbSectionTitle'
import { useAuth } from '@/contexts/AuthContext'
import { OrgchtDeptRVO } from '@/features/dep/OrgchtTypes'
import { selectOrgchtTree } from '@/features/dep/OrgchtThunks'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useLocation } from 'react-router-dom'

export default function AboutOrg() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { getMenuInfo } = useAuth()
  const { tree, treeLoading } = useAppSelector((s) => s.orgcht)
  const menuInfo = getMenuInfo(location.pathname)
  const menuSn = menuInfo?.menuSn ?? 0
  const menuKoglCprgtTypeCd = menuInfo?.menuKoglCprgtTypeCd ?? '4'
  const contactDepNm = menuInfo?.menuTkcgDeptNm ?? null
  const contactPersonNm = menuInfo?.menuPicFlnm ?? null
  const contactPhoneNum = menuInfo?.encptPicTelno ?? null

  useEffect(() => {
    dispatch(selectOrgchtTree({ langSeCd: 'en' }))
  }, [dispatch])

  const parentDeptNoSet = useMemo(() => {
    return new Set(
      tree
        .map((dept) => dept.upDeptNo)
        .filter((deptNo): deptNo is string => Boolean(deptNo))
    )
  }, [tree])

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

  const rootDivisions = useMemo(
    () =>
      tree.filter(
        (dept) =>
          dept.deptLevel === 1 &&
          dept.deptNo !== auditDept?.deptNo
      ),
    [auditDept?.deptNo, tree]
  )

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
                        <span>Ledger</span>
                      </div>

                      <div className="board-audit-group">
                        <div className="node-board">
                          <span>Council</span>
                        </div>
                        <div className="node-audit">
                          <span>{auditDept?.deptNm ?? 'Audit Team'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="org-division-row">
                      {treeLoading ? (
                        <div className="division-column">
                          <div className="team-container">Loading organization chart...</div>
                        </div>
                      ) : (
                        rootDivisions.map((division) => (
                          <div className="division-column" key={division.deptNo}>
                            <div className="division-header">
                              <span>{division.deptNm}</span>
                            </div>
                            <div className="team-container">
                              <ul className="team-list">
                                {(childDeptMap[division.deptNo ?? ''] ?? []).map((dept) => (
                                  <li className="team-item" key={dept.deptNo}>
                                    <span>{dept.deptNm}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </section>
                {menuKoglCprgtTypeCd.trim() !== '' && <KoglLicense menuKoglCprgtTypeCd={menuKoglCprgtTypeCd} />}
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
