import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const user = await signIn(email, password);
      if (user) {
        router.replace('/(main)/(tabs)/home');
      }

    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={[
        styles.container, 
        { backgroundColor: theme.colors.background }
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoContainer}>
        <Ionicons 
          name="shield-checkmark-outline" 
          size={80} 
          color={theme.colors.primary} 
          style={styles.logo}
        />
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          DataGuardian
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Protégez vos données en toute simplicité
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor={theme.colors.primary}
          contentStyle={styles.inputContent}
          disabled={loading}
        />

        <TextInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor={theme.colors.primary}
          contentStyle={styles.inputContent}
          disabled={loading}
          right={
            <TextInput.Icon 
              icon={showPassword ? "eye-off" : "eye"} 
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.button}

        >
          Se connecter
        </Button>

        <Link href="/(auth)/forgot-password" asChild>
          <Button mode="text" disabled={loading}>
            Mot de passe oublié ?
          </Button>
        </Link>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            Pas encore de compte ?
          </Text>
          <Link href="/(auth)/register" asChild>
            <Button mode="text" disabled={loading}>
              S'inscrire
            </Button>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    borderRadius: 10,
  },
  inputContent: {
    paddingVertical: 12,
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 10,
    paddingVertical: 6,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    marginRight: 8,
  },
}); 