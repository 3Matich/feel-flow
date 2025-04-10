import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Agregamos la definición de global para que apunte a window
  define: {
    global: 'window'
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
