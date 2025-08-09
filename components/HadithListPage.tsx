import type { Hadith } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import SearchIcon from './icons/SearchIcon';

interface HadithListPageProps {
  hadiths: Hadith[];
  onSelectHadith: (hadith: Hadith) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching?: boolean;
}

const HadithListPage = ({ hadiths, onSelectHadith, searchQuery, setSearchQuery, isSearching = false }: HadithListPageProps) => {
  // Function to highlight search terms
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark>
      ) : part
    );
  };

  const items: JSX.Element[] = [];
  let lastLevel: string | undefined = '';

  for (const hadith of hadiths) {
    if (hadith.level && hadith.level !== lastLevel) {
      lastLevel = hadith.level;
      items.push(
        <li key={lastLevel} className="bg-stone-100 px-4 sm:px-6 py-2 sticky top-16 z-10 border-y border-stone-200">
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
              <p className="text-lg font-semibold text-emerald-800">
                {searchQuery ? highlightText(hadith.title.replace(/<[^>]*>?/gm, ' '), searchQuery) : (
                  <span dangerouslySetInnerHTML={{ __html: hadith.title }} />
                )}
              </p>
            </div>
            <div>
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
      <div className="text-center mb-8">
        <BookOpenIcon className="w-16 h-16 mx-auto text-emerald-600" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-4">100 Hadits Pilihan</h1>
        <p className="text-xl text-emerald-700 mt-3">"Pedoman Hidup Sehari-hari dan Penjelasannya"</p>
        <p className="text-lg text-gray-500 mt-4">Penulis: Said Yai Ardiansyah, M.A.</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm p-4 border-b border-stone-200">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-10 pr-10 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              placeholder="Cari hadits (nomor, judul, terjemahan, atau penjelasan)..."
              aria-label="Cari hadits"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                aria-label="Hapus pencarian"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-500">
              {isSearching ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mencari...
                </span>
              ) : hadiths.length > 0 ? (
                <span>Ditemukan {hadiths.length} hadits</span>
              ) : (
                <span>Tidak ada hasil</span>
              )}
            </div>
          )}
        </div>

        {hadiths.length > 0 ? (
          <ul className="divide-y divide-stone-200">
            {items}
          </ul>
        ) : (
          <div className="p-12 text-center text-gray-500">
            {searchQuery ? (
              <div>
                <SearchIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium">Tidak ada hasil ditemukan</p>
                <p className="text-sm mt-2">Coba kata kunci lain atau nomor hadits yang berbeda</p>
              </div>
            ) : (
              <div>
                <BookOpenIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium">Tidak ada hadits tersedia</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithListPage;
