import { createSlice } from '@reduxjs/toolkit'
import { selectMenuList, getMenu, insertMenu, updateMenu, saveMenu, deleteMenu } from './MenuThunks'
import { mockMenuList, MenuPVO, MenuRVO, MenuListPVO, MenuListRVO, MenuDVO, LnbItem, GnbDepth1Item, MenuListForGnb, GnbDepth3Item, GnbDepth2Item } from './MenuTypes'

/** GNB/LNB 등 UI에 표시하지 않는 메뉴유형(사용자기본메뉴, 관리자기본메뉴 기준) */
const MENU_TYPE_CD_HIDDEN_FROM_UI = 'Z'

function isMenuHiddenFromUi(menu: MenuRVO): boolean {
  const t = menu.menuTypeCd
  if (t == null || t === '') return false
  return String(t).trim() === MENU_TYPE_CD_HIDDEN_FROM_UI
}

function filterMenuListForUi(menuList: MenuRVO[]): MenuRVO[] {
  return menuList.filter((m) => !isMenuHiddenFromUi(m))
}

/**
 * GNB용 GnbDepth1Item [] 구조체 변환
 */
function createGnbStructor(
  menuList: MenuRVO[]
): GnbDepth1Item[] {
  // 빈 배열이면 빈 배열 반환
  if (!Array.isArray(menuList) || menuList.length === 0) {
    return []
  }

  // depLevel별로 메뉴 분류 (필수 필드가 있는 메뉴만 필터링)
  const depth1Menus = menuList.filter(
    (menu) => menu.depLevel === 1 && menu.menuSn !== undefined && menu.menuNm !== undefined
  )
  const depth2Menus = menuList.filter(
    (menu) => menu.depLevel === 2 && menu.menuSn !== undefined && menu.menuNm !== undefined
  )
  const depth3Menus = menuList.filter(
    (menu) => menu.depLevel === 3 && menu.menuSn !== undefined && menu.menuNm !== undefined
  )
  const depth4Menus = menuList.filter(
    (menu) => menu.depLevel === 4 && menu.menuSn !== undefined && menu.menuNm !== undefined
  )

  // rootSn 순서대로 depth1 메뉴 정렬
  depth1Menus.sort((a, b) => {
    // rootSn이 같으면 menuSeq로 정렬, 없으면 menuSn으로 정렬
    const aRootSn = a.rootSn ?? 0
    const bRootSn = b.rootSn ?? 0
    if (aRootSn !== bRootSn) {
      return aRootSn - bRootSn
    }
    const aSeq = a.menuSeq ?? a.menuSn ?? 0
    const bSeq = b.menuSeq ?? b.menuSn ?? 0
    return aSeq - bSeq
  })

  // depth1 메뉴별로 변환
  const result: GnbDepth1Item[] = depth1Menus.map((depth1Menu) => {
    // 해당 depth1 메뉴의 하위 depth2 메뉴들 찾기
    const childDepth2Menus = depth2Menus
      .filter((menu) => menu.upMenuSn === depth1Menu.menuSn)
      .sort((a, b) => {
        const aSeq = a.menuSeq ?? a.menuSn ?? 0
        const bSeq = b.menuSeq ?? b.menuSn ?? 0
        return aSeq - bSeq
      })

    // depth2 메뉴별로 변환
    const depth2Items: GnbDepth2Item[] = childDepth2Menus.map((depth2Menu) => {
      // 해당 depth2 메뉴의 하위 depth3 메뉴들 찾기
      const childDepth3Menus = depth3Menus
        .filter((menu) => menu.upMenuSn === depth2Menu.menuSn)
        .sort((a, b) => {
          const aSeq = a.menuSeq ?? a.menuSn ?? 0
          const bSeq = b.menuSeq ?? b.menuSn ?? 0
          return aSeq - bSeq
        })

      // depth3 항목들을 수집
      // 1. depLevel=3이면서 menuUrlAddr이 있는 항목들 (직접 페이지)
      // 2. depLevel=3이면서 menuUrlAddr이 없고, 하위에 depLevel=4가 있는 경우 → depLevel=4 항목들을 depth3로 사용
      // 3. depLevel=3이면서 menuUrlAddr이 없고, 하위에 depLevel=4가 없는 경우 → 빈 배열
      const depth3Items: GnbDepth3Item[] = []

      childDepth3Menus.forEach((depth3Menu) => {
        // depLevel=3이면서 menuUrlAddr이 있는 경우 → 직접 depth3 항목으로 추가
        if (depth3Menu.menuUrlAddr && depth3Menu.menuNm) {
          const menuSn = depth3Menu.menuSn;
          const url = depth3Menu.menuUrlAddr;
          const isNewWindow = url.startsWith('http://') || url.startsWith('https://');

          /* 메뉴상세 정보 */
          const menuNpagNm = depth3Menu.menuNpagNm ?? null;                   /* 메뉴새창명 */
          const prvcInclYn = depth3Menu.prvcInclYn ?? null;                   /* 개인정보포함여부 */
          const dgstfnExmnYn = depth3Menu.dgstfnExmnYn ?? null;               /* 만족도조사여부 */
          const menuExpsrYn = depth3Menu.menuExpsrYn ?? null;                 /* 메뉴노출여부 */
          const deptInfoExpsrYn = depth3Menu.deptInfoExpsrYn ?? null;         /* 부서정보노출여부 */
          const picInfoExpsrYn = depth3Menu.picInfoExpsrYn ?? null;           /* 담당자정보노출여부 */
          const moblAplcnYn = depth3Menu.moblAplcnYn ?? null;                 /* 모바일적용여부 */
          const lgnYn = depth3Menu.lgnYn ?? null;                             /* 로그인여부 */
          const encptPicTelno = depth3Menu.encptPicTelno ?? null;             /* 암호화담당자전화번호 */
          const menuKoglCprgtTypeCd = depth3Menu.menuKoglCprgtTypeCd ?? null; /* 메뉴공공누리저작권유형코드 */
          const menuPicId = depth3Menu.menuPicId ?? null;                     /* 메뉴담당자아이디 */
          const menuPicFlnm = depth3Menu.menuPicFlnm ?? null;                 /* 메뉴담당자명 */
          const menuTkcgDeptNo = depth3Menu.menuTkcgDeptNo ?? null;           /* 메뉴담당부서번호 */
          const menuTkcgDeptNm = depth3Menu.menuTkcgDeptNm ?? null;           /* 메뉴담당부서명 */

          depth3Items.push({
            menuSn: menuSn ?? 0,
            name: depth3Menu.menuNm,
            url,
            ...(isNewWindow && { isNewWindow: true }),
            ...(menuNpagNm && { menuNpagNm }),
            ...(prvcInclYn && { prvcInclYn }),
            ...(dgstfnExmnYn && { dgstfnExmnYn }),
            ...(menuExpsrYn && { menuExpsrYn }),
            ...(deptInfoExpsrYn && { deptInfoExpsrYn }),
            ...(picInfoExpsrYn && { picInfoExpsrYn }),
            ...(moblAplcnYn && { moblAplcnYn }),
            ...(lgnYn && { lgnYn }),
            ...(encptPicTelno && { encptPicTelno }),
            ...(menuKoglCprgtTypeCd && { menuKoglCprgtTypeCd }),
            ...(menuPicId && { menuPicId }),
            ...(menuPicFlnm && { menuPicFlnm }),
            ...(menuTkcgDeptNo && { menuTkcgDeptNo }),
            ...(menuTkcgDeptNm && { menuTkcgDeptNm })
          })
        } else {
          // depLevel=3이면서 menuUrlAddr이 없는 경우 → 하위 depLevel=4 항목들을 찾아서 depth3로 사용
          const childDepth4Menus = depth4Menus
            .filter((menu) => menu.upMenuSn === depth3Menu.menuSn)
            .sort((a, b) => {
              const aSeq = a.menuSeq ?? a.menuSn ?? 0
              const bSeq = b.menuSeq ?? b.menuSn ?? 0
              return aSeq - bSeq
            })

          childDepth4Menus.forEach((depth4Menu) => {
            if (depth4Menu.menuNm) {
              const menuSn = depth4Menu.menuSn ?? 0;
              const url = depth4Menu.menuUrlAddr || '#';
              const isNewWindow = url.startsWith('http://') || url.startsWith('https://');

              /* 메뉴상세 정보 */
              const menuNpagNm = depth4Menu.menuNpagNm ?? null;                   /* 메뉴새창명 */
              const prvcInclYn = depth4Menu.prvcInclYn ?? null;                   /* 개인정보포함여부 */
              const dgstfnExmnYn = depth4Menu.dgstfnExmnYn ?? null;               /* 만족도조사여부 */
              const menuExpsrYn = depth4Menu.menuExpsrYn ?? null;                 /* 메뉴노출여부 */
              const deptInfoExpsrYn = depth4Menu.deptInfoExpsrYn ?? null;         /* 부서정보노출여부 */
              const picInfoExpsrYn = depth4Menu.picInfoExpsrYn ?? null;           /* 담당자정보노출여부 */
              const moblAplcnYn = depth4Menu.moblAplcnYn ?? null;                 /* 모바일적용여부 */
              const lgnYn = depth4Menu.lgnYn ?? null;                             /* 로그인여부 */
              const encptPicTelno = depth4Menu.encptPicTelno ?? null;             /* 암호화담당자전화번호 */
              const menuKoglCprgtTypeCd = depth4Menu.menuKoglCprgtTypeCd ?? null; /* 메뉴공공누리저작권유형코드 */
              const menuPicId = depth4Menu.menuPicId ?? null;                     /* 메뉴담당자아이디 */
              const menuPicFlnm = depth4Menu.menuPicFlnm ?? null;                 /* 메뉴담당자명 */
              const menuTkcgDeptNo = depth4Menu.menuTkcgDeptNo ?? null;           /* 메뉴담당부서번호 */
              const menuTkcgDeptNm = depth4Menu.menuTkcgDeptNm ?? null;           /* 메뉴담당부서명 */

              depth3Items.push({
                menuSn: menuSn ?? 0,
                name: depth4Menu.menuNm,
                url,
                ...(isNewWindow && { isNewWindow: true }),
                ...(menuNpagNm && { menuNpagNm }),
                ...(prvcInclYn && { prvcInclYn }),
                ...(dgstfnExmnYn && { dgstfnExmnYn }),
                ...(menuExpsrYn && { menuExpsrYn }),
                ...(deptInfoExpsrYn && { deptInfoExpsrYn }),
                ...(picInfoExpsrYn && { picInfoExpsrYn }),
                ...(moblAplcnYn && { moblAplcnYn }),
                ...(lgnYn && { lgnYn }),
                ...(encptPicTelno && { encptPicTelno }),
                ...(menuKoglCprgtTypeCd && { menuKoglCprgtTypeCd }),
                ...(menuPicId && { menuPicId }),
                ...(menuPicFlnm && { menuPicFlnm }),
                ...(menuTkcgDeptNo && { menuTkcgDeptNo }),
                ...(menuTkcgDeptNm && { menuTkcgDeptNm })
              });
            }
          })
        }
      })

      // depth2 메뉴 구성
      const depth2Item: GnbDepth2Item = {
        title: depth2Menu.menuNm || '',
        depth3: depth3Items
      }

      // depth2 메뉴에 직접 URL이 있는 경우 추가 (depLevel=2이면서 menuUrlAddr이 있는 경우)
      if (depth2Menu.menuUrlAddr) {
        depth2Item.url = depth2Menu.menuUrlAddr
      }

      return depth2Item
    })

    return {
      title: depth1Menu.menuNm || '',
      depth2: depth2Items
    }
  })

  return result
}

