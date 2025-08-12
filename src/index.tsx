import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

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

// HAPUS SEMUA KODE 'if ('serviceWorker' in navigator) { ... }' DARI SINI.
// Plugin akan menanganinya secara otomatis.