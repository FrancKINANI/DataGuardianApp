import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function MainLayout() {
  const { state: { user, loading } } = useAuth();

  if (loading) {
    return null;
  }

  // Rediriger vers la connexion si non authentifié
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(settings)" />
    </Stack>
  );
} 