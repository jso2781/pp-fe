import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Menu as MenuIcon } from '@mui/icons-material'

export type SideNavItem = {
  key: string
  label: string
  href?: string
  disabled?: boolean
}

type Props = {
  title: string
  items: SideNavItem[]
  selectedKey?: string
  /** optional extra className for the wrapper */
  className?: string
}

/**
 * Page-level side navigation with a responsive Drawer (mobile) + Card/List (desktop).
 * - Uses react-router navigation for internal hrefs.
 */
export default function SectionSideNav({ title, items, selectedKey, className }: Props) {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [open, setOpen] = useState(false)

  const resolvedSelected = useMemo(() => {
    if (selectedKey) return selectedKey
    const firstEnabled = items.find((i) => !i.disabled)
    return firstEnabled?.key
  }, [items, selectedKey])

  const content = (
    <Stack sx={{ width: isMdUp ? 'auto' : 280 }}>
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={800}>
          {title}
        </Typography>
      </Box>
      <Divider />
      <List dense disablePadding>
        {items.map((it) => {
          const isSelected = resolvedSelected === it.key
          return (
            <ListItemButton
              key={it.key}
              selected={isSelected}
              disabled={!!it.disabled}
              onClick={() => {
                if (it.disabled) return
                const href = it.href ?? it.key
                if (href.startsWith('http')) {
                  window.open(href, '_blank', 'noreferrer')
                } else {
                  navigate(href)
                }
                setOpen(false)
              }}
            >
              <ListItemText primary={it.label} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          )
        })}
      </List>
    </Stack>
  )

  if (isMdUp) {
    return (
      <Card className={className} variant="outlined" sx={{ borderRadius: 2 }}>
        {content}
      </Card>
    )
  }

  return (
    <Box className={className}>
      <IconButton aria-label={`${title} 메뉴`} onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        {content}
      </Drawer>
    </Box>
  )
}
