import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://moshimoshinippon.com',
      urls: [
        '/',           // Home
        '/about',      // About page
        '/contact',    // Contact page
        '/japan-visa', // Japan Visa page
        '/services',   // Services page
      ],
      readable: true,     // Pretty XML formatting
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    hmr: {
      overlay: true, // Show overlay errors during dev
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
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
