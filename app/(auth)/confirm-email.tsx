import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ConfirmEmailScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Ionicons 
        name="mail-outline" 
        size={80} 
        color={theme.colors.primary} 
        style={styles.icon}
      />
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Vérifiez votre email
      </Text>
      <Text style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
        Un email de confirmation a été envoyé à votre adresse. Veuillez cliquer sur le lien pour activer votre compte.
      </Text>
      <Button
        mode="contained"
        onPress={() => router.replace('/login')}
        style={styles.button}
      >
        Retour à la connexion
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    borderRadius: 10,
  },
}); 