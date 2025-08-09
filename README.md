# 100 Hadits Pilihan

Aplikasi web untuk membaca dan mempelajari 100 hadits pilihan dengan penjelasan lengkap.

## Fitur Utama

### 📖 Daftar Hadits
- **Pencarian Canggih**: Cari hadits berdasarkan nomor, judul, terjemahan, atau penjelasan
- **Highlight Hasil Pencarian**: Kata kunci yang dicari akan ditandai dengan warna kuning
- **Debouncing**: Pencarian responsif dengan delay 300ms untuk performa optimal
- **Loading Indicator**: Indikator loading saat melakukan pencarian
- **Clear Search**: Tombol untuk menghapus pencarian dengan cepat
- **Hasil Pencarian**: Menampilkan jumlah hadits yang ditemukan

### 📄 Halaman Detail Hadits
- **Navigasi Keyboard**: 
  - `←` (Arrow Left): Hadits sebelumnya
  - `→` (Arrow Right): Hadits berikutnya  
  - `ESC`: Kembali ke daftar hadits
- **Tombol Navigasi**: Tombol prev/next yang menonjol dengan warna emerald
- **Pengaturan Ukuran Teks**: Kontrol untuk memperbesar/memperkecil ukuran teks
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile

### 🎨 UI/UX
- **Modern Design**: Menggunakan Tailwind CSS dengan tema emerald
- **Smooth Animations**: Transisi halus antar halaman
- **Accessibility**: Mendukung screen reader dan keyboard navigation
- **PWA Ready**: Progressive Web App dengan manifest dan service worker

## Teknologi

- **React 18** dengan TypeScript
- **Vite** untuk build tool
- **Tailwind CSS** untuk styling
- **PWA** support

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview
```

## Struktur Data

Aplikasi menggunakan data hadits yang disimpan dalam `src/data/hadiths.ts` dengan struktur:

```typescript
interface Hadith {
  id: number;
  title: string;
  level: string;
  arabic: string;
  translation: string;
  shortArabic: Array<{
    text: string;
    translation: string;
  }>;
  explanation: string;
  source: string;
}
```

## Penulis

Berdasarkan karya **Said Yai Ardiansyah, M.A.** - "100 Hadits Pilihan: Pedoman Hidup Sehari-hari dan Penjelasannya"

## Lisensi

Aplikasi ini dibuat untuk tujuan pembelajaran dan dakwah.
