import { useState, useEffect } from 'react';
import type { Hadith } from './types';
import { hadiths } from './data/hadiths';
import HadithListPage from './components/HadithListPage';
import HadithDetailPage from './components/HadithDetailPage';
import ArrowUpIcon from './components/icons/ArrowUpIcon';

function App() {
  const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showBackToTop && window.scrollY > 400) {
        setShowBackToTop(true);
      } else if (showBackToTop && window.scrollY <= 400) {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showBackToTop]);


  const filteredHadiths = hadiths.filter(hadith => {
    const searchTerm = searchQuery.toLowerCase().trim();
    if (!searchTerm) return true;
    const title = hadith.title.replace(/<[^>]*>?/gm, ' ').toLowerCase();
    return title.includes(searchTerm) || hadith.id.toString().includes(searchTerm);
  });
  
  const navigationList = filteredHadiths;

  const handleSelectHadith = (hadith: Hadith) => {
    setSelectedHadith(hadith);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedHadith(null);
  };

  const currentIndex = selectedHadith ? navigationList.findIndex(h => h.id === selectedHadith.id) : -1;
  const hasNext = currentIndex !== -1 && currentIndex < navigationList.length - 1;
  const hasPrev = currentIndex > 0;

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (currentIndex === -1) return;
    
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < navigationList.length) {
      setSelectedHadith(navigationList[nextIndex]);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


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
          />
        )}
      </main>
       <footer className="text-center py-8 text-gray-400 text-sm">
        <p>Aplikasi 100 Hadits Pilihan</p>
        <p>Berdasarkan karya Said Yai Ardiansyah, M.A.</p>
      </footer>
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-opacity duration-300 animate-fade-in"
          aria-label="Kembali ke atas"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;
