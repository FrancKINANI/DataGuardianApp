import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const theme = useTheme();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signUp(email, password);
      router.replace('/confirm-email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription');
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
          Créer un compte
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Rejoignez DataGuardian pour protéger vos données
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

        <TextInput
          label="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor={theme.colors.primary}
          contentStyle={styles.inputContent}
          disabled={loading}
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          S'inscrire
        </Button>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            Déjà un compte ?
          </Text>
          <Link href="/login" asChild>
            <Button mode="text" disabled={loading}>
              Se connecter
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
    marginBottom: 8,
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
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    marginRight: 8,
  },
}); 