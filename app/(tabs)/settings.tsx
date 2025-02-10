import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, List, Switch, useTheme, Divider, Button } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useAppTheme } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { signOut, state: { user } } = useAuth();
  const theme = useTheme();
  const { currentTheme, toggleTheme } = useAppTheme();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Paramètres
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <List.Item
          title="Compte"
          description={user?.email}
          onPress={() => router.push('/account')}
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size, color }) => (
                <Ionicons name="person-circle-outline" size={size} color={color} />
              )} 
            />
          )}
        />
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <List.Item
          title="Mode sombre"
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size, color }) => (
                <Ionicons name="moon-outline" size={size} color={color} />
              )} 
            />
          )}
          right={() => (
            <Switch
              value={currentTheme === 'dark'}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Notifications"
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size, color }) => (
                <Ionicons name="notifications-outline" size={size} color={color} />
              )} 
            />
          )}
          right={() => (
            <Switch
              value={true}
              onValueChange={() => {}}
              color={theme.colors.primary}
            />
          )}
        />
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <List.Item
          title="À propos"
          onPress={() => router.push('/about')}
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size, color }) => (
                <Ionicons name="information-circle-outline" size={size} color={color} />
              )} 
            />
          )}
        />
        <Divider />
        <List.Item
          title="Aide"
          onPress={() => router.push('/help')}
          left={props => (
            <List.Icon 
              {...props} 
              icon={({ size, color }) => (
                <Ionicons name="help-circle-outline" size={size} color={color} />
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