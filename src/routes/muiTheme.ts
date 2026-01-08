import { createTheme } from '@mui/material/styles'

/**
 * Global MUI theme
 * - Unifies form layout defaults (dense spacing, small controls, consistent helper text)
 * assumed font: Pretendard
 */
export const muiTheme = createTheme({
  palette: {
    primary: { main: '#087C80' },
    error: { main: '#BD2C0F' },
  },
  typography: {
    fontFamily: "'Pretendard', sans-serif",
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        margin: 'dense',
        size: 'small',
        variant: 'outlined',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        asterisk: {
          color: '#BD2C0F',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
})
