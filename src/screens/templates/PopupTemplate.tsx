import React, { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Divider,
} from '@mui/material'
import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, PopupTemplateConfig } from './templateTypes'

export default function PopupTemplate({
  screenId,
  title,
  config,
}: TemplateBaseProps<PopupTemplateConfig>) {
  const [open, setOpen] = useState(true)

  // 모바일 여부
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 576 : false
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const dialogTitleFontSize = useMemo(() => (isMobile ? 20 : 24), [isMobile])

  const handleOk = () => {
    if (config?.onOk) config.onOk()
    else setOpen(false)
  }

  return (
    <ScreenShell screenId={screenId} title={title} uiType="popup">
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {/* MUI는 type="primary"가 아니라 variant="contained" */}
        <Button variant="contained" onClick={() => setOpen(true)}>
          팝업 열기
        </Button>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          닫기
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: config?.width ? `${config.width}px` : undefined, // 숫자 width 대응
          },
          className: config?.wrapClassName, // 기존 wrapClassName 유지(필요 시)
        }}
      >
        <DialogTitle sx={{ fontSize: dialogTitleFontSize, pb: 1 }}>
          {title}
        </DialogTitle>

        <Divider sx={{ borderColor: '#303336' }} />

        <DialogContent sx={{ pt: 2 }}>
          {config?.content || (
            <Typography variant="body1">
              PDF 설계의 팝업 화면을 기반으로 생성된 템플릿입니다. 내부 콘텐츠 컴포넌트를 채워주세요.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            {config?.cancelText || '취소'}
          </Button>
          <Button variant="contained" onClick={handleOk}>
            {config?.okText || '확인'}
          </Button>
        </DialogActions>
      </Dialog>
    </ScreenShell>
  )
}
