import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ThemeProvider,
  IconButton,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { muiTheme } from '@/styles/muiTheme'

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

/** No-backdrop: showDialog, showAlert, showConfirm. With-backdrop: showDialogBackdrop, showAlertBackdrop, showConfirmBackdrop. */
export interface DialogContextType {
  /** No-backdrop Dialog */
  showDialog: (options: DialogOptions) => void
  showAlert: (message: string, title?: string, onConfirm?: () => void) => void
  showConfirm: (message: string, title?: string, onConfirm?: () => void, onCancel?: () => void) => void
  /** With-backdrop (overlay) Dialog */
  showDialogBackdrop: (options: DialogOptions) => void
  showAlertBackdrop: (message: string, title?: string, onConfirm?: () => void) => void
  showConfirmBackdrop: (message: string, title?: string, onConfirm?: () => void, onCancel?: () => void) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

const defaultOptions: DialogOptions = { message: '', type: 'alert' }

export function DialogProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()

  // --- No-backdrop (independent state) ---
  const [openNoBackdrop, setOpenNoBackdrop] = useState(false)
  const [optionsNoBackdrop, setOptionsNoBackdrop] = useState<DialogOptions>(defaultOptions)

  // --- With-backdrop (independent state) ---
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [optionsBackdrop, setOptionsBackdrop] = useState<DialogOptions>(defaultOptions)

  const baseOpts = useMemo(
    () => ({
      confirmText: t('confirm'),
      cancelText: t('cancel'),
    }),
    [t]
  )

  // ----- No-backdrop APIs -----

  const showDialog = useCallback(
    (options: DialogOptions) => {
      setOptionsNoBackdrop({ type: 'alert', ...baseOpts, ...options })
      setOpenNoBackdrop(true)
    },
    [baseOpts]
  )

  const showAlert = useCallback(
    (message: string, title?: string, onConfirm?: () => void) => {
      showDialog({
        message,
        title: title || t('alert'),
        type: 'alert',
        onConfirm,
      })
    },
    [showDialog, t]
  )

  const showConfirm = useCallback(
    (message: string, title?: string, onConfirm?: () => void, onCancel?: () => void) => {
      showDialog({
        message,
        title: title || t('confirm'),
        type: 'confirm',
        onConfirm,
        onCancel,
      })
    },
    [showDialog, t]
  )

  const handleCloseNoBackdrop = useCallback(() => {
    setOpenNoBackdrop(false)
    optionsNoBackdrop.onCancel?.()
  }, [optionsNoBackdrop])

  const handleConfirmNoBackdrop = useCallback(() => {
    setOpenNoBackdrop(false)
    optionsNoBackdrop.onConfirm?.()
  }, [optionsNoBackdrop])

  // ----- With-backdrop APIs -----

  const showDialogBackdrop = useCallback(
    (options: DialogOptions) => {
      setOptionsBackdrop({ type: 'alert', ...baseOpts, ...options })
      setOpenBackdrop(true)
    },
    [baseOpts]
  )

  const showAlertBackdrop = useCallback(
    (message: string, title?: string, onConfirm?: () => void) => {
      showDialogBackdrop({
        message,
        title: title || t('alert'),
        type: 'alert',
        onConfirm,
      })
    },
    [showDialogBackdrop, t]
  )

  const showConfirmBackdrop = useCallback(
    (message: string, title?: string, onConfirm?: () => void, onCancel?: () => void) => {
      showDialogBackdrop({
        message,
        title: title || t('confirm'),
        type: 'confirm',
        onConfirm,
        onCancel,
      })
    },
    [showDialogBackdrop, t]
  )

  const handleCloseBackdrop = useCallback(() => {
    setOpenBackdrop(false)
    optionsBackdrop.onCancel?.()
  }, [optionsBackdrop])

  const handleConfirmBackdrop = useCallback(() => {
    setOpenBackdrop(false)
    optionsBackdrop.onConfirm?.()
  }, [optionsBackdrop])

  const value = useMemo(
    () => ({
      showDialog,
      showAlert,
      showConfirm,
      showDialogBackdrop,
      showAlertBackdrop,
      showConfirmBackdrop,
    }),
    [
      showDialog,
      showAlert,
      showConfirm,
      showDialogBackdrop,
      showAlertBackdrop,
      showConfirmBackdrop,
    ]
  )

  return (
    <ThemeProvider theme={muiTheme}>
      <DialogContext.Provider value={value}>
        {children}

        {/* No-backdrop: independent state, does not affect backdrop modal */}
        <Dialog
          className="common-alert"
          open={openNoBackdrop}
          onClose={handleCloseNoBackdrop}
          maxWidth="xs"
          fullWidth
          hideBackdrop
          disableEscapeKeyDown={optionsNoBackdrop.type === 'alert'}
        >
          {optionsNoBackdrop.title && (
            <DialogTitle className="modal-title">
              <h2>{optionsNoBackdrop.title}</h2>
            </DialogTitle>
          )}
          <DialogContent className="modal-content">{optionsNoBackdrop.message}</DialogContent>
          <DialogActions className="modal-footer">
            {optionsNoBackdrop.type === 'confirm' && (
              <Button variant="outlined02" onClick={handleCloseNoBackdrop}>
                {optionsNoBackdrop.cancelText ?? baseOpts.cancelText}
              </Button>
            )}
            <Button variant="contained" onClick={handleConfirmNoBackdrop} autoFocus>
              {optionsNoBackdrop.confirmText ?? baseOpts.confirmText}
            </Button>
          </DialogActions>
        </Dialog>

        {/* With-backdrop: independent state, does not affect no-backdrop modal */}
        <Dialog
          open={openBackdrop}
          onClose={handleCloseBackdrop}
          maxWidth="md"
          fullWidth
          disableEscapeKeyDown={optionsBackdrop.type === 'alert'}
        >
          {optionsBackdrop.title && (
            <DialogTitle component="div" className="modal-title">
              <h2>{optionsBackdrop.title}</h2>
              <IconButton aria-label={t('close')} onClick={handleCloseBackdrop} className="btn-modal-close">
                <CloseIcon aria-hidden="true" />
              </IconButton>
            </DialogTitle>
          )}
          <DialogContent className="modal-content">
            <Typography variant="body1">{optionsBackdrop.message}</Typography>
          </DialogContent>
          <DialogActions className="modal-footer">
            {optionsBackdrop.type === 'confirm' && (
              <Button variant="outlined02" onClick={handleCloseBackdrop}>
                {optionsBackdrop.cancelText ?? baseOpts.cancelText}
              </Button>
            )}
            <Button variant="contained" onClick={handleConfirmBackdrop} autoFocus>
              {optionsBackdrop.confirmText ?? baseOpts.confirmText}
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
