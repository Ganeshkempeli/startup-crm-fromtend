import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

/**
 * DarkModeToggle renders a premium animated switch for light/dark theme toggling.
 * Contains accessibility features and uses Tailwind classes for animations.
 *
 * @component
 */
export const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={toggleTheme}
        className="relative flex items-center justify-between w-12 h-6 rounded-full p-1 bg-slate-200 dark:bg-slate-800 border border-slate-350 dark:border-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        aria-label="Toggle theme"
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <Sun size={12} className="text-amber-500" />
        <Moon size={12} className="text-indigo-400" />
        
        {/* Sliding circle */}
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 transition-transform duration-300 ${
            isDarkMode ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 select-none hidden md:inline">
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
    </div>
  );
};

export default DarkModeToggle;
