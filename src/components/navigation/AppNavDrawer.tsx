import * as React from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
} from '@mui/material'
import { Home, Campaign, Article, Medication, EditNote, Tv } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLangFromPathname, langPath } from '@/routes/lang'
import { useAppSelector } from '@/store/hooks'
import type { MenuRVO } from '@/features/auth/MenuTypes'

export type AppNavDrawerProps = {
  mobileOpen: boolean
  onCloseMobile: () => void
  drawerWidth?: number
}

type NavItem = {
  key: string
  label: string
  path: string
  icon: React.ReactNode
}

function iconFor(url: string) {
  const u = url.toLowerCase()
  if (u.includes('/dur')) return <Medication fontSize="small" />
  if (u.includes('/notice')) return <Campaign fontSize="small" />
  if (u.includes('/board')) return <Article fontSize="small" />
  if (u.includes('/screens')) return <Tv fontSize="small" />
  if (u.includes('/write') || u.includes('/edit')) return <EditNote fontSize="small" />
  return <Article fontSize="small" />
}

function normalizeUrl(url?: string | null) {
  if (!url) return null
  return url.startsWith('/') ? url : `/${url}`
}

function buildTree(list: MenuRVO[]) {
  const nodes = new Map<number, MenuRVO>()
  const children = new Map<number, MenuRVO[]>()

  for (const m of list) {
    if (m.menuSn != null) nodes.set(m.menuSn, m)
  }
  for (const m of list) {
    const up = m.upMenuSn
    if (up != null) {
      if (!children.has(up)) children.set(up, [])
      children.get(up)!.push(m)
    }
  }
  // sort children by menuSeq
  for (const [k, arr] of children.entries()) {
    arr.sort((a, b) => (a.menuSeq ?? 0) - (b.menuSeq ?? 0))
    children.set(k, arr)
  }
  const roots = list.filter((m) => (m.depLevel ?? 1) === 1).sort((a, b) => (a.menuSeq ?? 0) - (b.menuSeq ?? 0))
  return { roots, children }
}

export default function AppNavDrawer({ mobileOpen, onCloseMobile, drawerWidth = 260 }: AppNavDrawerProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = getLangFromPathname(location.pathname)
  const to = React.useCallback((p: string) => langPath(lang, p), [lang])

  // ✅ "서버 권한 = 화면 메뉴" 동기화:
  // menu slice(list)는 MenuGate에서 API/Redux로 로드된 결과를 그대로 사용
  const menuList = useAppSelector((s) => s.menu.list)

  const { roots, children } = React.useMemo(() => buildTree(menuList), [menuList])

  const renderLeaf = (m: MenuRVO) => {
    const url = normalizeUrl(m.menuUrlAddr)
    if (!url) return null

    const fullPath = url === '/' ? to('/') : to(url)
    const selected = location.pathname === fullPath || location.pathname.startsWith(fullPath + '/')

    const item: NavItem = {
      key: String(m.menuSn ?? m.no ?? m.menuNm ?? url),
      label: m.menuNm ?? url,
      path: fullPath,
      icon: iconFor(url),
    }

    return (
      <ListItemButton
        key={item.key}
        selected={selected}
        onClick={() => {
          navigate(item.path)
          onCloseMobile()
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
    )
  }

  const content = (
    <Box sx={{ width: drawerWidth }}>
      <Toolbar sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Home fontSize="small" />
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
            DrugSafe Portal
          </Typography>
        </Box>
      </Toolbar>
      <Divider />

      {/* 서버 메뉴가 없을 때(개발/목업 등)는 최소 fallback */}
      {menuList.length === 0 ? (
        <List dense>
          <ListItemButton
            selected={location.pathname === to('/home')}
            onClick={() => {
              navigate(to('/home'))
              onCloseMobile()
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Home fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </List>
      ) : (
        <Box>
          {roots.map((root) => {
            const rootLabel = root.menuNm ?? ''
            const rootChildren = root.menuSn != null ? children.get(root.menuSn) ?? [] : []
            // leaf root (rare)
            const rootUrl = normalizeUrl(root.menuUrlAddr)

            return (
              <Box key={String(root.menuSn ?? rootLabel)} sx={{ py: 0.5 }}>
                {rootLabel && (
                  <Typography variant="caption" color="text.secondary" sx={{ px: 2, pt: 1, fontWeight: 800 }}>
                    {rootLabel}
                  </Typography>
                )}

                <List dense>
                  {rootUrl && renderLeaf(root)}
                  {rootChildren.flatMap((m) => {
                    const url = normalizeUrl(m.menuUrlAddr)
                    const grand = m.menuSn != null ? children.get(m.menuSn) ?? [] : []
                    // If second-level is a container and children exist, render its leaves under it
                    if (!url && grand.length) {
                      return grand.map((leaf) => renderLeaf(leaf)).filter(Boolean) as React.ReactNode[]
                    }
                    return [renderLeaf(m)].filter(Boolean) as React.ReactNode[]
                  })}
                </List>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )

  return (
    <>
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {content}
      </Drawer>

      {/* Desktop */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {content}
      </Drawer>
    </>
  )
}
