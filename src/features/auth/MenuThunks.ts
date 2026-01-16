import { createAsyncThunk } from '@reduxjs/toolkit'
import https from '@/api/axiosInstance'
import { selectMenuListApiPath, getMenuApiPath, insertMenuApiPath, updateMenuApiPath, saveMenuApiPath, deleteMenuApiPath } from '@/api/auth/MenuApiPaths'
import { mockMenuList, MenuPVO, MenuRVO, MenuListPVO, MenuListRVO, MenuDVO  } from './MenuTypes'

// SideItem 타입 정의 (Lnb 컴포넌트에서 사용하는 구조)
export type SideItem = {
  key: string;
  label: string;
  disabled?: boolean;
  children?: SideItem[];
};

// ✅ RootState 타입이 프로젝트에 있으면 그걸 쓰는 게 베스트.
// 지금은 예시로 최소 형태만 잡아둠(컴파일 통과용).
type RootStateLike = {
  menu: {
    list: MenuRVO[]
    loading: boolean
    langSeCd: string | null
    loaded: boolean
    menuStructor: SideItem[]
  }
}

/**
 * MenuRVO 배열을 SideItem 트리 구조로 변환하는 함수
 */
function convertMenuListToSideItems(menuList: MenuRVO[]): SideItem[] {
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
 * 대국민포털_메뉴기본 정보 목록 조회 
 * Rest Api Result JSON
 * {
 *  "code": "0",
 *  "msg": "성공",
 *  "data": {
 *      "list": [
 *          {
 *              "menuSn": 1000,
 *              "menuNm": "주요 업무",
 *              "taskSeCd": null,
 *              "langSeCd": "ko",
 *              "menuUrlAddr": null,
 *              "upMenuSn": null,
 *              "depLevel": 1,
 *              "rootSn": 1000,
 *              "menuTypeCd": null,
 *              "path": "1000",
 *              "menuSeq": 1,
 *              "menuExpln": null,
 *              "picDeptNm": null,
 *              "picFlnm": null,
 *              "useYn": null,
 *              "rgtrId": null,
 *              "regDt": null,
 *              "regPrgrmId": null,
 *              "mdfrId": null,
 *              "mdfcnDt": null,
 *              "mdfcnPrgrmId": null
 *          },
 *          {
 *              "menuSn": 1001,
 *              "menuNm": "의약품 이상사례보고",
 *              "taskSeCd": null,
 *              "langSeCd": "ko",
 *              "menuUrlAddr": null,
 *              "upMenuSn": 1000,
 *              "depLevel": 2,
 *              "rootSn": 1000,
 *              "menuTypeCd": null,
 *              "path": "1000 > 1001",
 *              "menuSeq": 1,
 *              "menuExpln": null,
 *              "picDeptNm": null,
 *              "picFlnm": null,
 *              "useYn": null,
 *              "rgtrId": null,
 *              "regDt": null,
 *              "regPrgrmId": null,
 *              "mdfrId": null,
 *              "mdfcnDt": null,
 *              "mdfcnPrgrmId": null
 *          },
 *           ~~
 *           ~~
 *      ]
 *   }
 * }
 */
// MenuListRVO에 menuStructor를 추가한 확장 타입
type MenuListRVOWithStructor = MenuListRVO & {
  menuStructor: SideItem[];
};

export const selectMenuList = createAsyncThunk<MenuListRVOWithStructor, MenuListPVO | undefined, {state: RootStateLike}>(
  '/auth/selectMenuList',
  async (params: MenuListPVO = {}) => {
    try {
      const res = await https.post(selectMenuListApiPath(), params);

      // 여기서 "서버 응답"을 표준 형태로 맞춰서 return
      const payload = res.data.data?.list;

      // 서버가 Menu[] 형식으로 주므로 MenuListRVO 형식으로 데이터 구조 재조정 
      const list = Array.isArray(payload) ? payload : [];
      return {
        list,
        totalCount: list.length,
        menuStructor: convertMenuListToSideItems(list)
      } as MenuListRVOWithStructor;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("MenuThunks selectMenuList mockMenuList=",mockMenuList);
      const filtered = mockMenuList.filter((n) => {
        //if (!params.searchWrd) return true;
        //const v = (params.searchCnd === 'content' ? n.content : n.title) || '';
        //return v.includes(params.searchWrd);
        return true; // edit !! 
      });

      const list = filtered as MenuRVO[];
      const result: MenuListRVOWithStructor = { 
        list, 
        totalCount: list.length,
        menuStructor: convertMenuListToSideItems(list)
      }
      return result;
    }
  },
  {
    /* selectMenuList Thunk 이 Redex state 의 값에 따라 호출할지 말지 결정 */
    condition: (params, { getState }) => {
      const state = getState();

      // ✅ 요청 언어(없으면 현재 저장된 언어 기준)
      const desiredLang = params?.langSeCd ?? state.menu.langSeCd ?? null;

      // ✅ 이미 같은 언어 메뉴가 로드돼 있으면 스킵
      const hasMenu = state.menu.list?.length > 0;
      const sameLang = state.menu.langSeCd === desiredLang;

      if(state.menu.loading)return false;             // 중복 호출 방지

      // 조회된 메뉴 목록이 없어서 빈 배열이어도 "해당 언어로 이미 로드됨"이면 재호출 막기
      if(state.menu.loaded && sameLang)return false;  // hasMenu 제거, 조회된 메뉴 목록이 없으면 []이므로 state.menu.list?.length = 0 이고, hasMenu=false가 되어서 무한 조회되는 현상 발생!!

      return true; // 호출 필요
    }
  }
)

/**
 * 대국민포털_메뉴기본 정보 조회 
 */
export const getMenu = createAsyncThunk<MenuRVO, MenuPVO | undefined>(
  '/auth/getMenu',
  async (params: MenuPVO = {}) => {
    try {
      const res = await https.post(getMenuApiPath(), params);

      const payload = res.data;

      // 서버가 MenuRVO 형식으로 단 건 데이터를 반환함. 
      return payload;
    }
    // 서버가 없거나 에러 나면 강제로 mock 데이터 사용 
    catch (e) {
      // 개발/데모 환경용 fallback (백엔드 연동 시 제거 가능)
      console.log("MenuThunks getMenu mockMenuList=",mockMenuList);
      return (mockMenuList).find((n) => n) || null;
    }
  }
)

/**
 * 대국민포털_메뉴기본 입력 
 */
export const insertMenu = createAsyncThunk<number, MenuPVO>(
  '/auth/insertMenu',
  async (params: MenuPVO) => {
    try {
      const res = await https.post(insertMenuApiPath(), params);

      const insertCnt = res.data;

      // 입력된 건수 반환함. 
      return insertCnt;
    }
    catch (e) {
      console.log("MenuThunks insertMenu");
      return -1;
    }
  }
)

/**
 * 대국민포털_메뉴기본 수정 
 */
export const updateMenu = createAsyncThunk<number, MenuPVO>(
  '/auth/updateMenu',
  async (params: MenuPVO) => {
    try {
      const res = await https.post(updateMenuApiPath(), params);

      const updateCnt = res.data;

      // 수정된 건수 반환함. 
      return updateCnt;
    }
    catch (e) {
      console.log("MenuThunks updateMenu");
      return -1;
    }
  }
)

/**
 * 대국민포털_메뉴기본 저장 
 */
export const saveMenu = createAsyncThunk<number, MenuPVO>(
  '/auth/saveMenu',
  async (params: MenuPVO) => {
    try {
      const res = await https.post(saveMenuApiPath(), params);

      const saveCnt = res.data;

      // 저장된 건수 반환함. 
      return saveCnt;
    }
    catch (e) {
      console.log("MenuThunks saveMenu error!!");
      return -1;
    }
  }
)

/**
 * 대국민포털_메뉴기본 삭제 
 */
export const deleteMenu = createAsyncThunk<number, MenuDVO>(
  '/auth/deleteMenu',
  async (params: MenuDVO) => {
    try {
      const res = await https.post(deleteMenuApiPath(), params);

      const deleteCnt = res.data;

      // 삭제된 건수 반환함. 
      return deleteCnt;
    }
    catch (e) {
      console.log("MenuThunks deleteMenu error!!");
      return -1;
    }
  }
)

