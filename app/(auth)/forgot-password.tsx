import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();
  const theme = useTheme();

  const handleResetPassword = async () => {
    if (!email) {
      setError('Veuillez entrer votre email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Ionicons 
          name="mail-outline" 
          size={80} 
          color={theme.colors.primary} 
          style={styles.icon}
        />
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Email envoyé
        </Text>
        <Text style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
          Un email de réinitialisation a été envoyé à {email}. Suivez les instructions pour réinitialiser votre mot de passe.
        </Text>
        <Button
          mode="contained"
          onPress={() => router.replace('/(auth)/login')}
          style={styles.button}
        >
          Retour à la connexion
        </Button>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <Ionicons 
          name="lock-closed-outline" 
          size={80} 
          color={theme.colors.primary} 
          style={styles.icon}
        />
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Mot de passe oublié ?
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Entrez votre email pour réinitialiser votre mot de passe
        </Text>

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
          disabled={loading}
        />

        {error ? (
          <Text style={[styles.error, { color: theme.colors.error }]}>
            {error}
          </Text>
        ) : null}

        <Button
          mode="contained"
          onPress={handleResetPassword}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Réinitialiser le mot de passe
        </Button>

        <Link href="/(auth)/login" asChild>
          <Button mode="text" disabled={loading}>
            Retour à la connexion
          </Button>
        </Link>
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
  content: {
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 10,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
}); 