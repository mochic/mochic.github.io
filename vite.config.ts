import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true, type: "module" },
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Christopher Mochizuki",
        short_name: "C. Mochizuki",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#0f172a",
        icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // settings to ensure new SW takes control ASAP for iOS
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        // end settings
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
        // Don’t fallback for PDFs (or anything with an extension):
        navigateFallbackDenylist: [
          /\.pdf$/i,
          /\.[^/]+$/i, // optional: denies any URL with a file extension
        ],
      },
    }),
  ],
  server: { port: 5173, open: true },
});
