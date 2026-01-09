import { createTheme } from '@mui/material/styles';
import '@mui/material/TextField';
import '@mui/material/InputBase';
import '@mui/material/FormControl';

// TypeScript 타입 확장
declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides { large: true; }
}
declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides { large: true; }
}
declare module '@mui/material/FormControl' {
  interface FormControlPropsSizeOverrides { large: true; }
}

export const muiTheme = createTheme({
  palette: {
    primary: { main: '#087C80', contrastText: '#ffffff' },
    error: { main: '#BD2C0F' },
    text: { primary: '#1E2124', secondary: '#464C53' },
    divider: '#D8D8D8',
  },
  typography: { fontFamily: "'Pretendard', sans-serif" },
  shape: { borderRadius: 8 },
  components: {
    // 모든 Paper 그림자 제거 (TableContainer 포함)
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { boxShadow: 'none' },
        outlined: { border: '1px solid #D8D8D8' },
      },
    },
    // 버튼 그림자 제거
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { 
          textTransform: 'none', 
          fontWeight: 500, 
          borderRadius: 8, 
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' }
        },
        sizeLarge: { height: 56, fontSize: 17 },
      },
    },
    // 인풋 포커스 시 그림자 제거
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            boxShadow: 'none',
          },
          '&.MuiInputBase-sizeLarge': { height: 56 },
        },
      },
    },
    // 셀렉트 팝업 그림자 제거
    MuiPopover: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        paper: { border: '1px solid #D8D8D8', boxShadow: 'none' },
      },
    },
  },
});