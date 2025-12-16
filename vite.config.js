// ============================================================================
// 💚 Core4.AI – Vite Config (FINAL CLEAN — NO REACT CODE)
// ============================================================================

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const backendURL =
    env.VITE_API_URL ||
    (mode === "production"
      ? "https://core4ai-backend.onrender.com"
      : "http://127.0.0.1:8000");

  return {
    base: "/",


    plugins: [react()],

    // ------------------------------------------------------------
    // Aliases
    // ------------------------------------------------------------
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@context": path.resolve(__dirname, "src/context"),
        "@pages": path.resolve(__dirname, "src/components/pages"),
        "@merchant": path.resolve(__dirname, "src/components/pages/merchant"),
        "@buyer": path.resolve(__dirname, "src/components/pages/buyer"),
        "@creator": path.resolve(__dirname, "src/components/pages/creator"),
        "@tribe": path.resolve(__dirname, "src/components/pages/tribe"),
        "@ui": path.resolve(__dirname, "src/components/ui"),
        "@services": path.resolve(__dirname, "src/services"),
      },
    },

    // ------------------------------------------------------------
    // Dev Server + Proxy
    // ------------------------------------------------------------
    server: {
      host: "127.0.0.1",
      port: 5173,
      strictPort: true,
      open: true,

      proxy: {
        "/api": {
          target: backendURL,
          changeOrigin: true,
          secure: false,
        },
        "/ws": {
          target: backendURL.replace("http", "ws"),
          ws: true,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // ------------------------------------------------------------
    // Build
    // ------------------------------------------------------------
    build: {
      outDir: "dist",
      sourcemap: true,
      emptyOutDir: true,
    },

    define: {
      __APP_ENV__: JSON.stringify(mode),
      __API_BASE__: JSON.stringify(backendURL),
    },
  };
});
