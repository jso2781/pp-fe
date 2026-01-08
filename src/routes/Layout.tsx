import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Toolbar } from '@mui/material'
import { muiTheme } from './muiTheme'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import AppNavDrawer from '@/components/navigation/AppNavDrawer'

const DRAWER_WIDTH = 260

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Header onOpenNav={() => setMobileOpen(true)} />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* <AppNavDrawer mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} drawerWidth={DRAWER_WIDTH} /> */}

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            // desktop drawer space
            ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* keep spacing consistent under sticky AppBar */}
          <Toolbar sx={{ display: 'none' }} />
          <Box className="app-main" sx={{ flex: 1 }}>
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
