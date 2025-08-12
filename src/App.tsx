import { useState, useEffect } from 'react';
import type { Hadith } from './types';
import { hadiths } from './data/hadiths';
import HadithListPage from './components/HadithListPage';
import HadithDetailPage from './components/HadithDetailPage';
import { ThemeProvider } from './context/ThemeContext';
import ArrowUpIcon from './components/icons/ArrowUpIcon'; // <-- Impor ikon kembali
function App() {
const [selectedHadith, setSelectedHadith] = useState<Hadith | null>(null);
const [searchQuery, setSearchQuery] = useState('');
// TAMBAHKAN KEMBALI: State dan logika untuk tombol Back to Top
const [showBackToTop, setShowBackToTop] = useState(false);
useEffect(() => {
const checkScroll = () => {
setShowBackToTop(window.scrollY > 100);
};
window.addEventListener('scroll', checkScroll);
return () => window.removeEventListener('scroll', checkScroll);
}, []);
const handleBackToTop = () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
};
//-----------------------------------------------------
const filteredHadiths = hadiths.filter(hadith => {
const searchTerm = searchQuery.toLowerCase().trim();
if (!searchTerm) return true;
const title = hadith.title.replace(/<[^>]>?/gm, ' ').toLowerCase();
const summary = (hadith.summary ?? '').replace(/<[^>]>?/gm, ' ').toLowerCase();
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
<div className="bg-stone-50 dark:bg-slate-900 min-h-screen text-gray-800 dark:text-slate-300 selection:bg-emerald-200 dark:selection:bg-emerald-800/50 flex flex-col">
<main id="main-content" className="flex-grow animate-fade-in">
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
      <p>Berdasarkan buku karya ustadz Said Yai Ardiansyah, M.A.</p>
	  <p>Build by FA</p>
    </footer>

    {/* TAMBAHKAN KEMBALI: Tombol Back to Top ditempatkan di sini, di luar <main> */}
    {/* Tampil hanya jika 'showBackToTop' true DAN tidak sedang di halaman detail */}
    {showBackToTop && !selectedHadith && (
      <button
        onClick={handleBackToTop}
        className="fixed bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-emerald-500 transition-all duration-300 animate-slide-in"
        aria-label="Kembali ke atas"
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>
    )}
  </div>
</ThemeProvider>

);
}
export default App;