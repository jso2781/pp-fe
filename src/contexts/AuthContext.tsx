import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthData {
  code?: string
  msg?: string
  data?: any
  [key: string]: any
}

interface AuthContextType {
  isAuthenticated: boolean
  user: AuthData | null
  login: (data: AuthData) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthData | null>(null)

  useEffect(() => {
    // 로컬 스토리지에서 인증 정보 확인
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth)
        setIsAuthenticated(true)
        setUser(authData)
      } catch (e) {
        localStorage.removeItem('auth')
      }
    }
  }, [])

  const login = (data: AuthData) => {
    setIsAuthenticated(true)
    setUser(data)
    localStorage.setItem('auth', JSON.stringify(data))
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('auth')
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


