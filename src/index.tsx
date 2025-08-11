import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // <-- PASTIKAN BARIS INI ADA DAN DI ATAS

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Fatal Error: Root element with id 'root' not found in the DOM.");
}

// Logika pendaftaran Service Worker (tidak berubah)
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