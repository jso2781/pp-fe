import { createSlice } from '@reduxjs/toolkit'
import { selectExprtInfo, withdrawExprt, withdrawExprtTask, applyExprtTask, selectExprtMenus } from './ExprtTaskThunks'
import { ExprtTaskFullVO } from './ExprtTaskTypes'
import { LnbItem, MenuRVO } from '../auth/MenuTypes'

/**
 * LNB용 LnbItem [] 구조체 변환
 */
function createLnbStructor(menuList: MenuRVO[]): LnbItem[] {
  if (!Array.isArray(menuList) || menuList.length === 0) {
    return [];
  }

  // menuSn을 키로 하는 맵 생성
  const menuMap = new Map<number, LnbItem>();
  // LnbItem -> menuSn 역매핑 (정렬 시 사용)
  const lnbItemToMenuSnMap = new WeakMap<LnbItem, number>();
  // menuSn -> MenuRVO 매핑 (정렬 시 menuSeq 조회용)
  const menuSnToMenuMap = new Map<number, MenuRVO>();
  const rootItems: LnbItem[] = [];

  // 먼저 모든 메뉴를 SideItem으로 변환하여 맵에 저장
  menuList.forEach((menu) => {
    if (menu.menuSn === undefined) return;

    const key = menu.menuUrlAddr || `/menu/${menu.menuSn}`;
    const sideItem: LnbItem = {
      key,
      label: menu.menuNm || '',
      disabled: menu.useYn === 'N',
      children: []
    };

    menuMap.set(menu.menuSn, sideItem);
    lnbItemToMenuSnMap.set(sideItem, menu.menuSn);
    menuSnToMenuMap.set(menu.menuSn, menu);
  });

  // 부모-자식 관계 구성
  menuList.forEach((menu) => {
    if (menu.menuSn === undefined) return;

    const sideItem = menuMap.get(menu.menuSn);
    if (!sideItem) return;

    // 상위 메뉴가 있으면 자식으로 추가, 없으면 루트로 추가
    if (menu.upMenuSn !== undefined && menu.upMenuSn !== null) {
      const parentItem = menuMap.get(menu.upMenuSn);
      if (parentItem) {
        if (!parentItem.children) {
          parentItem.children = [];
        }
        parentItem.children.push(sideItem);
      } else {
        // 부모가 맵에 없으면 루트로 추가
        rootItems.push(sideItem);
      }
    } else {
      // upMenuSn이 null이면 루트 메뉴
      rootItems.push(sideItem);
    }
  });

  // path 기준으로 정렬 (path를 파싱하여 각 레벨의 숫자로 비교)
  const parsePath = (path: string): number[] => {
    // "301 > 302" -> [301, 302], "300" -> [300]
    return path.split(' > ').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  };

  const comparePaths = (pathA: string, pathB: string): number => {
    const partsA = parsePath(pathA);
    const partsB = parsePath(pathB);
    
    // 각 레벨을 순차적으로 비교
    const minLength = Math.min(partsA.length, partsB.length);
    for (let i = 0; i < minLength; i++) {
      if (partsA[i] !== partsB[i]) {
        return partsA[i] - partsB[i];
      }
    }
    
    // 공통 부분이 같으면 길이가 짧은 것이 먼저 (부모가 자식보다 먼저)
    return partsA.length - partsB.length;
  };

  const sortByPath = (items: LnbItem[], parentMenuSn: number | null = null): LnbItem[] => {
    return items
      .map((item) => {
        // WeakMap에서 menuSn 조회
        const menuSn = lnbItemToMenuSnMap.get(item);
        if (menuSn === undefined) {
          return { item, path: '', menuSn: null };
        }
        
        // menuSn으로 MenuRVO 조회
        const menu = menuSnToMenuMap.get(menuSn);
        if (!menu) {
          return { item, path: '', menuSn: null };
        }
        
        // 부모 확인 (정확성 검증)
        if (parentMenuSn !== null) {
          if (menu.upMenuSn !== parentMenuSn) {
            // 부모가 일치하지 않으면 빈 path로 설정하여 뒤로 보냄
            return { item, path: '', menuSn };
          }
        } else {
          // 루트 레벨인 경우, upMenuSn이 null이어야 함
          if (menu.upMenuSn !== null && menu.upMenuSn !== undefined) {
            return { item, path: '', menuSn };
          }
        }
        
        const path = menu.path || '';
        return { item, path, menuSn };
      })
      .sort((a, b) => {
        // path가 없으면 뒤로
        if (!a.path && !b.path) return 0;
        if (!a.path) return 1;
        if (!b.path) return -1;
        
        // path 기준으로 정렬
        return comparePaths(a.path, b.path);
      })
      .map(({ item, menuSn }) => {
        // children이 있어도 정렬 순서는 path 기준으로 유지
        if (item.children && item.children.length > 0) {
          item.children = sortByPath(item.children, menuSn);
        }
        return item;
      });
  };

  const sortedRootItems = sortByPath(rootItems);
  const groupedItems: LnbItem[] = [];
  let previousTaskKey = '';

  sortedRootItems.forEach((item, index) => {
    const menuSn = lnbItemToMenuSnMap.get(item);
    const menu = menuSn !== undefined ? menuSnToMenuMap.get(menuSn) : undefined;
    const taskKey = menu?.taskSeCd ?? '';
    const taskLabel = menu?.taskSeNm ?? '';

    if (taskKey && taskLabel && previousTaskKey !== taskKey) {
      groupedItems.push({
        key: `__task_group__${taskKey}_${index}`,
        label: taskLabel,
        disabled: true,
        children: []
      });
      previousTaskKey = taskKey;
    }

    groupedItems.push(item);
  });

  return groupedItems;
}

/**
 * 대국민포털_전문가내업무관리 정보 조회(Redux 저장 구조) 
 */
export interface ExprtTaskState {
  current: ExprtTaskFullVO | null
  withdrawExprtResult: string | null
  withdrawExprtTaskResult: string | null
  applyExprtTaskResult: string | null
  lnbStructor: LnbItem[]
  loading: boolean
  error: string | null
}

/**
 * 대국민포털_전문가내업무관리 정보 조회(Redux 저장 구조 초기상태) 
 */
const initialState: ExprtTaskState = {
  current: null,
  withdrawExprtResult: null,
  withdrawExprtTaskResult: null,
  applyExprtTaskResult: null,
  lnbStructor: [],
  loading: false,
  error: null
}

const ExprtTaskSlice = createSlice({
  name: 'exprtTask',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectExprtInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectExprtInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(selectExprtInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load exprt info';
      })
      .addCase(withdrawExprt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawExprt.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawExprtResult = action.payload || null;
      })
      .addCase(withdrawExprt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to withdraw exprt';
      })
      .addCase(withdrawExprtTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawExprtTask.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawExprtTaskResult = action.payload || null;
      })
      .addCase(withdrawExprtTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to withdraw exprt task';
      })
      .addCase(applyExprtTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyExprtTask.fulfilled, (state, action) => {
        state.loading = false;
        state.applyExprtTaskResult = action.payload || null;
      })
      .addCase(applyExprtTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to apply exprt task';
      })
      .addCase(selectExprtMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectExprtMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.lnbStructor = createLnbStructor(action.payload.list); 
      })
      .addCase(selectExprtMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to apply exprt task';
      })      
  }
});

export const { clearCurrent } = ExprtTaskSlice.actions
export default ExprtTaskSlice.reducer
