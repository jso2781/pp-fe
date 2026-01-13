import { useMemo, useState } from 'react'
import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Typography, Collapse } from '@mui/material'
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon, ExpandLess, ExpandMore } from '@mui/icons-material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface MenuItem {
  key: string;
  label: string;
  disabled?: boolean;
  isExternal?: boolean; 
  children?: MenuItem[];
}

export type CollapsibleNavItem = {
  key: string
  label: string
  disabled?: boolean
  isExternal?: boolean
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
          borderRadius: '0 12px 12px 0',
          border: '1px solid #D8D8D8',
          background: '#EDF8F8',
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
        height: 'calc(100% - 80px)', 
        top: '30px',
        left: 0,
        zIndex: 1200,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: '20px 20px', borderBottom: '1px solid #8A949E'}}>
        {!collapsed && (
          <Typography className="nav_title">
            {title}
          </Typography>
        )}
        <IconButton aria-label="toggle menu" onClick={onToggle} size="small" sx={{ color: '#1E2124' }}>
          {collapsed ? <MenuIcon sx={{ fontSize: 32 }}/> : <MenuOpenIcon sx={{ fontSize: 32 }}/>}
        </IconButton>
      </Box>
      <List dense disablePadding>
        {items.map((it) => {
          const hasChildren = !!(it.children && it.children.length > 0)
          const isOpen = openKeys[it.key] || false
          
          return (
            <Box 
              key={it.key}
              sx={{
                borderBottom: '1px solid #8A949E', 
              }}
            >
              <ListItemButton
                selected={selected === it.key}
                disabled={!!it.disabled}
                onClick={() => {
                  if (hasChildren) {
                    handleToggleOpen(it.key)
                  } else {
                    // 만약 새창 속성이 있다면 window.open
                    if (it.isExternal) {
                      window.open(it.key, '_blank'); // key가 URL일 경우
                    } else {
                      onSelect?.(it.key);
                    }
                  }
                }}
                sx={{ 
                  py: '15px',
                  pl: '30px',
                  pr: '25px',
                }}
              >
                <ListItemText
                  primary={it.label}
                  primaryTypographyProps={{
                    fontSize: 18,
                    fontWeight: 700,
                    noWrap: true,
                    sx: { opacity: collapsed ? 0 : 1 },
                    //pl: '8px',
                  }}
                />
                {/* 하위 메뉴가 있고, 메뉴가 펼쳐진 상태일 때만 화살표 표시 */}
                {!collapsed && hasChildren && (
                  isOpen 
                    ? <ExpandLess sx={{ fontSize: 30 }} /> 
                    : <ExpandMore sx={{ fontSize: 30 }} />
                )}
              </ListItemButton>

              {/* 하위 메뉴 리스트 (Collapse) */}
              {hasChildren && (
                <Collapse in={isOpen && !collapsed} timeout="auto" unmountOnExit>
                  <List 
                    component="div" 
                    disablePadding 
                    dense
                    sx={{ 
                      py: 1,
                      backgroundColor: '#B1D2D2'
                    }}
                  >
                    {it.children?.map((child) => (
                      <ListItemButton
                        key={child.key}
                        selected={selected === child.key}
                        onClick={() => {
                          /* 하위 메뉴 새창 */
                          if (child.isExternal) {
                            window.open(child.key, '_blank');
                          } else {
                            onSelect?.(child.key);
                          }
                        }}
                        sx={{ 
                          pl: collapsed ? 1.5 : 3,
                          backgroundColor: '#B1D2D2',
                          '&:hover': {
                            backgroundColor: '#9DBFBF',
                            '& .MuiTypography-root': {
                              fontWeight: 700,
                            },
                          },
                          /* 선택되었을 때 */
                          '&.Mui-selected .MuiTypography-root': {
                            fontWeight: 700,
                          }
                         }}
                      >
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{
                            noWrap: true,
                            fontSize: 17,
                            fontWeight: 400,
                            sx: { opacity: collapsed ? 0 : 1 },
                          }}
                        />

                        {/* 3. 새창 아이콘 추가 위치 */}
                        {!collapsed && child.isExternal && (
                          <OpenInNewIcon 
                            className="external-icon"
                            sx={{ 
                              fontSize: 16,
                              ml: 0.8,
                              transition: 'opacity 0.2s',
                              color: 'inherit' 
                            }} 
                          />
                        )}
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