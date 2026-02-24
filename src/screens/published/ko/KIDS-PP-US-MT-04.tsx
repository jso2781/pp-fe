import { useMemo, useState } from 'react'
// import { Box, Typography, Stack, IconButton, Button } from '@mui/material';
import { Box, Button, FormControl, Select, MenuItem, TextField } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation'
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav'
import Grid from '@mui/material/Grid';
import ScreenShell from '../../ScreenShell'

export default function KIDS_PP_US_MT_04() {
  const [collapsed, setCollapsed] = useState(false)
  const sideItems = useMemo(
    () => [
      { 
        key: 'sub1', 
        label: '내업무', 
        children: [
          { key: '/2-1', label: '서브메뉴2-1' },
          { key: '/2-2', label: '서브메뉴2-2', isExternal: true },
        ]
      },
    ],
    [],
  )


  //return <FormTemplate screenId="KIDS-PP-US-MT-04" title="내 업무 업무 신청 관리 승인" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-MT-03" title="내 업무 업무 신청 관리 상세" uiType="page">
      <Box className={`page-layout ${collapsed ? 'is-collapsed' : ''}`}>
        <Box className="sub-container">
          <Box className="content-wrap">
            {/* 사이드메뉴 */}
            <Box className="side-nav">
              <CollapsibleSideNav
                title="내업무"
                collapsed={collapsed}
                onToggle={() => setCollapsed((p) => !p)}
                items={sideItems}
                onSelect={(key) => window.alert(`Maps: ${key}`)}
              />
            </Box>
            {/* 서브 컨텐츠 영역 */}
            <Box className="sub-content">
              <DepsLocation />{/* 상단 현재 위치 정보 */}
              <Box className="content-view" id="content">
                <Box className="page-content">
                  {/* --- 본문 시작 --- */}

                  <Grid container spacing={3} className="layout-row">
                    <Grid size={{ xs: 12, md: 5 }} className="col">
                      <h3 className="section-title-work">전문가 회원 정보</h3>
                      <Box className="panel-box">
                        <dl className="info-list">
                          <div className="info-item">
                            <dt>아이디</dt>
                            <dd>gdhon***</dd>
                          </div>
                          <div className="info-item">
                            <dt>이름</dt>
                            <dd>*동</dd>
                          </div>
                          <div className="info-item">
                            <dt>휴대전화번호</dt>
                            <dd>010-****-5678</dd>
                          </div>
                          <div className="info-item">
                            <dt>기관 이메일</dt>
                            <dd>gdhon***@gmail.com</dd>
                          </div>
                          <div className="info-item">
                            <dt>신청일</dt>
                            <dd>2026-03-30 12:34</dd>
                          </div>
                          <div className="info-item">
                            <dt>재직 여부</dt>
                            <dd>재직 중</dd>
                          </div>
                        </dl>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }} className="col">
                      <h3 className="section-title-work">처리 정보</h3>
                      <Box className="panel-box bg">
                        <dl className="info-list">
                          <div className="info-item">
                            <dt id="expert-status-label">전문가 회원 신청 상태</dt>
                            <dd>
                              <FormControl fullWidth size="small">
                                <Select
                                  labelId="expert-status-label"
                                  defaultValue="선택"
                                  inputProps={{ 'aria-label': '전문가 회원 신청 상태 선택' }}
                                >
                                  <MenuItem value="선택">선택</MenuItem>
                                  <MenuItem value="승인">승인</MenuItem>
                                  <MenuItem value="반려">반려</MenuItem>
                                </Select>
                              </FormControl>
                            </dd>
                          </div>

                          <div className="info-item">
                            <dt>
                              <label htmlFor="expert-reject-reason">반려 사유</label>
                            </dt>
                            <dd>
                              <TextField
                                fullWidth
                                id="expert-reject-reason" 
                                placeholder="반려 사유를 입력하세요."
                              />
                            </dd>
                          </div>

                          <div className="info-item">
                            <dt id="system-status-label">업무 시스템 신청 상태</dt>
                            <dd>
                              <FormControl fullWidth size="small">
                                <Select
                                  labelId="system-status-label"
                                  defaultValue="선택"
                                  inputProps={{ 'aria-label': '업무 시스템 신청 상태 선택' }}
                                >
                                  <MenuItem value="선택">선택</MenuItem>
                                  <MenuItem value="승인">승인</MenuItem>
                                  <MenuItem value="반려">반려</MenuItem>
                                </Select>
                              </FormControl>
                            </dd>
                          </div>
                          <div className="info-item">
                            <dt>
                              <label htmlFor="system-reject-reason">반려 사유</label>
                            </dt>
                            <dd>
                              <TextField
                                fullWidth
                                id="system-reject-reason"
                                placeholder="반려 사유를 입력하세요."
                              />
                            </dd>
                          </div>
                        </dl>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box className="btn-group between">
                    <Box className="left-group">
                      <Button variant="outlined02" size="large">
                        목록
                      </Button>
                    </Box>
                    <Box className="right-group">
                      <Button variant="outlined04" size="large">
                        전문가 탈퇴
                      </Button>
                      <Button variant="outlined02" size="large">
                        취소
                      </Button>
                      <Button variant="contained" size="large">
                        수정
                      </Button>
                    </Box>
                  </Box> 
                  
                  {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box> 
      </Box>
    </ScreenShell>
  )
}
