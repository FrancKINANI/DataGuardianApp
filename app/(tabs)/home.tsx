import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, Surface } from 'react-native-paper';
import { useNetworkStats } from '../../hooks/useNetworkStats';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const theme = useTheme();
  const { isMonitoring, startMonitoring, stopMonitoring } = useNetworkStats();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          DataGuardian
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Votre gardien de données personnelles
        </Text>
      </View>

      <Card style={[styles.statusCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <View style={styles.statusHeader}>
            <Ionicons
              name={isMonitoring ? "shield-checkmark" : "shield-outline"}
              size={40}
              color={isMonitoring ? theme.colors.primary : theme.colors.onSurfaceVariant}
            />
            <Text style={[styles.statusTitle, { color: theme.colors.onSurface }]}>
              {isMonitoring ? 'Protection active' : 'Protection inactive'}
            </Text>
          </View>
          <Text style={[styles.statusDescription, { color: theme.colors.onSurfaceVariant }]}>
            {isMonitoring 
              ? 'DataGuardian surveille activement votre trafic réseau pour protéger vos données.'
              : 'Activez la surveillance pour commencer à protéger vos données.'}
          </Text>
          <Button
            mode="contained"
            onPress={isMonitoring ? stopMonitoring : startMonitoring}
            style={styles.actionButton}
            contentStyle={styles.buttonContent}
            icon={isMonitoring ? "stop-circle" : "play-circle"}
          >
            {isMonitoring ? 'Arrêter la protection' : 'Activer la protection'}
          </Button>
        </Card.Content>
      </Card>

      <View style={styles.featuresGrid}>
        <Surface style={[styles.featureCard, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="analytics-outline" size={32} color={theme.colors.primary} />
          <Text style={[styles.featureTitle, { color: theme.colors.onSurface }]}>
            Analyse en temps réel
          </Text>
          <Text style={[styles.featureDescription, { color: theme.colors.onSurfaceVariant }]}>
            Surveillez votre consommation de données en direct
          </Text>
        </Surface>

        <Surface style={[styles.featureCard, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="notifications-outline" size={32} color={theme.colors.primary} />
          <Text style={[styles.featureTitle, { color: theme.colors.onSurface }]}>
            Alertes intelligentes
          </Text>
          <Text style={[styles.featureDescription, { color: theme.colors.onSurfaceVariant }]}>
            Recevez des notifications en cas d'activité suspecte
          </Text>
        </Surface>

        <Surface style={[styles.featureCard, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="lock-closed-outline" size={32} color={theme.colors.primary} />
          <Text style={[styles.featureTitle, { color: theme.colors.onSurface }]}>
            Protection avancée
          </Text>
          <Text style={[styles.featureDescription, { color: theme.colors.onSurfaceVariant }]}>
            Sécurisez vos données personnelles
          </Text>
        </Surface>

        <Surface style={[styles.featureCard, { backgroundColor: theme.colors.surface }]}>
          <Ionicons name="document-text-outline" size={32} color={theme.colors.primary} />
          <Text style={[styles.featureTitle, { color: theme.colors.onSurface }]}>
            Rapports détaillés
          </Text>
          <Text style={[styles.featureDescription, { color: theme.colors.onSurfaceVariant }]}>
            Consultez l'historique de votre activité
          </Text>
        </Surface>
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
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
  },
  statusCard: {
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  statusDescription: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 30,
  },
  featureCard: {
    width: '47%',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
  },
}); 