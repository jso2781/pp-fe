import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,  Divider, ThemeProvider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { muiTheme } from '@/styles/muiTheme';

export type DialogType = 'alert' | 'confirm'

export interface DialogOptions {
  title?: string
  message: string
  type?: DialogType
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

interface DialogContextType {
  showAlert: (message: string, title?: string, onConfirm?: () => void) => void
  showConfirm: (message: string, title?: string, onConfirm?: () => void, onCancel?: () => void) => void
  showDialog: (options: DialogOptions) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [dialogOptions, setDialogOptions] = useState<DialogOptions>({
    message: '',
    type: 'alert',
  })

  const showDialog = useCallback((options: DialogOptions) => {
    setDialogOptions({
      type: 'alert',
      confirmText: t('confirm') || '확인',
      cancelText: t('cancel') || '취소',
      ...options,
    })
    setOpen(true)
  }, [t])

  const showAlert = useCallback((message: string, title?: string, onConfirm?: () => void) => {
    showDialog({
      message,
      title: title || (t('alert') || '알림'),
      type: 'alert',
      onConfirm: () => {
        setOpen(false)
        onConfirm?.()
      },
    })
  }, [showDialog, t])

  const showConfirm = useCallback((
    message: string,
    title?: string,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    showDialog({
      message,
      title: title || (t('confirm') || '확인'),
      type: 'confirm',
      onConfirm: () => {
        setOpen(false)
        onConfirm?.()
      },
      onCancel: () => {
        setOpen(false)
        onCancel?.()
      },
    })
  }, [showDialog, t])

  const handleClose = useCallback(() => {
    if (dialogOptions.type === 'alert' || dialogOptions.onCancel) {
      setOpen(false)
      dialogOptions.onCancel?.()
    }
  }, [dialogOptions])

  const handleConfirm = useCallback(() => {
    dialogOptions.onConfirm?.()
  }, [dialogOptions])

  const value = useMemo(() => ({
    showAlert,
    showConfirm,
    showDialog,
  }), [showAlert, showConfirm, showDialog])

  return (
    <ThemeProvider theme={muiTheme}>
    <DialogContext.Provider value={value}>
      {children}
      <Dialog
        className="common-alert"
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        hideBackdrop
        disableEscapeKeyDown={dialogOptions.type === 'alert'}
      >
        {dialogOptions.title && (
          <>
            <DialogTitle className="modal-title">
              <h2>{dialogOptions.title}</h2>
            </DialogTitle>
          </>
        )}
        <DialogContent className="modal-content">
            {dialogOptions.message}
        </DialogContent>
        <DialogActions className="modal-footer">
          {dialogOptions.type === 'confirm' && (
            <Button variant="outlined" onClick={handleClose}>
              {dialogOptions.cancelText || t('cancel') || '취소'}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleConfirm}
            autoFocus
          >
            {dialogOptions.confirmText || t('confirm') || '확인'}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
    </ThemeProvider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
