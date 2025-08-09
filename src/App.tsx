import React, { useState, useEffect } from 'react';
import type { Hadith } from './types';
import { hadiths } from './data/hadiths';
import HadithListPage from './components/HadithListPage';
import HadithDetailPage from './components/HadithDetailPage';

function App() {
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);

  const handleSelectHadith = (hadith: Hadith) => {
    setSelectedHadith(hadith);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedHadith(null);
  };

  useEffect(() => {
    // Add a simple fade-in animation for page transitions
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.remove('animate-fade-in');
      //
      void mainContent.offsetWidth; // Trigger reflow
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
          <HadithDetailPage hadith={selectedHadith} onBack={handleBackToList} />
        ) : (
          <HadithListPage hadiths={hadiths} onSelectHadith={handleSelectHadith} />
        )}
      </main>
       <footer className="text-center py-8 text-gray-400 text-sm">
        <p>Aplikasi 100 Hadits Pilihan</p>
        <p>Berdasarkan karya Said Yai Ardiansyah, M.A.</p>
      </footer>
    </div>
  );
}

export default App;
