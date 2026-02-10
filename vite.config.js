import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
	build: {
    rollupOptions: {
      output: {
        manualChunks: {
         
          'vendor': ['react', 'react-dom', 'react-icons'],
          'ui': ['prismjs', 'react-icons/fa', 'react-icons/fi'],
        }
      }
    },
    chunkSizeWarningLimit: 800,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    }
  }
})