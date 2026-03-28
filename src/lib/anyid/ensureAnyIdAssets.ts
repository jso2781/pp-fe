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

/**
 * LegalGuardAgr·CertifySelf 등에서 Any-ID UI/SDK 를 켤지 여부.
 * production 이거나 `.env.development` 등에 `VITE_SHOW_ANYID_AREA=true` 일 때만 true.
 */
export function shouldLoadAnyIdSdk(): boolean {
  return import.meta.env.MODE === 'production' || import.meta.env.VITE_SHOW_ANYID_AREA === 'true'
}

/**
 * Any-ID 자원 로드
 * @param isVisibleTitle - Any-ID 타이틀 표시 여부(=정부 통합로그인 행 표시 여부)
 * @returns Promise<void>
 */
export function ensureAnyIdAssets(isVisibleTitle: boolean = true): Promise<void> {
  if (!shouldLoadAnyIdSdk()) {
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
    ensureLinkOnce(`${baseNorm}css/app.css`);
    if(!isVisibleTitle) {
      ensureLinkOnce(`${baseNorm}css/app-overrides.css`);
    }
    anyIdAssetsPromise = loadScript(`${baseNorm}js/manifest.js`)
      .then(() => loadScript(`${baseNorm}js/vendor.js`))
      .then(() => loadScript(`${baseNorm}js/app.js`))
  }

  return anyIdAssetsPromise
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
