import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      // 👇 Esto redirige el import roto
      { find: './window-config.mjs', replacement: path.resolve(__dirname, 'src/dummy-config.js') }
    ]
  },
  define: {
    global: 'window'
  },
  build: {
    outDir: 'dist'
  },
  base: '/'
});
