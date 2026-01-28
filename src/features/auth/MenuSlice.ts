import { createSlice } from '@reduxjs/toolkit'
import { selectMenuList, getMenu, insertMenu, updateMenu, saveMenu, deleteMenu } from './MenuThunks'
import { mockMenuList, MenuPVO, MenuRVO, MenuListPVO, MenuListRVO, MenuDVO, SideItem } from './MenuTypes'

/**
 * LNB용 SideItem 구조체 변환
 */
function createLnbStructor(menuList: MenuRVO[]): SideItem[] {
  if (!Array.isArray(menuList) || menuList.length === 0) {
    return [];
  }

  // menuSn을 키로 하는 맵 생성
  const menuMap = new Map<number, SideItem>();
  const rootItems: SideItem[] = [];

  // 먼저 모든 메뉴를 SideItem으로 변환하여 맵에 저장
  menuList.forEach((menu) => {
    if (menu.menuSn === undefined) return;

    const key = menu.menuUrlAddr || `/menu/${menu.menuSn}`;
    const sideItem: SideItem = {
      key,
      label: menu.menuNm || '',
      disabled: menu.useYn === 'N',
      children: []
    };

    menuMap.set(menu.menuSn, sideItem);
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

  // menuSeq 기준으로 정렬
  const sortByMenuSeq = (items: SideItem[]): SideItem[] => {
    return items
      .map((item) => {
        const menu = menuList.find((m) => {
          if (item.key.startsWith('/menu/')) {
            const menuSn = parseInt(item.key.replace('/menu/', ''));
            return m.menuSn === menuSn;
          }
          return m.menuUrlAddr === item.key;
        });

        return { item, menuSeq: menu?.menuSeq || 0 };
      })
      .sort((a, b) => a.menuSeq - b.menuSeq)
      .map(({ item }) => {
        if (item.children && item.children.length > 0) {
          item.children = sortByMenuSeq(item.children);
        }
        return item;
      });
  };

  return sortByMenuSeq(rootItems);
}

/**
 * 대국민포털_메뉴기본 정보 목록 조회(Redux 저장 구조) 
 */
export interface MenuState {
  list: MenuRVO[]
  totalCount: number | null
  current: MenuRVO | null
  loading: boolean
  error: string | null

  langSeCd: string | null
  loaded: boolean
  menuStructor: SideItem[]
}

/**
 * 대국민포털_메뉴기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: MenuState = {
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null,

  langSeCd: null,
  loaded: false,
  menuStructor: []
}

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.current = null;
    },

    // ✅ (선택) 캐시 초기화가 필요할 때 쓰기
    clearMenuCache: (state) => {
      state.list = [];
      state.totalCount = null;
      state.langSeCd = null;
      state.loaded = false;
      state.error = null;
      state.menuStructor = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectMenuList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectMenuList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.list;
        state.totalCount = action.payload.totalCount;
        
        // Lnb menuStructor 저장
        state.menuStructor = createLnbStructor(action.payload.list);     

        // 어떤 언어로 로딩됐는지 기록 + loaded
        state.langSeCd = action.meta.arg?.langSeCd ?? state.langSeCd ?? null;
        state.loaded = true;
      })
      .addCase(selectMenuList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load notice list';

        // 실패 시 loaded는 상황에 따라 유지/해제 선택 가능
        // state.loaded = false;
      })
      .addCase(getMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload || null;
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to load notice';
      })
      .addCase(insertMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertMenu.fulfilled, (state, action) => {
        state.loading = false;
        //const created = action.payload;
        //state.current = created || null;
        //if(created) {
        //  state.list = [created, ...state.list];
        //  state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //}
      })
      .addCase(insertMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to insert Menu';
      })
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        //state.current = updated || null;
        //if(updated?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(updated.id));
        //  if(idx >= 0)state.list[idx] = { ...state.list[idx], ...updated };
        //}
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to update Menu';
      })
      .addCase(saveMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveMenu.fulfilled, (state, action) => {
        state.loading = false;
        //const saved = action.payload;
        //state.current = saved || null;
        //if(saved?.id !== undefined) {
        //  const idx = state.list.findIndex((n) => String(n.id) === String(saved.id));
        //  if(idx >= 0){
        //    state.list[idx] = { ...state.list[idx], ...saved };
        //  }else if(saved) {
        //    state.list = [saved, ...state.list];
        //    state.totalCount = (state.totalCount ?? state.list.length) + 1;
        //  }
        //}
      })
      .addCase(saveMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to save Menu';
      })
      .addCase(deleteMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.loading = false;
        //const deletedId = action.payload;
        //state.list = state.list.filter((n) => String(n.id) !== String(deletedId))
        //if (state.current && String(state.current.id) === String(deletedId)) {
        //  state.current = null;
        //}
        //if(typeof state.totalCount === 'number')state.totalCount = Math.max(0, state.totalCount - 1);
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error?.message || 'Failed to delete Menu';
      })
  }
});

export const { clearCurrent, clearMenuCache } = MenuSlice.actions
export default MenuSlice.reducer
