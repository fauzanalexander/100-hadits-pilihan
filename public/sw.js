// Nama cache
const CACHE_NAME = '100-hadits-pilihan-v1';
// Daftar file yang akan di-cache (shell aplikasi dasar)
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Tambahkan path ke file JS dan CSS utama setelah build jika Anda tahu namanya
  // Contoh: '/assets/index.js', '/assets/index.css'
  // Tambahkan juga path ke ikon
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Event 'install': dijalankan saat service worker pertama kali diinstal
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch': dijalankan setiap kali ada request (misal, membuka halaman, mengambil gambar)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika request ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari network
        return fetch(event.request);
      })
  );
});```
