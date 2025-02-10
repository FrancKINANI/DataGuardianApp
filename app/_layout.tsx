import { useEffect, useState } from 'react';
import { Slot, Stack } from 'expo-router';
import { PaperProvider, configureFonts } from 'react-native-paper';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { CustomSplashScreen } from '../components/CustomSplashScreen';
import { Platform } from 'react-native';
import { lightTheme, darkTheme } from '../theme';

const fontConfig = {
  displayLarge: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 57,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 45,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 36,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: Platform.select({
      web: 'Roboto',
      ios: 'System',
      android: 'Roboto',
      default: 'sans-serif',
    }),
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.4,
    lineHeight: 16,
  },
};

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const { currentTheme } = useTheme();

  const paperTheme = currentTheme === 'dark' ? {
    ...darkTheme,
    fonts: configureFonts({config: fontConfig}),
  } : {
    ...lightTheme,
    fonts: configureFonts({config: fontConfig}),
  };

  if (!isReady) {
    return <CustomSplashScreen onFinish={() => setIsReady(true)} />;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <Slot />
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
} 