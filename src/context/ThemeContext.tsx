import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Buat context dengan nilai default
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Buat komponen Provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State untuk tema, mengambil dari localStorage atau default ke 'light'
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Hapus class lama dan tambahkan class baru
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);

    // Simpan pilihan tema ke localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook untuk menggunakan theme context dengan mudah
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};