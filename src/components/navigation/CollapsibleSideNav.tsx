import { useMemo } from 'react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material'

export type CollapsibleNavItem = {
  key: string
  label: string
  disabled?: boolean
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

/**
 * Simple permanent left nav Drawer with "mini" collapsed mode.
 * Intended for admin-like screens under /screens/published.
 */
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

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: drawerWidth,
          overflowX: 'hidden',
          borderRightColor: 'divider',
        },
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
        {items.map((it) => (
          <ListItemButton
            key={it.key}
            selected={selected === it.key}
            disabled={!!it.disabled}
            onClick={() => onSelect?.(it.key)}
            sx={{ px: collapsed ? 1 : 2 }}
          >
            <ListItemText
              primary={it.label}
              primaryTypographyProps={{
                fontSize: 14,
                noWrap: true,
                sx: { opacity: collapsed ? 0 : 1 },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
