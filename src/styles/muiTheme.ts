import { createTheme, PaletteColorOptions } from '@mui/material/styles';
import '@mui/material/TextField';
import '@mui/material/InputBase';
import '@mui/material/FormControl';
import '@mui/material/Button';
import '@mui/material/Checkbox';
import '@mui/material/Radio';

// 1. TypeScript 타입 확장 (기존 유지)
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
  interface ButtonPropsColorOverrides { dark: true; gray: true; }
  interface ButtonPropsVariantOverrides { outlined02: true; outlined03: true; outlined04: true; contained02: true; }
  interface ButtonPropsSizeOverrides { xsmall: true; }
}

declare module '@mui/material/Checkbox' { interface CheckboxPropsColorOverrides { dark: true; gray: true; } }
declare module '@mui/material/Radio' { interface RadioPropsColorOverrides { dark: true; gray: true; } }
declare module '@mui/material/TextField' { interface TextFieldPropsSizeOverrides { large: true; } }
declare module '@mui/material/InputBase' { interface InputBasePropsSizeOverrides { large: true; } }
declare module '@mui/material/FormControl' { interface FormControlPropsSizeOverrides { large: true; } }
declare module '@mui/material/Select' { interface SelectPropsSizeOverrides { large: true; } }
declare module '@mui/material/styles' { interface TypeText { main?: string; } }

