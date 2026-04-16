import './i18n/i18n' /* first load */
import { LOCALE_KEY } from './i18n/i18n'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/store'
import { sanitizeMenuForUi } from '@/features/auth/MenuSlice'
import { FALLBACK_LANG, normalizeLang } from './routes/lang'
import MenuGate from "@/components/gate/MenuGate";
import App from './App'
import '@/styles/main.ko.scss'
import '@/styles/main.en.scss'

// 운영모드시 콘솔 로그 제거
if (import.meta.env.MODE === 'production') {
  console.log = () => {}
  console.info = () => {}
  console.debug = () => {}
}

const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error('Root element (#root) not found')
}

/** PP-be Spring CSRF 쿠키(XSRF-TOKEN) 선발급 — 이후 POST/PUT 등에 axios 인터셉터가 헤더를 붙일 수 있게 함 */
const ppCsrfBootstrapBase =
  import.meta.env.MODE === 'production' || import.meta.env.MODE === 'stg'
    ? '/api/pp'
    : `${import.meta.env.VITE_API_BASE_URL ?? '/api'}/pp`
void axios
  .get(`${ppCsrfBootstrapBase}/security/csrf`, { withCredentials: true })
  .catch(() => {
    /* 오프라인·프록시 미기동 시 무시 */
  })

function resolveInitialLang() {
  const saved = sessionStorage.getItem(LOCALE_KEY)
  return (
    normalizeLang(saved) ??
    normalizeLang(navigator.language) ??
    FALLBACK_LANG
  )
}

// ✅ ReactDOM.render 이전에 실행
// 루트(/, '') URL은 그대로 유지하고 /ko로 자동 리다이렉트하지 않음
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          store.dispatch(sanitizeMenuForUi())
        }}
      >
        <MenuGate fallback={<div style={{ padding: 16 }}>메뉴 불러오는 중...</div>}>
            <App />
        </MenuGate>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
