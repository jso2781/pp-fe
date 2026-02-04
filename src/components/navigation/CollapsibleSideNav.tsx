import { useMemo, useState } from 'react'
import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Typography, Collapse } from '@mui/material'
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon, ExpandLess, ExpandMore } from '@mui/icons-material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChevronRight from '@mui/icons-material/ChevronRight';

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
          background: '#fff',
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: '18px 10px', background:'#0A6C70', borderBottom: '1px solid #8A949E'}}>
        {!collapsed && (
          <Typography 
            className="nav_title"
            sx={{
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: 1.2,
              color:'#fff',
              padding: '0 0 0 5px',
            }}
          >
            {title}
          </Typography>
        )}
        <IconButton aria-label="toggle menu" onClick={onToggle} size="small" sx={{ color: '#fff' }}>
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
                borderBottom: collapsed ? 'none' : '1px solid #8A949E',
                display: collapsed ? 'none' : 'block', // 1단계 메뉴 자체를 아예 안 보이게 함
              }}
            >
              <ListItemButton
                selected={selected === it.key}
                disabled={!!it.disabled || collapsed} // 접혔을 때 비활성화
                onClick={() => {
                  // 접힌 상태에선 로직 실행 차단
                  if (collapsed) return;

                  if (hasChildren) {
                    handleToggleOpen(it.key)
                  } else {
                    if (it.isExternal) {
                      window.open(it.key, '_blank'); 
                    } else {
                      onSelect?.(it.key);
                    }
                  }
                }}
                sx={{ 
                  py: '15px',
                  pr: '15px',
                  // 접혔을 때 클릭 이벤트 차단
                  pointerEvents: collapsed ? 'none' : 'auto',
                }}
              >
                <ListItemText
                  primary={it.label}
                  primaryTypographyProps={{
                    fontSize: 18,
                    fontWeight: 700,
                    noWrap: true,
                    sx: { opacity: collapsed ? 0 : 1 },
                  }}
                />
                {!collapsed && hasChildren && (
                  isOpen 
                    ? <ExpandMore sx={{ fontSize: 30, mr: 0.2 }} /> 
                    : <ChevronRight sx={{ fontSize: 30 }} /> 
                )}
              </ListItemButton>

              {/* 하위 메뉴 리스트 */}
              {hasChildren && !collapsed && ( // collapsed일 때 렌더링 안 함
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List 
                    component="div" 
                    disablePadding 
                    dense
                    sx={{ 
                      py: '10px',
                      backgroundColor: '#F7FFFF',
                      borderTop: '1px solid #D8D8D8',
                    }}
                  >
                    {it.children?.map((child) => (
                      <ListItemButton
                        key={child.key}
                        selected={selected === child.key}
                        disabled={collapsed} // 접혔을 때 비활성화
                        onClick={() => {
                          if (collapsed) return;
                          if (child.isExternal) {
                            window.open(child.key, '_blank');
                          } else {
                            onSelect?.(child.key);
                          }
                        }}
                        sx={{ 
                          backgroundColor: '#F7FFFF',
                          pointerEvents: collapsed ? 'none' : 'auto',
                          '&:hover': {
                            backgroundColor: 'rgba(8, 124, 128, 0.25);',
                            '& .MuiTypography-root': { fontWeight: 700 },
                          },
                          '&.Mui-selected .MuiTypography-root': { fontWeight: 700 }
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

                        {child.isExternal && (
                          <OpenInNewIcon 
                            sx={{ 
                              fontSize: 16,
                              mr: 0.8,
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