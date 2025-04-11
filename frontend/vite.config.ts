import react from '@vitejs/plugin-react'
import path from 'path'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import type { InlineConfig } from 'vitest/node'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom',
  },
  base: '/erp-mvp',
  define: {
    'import.meta.env.VITE_SESSION_KEY': JSON.stringify(process.env.VITE_SESSION_KEY),
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'import.meta.env.VITE_ENABLE_API_DELAY': JSON.stringify(process.env.VITE_ENABLE_API_DELAY),
    'import.meta.env.VITE_SOFTWARE_VERSION': JSON.stringify(process.env.VITE_SOFTWARE_VERSION),
  },
} as UserConfig & {
  test: InlineConfig
})
