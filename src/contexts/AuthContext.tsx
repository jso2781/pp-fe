import { createContext, useContext, useMemo, useCallback, useRef, ReactNode } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/features/auth/AuthThunks'
import { redirectToSsoLogout } from '@/features/auth/SsoLoginPage'
import { RootState } from '@/store/store'
import { AuthState } from '@/features/auth/AuthSlice'
import { MenuState } from '@/features/auth/MenuSlice'
import { GnbDepth3Item } from '@/features/auth/MenuTypes'

interface AuthData {
  userInfo?: any
  tokenSn?: number | null
  acsTokenCn?: string | null
  updtTokenCn?: string | null
  pswdErrNmtm?: number | null
  [key: string]: any
}

interface AuthContextType {
  isAuthenticated: boolean
  user: AuthData | null
  logoutContext: () => void
  getMenuInfo: (menuUrlAddr: string) => GnbDepth3Item | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthContext는 Redux의 단순 래퍼입니다.
 * Redux 상태를 직접 구독하고, 로그아웃 액션만 dispatch합니다.
 * 로그인은 Redux thunk (loginThunk)를 직접 사용하세요.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()

  /********************************* AuthSlice Redux 상태 구독 및 상태 데이터 추출 시작 ************************************************/
  // AuthSlice Redux 상태 구독
  const auth = useAppSelector((s: RootState) => s.auth) as AuthState
  const { userInfo, tokenSn, acsTokenCn, updtTokenCn, pswdErrNmtm } = auth || {}
  const ssoInfo = useAppSelector((s: RootState) => s.anyId.ssoInfo)

  // Redux 상태에서 직접 계산
  // userInfo가 실제 데이터를 가진 객체인지 확인 (빈 객체가 아닌지)
  const isAuthenticated = useMemo(() => {
    const hasValidUserInfo = userInfo && 
      typeof userInfo === 'object' && 
      Object.keys(userInfo).length > 0 &&
      userInfo !== null
    const hasValidToken = acsTokenCn && 
      typeof acsTokenCn === 'string' && 
      acsTokenCn.length > 0
    return !!(hasValidUserInfo && hasValidToken)
  }, [userInfo, acsTokenCn])

  const user = useMemo<AuthData | null>(() => {
    if (!userInfo || !acsTokenCn) {
      return null
    }
    return {
      userInfo,
      tokenSn,
      acsTokenCn,
      updtTokenCn,
      pswdErrNmtm,
    }
  }, [userInfo, tokenSn, acsTokenCn, updtTokenCn, pswdErrNmtm])

  const logoutContext = useCallback(() => {
    // Redux logout 액션을 dispatch (서버 세션 무효화)
    dispatch(logout({ tokenSn: tokenSn ?? 0 }));
    // SSO 로그아웃으로 이동 (헤더 로그아웃 버튼 / 30분 타이머 완료 시 동일하게 적용)
    redirectToSsoLogout(ssoInfo?.agencyContextPath ?? '', '/pp/ko');
  }, [dispatch, tokenSn, ssoInfo?.agencyContextPath]);
  /********************************* AuthSlice Redux 상태 구독 및 상태 데이터 추출 끝 ************************************************/

  /********************************* MenuSlice Redux 상태 구독 및 상태 데이터 추출 시작 ************************************************/
  // MenuSlice Redux 상태 구독
  const menu = useAppSelector((s: RootState) => s.menu) as MenuState
  const { list, gnbList, lnbStructor } = menu || {}

  // pathname별 getMenuInfo 결과 캐시 (동일 pathname 중복 검색 방지)
  const menuInfoCacheRef = useRef<{ gnbList: unknown; cache: Map<string, GnbDepth3Item | null> }>({
    gnbList: undefined,
    cache: new Map(),
  })

  /**
   * MenuSlice Redux 상태에서
   * gnbList의 depth3 항목 중 url이 menuUrlAddr과 일치하는 메뉴상세정보 항목을 반환하는 셀렉터
   * 
   * @param menuUrlAddr - 메뉴 URL 주소
   * @returns GnbDepth3Item | null
   * @example useAuth().getMenuInfo('/maintask/dur/DurUnderstand')
   */
  const getMenuInfo = useCallback((menuUrlAddr: string) => {
    // const key = menuUrlAddr.replace(/\/(ko|en)\//, '/')
    // 현재는 언어코드 포함 전체 pathname을 key로 사용. 향후 언어코드 제거한 형태로도 검색 필요시 위 정규식 활용하여 key 생성
    const key = menuUrlAddr;
    const ref = menuInfoCacheRef.current

    // gnbList가 변경될 때마다 menuInfoCacheRef 캐시 초기화
    if (ref.gnbList !== gnbList) {
      ref.gnbList = gnbList
      ref.cache = new Map()
    }

    if(ref.cache.has(key)){
      return ref.cache.get(key) ?? null
    }

    let result: GnbDepth3Item | null = null
    if (gnbList && gnbList.length > 0) {
      for (const d1 of gnbList) {
        for (const d2 of d1.depth2) {
          if (d2.url && d2.url === key) {
            const matchedMenu = list?.find((lm) => lm.menuUrlAddr === d2.url);
            result = {
              menuSn: matchedMenu?.menuSn ?? 0,
              name: matchedMenu?.menuNm ?? d2.title,
              url: d2.url 
            }
            break
          }

          const found = d2.depth3.find(
            (item) => item.url && item.url === key
          )
          if(found){
            console.log('AuthContext getMenuInfo found=', found);
            result = found
            break
          }
        }
        if (result) break
      }
    }

    ref.cache.set(key, result)
    return result
  }, [gnbList]);
  /********************************* MenuSlice Redux 상태 구독 및 상태 데이터 추출 끝 ************************************************/

  /********************************* AuthContext 값 생성 및 반환 시작 ************************************************/
  const value = useMemo(() => ({
    isAuthenticated,
    user,
    logoutContext,
    getMenuInfo
  }), [isAuthenticated, user, logoutContext, getMenuInfo])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
  /********************************* AuthContext 값 생성 및 반환 끝 ************************************************/
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


