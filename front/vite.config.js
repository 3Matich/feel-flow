import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 importante para rutas absolutas en producción
  build: {
    outDir: 'dist' // 👈 debe coincidir con el "distDir" del vercel.json
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: './window-config.mjs', replacement: path.resolve(__dirname, 'src/dummy-config.js') },
    ],
  },
  define: {
    global: 'window',
  },
});