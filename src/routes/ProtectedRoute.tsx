import i18n from '@/i18n/i18n'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/pp/${i18n.language}/auth/Login`} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute


