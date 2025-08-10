// HadithDetailPage.tsx
import React, { useState } from "react";
import type { Hadith } from "../types";

interface HadithDetailPageProps {
  hadith: Hadith;
  onBack: () => void;
  onGoToHadith: (id: number) => void;
  total?: number; // default 100
}

const HadithDetailPage: React.FC<HadithDetailPageProps> = ({
  hadith,
  onBack,
  onGoToHadith,
  total = 100,
}) => {
  const [sizeIndex, setSizeIndex] = useState(1); // 0: small, 1: normal, 2: large
  const sizes = [
    { arab: "text-2xl sm:text-3xl", latin: "text-base sm:text-lg" },
    { arab: "text-3xl sm:text-4xl", latin: "text-base sm:text-lg" },
    { arab: "text-4xl sm:text-5xl", latin: "text-lg sm:text-xl" },
  ];

  const prevId = hadith.id > 1 ? hadith.id - 1 : null;
  const nextId = hadith.id < total ? hadith.id + 1 : null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <div className="px-4 sm:px-6 py-3 bg-white sticky top-0 z-20 border-b border-stone-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            aria-label="Kembali"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Kembali
          </button>

          {/* font size controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSizeIndex((v) => Math.max(0, v - 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50"
              aria-label="Perkecil"
            >
              <span className="text-lg leading-none">−</span>
            </button>
            <button
              type="button"
              onClick={() => setSizeIndex((v) => Math.min(2, v + 1))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50"
              aria-label="Perbesar"
            >
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Header */}
          <header className="mb-6">
            <div className="text-sm text-stone-500 mb-1">
              TINGKAT {hadith.level ?? "-"} • Hadits Ke-{hadith.id}
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-stone-800">
              {hadith.title}
            </h1>
          </header>

          {/* Arabic text block */}
          <article className="mb-8">
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-5 sm:p-6 mb-4">
              <p
                dir="rtl"
                className={`font-arabic leading-loose text-stone-900 ${sizes[sizeIndex].arab}`}
              >
                {hadith.arabic}
              </p>
            </div>

            {/* Translation / matn */}
            {hadith.translation && (
              <p className={`text-stone-800 ${sizes[sizeIndex].latin}`}>
                {hadith.translation}
              </p>
            )}

            {/* Source / takhrij */}
            {(hadith.source || hadith.reference) && (
              <p className="mt-4 text-sm text-stone-600 italic">
                Sumber: {hadith.source ?? hadith.reference}
              </p>
            )}

            {/* Grade */}
            {hadith.grade && (
              <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                {hadith.grade}
              </div>
            )}
          </article>

          {/* Explanation section */}
          {(hadith.explanation && hadith.explanation.length > 0) && (
            <section className="mt-8">
              <h2 className="text-emerald-700 text-2xl font-semibold mb-4">
                Penjelasan <em>Hadits</em>
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-stone-800">
                {hadith.explanation.map((p: string, idx: number) => (
                  <li key={idx} className={`${sizes[sizeIndex].latin}`}>
                    {p}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Bottom navigation */}
          <nav className="mt-10 pt-6 border-t border-stone-200">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => prevId && onGoToHadith(prevId)}
                disabled={!prevId}
                className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Hadits sebelumnya"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Sebelumnya
              </button>

              <div className="text-sm text-stone-500">
                {hadith.id} / {total}
              </div>

              <button
                type="button"
                onClick={() => nextId && onGoToHadith(nextId)}
                disabled={!nextId}
                className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Hadits berikutnya"
              >
                Berikutnya
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HadithDetailPage;
