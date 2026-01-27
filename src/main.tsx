import './i18n/i18n' /* first load */
import { LOCALE_KEY } from './i18n/i18n'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/store'
import { FALLBACK_LANG, normalizeLang } from './routes/lang'
import MenuGate from "@/components/gate/MenuGate";
import { HelmetProvider } from "react-helmet-async";
import App from './App'
// import '@/styles/main.scss'

const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error('Root element (#root) not found')
}

function resolveInitialLang() {
  const saved = sessionStorage.getItem(LOCALE_KEY)
  return (
    normalizeLang(saved) ??
    normalizeLang(navigator.language) ??
    FALLBACK_LANG
  )
}

// ✅ ReactDOM.render 이전에 실행
const lang = resolveInitialLang();

if(window.location.pathname === '/'){
  window.history.replaceState(
    null,
    '',
    `/${lang}${window.location.search}${window.location.hash}`
  )
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuGate fallback={<div style={{ padding: 16 }}>메뉴 불러오는 중...</div>}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </MenuGate>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
