import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  // process.env와 loadEnv 병합: npm run localout 시 cross-env 등으로 넘긴 값 + .env.[mode] 모두 반영
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  /**
   * UI base path
   * - dev : '/'
   * - prod: '/' 또는 '/pp/' (인프라 확정값에 맞춤)
   */
  const base = (env.VITE_APP_BASE || '/').replace(/\/+$/, '/')

  /**
   * Dev-only proxy settings
   * (vite dev server에서만 사용됨)
   * - `/api/ca/auth/*` → CA auth 서버 (기본 `VITE_AUTH_API_BASE_URL` 의 host, 또는 `PROXY_AUTH_TARGET`)
   * - (선택) `PROXY_PP_ESIGN_TARGET` 설정 시 `/api/pp/auth/esign/*` → 해당 호스트 (Any-ID esign accessInfo 등 스테이징 강제)
   * - 그 외 `/api/*` → proxyTarget + PROXY_PREFIX rewrite (pp-be)
   */
  const proxyTarget = env.PROXY_TARGET || 'http://localhost:8080/'
  const proxyPrefix = env.PROXY_PREFIX || '/api/pp'

  /** CA auth API (예: workAccessLog) — 브라우저는 `/api/ca/auth/...`, Vite가 `VITE_AUTH_API_BASE_URL` 호스트로 그대로 전달 */
  const proxyAuthTarget = (() => {
    const raw = env.PROXY_AUTH_TARGET?.replace(/\/+$/, '')
    if (raw) return raw
    const base = env.VITE_AUTH_API_BASE_URL
    if (base) {
      try {
        const u = new URL(base)
        return `${u.protocol}//${u.host}`
      } catch {
        /* ignore */
      }
    }
    return 'http://localhost:8088'
  })()

  /**
   * Any-ID 간편인증(esign/accessInfo, esign/extractInfo) 경로가 /api/pp/auth/esign/* 로 호출될 때
   * 로컬 백엔드 대신 스테이징(예: https://stg.drugsafe.or.kr)으로 넘기고 싶으면 PROXY_PP_ESIGN_TARGET 설정.
   * 경로는 그대로 유지: {target}/api/pp/auth/esign/accessInfo
   *                    {target}/api/pp/auth/esign/extractInfo
   */
  const proxyPpEsignTarget = env.PROXY_PP_ESIGN_TARGET?.replace(/\/+$/, '') || ''

  return {
    base,
    plugins: [react()],
    // 빌드 시 메모리: 개발계 서버 등에서는 NODE_OPTIONS=--max-old-space-size=4096 또는 npm run build 사용 권장
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // React + MUI + Emotion (한 묶음으로 분리해 circular chunk 경고 방지)
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/@mui/') ||
              id.includes('node_modules/@emotion/')
            ) {
              return 'react-mui'
            }
            // Redux
            if (
              id.includes('node_modules/@reduxjs/toolkit') ||
              id.includes('node_modules/redux') ||
              id.includes('node_modules/react-redux') ||
              id.includes('node_modules/redux-persist')
            ) {
              return 'redux-vendor'
            }
            // React Router
            if (id.includes('node_modules/react-router')) {
              return 'router'
            }
            // AG Grid (용량 큼 → 별도 청크로 분리)
            if (id.includes('node_modules/ag-grid')) {
              return 'ag-grid'
            }
            // 폼/유틸 (react-hook-form, zod, axios 등)
            if (
              id.includes('node_modules/react-hook-form') ||
              id.includes('node_modules/@hookform') ||
              id.includes('node_modules/zod') ||
              id.includes('node_modules/axios')
            ) {
              return 'forms-utils'
            }
            // swiper, dompurify 등
            if (
              id.includes('node_modules/swiper') ||
              id.includes('node_modules/dompurify')
            ) {
              return 'misc-vendor'
            }
            return undefined
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      chunkSizeWarningLimit: 600,
      sourcemap: false,
      ...(mode === 'production' && {
        esbuild: { drop: ['console', 'debugger'] },
      }),
    },
    server: {
      // 브라우저 자동 열기 비활성화 (외부 브라우저 사용)
      open: false,
      // host: true,
      proxy: {
        /**
         * Frontend always calls: /api/*
         * ex) axios.get('/users')
         *
         * dev :
         *   /api/users
         *   -> http://localhost:8080/pp/api/users
         *
         * prod :
         *   vite proxy 미사용
         *   -> infra/nginx handles /api/*
         */
        '/api/ca/auth': {
          target: proxyAuthTarget,
          changeOrigin: true,
          secure: false,
        },
        ...(proxyPpEsignTarget
          ? {
              '/api/pp/auth/esign': {
                target: proxyPpEsignTarget,
                changeOrigin: true,
                secure: true,
              },
            }
          : {}),
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, proxyPrefix),
        },
        '/oidc': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, './shared')
      }
    }
  }
})
