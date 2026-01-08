import React from 'react'
import { Button, Card, Stack, Box, Typography, Divider } from '@mui/material'
import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, DetailTemplateConfig, DetailItemConfig, DetailButtonConfig } from './templateTypes'

export default function DetailTemplate({ screenId, title, config }: TemplateBaseProps<DetailTemplateConfig>) {
  const items: DetailItemConfig[] = config?.items?.length
    ? config.items
    : [
        { key: 'item1', label: '항목1', value: '값1' },
        { key: 'item2', label: '항목2', value: '값2' },
      ]

  const buttons: DetailButtonConfig[] = config?.buttons?.length
    ? config.buttons
    : [{ key: 'back', label: '목록', onClick: () => window.history.back() }]

  return (
    <ScreenShell screenId={screenId} title={title} uiType={config?.uiType || 'detail'}>
      <Card sx={{ p: 2 }}>
        <Stack divider={<Divider flexItem />} spacing={1}>
          {items.map((it) => (
            <Box key={it.key} sx={{ display: 'flex', gap: 2, py: 1 }}>
              <Typography variant="body2" sx={{ width: 160, fontWeight: 600 }}>
                {it.label}
              </Typography>
              <Typography variant="body2">
                {it.value ?? ''}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Box sx={{ height: 12 }} />

        <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
          {buttons.map((b) => (
            <Button
              key={b.key}
              onClick={b.onClick}
              disabled={b.disabled}
              variant={(b.type as any) || 'contained'} // b.type이 'contained'/'outlined'/'text'로 오게 맞추는 걸 추천
              size="small"
            >
              {b.label}
            </Button>
          ))}
        </Stack>
      </Card>
    </ScreenShell>
  )
}
