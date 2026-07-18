import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

/**
 * ThemeProvider component manages the light/dark mode preference.
 * Synchronizes preference into local storage and updates root node classes.
 *
 * @component
 * @param {Object} props - Properties
 * @param {React.ReactNode} props.children - Target children nodes to mount context inside
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('startup-crm-theme', false);

  // Sync class on the document root node when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  /**
   * Toggles the theme between light and dark modes.
   */
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to safely retrieve the ThemeContext state and controls.
 * Throws a descriptive error if accessed outside a ThemeProvider.
 *
 * @returns {{ isDarkMode: boolean, toggleTheme: Function }}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider. Please wrap your root tree with <ThemeProvider>.');
  }
  return context;
};

