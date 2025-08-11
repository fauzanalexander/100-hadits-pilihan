import React from 'react';
import { useTheme } from '../context/ThemeContext';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6 text-emerald-700" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;