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
   * - /api/* 요청이 proxyTarget으로 전달됨 → 실제 백엔드 수신 URL: {proxyTarget}/api/...
   */
  const proxyTarget = env.PROXY_TARGET || 'http://localhost:8080/'
  const proxyPrefix = env.PROXY_PREFIX || '/api/pp'

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
