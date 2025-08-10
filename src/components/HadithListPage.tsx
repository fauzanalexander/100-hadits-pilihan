import React from 'react';
import type { Hadith } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import SearchIcon from './icons/SearchIcon';

interface HadithListPageProps {
  hadiths: Hadith[];
  onSelectHadith: (hadith: Hadith) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HadithListPage: React.FC<HadithListPageProps> = ({ hadiths, onSelectHadith, searchQuery, setSearchQuery }) => {
  const items: JSX.Element[] = [];
  let lastLevel: string | undefined = '';
  
  const searchHeaderHeight = '85px'; // Approximate height of the sticky search header

  for (const hadith of hadiths) {
    if (hadith.level && hadith.level !== lastLevel) {
      lastLevel = hadith.level;
      items.push(
        <li key={lastLevel} className="bg-stone-100 px-4 sm:px-6 py-2 sticky z-10 border-y border-stone-200" style={{ top: searchHeaderHeight }}>
          <h2 className="text-sm font-bold text-emerald-800 tracking-wider uppercase">{lastLevel}</h2>
        </li>
      );
    }

    items.push(
      <li key={hadith.id}>
        <button
          onClick={() => onSelectHadith(hadith)}
          className="w-full text-left p-4 sm:p-6 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50 transition duration-150 ease-in-out group"
          aria-label={`Pilih Hadits ${hadith.id}: ${hadith.title.replace(/<[^>]*>?/gm, ' ')}`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full font-bold">
              {hadith.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-emerald-800" dangerouslySetInnerHTML={{ __html: hadith.title }} />
            </div>
            <div>
              <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </button>
      </li>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6">
      <header className="text-center mb-8">
        <BookOpenIcon className="w-16 h-16 mx-auto text-emerald-600" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4">100 Hadits Pilihan</h1>
        <p className="text-xl text-emerald-700 mt-3">"Pedoman Hidup Sehari-hari dan Penjelasannya"</p>
        <p className="text-lg text-gray-500 mt-4">Penulis: Said Yai Ardiansyah, M.A.</p>
      </header>
      
      <div className="sticky top-0 z-20 py-4 bg-stone-50/90 backdrop-blur-sm -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="relative max-w-4xl mx-auto">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-md border-stone-300 pl-10 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm py-2"
            placeholder="Cari hadits (nomor atau judul)..."
            aria-label="Cari hadits"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-4">
        {hadiths.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="font-semibold">Tidak Ditemukan</p>
            <p className="mt-1">Tidak ada hasil yang cocok dengan "{searchQuery}".</p>
          </div>
        ) : (
          <ul className="divide-y divide-stone-200">
            {items}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HadithListPage;