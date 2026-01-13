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

    // 버튼 설정 베이스
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // 클릭 시 회색 원(물결)이 퍼지는 것 방지
        disableTouchRipple: true, // 터치 시 발생하는 효과까지 차단
      },
      styleOverrides: {
        root: {
          // 탭 키로 이동했을 때만 생기는 테두리
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent !important', // 배경 원 제거
            outline: '1px solid #087C80',
            outlineOffset: '2px',
          },
        },
      },
    },
    
    // 버튼 설정
    MuiButton: {
      defaultProps: { 
        disableElevation: true,
        size: 'medium'
      },
      styleOverrides: {
        root: { 
          textTransform: 'none', 
          fontWeight: 600, 
          borderRadius: 8, 
          boxShadow: 'none',
          // 모든 버튼 공통 호버 스타일
          '&:hover': { boxShadow: 'none' },
        },
        text: {
          padding: 0,
          minWidth: 'auto',
          height: 'auto',
          backgroundColor: 'transparent',
          color: '#1E2124',
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          },
        },
        sizeMedium: { 
          height: 48, 
          fontSize: 15, 
          padding: '0 20px',
          '@media (max-width: 599px)': { height: 44, padding: '0 16px' },
        },
        sizeSmall: { height: 36, fontSize: 13, padding: '0 12px' },
        sizeLarge: { height: 56, fontSize: 17, padding: '0 24px' },
        outlined: { borderColor: '#58616A', color: '#464C53' },
      },
    },

    // 인풋 설정
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { boxShadow: 'none' },
          '&.MuiInputBase-sizeLarge': { height: 56 },
        },
      },
    },

    // --- 체크박스 네모박스 스타일 커스텀 ---
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true, 
        disableFocusRipple: true, // 포커스 시 웨이브 제거
      },
      styleOverrides: {
        root: {
          padding: 8,
          backgroundColor: 'transparent !important',
          '&:hover, &.Mui-checked:hover': {
            backgroundColor: 'transparent !important',
          },
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent !important',
            outline: 'none',
            '&::before': {
              boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px #087C80',
            },
          },
          '& .MuiSvgIcon-root': { display: 'none' }, // 기본 SVG 아이콘 숨기기
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
          '&.Mui-checked': {
            '&::before': { backgroundColor: '#087C80', borderColor: '#087C80' },
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 10,
              height: 5,
              borderLeft: '2px solid #ffffff',
              borderBottom: '2px solid #ffffff',
              transform: 'rotate(-45deg)',
              marginTop: '-2px',
              display: 'block',
            },
          },
        },
      },
    },

    // 라디오 설정
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#D8D8D8',
          '&.Mui-checked': { color: '#087C80' },
          '&:hover': { backgroundColor: 'rgba(8, 124, 128, 0.04)' },
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
      styleOverrides: { paper: { border: '1px solid #D8D8D8', boxShadow: 'none' } },
    },
  },
});
