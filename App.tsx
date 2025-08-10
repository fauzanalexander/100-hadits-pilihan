import React, { useState, useEffect, useMemo } from 'react'; // 1. Impor useMemo
import type { Hadith } from './types';
import { hadiths } from './data/hadiths';
import HadithListPage from './components/HadithListPage';
import HadithDetailPage from './components/HadithDetailPage';

function App() {
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);

  // 2. Cari indeks hadits yang sedang aktif menggunakan useMemo untuk efisiensi.
  const currentIndex = useMemo(() => {
    if (!selectedHadith) {
      return -1;
    }
    return hadiths.findIndex(h => h.id === selectedHadith.id);
  }, [selectedHadith]);

  // 3. Tentukan apakah ada hadits sebelum dan sesudahnya.
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < hadiths.length - 1;

  // Fungsi untuk memilih hadits (tidak berubah)
  const handleSelectHadith = (hadith: Hadith) => {
    setSelectedHadith(hadith);
    window.scrollTo(0, 0);
  };

  // Fungsi untuk kembali ke daftar (tidak berubah)
  const handleBackToList = () => {
    setSelectedHadith(null);
  };

  // 4. Tambahkan fungsi untuk navigasi ke hadits selanjutnya.
  const handleNext = () => {
    if (hasNext) {
      const nextHadith = hadiths[currentIndex + 1];
      setSelectedHadith(nextHadith);
      window.scrollTo(0, 0); // Scroll ke atas halaman
    }
  };
  
  // 5. Tambahkan fungsi untuk navigasi ke hadits sebelumnya.
  const handlePrev = () => {
    if (hasPrev) {
      const prevHadith = hadiths[currentIndex - 1];
      setSelectedHadith(prevHadith);
      window.scrollTo(0, 0); // Scroll ke atas halaman
    }
  };

  // useEffect untuk animasi (tidak berubah)
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.remove('animate-fade-in');
      void mainContent.offsetWidth; 
      mainContent.classList.add('animate-fade-in');
    }
  }, [selectedHadith]);

  return (
    <div className="bg-stone-50 min-h-screen text-gray-800 selection:bg-emerald-200">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
      <main id="main-content" className="py-4">
        {selectedHadith ? (
          // 6. Teruskan props baru ke HadithDetailPage
          <HadithDetailPage 
            hadith={selectedHadith} 
            onBack={handleBackToList}
            onPrev={handlePrev}
            onNext={handleNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        ) : (
          <HadithListPage hadiths={hadiths} onSelectHadith={handleSelectHadith} />
        )}
      </main>
       <footer>
      </footer>
    </div>
  );
}

export default App;
