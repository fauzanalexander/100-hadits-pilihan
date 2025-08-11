export interface Hadith {
  id: number;
  title: string;
  level: string;
  summary?: string; // <-- TAMBAHKAN BARIS INI
  shortArabic: { text: string; translation: string }[];
  arabic: string;
  translation: string;
  source: string;
  explanation: string;
}