import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  /**
   * UI base path
   * - dev : '/'
   * - prod: '/' 또는 '/pp/' (인프라 확정값에 맞춤)
   */
  const base = (env.VITE_APP_BASE || '/').replace(/\/+$/, '/')

  /**
   * Dev-only proxy settings
   * (vite dev server에서만 사용됨)
   */
  const proxyTarget = env.PROXY_TARGET || 'http://localhost:8080'
  const proxyPrefix = env.PROXY_PREFIX || '/api'

  return {
    base,
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // React 코어
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'react-vendor'
            }
            // MUI + Emotion
            if (
              id.includes('node_modules/@mui/') ||
              id.includes('node_modules/@emotion/')
            ) {
              return 'mui'
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
            // i18n은 react 의존으로 순환 참조되므로 별도 청크 제외(앱 청크에 포함)
            // AG Grid
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
            // swiper, dompurify, helmet 등
            if (
              id.includes('node_modules/swiper') ||
              id.includes('node_modules/dompurify') ||
              id.includes('node_modules/react-helmet-async') ||
              id.includes('node_modules/slorber')
            ) {
              return 'misc-vendor'
            }
            return undefined
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
        onwarn(warning, defaultHandler) {
          // react-helmet-async의 /*#__PURE__*/ 주석 위치 경고 무시 (번들 결과에는 영향 없음)
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
            (typeof warning.message === 'string' && warning.message.includes('__PURE__'))
          ) {
            return
          }
          defaultHandler(warning)
        },
      },
      chunkSizeWarningLimit: 800,
      sourcemap: false,
      ...(mode === 'production' && {
        esbuild: { drop: ['console', 'debugger'] },
      }),
    },
    server: {
      // 브라우저 자동 열기 비활성화 (외부 브라우저 사용)
      open: false,
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
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, proxyPrefix),
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
