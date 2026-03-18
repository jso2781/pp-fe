import { Navigate, useLocation } from 'react-router-dom'
import { detectBrowserLang } from './lang'

const PASS_PREFIXES = new Set([
  'cm',
  'ucm',
  'ex',
  'uex',
  'cr',
  'ucr',
  'cd',
  'ucd',
  'bo',
  'ubo',
  'ca',
  'uca',
  'ed',
  'ued',
])

function FallbackRoute() {
  const location = useLocation()
  const firstSegment = location.pathname.split('/')[1]?.toLowerCase() ?? ''

  // 다른 업무시스템 prefix는 pp 라우터가 404로 처리하지 않고 그대로 통과시킨다.
  if (PASS_PREFIXES.has(firstSegment)) {
    return null
  }

  return <Navigate to={`/pp/${detectBrowserLang()}/NotFound`} replace />
}

export default FallbackRoute
