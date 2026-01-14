import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAppSelector } from '@/store/hooks'

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
  login: (data: AuthData) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// localStorage 키 통일
const AUTH_STORAGE_KEY = 'auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthData | null>(null)
  
  // Redux 상태 구독
  const auth = useAppSelector((s) => s.auth)
  const { userInfo, tokenId, accessToken, refreshToken, pswdErrNmtm } = auth || {}

  // 초기 로드 시 localStorage에서 인증 정보 복원
  // 단, Redux 상태가 없으면 인증 정보를 복원하지 않음 (Redux가 실제 소스)
  useEffect(() => {
    // Redux에 인증 정보가 있으면 localStorage에서 복원하지 않음 (Redux가 우선)
    if (userInfo && accessToken) {
      return; // Redux에 이미 있으면 localStorage 복원 불필요
    }
    
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth)
        // localStorage에만 있고 Redux에 없으면 인증 정보가 유효하지 않음
        // 따라서 인증 상태를 false로 설정
        setIsAuthenticated(false)
        setUser(null)
        // localStorage도 정리 (유효하지 않은 인증 정보)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
  }, [userInfo, accessToken])

  // Redux 상태와 동기화
  useEffect(() => {
    if (userInfo && accessToken) {
      // Redux에 인증 정보가 있으면 AuthContext도 업데이트
      const authData: AuthData = {
        userInfo,
        tokenId,
        accessToken,
        refreshToken,
        pswdErrNmtm: pswdErrNmtm,
      }
      setIsAuthenticated(true)
      setUser(authData)
      // localStorage에도 저장 (통일된 키 사용)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData))
    } else if (!userInfo && !accessToken) {
      // Redux에 인증 정보가 없으면 AuthContext도 초기화
      setIsAuthenticated(false)
      setUser(null)
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [userInfo, tokenId, accessToken, refreshToken, pswdErrNmtm])

  const login = (data: AuthData) => {
    setIsAuthenticated(true)
    setUser(data)
    // localStorage에 통일된 키로 저장
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data))
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    // localStorage에서 통일된 키 제거
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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


