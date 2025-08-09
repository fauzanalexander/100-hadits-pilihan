import { useState, useEffect, useCallback } from 'react';
import type { Hadith } from './types';
import { hadiths } from './data/hadiths';
import HadithListPage from './components/HadithListPage';
import HadithDetailPage from './components/HadithDetailPage';

function App() {
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredHadiths = hadiths.filter(hadith => {
    if (!debouncedSearchQuery.trim()) return true;
    
    const searchTerm = debouncedSearchQuery.toLowerCase();
    const title = hadith.title.replace(/<[^>]*>?/gm, ' ').toLowerCase();
    const translation = hadith.translation.replace(/<[^>]*>?/gm, ' ').toLowerCase();
    const explanation = hadith.explanation.replace(/<[^>]*>?/gm, ' ').toLowerCase();
    
    return (
      title.includes(searchTerm) || 
      hadith.id.toString().includes(searchTerm) ||
      translation.includes(searchTerm) ||
      explanation.includes(searchTerm) ||
      hadith.level.toLowerCase().includes(searchTerm)
    );
  });

  const handleSelectHadith = useCallback((hadith: Hadith) => {
    setSelectedHadith(hadith);
    window.scrollTo(0, 0);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedHadith(null);
  }, []);

  const currentIndex = selectedHadith ? filteredHadiths.findIndex(h => h.id === selectedHadith.id) : -1;
  const hasNext = currentIndex !== -1 && currentIndex < filteredHadiths.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNavigate = useCallback((direction: 'next' | 'prev') => {
    if (currentIndex === -1) return;
    
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < filteredHadiths.length) {
      setSelectedHadith(filteredHadiths[nextIndex]);
      window.scrollTo(0, 0);
    }
  }, [currentIndex, filteredHadiths]);


  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.remove('animate-fade-in');
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
            isSearching={isSearching}
          />
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
