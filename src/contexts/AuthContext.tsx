import { createContext, useContext, useMemo, useCallback, ReactNode } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/features/auth/AuthThunks'
import { RootState } from '@/store/store'
import { AuthState } from '@/features/auth/AuthSlice'
import { MenuState } from '@/features/auth/MenuSlice'
import { GnbDepth3Item } from '@/features/auth/MenuTypes'

interface AuthData {
  userInfo?: any
  tokenId?: number | null
  accessToken?: string | null
  refreshToken?: string | null
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
  const { userInfo, tokenId, accessToken, refreshToken, pswdErrNmtm } = auth || {}

  // Redux 상태에서 직접 계산
  // userInfo가 실제 데이터를 가진 객체인지 확인 (빈 객체가 아닌지)
  const isAuthenticated = useMemo(() => {
    const hasValidUserInfo = userInfo && 
      typeof userInfo === 'object' && 
      Object.keys(userInfo).length > 0 &&
      userInfo !== null
    const hasValidToken = accessToken && 
      typeof accessToken === 'string' && 
      accessToken.length > 0
    return !!(hasValidUserInfo && hasValidToken)
  }, [userInfo, accessToken])

  const user = useMemo<AuthData | null>(() => {
    if (!userInfo || !accessToken) {
      return null
    }
    return {
      userInfo,
      tokenId,
      accessToken,
      refreshToken,
      pswdErrNmtm,
    }
  }, [userInfo, tokenId, accessToken, refreshToken, pswdErrNmtm])

  const logoutContext = useCallback(() => {
    // Redux logout 액션을 dispatch
    // tokenId가 null이면 0을 사용 (LogoutPVO는 tokenId가 필수 필드)
    dispatch(logout({ tokenId: tokenId ?? 0 }))
  }, [dispatch, tokenId])
  /********************************* AuthSlice Redux 상태 구독 및 상태 데이터 추출 끝 ************************************************/

  /********************************* MenuSlice Redux 상태 구독 및 상태 데이터 추출 시작 ************************************************/
  // MenuSlice Redux 상태 구독
  const menu = useAppSelector((s: RootState) => s.menu) as MenuState
  const { gnbList, lnbStructor } = menu || {}

  /**
   * MenuSlice Redux 상태에서
   * gnbList의 depth3 항목 중 url이 menuUrlAddr과 일치하는 메뉴상세정보 항목을 반환하는 셀렉터
   * @param menuUrlAddr - 메뉴 URL 주소
   * @returns GnbDepth3Item | null
   * @example useAuth().getMenuInfo('/maintask/dur/DurUnderstand')
   */
  const getMenuInfo = useCallback((menuUrlAddr: string) => {
    if(gnbList && gnbList.length > 0){

      for(const d1 of gnbList){
        for(const d2 of d1.depth2){
          const found = d2.depth3.find((item) => item.url === menuUrlAddr);
          if(found) return found;
        }
      }

    }

    return null;
  }, [gnbList]);
  /********************************* MenuSlice Redux 상태 구독 및 상태 데이터 추출 끝 ************************************************/

  /********************************* AuthContext 값 생성 및 반환 시작 ************************************************/
  const value = useMemo(() => ({
    isAuthenticated,
    user,
    logoutContext,
    getMenuInfo
  }), [isAuthenticated, user, logoutContext])

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


