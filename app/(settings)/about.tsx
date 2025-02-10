import React from 'react';
import { StyleSheet, View, ScrollView, Linking, Image } from 'react-native';
import { Text, List, useTheme, Button, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AboutScreen() {
  const theme = useTheme();

  const features = [
    {
      title: "Surveillance en temps réel",
      description: "Suivez votre consommation de données en direct",
      icon: "analytics-outline"
    },
    {
      title: "Protection avancée",
      description: "Sécurisez vos données personnelles",
      icon: "shield-checkmark-outline"
    },
    {
      title: "Alertes intelligentes",
      description: "Recevez des notifications pertinentes",
      icon: "notifications-outline"
    }
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Button
          icon={({ size, color }) => (
            <Ionicons name="arrow-back" size={size} color={color} />
          )}
          onPress={() => router.back()}
        >
          Retour
        </Button>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          À propos
        </Text>
      </View>

      <View style={styles.appInfo}>
        <Ionicons 
          name="shield-checkmark-outline" 
          size={80} 
          color={theme.colors.primary}
          style={styles.appIcon}
        />
        <Text style={[styles.appName, { color: theme.colors.primary }]}>
          DataGuardian
        </Text>
        <Text style={[styles.appVersion, { color: theme.colors.onSurfaceVariant }]}>
          Version 1.0.0
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
        Fonctionnalités principales
      </Text>

      <View style={styles.features}>
        {features.map((feature, index) => (
          <Card key={index} style={[styles.featureCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.featureContent}>
              <Ionicons name={feature.icon} size={32} color={theme.colors.primary} />
              <Text style={[styles.featureTitle, { color: theme.colors.onSurface }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDescription, { color: theme.colors.onSurfaceVariant }]}>
                {feature.description}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <List.Item
          title="Développeur"
          description="DataGuardian Team"
          left={props => (
            <List.Icon {...props} icon="code-tags" />
          )}
        />
        <List.Item
          title="Licence"
          description="MIT"
          left={props => (
            <List.Icon {...props} icon="license" />
          )}
        />
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <List.Item
          title="Site web"
          onPress={() => Linking.openURL('https://dataguardian.com')}
          left={props => (
            <List.Icon {...props} icon="web" />
          )}
        />
        <List.Item
          title="Politique de confidentialité"
          onPress={() => Linking.openURL('https://dataguardian.com/privacy')}
          left={props => (
            <List.Icon {...props} icon="shield-check" />
          )}
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
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appIcon: {
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 16,
  },
  features: {
    marginBottom: 30,
  },
  featureCard: {
    marginBottom: 16,
    borderRadius: 10,
  },
  featureContent: {
    alignItems: 'center',
    padding: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    textAlign: 'center',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 