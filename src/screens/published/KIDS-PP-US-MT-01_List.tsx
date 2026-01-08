import { useMemo, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import ScreenShell from '../ScreenShell'
import DepsLocation from '@/components/common/DepsLocation'
import CollapsibleSideNav from '@/components/navigation/CollapsibleSideNav'

export default function KIDS_PP_US_MT_01_List() {
  const [collapsed, setCollapsed] = useState(false)
  const sideItems = useMemo(
    () => [
      { key: '/1', label: '내 업무' },
      { key: '/2', label: '업무 신청 관리', disabled: true },
      { key: '/3', label: '업무 시스템 서브 메뉴 1' },
      { key: '/4', label: '업무 시스템 서브 메뉴 2' },
      { key: '/6', label: '업무 시스템 메뉴 2', disabled: true },
      { key: '/7', label: '업무 시스템 메뉴 3', disabled: true },
    ],
    [],
  )

  return (
    <ScreenShell screenId="KIDS-PP-US-MT-01_List" title="내업무" uiType="page">
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CollapsibleSideNav
          title="알림마당"
          collapsed={collapsed}
          onToggle={() => setCollapsed((p) => !p)}
          items={sideItems}
          selectedKey="/3"
          onSelect={(key) => window.alert(`navigate: ${key}`)}
        />

        <Box sx={{ flex: 1, p: 2 }}>
          <DepsLocation />
          <Card variant="outlined" sx={{ borderRadius: 2, mt: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                목록
              </Typography>
              <Typography variant="body2" color="text.secondary">
                샘플 목록 화면입니다. (MUI Navigation 통일)
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ScreenShell>
  )
}
