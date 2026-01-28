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
  interface ButtonPropsVariantOverrides {
    outlined02: true;
    contained02: true;
  }
  interface ButtonPropsSizeOverrides {
    xsmall: true;
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
declare module '@mui/material/Select' {
  interface SelectPropsSizeOverrides { large: true; }
}

declare module '@mui/material/styles' {
  interface TypeText {
    main?: string;
  }
}

// 2. 테마 생성
export const muiTheme = createTheme({
  palette: {
    primary: { main: '#087C80', contrastText: '#ffffff' }, // 메인 Teal
    secondary: { main: '#464C53', contrastText: '#ffffff' }, // 보조 Gray
    gray: { main: '#D8D8D8', contrastText: '#1E2124' }, // 연한 회색
    dark: { main: '#303336', contrastText: '#ffffff' }, // 강조 검정
    error: { main: '#BD2C0F' },
    text: { primary: '#1E2124', secondary: '#464C53', main: '#087C80',},
    divider: '#D8D8D8',
  },
  typography: { 
    fontFamily: "'Pretendard GOV', sans-serif" 
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
          height: 'auto',
          fontWeight: 600, 
          borderRadius: 8, 
          boxShadow: 'none',
          lineHeight: 1.4,
          // 모든 버튼 공통 호버 스타일
          '&:hover': { boxShadow: 'none' },

          // 탭 키로 이동했을 때(Focus) 스타일 제어
          '&.Mui-focusVisible': {
            outline: '2px solid #087C80',
            outlineOffset: '2px',
            color: '#087C80'
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
          fontSize: '16px',
          padding: '0 8px',
          minWidth: 'auto',
          borderRadius: 4,
          '@media (max-width: 1024px)': { 
            fontSize: '14px', 
            padding: '0 6px', 
            minHeight: 25, 
          },
        },
        sizeSmall: { height: 36, fontSize: 13, padding: '0 12px' },
        sizeMedium: { 
          height: 48, 
          fontSize: 15, 
          padding: '0 20px',
          '@media (max-width: 1024px)': { 
            height: 44, 
            padding: '0 16px' 
          },
        },
        sizeLarge: { 
          height: 56, 
          fontSize: 17, 
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
      // --- 버튼타입 variant 추가 ---
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
      ],
    },

    // 인풋 설정
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 0, 
          boxSizing: 'border-box', // 테두리 두께를 높이에 포함시킴
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { boxShadow: 'none' },

          // 아무 사이즈도 주지 않았을 때 적용되는 기본 높이 (Medium과 동일)
          height: 48, 
          fontSize: '15px',

          // 1. Large 사이즈 (56px) -> 1024px 이하 반응형 처리
          '&.MuiInputBase-sizeLarge': {
            height: 56,
            fontSize: '17px',
            '@media (max-width: 1024px)': {
              height: 48,
              fontSize: '16px',
            },
          },
          // 2. Medium 사이즈 (명시적으로 size="medium"을 줬을 때)
          '&.MuiInputBase-sizeMedium': {
            height: 48,
            fontSize: '15px',
            '@media (max-width: 1024px)': {
              height: 44,
              fontSize: '14px',
            },
          },
          // 3. Small 사이즈 (36px)
          '&.MuiInputBase-sizeSmall': {
            height: 36,
            fontSize: '13px',
          },

          // 비활성화 상태 스타일
          '&.Mui-disabled': {
            backgroundColor: '#CDD1D5', // 아주 연한 회색 배경으로 변경
            color: '#8A949E',           // 글자색을 흐리게
            cursor: 'not-allowed',      // 마우스 커서를 '금지' 모양으로
            
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#CDD1D5 !important', // 보더 색상을 더 연하게 고정
            },
          },
        },
        input: {
          padding: '0 14px',
          height: '100% !important', // 부모(root) 높이를 그대로 따라감
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',

          // 플레이스홀더 색상 및 반응형 사이즈 설정
          '&::placeholder': {
            color: '#8A949E', // 요청하신 색상 반영
            opacity: 1,      // 브라우저 기본 투명도 해제
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
        size: 'medium', // 기본값 설정
      },
      styleOverrides: {
        select: {
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '0 !important',
          paddingBottom: '0 !important',
        },
        icon: {
          // 높이가 변해도 화살표 아이콘이 항상 중앙에 오도록 설정
          top: 'calc(50% - 12px)', 
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