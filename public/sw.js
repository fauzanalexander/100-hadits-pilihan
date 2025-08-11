// public/sw.js

// 1. Tentukan nama dan versi cache.
// PENTING: Setiap kali Anda mengubah file di proyek (misal, update CSS atau JS),
// Anda HARUS mengubah nama versi ini (misal, dari v1 ke v2).
// Ini akan memicu service worker untuk menginstal ulang dan mengambil file baru.
const CACHE_NAME = '100-hadits-pilihan-v1';

// Daftar aset dasar yang akan selalu di-cache saat instalasi.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Tambahkan logo atau ikon utama aplikasi Anda di sini
  // contoh: '/logo-utama.svg'
];

// 2. Proses Instalasi Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Menginstall...');
  // Tunggu sampai semua aset dasar berhasil di-cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching App Shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Aktifkan service worker baru segera
  );
});

// 3. Proses Aktivasi Service Worker (untuk membersihkan cache lama)
self.addEventListener('activate', event => {
  console.log('Service Worker: Mengaktifkan...');
  // Hapus semua cache yang tidak sesuai dengan versi cache saat ini
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Menghapus cache lama', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 4. Proses Fetch (Mencegat semua permintaan jaringan)
self.addEventListener('fetch', event => {
  // Kita hanya akan meng-cache request GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Jika response ada di cache, kembalikan dari cache
        if (cachedResponse) {
          console.log('Service Worker: Mengambil dari cache:', event.request.url);
          return cachedResponse;
        }

        // Jika tidak ada di cache, ambil dari network
        return fetch(event.request).then(
          networkResponse => {
            console.log('Service Worker: Mengambil dari network dan menyimpan ke cache:', event.request.url);
            
            // Simpan salinan response ke dalam cache untuk penggunaan offline nanti
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              // Kembalikan response asli ke browser
              return networkResponse;
            });
          }
        ).catch(error => {
          // Jika network gagal (misalnya, offline) dan tidak ada di cache,
          // Anda bisa memberikan halaman fallback offline di sini jika mau.
          console.log('Service Worker: Gagal mengambil dari network.', error);
          // Contoh: return caches.match('/offline.html');
        });
      })
  );
});