// ============================================================================
// 💚 Core4.AI – Vite Config (FINAL FIXED — Stable Aliases + Clean Mapping)
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
    base: "./",

    plugins: [
      react({
        fastRefresh: true,
        include: "**/*.jsx",
      }),
    ],

    // ------------------------------------------------------------
    // FIXED ALIASES — FINAL & CLEAN
    // ------------------------------------------------------------
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),

        "@components": path.resolve(__dirname, "src/components"),
        "@context": path.resolve(__dirname, "src/context"),

        // ⭐ FIXED — main pages are in src/pages
        "@pages": path.resolve(__dirname, "src/components/pages"),


        "@core": path.resolve(__dirname, "src/components/core"),
        "@ui": path.resolve(__dirname, "src/components/ui"),
        "@services": path.resolve(__dirname, "src/services"),
        "@data": path.resolve(__dirname, "src/data"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@config": path.resolve(__dirname, "src/config"),

        // Subtrees (Merchant / Buyer / Creator ...)
        "@merchant": path.resolve(__dirname, "src/components/pages/merchant"),
        "@buyer": path.resolve(__dirname, "src/components/pages/buyer"),
        "@creator": path.resolve(__dirname, "src/components/pages/creator"),
        "@tribe": path.resolve(__dirname, "src/components/pages/tribe"),
        "@council": path.resolve(__dirname, "src/components/pages/council"),
        "@onboarding": path.resolve(__dirname, "src/components/pages/onboarding"),

        "@analytics": path.resolve(__dirname, "src/components/analytics"),
      },
    },

    // ------------------------------------------------------------
    // Dev Server
    // ------------------------------------------------------------
    server: {
      host: "127.0.0.1",
      port: 5173,
      strictPort: true,
      open: true,

      watch: { usePolling: true, interval: 200 },
      headers: { "Cache-Control": "no-store" },

      hmr: {
        overlay: false,
        timeout: 20000,
      },

      proxy: {
        "/api": {
          target: backendURL,
          changeOrigin: true,
          secure: false,
        },

        "/ws": {
          target: backendURL.replace("http", "ws"),
          changeOrigin: true,
          secure: false,
          ws: true,
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
      chunkSizeWarningLimit: 1500,
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-hot-toast",
        "framer-motion",
        "react-joyride",
        "@react-three/fiber",
        "@react-three/drei",
      ],
    },

    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || mode),
      __API_BASE__: JSON.stringify(backendURL),
    },

    preview: {
      port: 4173,
      strictPort: true,
      host: true,
      proxy: {
        "/api": backendURL,
        "/ws": backendURL.replace("http", "ws"),
      },
    },
  };
});