// 2. 테마 생성
export const muiTheme = createTheme({
  palette: {
    primary: { main: '#087C80', contrastText: '#ffffff' },
    secondary: { main: '#464C53', contrastText: '#ffffff' },
    gray: { main: '#D8D8D8', contrastText: '#1E2124' },
    dark: { main: '#303336', contrastText: '#ffffff' },
    error: { main: '#BD2C0F' },
    text: { primary: '#1E2124', secondary: '#464C53', main: '#087C80',},
    divider: '#D8D8D8',
  },
  typography: { 
    fontFamily: "'Pretendard GOV', sans-serif" 
  },
  shape: { borderRadius: 8 },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { boxShadow: 'none' },
        outlined: { border: '1px solid #D8D8D8' },
      },
    },

    //페이징
    MuiPaginationItem: {
    styleOverrides: {
      root: {
        // 1. 기본 상태
        color: '#1E2124', 
        
        // 2. 선택된 상태
        '&.Mui-selected': {
          backgroundColor: '#1E2124',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#33373a',
          },
        },
        
        // 3. 비활성화(Disabled) 상태
        '&.Mui-disabled': {
          opacity: 1, 
          color: '#717375', 
        },
      },
    },
  },

    // 버튼 설정 베이스
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          cursor: 'pointer !important',
          '&.Mui-focusVisible': {
            backgroundColor: 'transparent !important',
            outline: '1px solid #087C80',
            outlineOffset: '2px',
          },
          '&.Mui-disabled': {
            cursor: 'not-allowed !important',
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
          height: 'auto',
          fontWeight: 600, 
          borderRadius: 8, 
          boxShadow: 'none',
          lineHeight: 1.4,
          gap: '2px',
          '&:hover': { boxShadow: 'none' },
          '&.Mui-focusVisible': {
            outline: '2px solid #087C80',
            outlineOffset: '2px',
            color: '#087C80'
          },
          '&.s-lg': {
            fontSize: '18px !important',
          },
        },
        // --- startIcon, endIcon 마진 및 크기 제어 ---
        startIcon: {
          marginRight: 0,
        },
        endIcon: {
          marginLeft: 0,
          '& svg': {
            fontSize: '1.2rem',
          },
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
        ['sizeXsmall' as any]: { 
          minHeight: 32,
          fontWeigh: 400,
          fontSize: '13px',
          padding: '0 8px',
          minWidth: 'auto',
          borderRadius: 4,
          '@media (max-width: 1024px)': { 
            fontSize: '14px', 
            padding: '0 6px', 
            minHeight: 25, 
          },
        },
        sizeSmall: { height: 36, fontSize: 14, padding: '0 12px' },
        sizeMedium: { 
          height: 48, 
          fontSize: 16, 
          padding: '0 20px',
          '@media (max-width: 1024px)': { 
            height: 44, 
            padding: '0 16px' 
          },
        },
        sizeLarge: { 
          height: 56, 
          fontSize: 19, 
          padding: '0 24px',
          '@media (max-width: 1024px)': {
            height: 48,
            fontSize: 16,
            padding: '0 20px',
          }
        },
        outlined: { 
          borderColor: '#087C80', 
          color: '#087C80',
          backgroundColor: '#fff',
          '&:hover': {
            borderColor: '#087C80',
            backgroundColor: '#EDF8F8', 
            color: '#087C80', 
            boxShadow: 'none',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained02' },
          style: {
            color: '#ffffff',
            backgroundColor: '#414343',
            border: 'none',
            '&:hover': {
              backgroundColor: '#363A3A', 
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'outlined02' },
          style: {
            color: '#1E2124', 
            border: '1px solid #1E2124',
            backgroundColor: '#fff',
            '&:hover': {
              color: '#1E2124',
              borderColor: '#1E2124',
              backgroundColor: '#CDD1D5', 
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'outlined03' },
          style: {
            color: '#0B50D0', 
            border: '1px solid #0B50D0',
            backgroundColor: '#fff',
            '&:hover': {
              color: '#0B50D0',
              borderColor: '#0B50D0',
              backgroundColor: 'rgba(11, 80, 208, 0.2)',
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'outlined04' },
          style: {
            color: '#F05F42', 
            border: '1px solid #F05F42',
            backgroundColor: '#fff',
            '&:hover': {
              color: '#F05F42',
              borderColor: '#F05F42',
              backgroundColor: 'rgba(241, 226, 223, 0.2)',
              boxShadow: 'none',
            },
          },
        },
      ],
    },

    // 인풋 설정
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 0, 
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { boxShadow: 'none' },
          height: 48, 
          fontSize: '15px',
          '&.MuiInputBase-multiline': {
            height: 'auto',
            padding: '16px 0px',
          },
          '&.MuiInputBase-sizeLarge': {
            height: 56,
            fontSize: '17px',
            '&.MuiInputBase-multiline': { height: 'auto' }, 
            '@media (max-width: 1024px)': {
              height: 48,
              fontSize: '16px',
            },
          },
          '&.MuiInputBase-sizeMedium': {
            height: 48,
            fontSize: '15px',
            '@media (max-width: 1024px)': {
              height: 44,
              fontSize: '14px',
            },
          },
          '&.MuiInputBase-sizeSmall': {
            height: 36,
            fontSize: '13px',
          },
          '&.Mui-disabled': {
            backgroundColor: '#CDD1D5',
            color: '#8A949E',
            cursor: 'not-allowed !important',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#CDD1D5 !important',
            },
          },
        },
        input: {
          padding: '0 14px',
          height: '100% !important',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          '&::placeholder': {
            color: '#8A949E',
            opacity: 1,
            textOverflow: 'ellipsis', 
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            '@media (max-width: 1024px)': {
              fontSize: '14px',
            },
            '@media (max-width: 600px)': {
              fontSize: '13px',
            },
          },
        },
      },
    },

    //셀렉트박스
    MuiSelect: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
        select: {
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '0 !important',
          paddingBottom: '0 !important',
          cursor: 'pointer !important',
          backgroundColor: '#ffffff',
          '&.Mui-disabled': {
            backgroundColor: '#CDD1D5 !important', 
            color: '#8A949E !important',   
            cursor: 'not-allowed !important', 
          },
        },
        icon: {
          top: 'calc(50% - 12px)', 
        },
      },
    },

    // 체크박스
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true, 
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 8,
          backgroundColor: 'transparent !important',
          cursor: 'pointer !important',
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
          '& .MuiSvgIcon-root': { display: 'none' },
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
          cursor: 'pointer !important',
          '&.Mui-checked': { color: '#087C80' },
          '&:hover': { backgroundColor: 'rgba(8, 124, 128, 0.04)' },
        },
      },
    },

    // 체크박스/라디오 라벨 간격 및 폰트 설정
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          cursor: 'pointer !important',
        },
        label: {
          fontSize: '15px',
          color: '#131416',
          marginLeft: '4px',
          userSelect: 'none',
          cursor: 'pointer !important',
        },
      },
    },

    // 셀렉트 메뉴 아이템 커서 추가
    MuiMenuItem: {
      styleOverrides: {
        root: {
          cursor: 'pointer !important',
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