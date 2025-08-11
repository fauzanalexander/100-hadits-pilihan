// PENTING: Setiap kali Anda melakukan deployment dengan perubahan pada file inti
// (seperti mengubah App.tsx, CSS, dll.), Anda HARUS menaikkan nomor versi di bawah ini.
// Contoh: 'v3', 'v4', dst. Ini adalah sinyal bagi browser untuk memicu pembaruan.
const CACHE_NAME = '100-hadits-pilihan-v3'; // <-- NAIKKAN VERSI KE v3

// Daftar file kerangka aplikasi (App Shell) yang akan di-cache pertama kali.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico', // Pastikan ikon ini ada di folder public
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// --- FASE INSTALASI ---
// Dijalankan saat browser mendeteksi service worker baru.
self.addEventListener('install', event => {
  console.log('SW: Menginstall versi baru...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Menyimpan App Shell ke cache');
        return cache.addAll(urlsToCache);
      })
      // Perintah ini memaksa service worker yang sedang menunggu untuk menjadi aktif.
      .then(() => self.skipWaiting())
  );
});

// --- FASE AKTIVASI ---
// Dijalankan setelah service worker baru diinstal dan siap mengambil alih.
self.addEventListener('activate', event => {
  console.log('SW: Mengaktifkan versi baru...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Jika nama cache tidak sama dengan nama cache yang baru, hapus.
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    // Perintah ini memastikan service worker baru mengontrol klien (tab) saat ini.
    .then(() => self.clients.claim())
  );
});

// --- FASE FETCH ---
// Dijalankan setiap kali aplikasi meminta sebuah resource (file, gambar, data).
self.addEventListener('fetch', event => {
  // Hanya proses request GET
  if (event.request.method !== 'GET') return;

  // Strategi: Cache, lalu Network (Cache, falling back to Network)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Jika resource ditemukan di cache, langsung sajikan.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Jika tidak, ambil dari network.
        return fetch(event.request).then(networkResponse => {
          // Simpan salinan response yang valid ke dalam cache baru untuk penggunaan offline nanti.
          return caches.open(CACHE_NAME).then(cache => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
  );
});