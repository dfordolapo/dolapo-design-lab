import { useState, useEffect } from 'react';

export default function useTheme() {
  const [theme] = useState('dark');

  useEffect(() => {
    // Force dark mode on the document body and localstorage
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Disabled
  };

  return { theme: 'dark', toggleTheme };
}
