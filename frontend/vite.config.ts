import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/blog/',
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        //dev
        target: 'https://blog-z5et.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      app: '/src/app',
      pages: '/src/pages',
      widgets: '/src/widgets',
      entities: '/src/entities',
      shared: '/src/shared',
    },
  },
})
