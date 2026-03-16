import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { detectBrowserLang } from './lang'

// pp 포털 라우터가 처리하지 않아야 하는 업무시스템 prefix 목록.
// 이 경로들은 React Router 404가 아니라 서버 또는 각 업무시스템으로 넘겨야 한다.
const EXTERNAL_SYSTEM_PREFIXES = new Set([
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
])

function FallbackRoute() {
  const location = useLocation()
  const firstSegment = location.pathname.split('/')[1]?.toLowerCase() ?? ''
  const isExternalSystemPath = EXTERNAL_SYSTEM_PREFIXES.has(firstSegment)

  useEffect(() => {
    if (isExternalSystemPath) {
      // 다른 업무시스템 prefix로 시작하면 SPA 내부 404로 처리하지 않고
      // 현재 주소 그대로 브라우저 전체 이동을 시켜 서버가 라우팅하도록 넘긴다.
      window.location.replace(`${location.pathname}${location.search}${location.hash}`)
    }
  }, [isExternalSystemPath, location.hash, location.pathname, location.search])

  if (isExternalSystemPath) {
    // replace가 실행되기 전 잠깐이라도 NotFound가 보이지 않도록 아무것도 렌더링하지 않는다.
    return null
  }

  // 그 외 미등록 경로만 pp 포털의 NotFound 화면으로 보낸다.
  return <Navigate to={`/pp/${detectBrowserLang()}/NotFound`} replace />
}

export default FallbackRoute
