import React from 'react';
import type { Hadith } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import SearchIcon from './icons/SearchIcon';
import ArrowUpIcon from './icons/ArrowUpIcon';
import ThemeToggle from './ThemeToggle';

interface HadithListPageProps {
  hadiths: Hadith[];
  onSelectHadith: (hadith: Hadith) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HadithListPage: React.FC<HadithListPageProps> = ({ hadiths, onSelectHadith, searchQuery, setSearchQuery }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const items: JSX.Element[] = [];
  let lastLevel: string | undefined = '';

  for (const hadith of hadiths) {
    if (hadith.level && hadith.level !== lastLevel) {
      lastLevel = hadith.level;
      items.push(
        <li className="bg-stone-100 dark:bg-slate-800 px-4 sm:px-6 py-2 sticky top-[68px] z-10 border-y border-stone-200 dark:border-slate-700" key={lastLevel}>
          <h2 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">{lastLevel}</h2>
        </li>
      );
    }
    items.push(
      <li key={hadith.id}>
        <button
          onClick={() => onSelectHadith(hadith)}
          className="w-full text-left p-4 sm:p-6 hover:bg-emerald-50 dark:hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-600 focus:ring-opacity-50 transition duration-150 ease-in-out"
          aria-label={`Pilih Hadits ${hadith.id}: ${hadith.title.replace(/<[^>]*>?/gm, ' ')}`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-emerald-100 dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 rounded-full font-bold">
              {hadith.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-emerald-800 dark:text-emerald-500" dangerouslySetInnerHTML={{ __html: hadith.title }}></p>
              {hadith.summary && (
                <p className="text-sm text-stone-600 dark:text-slate-400 mt-1" dangerouslySetInnerHTML={{ __html: hadith.summary }}></p>
              )}
            </div>
            <div className="flex-shrink-0">
              <BookOpenIcon className="h-5 w-5 text-stone-400 dark:text-slate-500" />
            </div>
          </div>
        </button>
      </li>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto max-w-4xl pt-4 sm:pt-6 px-4 sm:px-6">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <header className="text-center my-8">
          <BookOpenIcon className="w-16 h-16 mx-auto text-emerald-600 dark:text-emerald-500" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-slate-200 mt-4">100 Hadits Pilihan</h1>
          <p className="text-xl text-emerald-700 dark:text-emerald-400 mt-3">Pedoman Hidup Sehari-hari dan Penjelasannya</p>
          <p className="text-lg text-gray-500 dark:text-slate-400 mt-4">Penulis: Ustadz Said Yai Ardiansyah, M.A.</p>
        </header>
      </div>

      <div className="px-4 sm:px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-20 border-b border-stone-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari hadits (nomor, judul, kategori...)"
            className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <ul className="divide-y divide-stone-200 dark:divide-slate-700">
          {items.length > 0 ? items : (
            <li className="px-4 sm:px-6 py-8 text-center text-stone-500 dark:text-slate-400">
              Tidak ada hadits yang ditemukan untuk "{searchQuery}"
            </li>
          )}
        </ul>
      </div>

      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-emerald-500 transition-opacity duration-300 animate-fade-in"
          aria-label="Kembali ke atas"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default HadithListPage;