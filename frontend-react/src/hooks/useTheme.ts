import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('theme-preference') as ThemeMode) || 'light';
  });

  useEffect(() => {
    const rootWindow = window.document.documentElement;
    if (theme === 'dark') {
      rootWindow.classList.add('dark');
    } else {
      rootWindow.classList.remove('dark');
    }
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
  };
};