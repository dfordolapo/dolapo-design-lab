import { useState, useEffect } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  // Synchronize state across all component instances using useTheme
  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && e.detail !== theme) {
        setTheme(e.detail);
      }
    };
    window.addEventListener('dolapo-theme-sync', handleSync);
    return () => window.removeEventListener('dolapo-theme-sync', handleSync);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.dispatchEvent(new CustomEvent('dolapo-theme-sync', { detail: next }));
      return next;
    });
  };

  return { theme, toggleTheme };
}
