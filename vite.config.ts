import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Vite config for React Router + Vercel deploy
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    hmr: {
      overlay: true, // set to false if you want to hide error overlay
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
