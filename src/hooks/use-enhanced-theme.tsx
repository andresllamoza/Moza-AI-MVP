import { useEffect, useState } from 'react';
import { useTheme } from './use-theme';

type Theme = 'light' | 'dark' | 'system';

interface EnhancedThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

export const useEnhancedTheme = (): EnhancedThemeReturn => {
  const { theme, setTheme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Handle system theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    handleChange(); // Initial check
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Update resolved theme when theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Enhanced setTheme with smooth transitions
  const enhancedSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // Add smooth transition effect
    const root = document.documentElement;
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
  };

  return {
    theme,
    setTheme: enhancedSetTheme,
    resolvedTheme
  };
};