/**
 * LNB용 LnbItem [] 구조체 변환
 */
function createLnbStructor(menuList: MenuRVO[]): LnbItem[] {
  if (!Array.isArray(menuList) || menuList.length === 0) {
    return [];
  }

  // menuSn을 키로 하는 맵 생성
  const menuMap = new Map<number, LnbItem>();
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
  const sortByMenuSeq = (items: LnbItem[]): LnbItem[] => {
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
 * oriList: 원본 메뉴 목록(사용자기본메뉴, 관리자기본메뉴도 포함(menuTypeCd=Z))
 * list: UI의 GNB/LNB에 표시하는 메뉴 목록(menuTypeCd !== 'Z')
 */
export interface MenuState {
  oriList: MenuRVO[]
  list: MenuRVO[]
  totalCount: number | null
  current: MenuRVO | null
  loading: boolean
  error: string | null

  langSeCd: string | null
  loaded: boolean
  lnbStructor: LnbItem[]
  gnbList: GnbDepth1Item[]
}

/**
 * 대국민포털_메뉴기본 정보 목록 조회(Redux 저장 구조 초기상태) 
 */
const initialState: MenuState = {
  oriList: [],
  list: [],
  totalCount: null,
  current: null,
  loading: false,
  error: null,

  langSeCd: null,
  loaded: false,
  lnbStructor: [],
  gnbList: []
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
      state.oriList = [];
      state.list = [];
      state.totalCount = null;
      state.langSeCd = null;
      state.loaded = false;
      state.error = null;
      state.lnbStructor = [];
      state.gnbList = [];
    },

    /**
     * persist 복원 직후·필요 시: oriList(원본)가 있으면 그걸 기준으로 Z 제외 후 gnb/lnb 재생성.
     * (세션에 예전 gnbList만 남아 있으면 fulfilled 필터가 다시 안 타도 동일 규칙 적용)
     */
    sanitizeMenuForUi: (state) => {
      const source =
        Array.isArray(state.oriList) && state.oriList.length > 0
          ? state.oriList
          : state.list
      const uiList = filterMenuListForUi(source)
      state.list = uiList
      state.totalCount = uiList.length
      state.lnbStructor = createLnbStructor(uiList)
      state.gnbList = createGnbStructor(uiList)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectMenuList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectMenuList.fulfilled, (state, action) => {
        state.loading = false;
        state.oriList = action.payload.list;
        const uiList = filterMenuListForUi(action.payload.list);
        state.list = uiList;
        state.totalCount = uiList.length;

        // Lnb lnbStructor / GNB gnbList — menuTypeCd=Z 는 UI에서 제외
        state.lnbStructor = createLnbStructor(uiList);
        state.gnbList = createGnbStructor(uiList);

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


export const { clearCurrent, clearMenuCache, sanitizeMenuForUi } = MenuSlice.actions;
export default MenuSlice.reducer;