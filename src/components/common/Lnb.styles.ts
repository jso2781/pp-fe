import { SxProps, Theme } from '@mui/material';

export const lnbStyles = {
  // 전체 컨테이너
  container: {
    width: '100%',
  },

  // 메인 버튼 스타일 (1차, 2차 공통 로직 포함)
  itemButton: (depth: number): SxProps<Theme> => ({
    padding: '12px 10px 12px 10px',
    borderBottom: depth === 0 ? '1px solid var(--border-1)' : 'none',
    transition: 'none',
    '&:hover': {
      backgroundColor: depth === 0 ? '#ffffff' : '#f5f5f5',
    },
    '&.Mui-selected': {
      backgroundColor: depth === 0 ? 'transparent' : '#DCF3F4',
      '& .MuiTypography-root': {
        color: 'var(--color-text-2)',
        fontWeight: 700,
        ...(depth > 0 && {
            '&::before': { backgroundColor: 'var(--color-text-2)' }
        })
      },
      '& .MuiSvgIcon-root': {
        color: 'var(--color-text-2)',
      },
      '&:hover': {
        backgroundColor: depth === 0 ? 'transparent' : '#c5ebee',
      }
    },
    // 서브메뉴 아이템일 때 추가 스타일
    ...(depth > 0 && {
        padding: '6px 10px 6px 28px',
        '&:hover': {
          backgroundColor: '#DCF3F4',
          cursor: 'pointer',
          borderRadius: '6px',
      },
    })
  }),

  // 텍스트 및 dot 스타일
  itemText: (depth: number): SxProps<Theme> => ({
    '& .MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      fontSize: depth === 0 ? '17px' : '17px',
      fontWeight: depth === 0 ? 700 : 400,
      color: 'var(--color-text-1)',
      transition: 'none',
      // 서브메뉴일 때 앞에 점 추가
      ...(depth > 0 && {
        '&::before': {
          content: '""',
          display: 'inline-block',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: '#33363D',
          marginRight: '10px',
        },
      }),
    },
  }),

  // 서브메뉴를 감싸는 박스
  collapseBox: {
    padding: '0px 0',
    backgroundColor: '#ffffff',
    margin: '0',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'none',
    marginTop: '8px', 
  }
};