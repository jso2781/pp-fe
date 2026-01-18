import { createContext, useContext, useMemo, useCallback, ReactNode } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { logout } from '@/features/auth/AuthThunks'
import { RootState } from '@/store/store'
import { AuthState } from '@/features/auth/AuthSlice'

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthContext는 Redux의 단순 래퍼입니다.
 * Redux 상태를 직접 구독하고, 로그아웃 액션만 dispatch합니다.
 * 로그인은 Redux thunk (loginThunk)를 직접 사용하세요.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  
  // Redux 상태 구독
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

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    logoutContext,
  }), [isAuthenticated, user, logoutContext])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


