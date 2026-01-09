import { useMemo, useState } from 'react'
import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Typography, Collapse } from '@mui/material'
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon, ExpandLess, ExpandMore } from '@mui/icons-material'

export type CollapsibleNavItem = {
  key: string
  label: string
  disabled?: boolean
  children?: CollapsibleNavItem[] // 하위 메뉴 추가
}

type Props = {
  title: string
  collapsed: boolean
  onToggle: () => void
  items: CollapsibleNavItem[]
  selectedKey?: string
  width?: number
  collapsedWidth?: number
  onSelect?: (key: string) => void
}

export default function CollapsibleSideNav({
  title,
  collapsed,
  onToggle,
  items,
  selectedKey,
  width = 280,
  collapsedWidth = 72,
  onSelect,
}: Props) {
  const drawerWidth = collapsed ? collapsedWidth : width
  const selected = useMemo(() => selectedKey ?? '', [selectedKey])
  
  // 열려있는 1뎁스 메뉴들의 key를 관리하는 상태
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({})

  const handleToggleOpen = (key: string) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: drawerWidth,
          overflowX: 'hidden',
          borderRightColor: 'divider',
          position: 'absolute',
          height: '100%',
          zIndex: 1200,
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
      sx={{
        position: 'absolute',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1200,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', px: 1.5, py: 1 }}>
        {!collapsed && (
          <Typography variant="subtitle1" fontWeight={800} noWrap>
            {title}
          </Typography>
        )}
        <IconButton aria-label="toggle menu" onClick={onToggle} size="small">
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List dense disablePadding>
        {items.map((it) => {
          const hasChildren = !!(it.children && it.children.length > 0)
          const isOpen = openKeys[it.key] || false

          return (
            <Box key={it.key}>
              <ListItemButton
                selected={selected === it.key}
                disabled={!!it.disabled}
                onClick={() => {
                  if (hasChildren) {
                    handleToggleOpen(it.key)
                  } else {
                    onSelect?.(it.key)
                  }
                }}
                sx={{ px: collapsed ? 1.5 : 2 }}
              >
                <ListItemText
                  primary={it.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    noWrap: true,
                    sx: { opacity: collapsed ? 0 : 1, fontWeight: hasChildren ? 700 : 400 },
                  }}
                />
                {/* 하위 메뉴가 있고, 메뉴가 펼쳐진 상태일 때만 화살표 표시 */}
                {!collapsed && hasChildren && (isOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
              </ListItemButton>

              {/* 하위 메뉴 리스트 (Collapse) */}
              {hasChildren && (
                <Collapse in={isOpen && !collapsed} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding dense>
                    {it.children?.map((child) => (
                      <ListItemButton
                        key={child.key}
                        selected={selected === child.key}
                        onClick={() => onSelect?.(child.key)}
                        sx={{ pl: collapsed ? 1.5 : 4 }} // 하위 메뉴 들여쓰기
                      >
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            fontSize: 13,
                            noWrap: true,
                            sx: { opacity: collapsed ? 0 : 1 },
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          )
        })}
      </List>
    </Drawer>
  )
}