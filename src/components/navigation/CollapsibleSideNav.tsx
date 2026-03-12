import { LnbItem } from '@/features/auth/MenuTypes';
import { ExpandMore, Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';
import ChevronRight from '@mui/icons-material/ChevronRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Collapse, Drawer, IconButton, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

export type CollapsibleNavItem = {
  key: string
  label: string
  disabled?: boolean
  isExternal?: boolean
  originalKey?: string // 원본 key (onSelect에서 사용)
  children?: CollapsibleNavItem[] // 하위 메뉴 추가
}

type Props = {
  title: string
  collapsed: boolean
  onToggle: () => void
  items?: CollapsibleNavItem[]
  /** LnbItem[] 형태의 메뉴 구조 (lnbStructor) */
  lnbStructor?: LnbItem[]
  selectedKey?: string
  width?: number
  collapsedWidth?: number
  onSelect?: (key: string) => void
}

/** LnbItem을 CollapsibleNavItem으로 변환 (key 중복 방지를 위해 index 경로 사용) */
const convertLnbItemToNavItem = (item: LnbItem, indexPath: string): CollapsibleNavItem => ({
  key: `${indexPath}:${item.key}`,
  label: item.label,
  disabled: item.disabled,
  isExternal: item.key.startsWith('http'),
  originalKey: item.key,
  children: item.children?.map((child, idx) => convertLnbItemToNavItem(child, `${indexPath}-${idx}`)),
});

/** lnbStructor 전체를 CollapsibleNavItem[]로 변환 */
const buildNavItemsFromLnbStructor = (lnbStructor: LnbItem[]): CollapsibleNavItem[] => {
  if (!lnbStructor || lnbStructor.length === 0) return [];
  return lnbStructor.map((item, idx) => convertLnbItemToNavItem(item, String(idx)));
};

export default function CollapsibleSideNav({
  title,
  collapsed,
  onToggle,
  items,
  lnbStructor,
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

  // items 또는 lnbStructor로부터 메뉴 항목 결정
  const resolvedItems: CollapsibleNavItem[] = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    if (lnbStructor && lnbStructor.length > 0) {
      return buildNavItemsFromLnbStructor(lnbStructor);
    }
    return [];
  }, [items, lnbStructor]);

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
        {resolvedItems.map((it) => {
          const isGroupHeader = (it.originalKey ?? it.key).includes('__task_group__')
          const hasChildren = !!(it.children && it.children.length > 0)
          const isOpen = openKeys[it.key] || false
          
          if (isGroupHeader) {
            return (
              <Box
                key={it.key}
                sx={{
                  display: collapsed ? 'none' : 'block',
                  px: 2,
                  py: 2.25,
                  background: '#0A6C70',
                  borderTop: '1px solid #8A949E',
                  borderBottom: '1px solid #8A949E',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {it.label}
                </Typography>
              </Box>
            )
          }

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

                  const targetKey = it.originalKey ?? it.key;

                  if (hasChildren) {
                    handleToggleOpen(it.key)
                  } else {
                    if (it.isExternal) {
                      window.open(targetKey, '_blank'); 
                    } else {
                      onSelect?.(targetKey);
                    }
                  }
                }}
                sx={{ 
                  py: '15px',
                  pr: '15px',
                  '&.Mui-disabled': {
                    opacity: 1,
                    color: 'inherit',
                    WebkitTextFillColor: 'inherit',
                  },
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
                {/* 부모 메뉴도 외부 링크면 새창 아이콘 표시 */}
                {it.isExternal && !hasChildren && !collapsed && (
                  <OpenInNewIcon 
                    sx={{ 
                      fontSize: 16,
                      ml: 0.8,
                      color: 'inherit' 
                    }} 
                  />
                )}
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
                          const targetKey = child.originalKey ?? child.key;
                          if (child.isExternal) {
                            window.open(targetKey, '_blank');
                          } else {
                            onSelect?.(targetKey);
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
