import React, { useState } from 'react';
import type { Hadith } from '../types';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon'; // <-- 1. Import ikon baru

interface HadithDetailPageProps {
  hadith: Hadith;
  onBack: () => void;
  // --- 2. Tambahkan props baru untuk navigasi ---
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  // -------------------------------------------
}

const baseSizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
const arabicSizes = ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'];
const shortArabicSizes = ['text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl'];

// --- 3. Terima props baru di dalam komponen ---
const HadithDetailPage: React.FC<HadithDetailPageProps> = ({ 
  hadith, 
  onBack,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) => {
  const [sizeIndex, setSizeIndex] = useState(1);

  const increaseSize = () => {
    setSizeIndex((prev) => Math.min(prev + 1, baseSizes.length - 1));
  };

  const decreaseSize = () => {
    setSizeIndex((prev) => Math.max(prev - 1, 0));
  };
  
  const currentBaseSize = baseSizes[sizeIndex];
  const currentArabicSize = arabicSizes[sizeIndex];
  const currentShortArabicSize = shortArabicSizes[sizeIndex];


  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 animate-fade-in">
      {/* ... (kode style tidak berubah) ... */}
      <style>{`
        .explanation-content ol, .explanation-content ul { padding-left: 1.5rem; margin-top: 1em; margin-bottom: 1em; }
        .explanation-content ol { list-style-type: decimal; }
        .explanation-content ul { list-style-type: disc; }
        .explanation-content li { margin-bottom: 0.5em; padding-left: 0.5rem; }
        .explanation-content ol ol { list-style-type: lower-alpha; margin-top: 0.5em; }
        .explanation-content i, .explanation-content em { font-style: italic; }
        .explanation-content b, .explanation-content strong { font-weight: bold; }
        .explanation-content .font-arabic { font-family: 'Noto Naskh Arabic', serif; }
        .explanation-content .hadits-arab { font-family: 'Noto Naskh Arabic', serif; direction: rtl; text-align: right; font-size: 1.25em; border-top: 1px solid #eee; margin-top: 1em; padding-top: 0.5em; color: #000; }
        .explanation-content .hadits-terjemah { text-align: left; font-size: 1em; margin-top: 0.5em; }
      `}</style>
      
       {/* ... (Header Sticky tidak berubah) ... */}
      <div className="sticky top-0 z-20 bg-stone-50/90 backdrop-blur-sm py-4 mb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-stone-200">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 font-semibold transition-colors" aria-label="Kembali ke daftar hadits">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Kembali</span>
          </button>
          <div className="flex items-center space-x-2">
            <button onClick={decreaseSize} disabled={sizeIndex === 0} className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm" aria-label="Perkecil teks">
              <MinusIcon className="w-5 h-5" />
            </button>
            <button onClick={increaseSize} disabled={sizeIndex === baseSizes.length - 1} className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm" aria-label="Perbesar teks">
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* ... (Konten Header tidak berubah) ... */}
        <header className="text-center mb-8 pb-6 border-b border-stone-200">
          <div className="flex justify-center mb-4">
             <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1 rounded-full">{hadith.level}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-600 italic">Hadits Ke-{hadith.id}</h1>
          <h2 className="text-2xl sm:text-4xl font-bold text-emerald-800 mt-2" dangerouslySetInnerHTML={{ __html: hadith.title }} />
        </header>

 <article className="space-y-12">
          {/* Short Arabic & Translation */}
          <section className="space-y-6">
            {hadith.shortArabic.map((item, index) => (
              <div key={index} className="text-center">
                <p 
                  dir="rtl" 
                  lang="ar" 
                  className={`font-arabic text-gray-900 font-bold leading-relaxed ${currentShortArabicSize} transition-all duration-300`}
                >
                  {item.text}
                </p>
                <p className={`text-gray-500 italic mt-2 ${currentBaseSize} transition-all duration-300`}>{item.translation}</p>
              </div>
            ))}
          </section>

          {/* Full Hadith */}
          <section className="py-8 px-6 bg-stone-50 rounded-lg border border-stone-200">
             <p
              dir="rtl"
              lang="ar"
              className={`font-arabic text-gray-800 leading-loose text-right ${currentArabicSize} transition-all duration-300`}
            >
              {hadith.arabic}
            </p>
            <div className={`mt-6 text-gray-700 leading-relaxed ${currentBaseSize} transition-all duration-300`}>
              <p dangerouslySetInnerHTML={{ __html: hadith.translation }} />
              <p className="text-sm text-gray-500 italic mt-4">
                <span className="font-semibold">Sumber:</span> {hadith.source}
              </p>
            </div>
          </section>

          {/* Explanation */}
          <section className="pt-8 border-t border-stone-200">
            <h3 className="text-2xl font-bold text-emerald-700 mb-4">Penjelasan <i>Hadits</i></h3>
            <div
              className={`explanation-content ${currentBaseSize} text-gray-800 leading-relaxed transition-all duration-300`}
              dangerouslySetInnerHTML={{ __html: hadith.explanation }}
            />
          </section>
        </article>

        {/* --- 4. Tambahkan Navigasi Bawah Halaman --- */}
        <footer className="mt-12 pt-6 border-t border-stone-200">
          <div className="flex justify-between items-center">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 font-semibold transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
              aria-label="Hadits Sebelumnya"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Sebelumnya</span>
            </button>
            
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-800 font-semibold transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
              aria-label="Hadits Selanjutnya"
            >
              <span>Selanjutnya</span>
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </footer>
        {/* -------------------------------------------------- */}

      </div>
    </div>
  );
};

export default HadithDetailPage;
