import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export default function BlankLayout() {
  return (
    <Box className="lang-ko">
      <Outlet />
    </Box>
  )
}
