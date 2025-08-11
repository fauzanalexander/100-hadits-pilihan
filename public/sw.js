// PENTING: Setiap kali Anda melakukan deployment baru (mengubah JS/CSS),
// Anda HARUS mengubah nama versi di bawah ini (misal, dari v1 ke v2).
// Ini akan memicu service worker untuk menginstal ulang dan mengambil file baru.
const CACHE_NAME = '100-hadits-pilihan-v2'; // <-- Kita ubah ke v2

// Daftar aset dasar yang akan selalu di-cache saat instalasi.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Tambahkan ikon utama Anda di sini
  '/favicon.ico', // Ganti dengan path ikon Anda jika berbeda
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Proses Instalasi Service Worker
self.addEventListener('install', event => {
  console.log('SW: Menginstall versi baru...');
  // Tunggu sampai semua aset dasar berhasil di-cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Caching App Shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Memaksa service worker baru untuk aktif segera
  );
});

// Proses Aktivasi Service Worker (untuk membersihkan cache lama)
self.addEventListener('activate', event => {
  console.log('SW: Mengaktifkan versi baru...');
  // Hapus semua cache yang tidak sesuai dengan versi cache saat ini
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim()) // Mengambil alih kontrol semua tab yang terbuka
  );
});

// Proses Fetch (Mencegat semua permintaan jaringan)
self.addEventListener('fetch', event => {
  // Hanya tangani request GET
  if (event.request.method !== 'GET') return;

  // Strategi: Cache, jatuh kembali ke Network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Jika ada di cache, langsung kembalikan
        if (cachedResponse) {
          return cachedResponse;
        }

        // Jika tidak ada di cache, ambil dari network
        return fetch(event.request).then(networkResponse => {
          // Simpan salinan response ke dalam cache untuk penggunaan offline nanti
          return caches.open(CACHE_NAME).then(cache => {
            // Pastikan kita hanya meng-cache response yang valid
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
  );
});