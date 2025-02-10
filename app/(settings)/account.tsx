import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, List, useTheme, Button, Divider } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AccountScreen() {
  const theme = useTheme();
  const { signOut } = useAuth();
  const { profile, loading } = useProfile();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non disponible';
    return format(new Date(dateString), 'dd MMMM yyyy à HH:mm', { locale: fr });
  };

  const renderDescription = (value: string | null, isLoading: boolean) => {
    if (isLoading) return 'Chargement...';
    return value ? formatDate(value) : 'Non disponible';
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Compte
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <List.Item
          title="Email"
          description={loading ? 'Chargement...' : profile?.email}
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size, color }) => (
                <Ionicons name="mail-outline" size={size} color={color} />
              )} 
            />
          )}
        />
        <Divider />
        <List.Item
          title="Date d'inscription"
          description={renderDescription(profile?.created_at, loading)}
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size, color }) => (
                <Ionicons name="calendar-outline" size={size} color={color} />
              )} 
            />
          )}
        />
        <Divider />
        <List.Item
          title="Dernière connexion"
          description={renderDescription(profile?.last_login, loading)}
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size, color }) => (
                <Ionicons name="time-outline" size={size} color={color} />
              )} 
            />
          )}
        />
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <List.Item
          title="Se déconnecter"
          titleStyle={{ color: theme.colors.error }}
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size }) => (
                <Ionicons name="log-out-outline" size={size} color={theme.colors.error} />
              )} 
            />
          )}
          onPress={handleSignOut}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
}); 