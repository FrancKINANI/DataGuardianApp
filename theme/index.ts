import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const palette = {
  primary: '#007AFF', // Bleu iOS
  primaryDark: '#0056B3',
  primaryLight: '#47A3FF',
  secondary: '#5856D6', // Violet iOS
  background: '#FFFFFF',
  surface: '#F2F2F7',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  divider: '#E5E5EA',
  // Dark mode
  darkBackground: '#000000',
  darkSurface: '#1C1C1E',
  darkText: '#FFFFFF',
  darkTextSecondary: '#8E8E93',
  darkBorder: '#38383A',
  darkDivider: '#2C2C2E',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.primary,
    primaryContainer: palette.primaryLight,
    secondary: palette.secondary,
    background: palette.background,
    surface: palette.surface,
    error: palette.error,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: palette.text,
    onSurface: palette.text,
    onSurfaceVariant: palette.textSecondary,
    outline: palette.border,
  },
  roundness: 10,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: palette.primary,
    primaryContainer: palette.primaryDark,
    secondary: palette.secondary,
    background: palette.darkBackground,
    surface: palette.darkSurface,
    error: palette.error,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: palette.darkText,
    onSurface: palette.darkText,
    onSurfaceVariant: palette.darkTextSecondary,
    outline: palette.darkBorder,
  },
  roundness: 10,
}; 