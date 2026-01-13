import { useMemo, useState } from 'react'
import { Box, Typography, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import DepsLocation from '@/components/common/DepsLocation'
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav'

export default function KIDS_PP_US_MT_01_LAYOUT() {
  const [collapsed, setCollapsed] = useState(false)
  const sideItems = useMemo(
    () => [
      { key: '/1', label: '내 업무' },
      { 
        key: 'sub1', 
        label: '업무 신청 관리', 
        children: [
          { key: '/2-1', label: '신청 현황' },
          { key: '/2-2', label: '승인 대기 목록' },
        ]
      },
      { 
        key: 'sub2', 
        label: '업무 시스템 메뉴 1',
        children: [
          { key: '/3', label: '업무 시스템 서브 메뉴 1' },
          { key: '/4', label: '업무 시스템 서브 메뉴 2', isExternal: true },
        ]
      },
      { key: '/6', label: '업무 시스템 메뉴 2',},
      { key: '/7', label: '업무 시스템 메뉴 3',},
    ],
    [],
  )

  return (
    <Box className={`page-layout ${collapsed ? 'is-collapsed' : ''}`}>
      <Box className="sub-container">
        <Box className="content-wrap">

          <Box className="side-nav">
            <CollapsibleSideNav
              title="내업무"
              collapsed={collapsed}
              onToggle={() => setCollapsed((p) => !p)}
              items={sideItems}
              onSelect={(key) => window.alert(`Maps: ${key}`)}
            />
          </Box>

          {/* 서브 콘텐츠 영역 */}
          <Box className="sub-content">
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
            {/* 상단 현재 위치 정보 */}
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
                {/* --- 본문 시작 --- */}

                {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box> 
    </Box>
  )
}