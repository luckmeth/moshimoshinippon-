import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://moshimoshinippon.com',
      dynamicRoutes: [
        '/', // Home
        '/about',
        '/contact',
        '/japan-visa',
        '/services',
      ],
      lastmodDateOnly: false,
      readable: true,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    hmr: {
      overlay: true, // shows overlay errors while developing
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // ✅ Important for Vercel: Ensures 404s redirect to index.html for React Router
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
