import { useState, useEffect } from 'react';
import type { Hadith } from './types';
import { hadiths } from './data/hadiths';
import HadithListPage from './components/HadithListPage';
import HadithDetailPage from './components/HadithDetailPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHadiths = hadiths.filter(hadith => {
    const searchTerm = searchQuery.toLowerCase().trim();
    if (!searchTerm) return true;
    const title = hadith.title.replace(/<[^>]*>?/gm, ' ').toLowerCase();
    const summary = (hadith.summary ?? '').replace(/<[^>]*>?/gm, ' ').toLowerCase();
    return (
      title.includes(searchTerm) ||
      hadith.id.toString().includes(searchTerm) ||
      summary.includes(searchTerm) ||
      hadith.level.toLowerCase().includes(searchTerm)
    );
  });

  const handleSelectHadith = (hadith: Hadith) => {
    setSelectedHadith(hadith);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedHadith(null);
  };

  const currentIndex = selectedHadith ? filteredHadiths.findIndex(h => h.id === selectedHadith.id) : -1;
  const hasNext = currentIndex !== -1 && currentIndex < filteredHadiths.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (currentIndex === -1) return;
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < filteredHadiths.length) {
      setSelectedHadith(filteredHadiths[nextIndex]);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.remove('animate-fade-in');
      void mainContent.offsetWidth;
      mainContent.classList.add('animate-fade-in');
    }
  }, [selectedHadith]);

  return (
    <ThemeProvider>
      {/* PERBAIKAN: Tambahkan 'flex flex-col' */}
      <div className="bg-stone-50 dark:bg-slate-900 min-h-screen text-gray-800 dark:text-slate-300 selection:bg-emerald-200 dark:selection:bg-emerald-800/50 flex flex-col">
        {/* PERBAIKAN: Tambahkan 'flex-grow' */}
        <main id="main-content" className="flex-grow">
          {selectedHadith ? (
            <HadithDetailPage
              hadith={selectedHadith}
              onBack={handleBackToList}
              onNext={() => handleNavigate('next')}
              onPrev={() => handleNavigate('prev')}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          ) : (
            <HadithListPage
              hadiths={filteredHadiths}
              onSelectHadith={handleSelectHadith}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}
        </main>
        <footer className="text-center py-8 text-gray-400 dark:text-slate-500 text-sm">
          <p>Aplikasi 100 Hadits Pilihan</p>
          <p>Berdasarkan karya Said Yai Ardiansyah, M.A.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;