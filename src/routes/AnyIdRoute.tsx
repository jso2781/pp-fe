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

  // ID/PW로 로그인 && 세션스토리지 인증이력 없을경우
  if (user?.userInfo?.lgnSeCd === '1' && !expertCertSuccess) {
    return <Navigate to={`/pp/${i18n.language}/auth/ExpertCert`} replace />
  }

  return <>{children}</>
}

export default AnyIdRoute


