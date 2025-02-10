export type ColorScheme = 'light' | 'dark';

export interface Theme {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  cardBackground: string;
  primary: string;
  secondary: string;
  success: string;
  danger: string;
}

export interface ThemeColors {
  light: Theme;
  dark: Theme;
} 