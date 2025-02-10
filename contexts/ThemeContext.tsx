import { createContext, useContext, ReactNode } from 'react';
import { useAppTheme, ThemeType } from '../hooks/useAppTheme';

type ThemeContextType = {
  themeType: ThemeType;
  currentTheme: 'light' | 'dark';
  setTheme: (theme: ThemeType) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeContext = useAppTheme();

  return (
    <ThemeContext.Provider value={themeContext}>
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