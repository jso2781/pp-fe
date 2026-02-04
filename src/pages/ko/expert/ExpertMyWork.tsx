/**
 * 화면ID: KIDS-PP-US-MT-01
 * 화면명: 전문가 메뉴 - 내 업무
 * 화면경로: /expert/ExpertMyWork
 * 화면설명: 전문가 메뉴 - 내 업무
 */
import { useMemo, useState } from 'react'
import { Box, Typography, Stack, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DepsLocation from '@/components/common/DepsLocation'
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ExpertMyWork() {
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

  return (
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
            {/* 알림바 */}
            <Box className="welcome-banner">
              <Stack direction="row" alignItems="center" className="welcome-banner__inner">
                <Typography className="welcome-banner__message">
                  <span className="user-name">김안전</span>님 환영합니다. ‘OOO’ 메뉴에 새로운 확인 사항이 있습니다.
                </Typography>
                <IconButton size="small" className="btn-close" aria-label="close">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
            <DepsLocation />{/* 상단 현재 위치 정보 */}
            <Box className="content-view" id="content">
              <Box className="page-content">
                {/* --- 본문 시작 --- */}

                  <h3 className="section-title-work">내 정보</h3>
                  <Box className="panel-box">
                    <Box className="my-account-info">
                      <Box className="user-context">
                        <Box className="status-badge-group">
                          <span className="tag">전문가회원</span>
                          <span className="badge pending">신청중</span>
                          <span className="badge rejected">반려중</span>
                          <Button 
                            variant="text" 
                            className="btn-view-reason" 
                            endIcon={<ChevronRightIcon />}
                            size="small"
                          >
                            반려사유보기
                          </Button>
                        </Box>
                        <Box className="user-info-group">
                          <span className="user-name">김국민</span>
                          <span className="user-company">한국제약회사</span>
                        </Box>
                        <p className="last-login">마지막 접속일시 : 2025-10-16 14:23:32</p>
                      </Box>

                      <Box className="control-action">
                        <Button variant="outlined04" size="small" className="s-lg">신청취소하기</Button>
                        <Button variant="outlined03" size="small" className="s-lg">재신청하기</Button> 
                      </Box>
                    </Box>
                  </Box>

                  <h3 className="section-title-work">업무 시스템 선택</h3>
                  <Box className="panel-box">
                    <ul className="work-system-list">
                      {/* 사용중 케이스 */}
                      <li className="item">
                        <Box className="system-info">
                          <span className="tag using">사용중</span> 
                          <Button 
                            variant="text" 
                            className="system-name" 
                            endIcon={<ChevronRightIcon />}
                          >
                            eCRF 업무
                          </Button>
                        </Box>
                        <Box className="control-action">
                          <Button variant="outlined04" size="small" className="s-lg">신청취소하기</Button> 
                        </Box>
                      </li>

                      {/* 승인중 케이스 */}
                      <li className="item">
                        <Box className="system-info">
                          <span className="tag waiting">승인중</span>
                          <Button 
                            variant="text" 
                            className="system-name" 
                            endIcon={<ChevronRightIcon />}
                          >
                            eCRF 업무
                          </Button>
                        </Box>
                        <Box className="control-action">
                          <span className="status-text">승인 대기 중</span>
                        </Box>
                      </li>

                      {/* 신청가능 케이스 */}
                      <li className="item">
                        <Box className="system-info">
                          <span className="tag available">신청가능</span>
                          <Button 
                            variant="text" 
                            className="system-name" 
                            endIcon={<ChevronRightIcon />}
                          >
                            eCRF 업무
                          </Button>
                        </Box>
                        <Box className="control-action">
                          <Button variant="outlined02" size="small" className="s-lg">신청하기</Button> 
                        </Box>
                      </li>
                    </ul>
                  </Box>
                

                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> 
    </Box>
  )
}
