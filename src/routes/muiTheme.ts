import { createTheme, PaletteColorOptions } from '@mui/material/styles';
import '@mui/material/TextField';
import '@mui/material/InputBase';
import '@mui/material/FormControl';
import '@mui/material/Button';
import '@mui/material/Checkbox';
import '@mui/material/Radio';

// 1. TypeScript 타입 확장
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

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    dark: true;
    gray: true;
  }
}

declare module '@mui/material/Radio' {
  interface RadioPropsColorOverrides {
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
    secondary: { main: '#464C53', contrastText: '#ffffff' }, // 보조 Gray
    gray: { main: '#D8D8D8', contrastText: '#1E2124' }, // 연한 회색
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
    // 모든 Paper 그림자 제거
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
        outlined: {
          borderColor: '#58616A',
          color: '#464C53',
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
    // --- 체크박스 네모박스 스타일 커스텀 ---
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 8,
          // 기본 SVG 아이콘 숨기기
          '& .MuiSvgIcon-root': {
            display: 'none',
          },
          // 1. 커스텀 네모 박스 (기본 상태)
          '&::before': {
            content: '""',
            width: 20,
            height: 20,
            borderRadius: '4px',
            border: '1px solid #58616A',
            backgroundColor: '#ffffff',
            display: 'block',
            boxSizing: 'border-box',
          },
          // 2. 체크된 상태
          '&.Mui-checked': {
            '&::before': {
              backgroundColor: '#087C80',
              borderColor: '#087C80',
            },
            // 체크 표시 (흰색 V자)
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 10,
              height: 5,
              borderLeft: '2px solid #ffffff',
              borderBottom: '2px solid #ffffff',
              transform: 'rotate(-45deg)',
              marginTop: '-2px', // V자 위치 미세 조정
              display: 'block',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(8, 124, 128, 0.04)',
          },
        },
      },
    },
    // 라디오 설정
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#D8D8D8',
          '&.Mui-checked': {
            color: '#087C80',
          },
          '&:hover': {
            backgroundColor: 'rgba(8, 124, 128, 0.04)',
          },
        },
      },
    },
    // 체크박스/라디오 라벨 간격 및 폰트 설정
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '15px',
          color: '#131416',
          marginLeft: '4px',
          userSelect: 'none', // 텍스트 드래그 방지
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