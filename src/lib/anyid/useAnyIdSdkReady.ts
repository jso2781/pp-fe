import { useEffect, useState } from 'react'
import { ensureAnyIdAssets, waitForAnyidC } from '@/lib/anyid/ensureAnyIdAssets'

export type UseAnyIdSdkReadyOptions = {
  /**
   * true(기본): SDK 기본 타이틀(정부 통합로그인 행) 유지.
   * false: `ensureAnyIdAssets(false)` — 타이틀 숨김용 오버라이드 CSS 포함 (본인인증·임베드형).
   */
  showGovLoginTitleRow?: boolean
}

/**
 * `shouldLoadAnyIdSdk()` 가 true일 때만 `enabled` 로 사용할 것.
 * manifest → vendor → app 로드 후 `AnyidC.LOAD_MODULE` 호출 가능 시점에 `true`.
 */
export function useAnyIdSdkReady(enabled: boolean, options?: UseAnyIdSdkReadyOptions): boolean {
  const showTitle = options?.showGovLoginTitleRow !== false
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setReady(false)
      return
    }
    let cancelled = false
    let cancelWait: (() => void) | null = null

    ensureAnyIdAssets(showTitle)
      .then(() => {
        if (cancelled) return
        cancelWait = waitForAnyidC(
          () => {
            if (!cancelled) setReady(true)
          },
          () => {
            if (!cancelled) setReady(false)
          },
          50,
          40
        )
      })
      .catch(() => {
        if (!cancelled) setReady(false)
      })

    return () => {
      cancelled = true
      cancelWait?.()
      setReady(false)
    }
  }, [enabled, showTitle])

  return ready
}
