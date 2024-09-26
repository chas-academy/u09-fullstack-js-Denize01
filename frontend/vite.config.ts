// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa"; // Lägg till denna rad

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Lägg till Vite PWA-pluginen här
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // Sätt detta till true om du vill aktivera PWA i utvecklingsmiljö
      },
      manifest: {
        // Här lägger du till din PWA-manifestkonfiguration
        name: "My React App",
        short_name: "ReactApp",
        description: "My awesome React app using Vite and PWA",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
