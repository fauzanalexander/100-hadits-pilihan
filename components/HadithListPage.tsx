import React from 'react';
import { useState, useMemo } from 'react';
import type { Hadith } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';

interface HadithListPageProps {
  hadiths: Hadith[];
  onSelectHadith: (hadith: Hadith) => void;
}

const HadithListPage: React.FC<HadithListPageProps> = ({ hadiths, onSelectHadith }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => 
    hadiths.filter(h => 
      (h.title || '').toLowerCase().includes(query.toLowerCase()) ||
      (h.summary || '').toLowerCase().includes(query.toLowerCase()) ||
      (h.level || '').toLowerCase().includes(query.toLowerCase())
    ), [hadiths, query]
  );

  const items: JSX.Element[] = [];
  let lastLevel: string | undefined = '';

  for (const hadith of filtered) {
    if (hadith.level && hadith.level !== lastLevel) {
      lastLevel = hadith.level;
      items.push(
        <li className="bg-stone-100 px-4 sm:px-6 py-2 sticky top-0 z-10 border-y border-stone-200" key={lastLevel}>
          <h2 className="text-sm font-bold text-emerald-800 tracking-wider uppercase">{lastLevel}</h2>
        </li>
      );
    }

    items.push(
      <li key={hadith.id}>
        <button
          onClick={() => onSelectHadith(hadith)}
          className="w-full text-left p-4 sm:p-6 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
          aria-label={`Pilih Hadits ${hadith.id}: ${hadith.title.replace(/<[^>]*>?/gm, ' ')}`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full font-bold">
              {hadith.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-emerald-800" dangerouslySetInnerHTML={{ __html: hadith.title }}></p>
              {hadith.summary && (
                <p className="text-sm text-stone-600 mt-1" dangerouslySetInnerHTML={{ __html: hadith.summary }}></p>
              )}
            </div>
            <div className="flex-shrink-0">
              <BookOpenIcon className="h-5 w-5 text-stone-400" />
            </div>
          </div>
        </button>
      </li>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-emerald-700 px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
            100 Hadits Pilihan
          </h1>
          <p className="text-emerald-100 text-center mt-2 text-sm sm:text-base">
            Koleksi hadits-hadits pilihan untuk kehidupan sehari-hari
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 sm:px-6 py-3 bg-white sticky top-0 z-20 border-b border-stone-200">
        <label className="sr-only" htmlFor="search">Cari hadits</label>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            id="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari hadits (judul, ringkasan, tingkat)"
            className="w-full rounded-lg border border-stone-300 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" fill="currentColor" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" fillRule="evenodd"></path>
          </svg>
        </div>
      </div>

      {/* Hadith List */}
      <div className="max-w-4xl mx-auto">
        <ul className="divide-y divide-stone-200">
          {items.length > 0 ? (
            items
          ) : (
            <li className="px-4 sm:px-6 py-8 text-center text-stone-500">
              Tidak ada hadits yang ditemukan
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HadithListPage;
