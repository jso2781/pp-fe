import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import https from '@/api/axiosInstance'

function ensureAnyIdAssets() {
  const ensureLink = (href: string) => {
    if (document.querySelector(`link[href="${href}"]`)) return
    const l = document.createElement('link')
    l.rel = 'stylesheet'
    l.href = href
    document.head.appendChild(l)
  }

  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const s = document.createElement('script')
      s.src = src
      s.async = true
      s.onload = () => resolve()
      s.onerror = () => reject(new Error(`Failed to load ${src}`))
      document.body.appendChild(s)
    })

  // public 폴더 기준 상대 경로 사용
  // public/anyid/css/app.css -> /anyid/css/app.css
  ensureLink('/anyid/css/app.css')

  // manifest -> vendor -> app 순서 권장
  return loadScript('/anyid/js/manifest.js')
    .then(() => loadScript('/anyid/js/vendor.js'))
    .then(() => loadScript('/anyid/js/app.js'))
}

export default function Login() {
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  const params = useMemo(() => new URLSearchParams(location.search), [location.search])

  const tx = useMemo(() => {
    // SSO를 쓰는 구조라면 SSO 모듈이 txId를 내려줌(가이드). 없으면 로컬에서 생성.
    return params.get('tx') || crypto.randomUUID()
  }, [params])

  const acrValues = useMemo(() => {
    const v = params.get('acrValues')
    const n = v ? parseInt(v, 10) : NaN
    return Number.isFinite(n) ? n : 3
  }, [params])

  const redirectUri = useMemo(() => params.get('redirect_uri') || '/', [params])

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setError(null);
        await ensureAnyIdAssets()
        if (cancelled) return

        // Any-ID SDK의 success 콜백에서 호출될 어댑터 객체를 전역으로 노출
        window.anyidAdaptor = {
          success: async (data: any) => {
            try {
              // Any-ID 샘플(orgLogin.jsp)과 동일하게 ssob/tag(tx) 전송
              await https.post('/auth/anyid/login', {
                ssob: data?.ssob,
                tag: tx,
              })
              navigate(redirectUri, { replace: true })
            } catch (e) {
              console.error(e)
              setError('Server login processing failed.')
            }
          },
        }

        // public 폴더 기준 상대 경로 사용
        // public/anyid/config/config.anyidc.json -> /anyid/config/config.anyidc.json
        const configAnyidcJsonUrl = '/anyid/config/config.anyidc.json';
        console.log("configAnyidcJsonUrl="+configAnyidcJsonUrl);
        if(!window.AnyidC){
            setError('Any-ID module window.AnyidC is not loaded.')
            return;
        }
        // AnyidC 전역 객체는 Any-ID 스크립트 로드 후 생성
        if (!window.AnyidC?.LOAD_MODULE) {
          setError('Failed to load Any-ID module.');
          return;
        }

        // 가이드의 LOAD_MODULE 초기화 파라미터를 React 환경에 맞게 적용
        window.AnyidC.LOAD_MODULE({
          cfg: configAnyidcJsonUrl,
          txId: tx,
          tag: tx,
          lvl: acrValues,
          // SSO 연동이 없는 "이용기관 자체 로그인" 흐름: bypass=1
          bypass: 1,
          toggle: true,
          theme: '4.1.0',
          redirect_uri: redirectUri,
          success: function (data: any) {
            window.anyidAdaptor?.success?.(data)
          },
          fail: function (err: any) {
            console.error(err)
            setError('Any-ID authentication failed.')
          },
          log: function (data: any) {
            console.log(data)
          },
        })

        setReady(true)
      } catch (e) {
        console.error(e)
        setError('An error occurred while loading the Any-ID authentication module.')
      }
    })();

    return () => {
      cancelled = true
    }
  }, [acrValues, navigate, redirectUri, tx])

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Login</h1>

      {error ? (
        <div style={{ padding: 12, border: '1px solid #f0c2c2', borderRadius: 8, marginBottom: 16 }}>
          {error}
        </div>
      ) : null}

      {!ready && !error ? (
        <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, marginBottom: 16 }}>
          Loading Any-ID authentication module...
        </div>
      ) : null}

      {/* 가이드: anyidc 라는 id의 div 영역에 Any-ID 통합로그인 모듈이 그려짐 (id 변경 불가) */}
      <div id="anyidc" />
    </div>
  )
}
