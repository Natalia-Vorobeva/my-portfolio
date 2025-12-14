import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
	build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Выделяем фоны в отдельный чанк
          backgrounds: ['./src/components/backgrounds'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Увеличиваем лимит для больших фонов
  },
})