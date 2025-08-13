import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      
      // TAMBAHKAN INI: Opsi untuk membersihkan cache lama secara otomatis
      // Ini adalah sinyal terkuat untuk memaksa pembaruan.
      workbox: {
        cleanupOutdatedCaches: true, // <-- PENTING
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,gif}'],
      },

      // Bagian manifest Anda sudah bagus, tidak perlu diubah.
      manifest: {
        filename: 'manifest.json',
		id: '/',
        name: '100 Hadits Pilihan',
        short_name: 'Hadits Pilihan',
        description: 'Aplikasi referensi 100 hadits pilihan sebagai pedoman hidup sehari-hari, lengkap dengan penjelasan dan terjemahannya.',
        theme_color: '#10b981',
        background_color: '#f8fafc',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        screenshots: [
          {
            "src": "screenshots/screenshot1.png",
            "type": "image/png",
            "sizes": "1080x1920",
            "form_factor": "narrow"
          },
          {
            "src": "screenshots/screenshot2.png",
            "type": "image/png",
            "sizes": "1080x1920",
            "form_factor": "narrow"
          } ,
		  {
            "src": "screenshots/screenshot3.png",
            "type": "image/png",
            "sizes": "1080x1920",
            "form_factor": "narrow"
          } ,
		  {
            "src": "screenshots/screenshot4.png",
            "type": "image/png",
            "sizes": "1080x1920",
            "form_factor": "narrow"
          }
        ],
        launch_handler: {
          "client_mode": ["navigate-existing", "auto"]
        },
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})