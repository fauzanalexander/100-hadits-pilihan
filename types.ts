
export interface Hadith {
  id: number;
  title: string; // Can contain HTML for formatting
  level: string;
  shortArabic: { text: string; translation: string }[];
  arabic: string;
  translation: string; // Can contain HTML for formatting
  source: string;
  explanation: string; // Contains HTML for lists, etc.
}
