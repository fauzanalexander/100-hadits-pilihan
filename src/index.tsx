import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 1. Ambil elemen root satu kali saja untuk efisiensi
const rootElement = document.getElementById('root');

// 2. Pastikan elemen root ada sebelum melanjutkan
if (rootElement) {
  // 3. Render aplikasi React Anda
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Berikan pesan error yang jelas jika elemen tidak ditemukan
  console.error("Fatal Error: Root element with id 'root' not found in the DOM.");
}

// 4. Daftarkan Service Worker setelah aplikasi dimuat
// Kode ini dipastikan berada di lingkup terluar dan tidak akan menyebabkan error sintaks.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch(registrationError => {
        console.log('Service Worker registration failed:', registrationError);
      });
  });
}