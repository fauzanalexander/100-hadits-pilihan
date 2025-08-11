// PENTING: Setiap kali Anda melakukan deployment dengan perubahan pada file inti
// (seperti mengubah App.tsx, CSS, atau komponen lain), Anda HARUS menaikkan nomor versi di bawah ini.
// Contoh: 'v4', 'v5', dst. Ini adalah sinyal bagi browser untuk memicu pembaruan.
const CACHE_NAME = '100-hadits-pilihan-v4'; // <-- NAIKKAN VERSI KE v4 (atau selanjutnya)

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
// Dijalankan saat browser mendeteksi service worker baru dari server.
self.addEventListener('install', event => {
  console.log(`SW: Menginstall versi cache: ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Menyimpan App Shell ke cache');
        return cache.addAll(urlsToCache);
      })
      // Perintah ini sangat penting. Ia memaksa service worker yang sedang menunggu untuk menjadi aktif.
      // Tanpa ini, pengguna harus menutup semua tab aplikasi sebelum pembaruan terjadi.
      .then(() => self.skipWaiting())
  );
});

// --- FASE AKTIVASI ---
// Dijalankan setelah service worker baru diinstal dan siap mengambil alih.
// Ini adalah tempat yang aman untuk membersihkan cache lama.
self.addEventListener('activate', event => {
  console.log(`SW: Mengaktifkan versi cache: ${CACHE_NAME}`);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Jika nama cache tidak sama dengan nama cache yang baru, maka itu adalah cache lama. Hapus!
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    // Perintah ini memastikan service worker baru mengontrol klien (tab) saat ini dengan segera.
    .then(() => self.clients.claim())
  );
});

// --- FASE FETCH ---
// Dijalankan setiap kali aplikasi meminta sebuah resource (file, gambar, data).
self.addEventListener('fetch', event => {
  // Hanya proses request GET
  if (event.request.method !== 'GET') return;

  // Strategi: Network First, falling back to Cache (untuk halaman HTML)
  // Ini memastikan pengguna selalu mendapatkan HTML terbaru jika online.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Strategi: Cache First, falling back to Network (untuk aset lain seperti CSS, JS, gambar)
  // Ini membuat aplikasi berjalan super cepat dan offline-capable.
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Jika tidak ada di cache, ambil dari network dan simpan ke cache.
        return fetch(event.request).then(networkResponse => {
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