/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
import { port } from './src/constants/index'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      '/translate': {
        target: `http://localhost:${port}`,
        changeOrigin: true
      }
    }
  },
  test: {
    environment: 'happy-dom'
  }
})
