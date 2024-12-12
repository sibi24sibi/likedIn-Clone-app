import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    warmup: {
      clientFiles: [
        "./src/components/BigComponent.vue",
        "./src/utils/big-utils.js",
      ],
    },
  },
});
