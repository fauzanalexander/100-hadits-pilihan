import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,gif}'],
      },
      manifest: {
        id: '/', // <-- TAMBAHKAN: Memberi ID unik pada aplikasi Anda
        name: '100 Hadits Pilihan',
        short_name: 'Hadits Pilihan',
        // Deskripsi sudah ada, bagus!
        description: 'Kumpulan 100 hadits pilihan sebagai pedoman hidup sehari-hari.',
        
        // Ganti theme_color agar sesuai dengan tema hijau aplikasi Anda
        theme_color: '#10b981', // <-- UBAH: Warna utama (hijau emerald)
        background_color: '#f8fafc', // <-- UBAH: Warna latar belakang (batu terang)
        
        display: 'standalone',
        scope: '/',
        start_url: '/',
        
        // <-- TAMBAHKAN: Mengunci orientasi ke potret (vertikal)
        orientation: 'portrait-primary',

        // <-- TAMBAHKAN: Screenshots untuk tampilan di Play Store
        // PENTING: Pastikan Anda sudah membuat folder `public/screenshots`
        // dan menaruh file gambar di dalamnya.
        screenshots: [
          {
            "src": "screenshots/screenshot1.png", // Path relatif dari folder public
            "type": "image/png",
            "sizes": "1080x1920",
            "form_factor": "narrow" // 'narrow' untuk mobile
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

        // <-- TAMBAHKAN: Launch Handler untuk pengalaman pengguna yang lebih baik
        launch_handler: {
          "client_mode": ["navigate-existing", "auto"]
        },

        // Bagian 'icons' Anda sudah bagus, tidak perlu diubah
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