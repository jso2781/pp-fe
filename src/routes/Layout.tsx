import { useState, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Toolbar } from '@mui/material'
import { muiTheme } from '@/styles/muiTheme'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import AppNavDrawer from '@/components/navigation/AppNavDrawer'

const DRAWER_WIDTH = 260

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box className="lang-ko">
        <Header onOpenNav={() => setMobileOpen(true)} />
        {/* <AppNavDrawer mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} drawerWidth={DRAWER_WIDTH} /> */}
        <Box className="app-main" sx={{ flex: 1 }}>
          <Suspense fallback={<div style={{ padding: 24, textAlign: 'center' }}>로딩 중...</div>}>
            <Outlet />
          </Suspense>
        </Box>
      <Footer />
      </Box>
    </ThemeProvider>
  )
}
