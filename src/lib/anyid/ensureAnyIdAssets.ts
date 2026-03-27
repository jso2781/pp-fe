/**
 * Any-ID 스크립트/스타일 로더 (전역 1회 캐시)
 * manifest.js → vendor.js → app.js 순서로 로드, 동일 세션에서 재호출 시 같은 Promise 반환
 */
let anyIdAssetsPromise: Promise<void> | null = null

function ensureLinkOnce(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) return
  const l = document.createElement('link')
  l.rel = 'stylesheet'
  l.href = href
  document.head.appendChild(l)
}

export function ensureAnyIdAssets(): Promise<void> {
  // 로컬/개발 환경에서는 Any-ID 자원(스크립트/설정)을 로딩하지 않는다.
  // (production 환경에서만 Any-ID SDK를 로딩하도록 강제)
  if (import.meta.env.MODE !== 'production') {
    return Promise.resolve()
  }

  const baseNorm = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') + '/'

  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
      if (existing) {
        if ((existing as any)._anyidLoaded) return resolve()
        existing.addEventListener('load', () => resolve(), { once: true })
        existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true })
        return
      }
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => {
        ;(s as any)._anyidLoaded = true
        resolve()
      }
      s.onerror = () => reject(new Error(`Failed to load ${src}`))
      document.body.appendChild(s)
    })

  if (!anyIdAssetsPromise) {
    ensureLinkOnce(`${baseNorm}css/app.css`)
    anyIdAssetsPromise = loadScript(`${baseNorm}js/manifest.js`)
      .then(() => loadScript(`${baseNorm}js/vendor.js`))
      .then(() => loadScript(`${baseNorm}js/app.js`))
  }

  return anyIdAssetsPromise
}

/** LegalGuardAgr 전용: 신청인 영역(anyidc_applicant_done) 호환 스타일 */
export function ensureApplicantAnyIdCompatCss(): void {
  if (import.meta.env.MODE !== 'production') return
  const baseNorm = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') + '/'
  ensureLinkOnce(`${baseNorm}css/anyidc-applicant-done-compat.css`)
}

/** LegalGuardAgr 전용: 법정대리인 영역(anyidcGuardian) 호환 스타일 */
export function ensureGuardianAnyIdCompatCss(): void {
  if (import.meta.env.MODE !== 'production') return
  const baseNorm = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') + '/'
  ensureLinkOnce(`${baseNorm}css/anyidc-guardian-compat.css`)
}

/** AnyidC.LOAD_MODULE 준비 여부를 즉시 1회 확인 후 짧은 간격(50ms)으로 재시도, 최대 약 2초 */
export function waitForAnyidC(
  onReady: () => void,
  onTimeout?: () => void,
  intervalMs = 50,
  maxRetries = 40
): () => void {
  let cancelled = false
  let retries = 0

  const run = () => {
    if (cancelled) return
    if (typeof window !== 'undefined' && window.AnyidC?.LOAD_MODULE) {
      onReady()
      return
    }
    if (retries >= maxRetries) {
      onTimeout?.()
      return
    }
    retries += 1
    setTimeout(run, intervalMs)
  }

  run()
  return () => {
    cancelled = true
  }
}
