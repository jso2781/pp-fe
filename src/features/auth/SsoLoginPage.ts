/**
 * SSO 로그인 페이지 URL 생성 및 리다이렉트
 * (ca-anyid utility.js ssoLoginPage / ssoLoginPageSub 로직 이관)
 */

const SSO_AUTH_PATH = '/oidc/auth'
const DEFAULT_ACR_VALUES = '3'

/**
 * endPoint를 기관 경로와 합침 (원본 ssoLoginPage와 동일)
 * - endPoint가 있으면 agencyContextPath + endPoint
 * - 없으면 agencyContextPath만 사용
 */
function resolveEndPoint(agencyContextPath: string, endPoint?: string): string {
  const base = (agencyContextPath ?? '').replace(/\/$/, '')
  if (endPoint != null && String(endPoint).trim() !== '') {
    const path = String(endPoint).trim().replace(/^\//, '')
    return base ? base + '/' + path : '/' + path
  }
  return base
}

/**
 * SSO 로그인 페이지로 이동할 때 사용할 쿼리 문자열 생성
 */
function buildSsoLoginPageSubUrl(endPointValue: string, acrValues?: string): string {
  let subUrl = ''

  if (endPointValue !== '') {
    subUrl = '?endPoint=' + encodeURIComponent(endPointValue)
  }

  const acr = acrValues != null && String(acrValues).trim() !== ''
    ? String(acrValues).trim()
    : DEFAULT_ACR_VALUES

  subUrl += subUrl === '' ? '?' : '&'
  subUrl += 'acrValues=' + acr

  return subUrl
}

/**
 * SSO 로그인 페이지 전체 URL 생성
 * @param agencyContextPath - 기관 컨텍스트 경로 (SsoInfoRVO.agencyContextPath, 기본값 '')
 * @param endPoint - 리다이렉트 엔드포인트 (선택, 원본처럼 agencyContextPath와 결합됨)
 * @param acrValues - 인증 수준 (미입력/공백이면 '3')
 */
export function buildSsoLoginPageUrl(
  agencyContextPath: string,
  endPoint?: string,
  acrValues?: string
): string {
  const base = (agencyContextPath ?? '').replace(/\/$/, '')
  const baseUrl = window.location.origin + base + SSO_AUTH_PATH
  const endPointValue = resolveEndPoint(agencyContextPath ?? '', endPoint)
  const subUrl = buildSsoLoginPageSubUrl(endPointValue, acrValues)
  return baseUrl + subUrl
}

/**
 * SSO 로그인 페이지로 이동 (window.location.replace)
 * @param agencyContextPath - 기관 컨텍스트 경로 (SsoInfo 조회 결과 등에서 사용)
 * @param endPoint - 리다이렉트 엔드포인트 (선택, 원본과 동일하게 agencyContextPath와 결합됨)
 * @param acrValues - 인증 수준 (미입력/공백이면 '3')
 */
export function redirectToSsoLoginPage(
  agencyContextPath: string,
  endPoint?: string,
  acrValues?: string
): void {
  const url = buildSsoLoginPageUrl(agencyContextPath, endPoint, acrValues)
  window.location.replace(url)
}

const SSO_LOGOUT_PATH = '/oidc/ssoLogout'

/**
 * SSO 로그아웃 페이지로 이동 (window.location.replace)
 * (ca-anyid utility.js ssoLogout 로직 이관)
 * @param agencyContextPath - 기관 컨텍스트 경로 (SsoInfoRVO.agencyContextPath)
 * @param endPoint - 로그아웃 후 돌아올 엔드포인트 (선택, 없으면 agencyContextPath만 사용)
 */
export function redirectToSsoLogout(agencyContextPath: string, endPoint?: string): void {
  const base = (agencyContextPath ?? '').replace(/\/$/, '')
  const endPointValue =
    endPoint != null && String(endPoint).trim() !== ''
      ? base + '/' + String(endPoint).trim().replace(/^\//, '')
      : base
  const baseUrl = window.location.origin + base + SSO_LOGOUT_PATH
  const url = baseUrl + '?endPoint=' + encodeURIComponent(endPointValue)
  window.location.replace(url)
}
