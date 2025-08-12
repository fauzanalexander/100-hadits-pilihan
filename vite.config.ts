import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // <-- Impor plugin

export default defineConfig({
  plugins: [
    react(),
    // Tambahkan konfigurasi PWA di sini
    VitePWA({
      // Opsi ini akan otomatis menyuntikkan kode pendaftaran service worker.
      // Kita tidak perlu lagi melakukannya manual di index.tsx.
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      
      // Menggunakan Workbox untuk menghasilkan service worker yang tangguh.
      workbox: {
        // Daftarkan semua aset umum untuk di-cache.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,gif}'],
      },

      // Konfigurasi untuk file manifest.json
      manifest: {
        name: '100 Hadits Pilihan',
        short_name: 'Hadits Pilihan',
        description: 'Kumpulan 100 hadits pilihan sebagai pedoman hidup sehari-hari.',
        theme_color: '#ffffff', // Warna tema untuk mode terang
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
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
            src: 'icons/maskable-icon-512x512.png', // Ikon maskable sangat penting untuk Android
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})