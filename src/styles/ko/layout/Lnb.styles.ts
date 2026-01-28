import { SxProps, Theme } from '@mui/material';

export const lnbStyles = {
  // 전체 컨테이너 (최상위 ul)
  container: {
    width: '100%',
    padding: 0,
    margin: 0, // ★ 추가: 최상위 ul 마진 제거
    listStyle: 'none', // ★ 추가: 리스트 스타일 제거
    // ul 바로 밑에 오는 직계 자식(li)들 중 1단 메뉴에만 보더 적용
    '& > li': {
      borderBottom: '1px solid var(--border-1)',
    },
    '& > li:last-child': {
      borderBottom: 'none',
    },
  },

  // Lnb.tsx에서 호출하는 listItem 스타일 정의
  listItem: (depth: number): SxProps<Theme> => ({
    display: 'block',
    width: '100%',
    padding: 0,
    listStyle: 'none',
  }),

  // 메인 버튼 스타일 (1차, 2차 공통 로직 포함)
  // ★ isOpen 인자를 추가했습니다.
  itemButton: (depth: number, isOpen?: boolean): SxProps<Theme> => ({
    padding: '10px 10px 10px 10px',
    transition: 'none',
    '& .MuiTypography-root': {
        fontSize: depth === 0 ? '17px' : '17px',
        // ★ 핵심: 1단 메뉴(depth 0)이고 열려있으면(isOpen) 녹색 적용
        color: (depth === 0 && isOpen) ? 'var(--color-text-2)' : 'var(--color-text-1)',
        fontWeight: depth === 0 ? 700 : 400,
    },
    '&:hover': {
      backgroundColor: depth === 0 ? '#ffffff' : '#f5f5f5',
      '& .MuiTypography-root': {
       color: 'var(--color-text-2)',
      },
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
        padding: '6px 10px 6px 15px',
        '&:hover': {
        backgroundColor: '#DCF3F4',
        cursor: 'pointer',
        borderRadius: '6px',
        '& .MuiTypography-root': {
            fontWeight: 700,
        },
      },
    })
  }),

  // 텍스트 및 dot 스타일
  itemText: (depth: number, isOpen?: boolean): SxProps<Theme> => ({
    '& .MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
      fontSize: depth === 0 ? '17px' : '17px',
      fontWeight: depth === 0 ? 700 : 400,
      // ★ 중요: 버튼과 동일하게 열림 상태일 때 녹색으로 지정 (이게 없으면 안 바뀜)
      color: (depth === 0 && isOpen) ? 'var(--color-text-2)' : 'var(--color-text-1)',
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
    marginBottom: '5px',
    '& ul': {
      padding: 0,
      margin: 0,
      listStyle: 'none',
    },
  }
};