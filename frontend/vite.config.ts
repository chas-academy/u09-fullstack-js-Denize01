// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa"; // Lägg till denna rad
import manifest from "./public/manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: manifest,
      workbox: { globPatterns: ["**/*.{js, css, html, svg}"] },
    }),
  ],
});
