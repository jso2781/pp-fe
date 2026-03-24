import i18n from '@/i18n/i18n'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ReactNode } from 'react'

interface AnyIdRouteProps {
  children: ReactNode
}

function AnyIdRoute({ children }: AnyIdRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={`/pp/${i18n.language}/auth/Login`} replace />
  }

  const expertCertSuccess = sessionStorage.getItem('expertCertSuccess');

  // FIXME 조건은 추후 로그인 구분코드로 변경
  if (user?.userInfo?.mbrId === 'yi7829' && !expertCertSuccess) {
    return <Navigate to={`/pp/${i18n.language}/auth/ExpertCert`} replace />
  }

  return <>{children}</>
}

export default AnyIdRoute


