import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'focusmate_theme_v1';

const ThemeContext = createContext({
  theme: 'dark', // 'dark' | 'light'
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  // Load persisted theme
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    } catch (_) {}
  }, []);

  // Apply theme to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('fm-theme-dark', 'fm-theme-light');
    root.classList.add(theme === 'light' ? 'fm-theme-light' : 'fm-theme-dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }, [theme]);

  const value = useMemo(
    () => ({ theme, toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);