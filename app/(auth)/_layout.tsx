import { Stack } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
  const { state: { user, loading } } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return <Redirect href="/(main)/(tabs)/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
} 