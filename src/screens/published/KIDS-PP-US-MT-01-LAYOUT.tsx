import { useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
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
          { key: '/4', label: '업무 시스템 서브 메뉴 2' },
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

          <CollapsibleSideNav
            title="알림마당"
            collapsed={collapsed}
            onToggle={() => setCollapsed((p) => !p)}
            items={sideItems}
            //selectedKey="/3"
            onSelect={(key) => window.alert(`Maps: ${key}`)}
          />
          
          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="sub_cont">
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