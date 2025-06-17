import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" }
    ]
  },
  define: {
    global: "window"
  },
});
