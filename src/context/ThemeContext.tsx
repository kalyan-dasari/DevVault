import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('devvault_theme') as Theme;
      return saved || 'dark'; // Default to modern technical dark theme
    } catch {
      return 'dark';
    }
  });

  const [actualTheme, setActualTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const resolveActual = (): 'dark' | 'light' => {
      if (theme === 'system') {
        return mediaQuery.matches ? 'dark' : 'light';
      }
      return theme;
    };

    const resolved = resolveActual();
    setActualTheme(resolved);

    if (resolved === 'dark') {
      root.classList.add('dark');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-[#0b0f17]', 'text-slate-100');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('bg-[#0b0f17]', 'text-slate-100');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    }

    const listener = () => {
      if (theme === 'system') {
        const res = mediaQuery.matches ? 'dark' : 'light';
        setActualTheme(res);
        if (res === 'dark') {
          root.classList.add('dark');
          document.body.classList.remove('bg-slate-50', 'text-slate-900');
          document.body.classList.add('bg-[#0b0f17]', 'text-slate-100');
        } else {
          root.classList.remove('dark');
          document.body.classList.remove('bg-[#0b0f17]', 'text-slate-100');
          document.body.classList.add('bg-slate-50', 'text-slate-900');
        }
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('devvault_theme', newTheme);
    } catch (e) {
      console.error('Failed saving theme preference', e);
    }
  };

  const toggleTheme = () => {
    const next = actualTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
