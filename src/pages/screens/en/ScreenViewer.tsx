import React, { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Typography } from '@mui/material';
import { screensEn } from '@/screens/meta'
import { screenComponentLoaders } from '@/screens/generated/en'

const { Paragraph } = Typography

export default function ScreenViewer() {
  const { screenId } = useParams()

  if (!screenId) return <Navigate to="/en/screens" replace />

  const screen = useMemo(() => screensEn.find((s) => s.id === screenId), [screenId])
  if (!screen) return <Navigate to="/en/screens" replace />

  const loader = screenComponentLoaders[screenId as keyof typeof screenComponentLoaders]
  if (!loader) {
    return (
      <div style={{ padding: 16 }}>
        <Paragraph>컴포넌트 로더를 찾을 수 없습니다: {screenId}</Paragraph>
      </div>
    )
  }

  const Comp = React.lazy(loader)

  return (
    <React.Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>
      <Comp />
    </React.Suspense>
  )
}
