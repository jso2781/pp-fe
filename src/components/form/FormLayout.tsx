import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import type { PropsWithChildren, ReactNode } from 'react'

export function FormPage({
  title,
  description,
  actions,
  children,
}: PropsWithChildren<{ title?: ReactNode; description?: ReactNode; actions?: ReactNode }>) {
  return (
    <Stack spacing={2}>
      {(title || description || actions) && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
        >
          <Box>
            {title && (
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {description}
              </Typography>
            )}
          </Box>
          {actions && <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>{actions}</Box>}
        </Stack>
      )}
      {children}
    </Stack>
  )
}

export function FormSection({
  title,
  description,
  children,
}: PropsWithChildren<{ title?: ReactNode; description?: ReactNode }>) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      {(title || description) && (
        <>
          <CardContent sx={{ pb: 1.5 }}>
            {title && (
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {description}
              </Typography>
            )}
          </CardContent>
          <Divider />
        </>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export function FieldGroup({ title, children }: PropsWithChildren<{ title?: ReactNode }>) {
  return (
    <Stack spacing={1.25}>
      {title && (
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
          {title}
        </Typography>
      )}
      <Stack spacing={1.5}>{children}</Stack>
    </Stack>
  )
}
