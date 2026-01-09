import { createTheme, PaletteColorOptions } from '@mui/material/styles';
import '@mui/material/TextField';
import '@mui/material/InputBase';
import '@mui/material/FormControl';
import '@mui/material/Button';

// 1. TypeScript 타입 확장 (기존 인풋 사이즈 + 새로운 버튼 색상)
declare module '@mui/material/styles' {
  interface Palette {
    dark: Palette['primary'];
    gray: Palette['primary'];
  }
  interface PaletteOptions {
    dark?: PaletteColorOptions;
    gray?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark: true;
    gray: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides { large: true; }
}
declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides { large: true; }
}
declare module '@mui/material/FormControl' {
  interface FormControlPropsSizeOverrides { large: true; }
}

// 2. 테마 생성
export const muiTheme = createTheme({
  palette: {
    primary: { main: '#087C80', contrastText: '#ffffff' }, // 메인 Teal
    secondary: { main: '#464C53', contrastText: '#ffffff' }, // 보조 Gray (깊은색)
    gray: { main: '#D8D8D8', contrastText: '#1E2124' }, // 연한 회색 (취소 등)
    dark: { main: '#303336', contrastText: '#ffffff' }, // 강조 검정
    error: { main: '#BD2C0F' },
    text: { primary: '#1E2124', secondary: '#464C53' },
    divider: '#D8D8D8',
  },
  typography: { 
    fontFamily: "'Pretendard', sans-serif" 
  },
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
    // 버튼 설정
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { 
          textTransform: 'none', 
          fontWeight: 600, 
          borderRadius: 8, 
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' }
        },
        sizeLarge: { height: 56, fontSize: 17, padding: '0 32px' },
        // Outlined 버튼의 기본 테두리 색상을 divider 색상과 맞춤
        outlined: {
          borderColor: '#D8D8D8',
        }
      },
    },
    // 인풋 설정
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
    // 셀렉트 팝업 설정
    MuiPopover: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        paper: { border: '1px solid #D8D8D8', boxShadow: 'none' },
      },
    },
  },
});