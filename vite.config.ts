import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

declare const process: any

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173,
  //   // proxy: {
  //   //   '/api/v1': { target: 'http://127.0.0.1:9095', changeOrigin: true },
  //   //   '/health': { target: 'http://127.0.0.1:9095', changeOrigin: true },
  //   //   '/ready': { target: 'http://127.0.0.1:9095', changeOrigin: true },
  //   //   '/docs': { target: 'http://127.0.0.1:9095', changeOrigin: true },
  //   //   '/openapi.json': { target: 'http://127.0.0.1:9095', changeOrigin: true },
  //   // }
  //
  //     proxy: {
  //         '/api/v1': { target: 'https://preposterous-luetta-nonspecifically.ngrok-free.dev', changeOrigin: true },
  //         '/health': { target: 'https://preposterous-luetta-nonspecifically.ngrok-free.dev', changeOrigin: true },
  //         '/ready': { target: 'https://preposterous-luetta-nonspecifically.ngrok-free.dev', changeOrigin: true },
  //         '/docs': { target: 'https://preposterous-luetta-nonspecifically.ngrok-free.dev', changeOrigin: true },
  //         '/openapi.json': { target: 'https://preposterous-luetta-nonspecifically.ngrok-free.dev', changeOrigin: true },
  //     }
  //   ,
  // },

  server: {
    port: 5173,
    proxy: {
      '/api/v1': {
        target: process.env.VITE_BACKEND_TARGET || 'http://127.0.0.1:9095',
        changeOrigin: true,
        headers: { 'ngrok-skip-browser-warning': '1' },
      },
      '/health': {
        target: process.env.VITE_BACKEND_TARGET || 'http://127.0.0.1:9095',
        changeOrigin: true,
        headers: { 'ngrok-skip-browser-warning': '1' },
      },
      '/ready': {
        target: process.env.VITE_BACKEND_TARGET || 'http://127.0.0.1:9095',
        changeOrigin: true,
        headers: { 'ngrok-skip-browser-warning': '1' },
      },
      '/docs': {
        target: process.env.VITE_BACKEND_TARGET || 'http://127.0.0.1:9095',
        changeOrigin: true,
        headers: { 'ngrok-skip-browser-warning': '1' },
      },
      '/openapi.json': {
        target: process.env.VITE_BACKEND_TARGET || 'http://127.0.0.1:9095',
        changeOrigin: true,
        headers: { 'ngrok-skip-browser-warning': '1' },
      },
    },
  },

    build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('recharts') || id.includes('/d3-')) return 'charts'
          if (id.includes('lucide-react')) return 'icons'
        },
      },
    },
  },
})
