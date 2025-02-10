import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNetworkStats } from '../../hooks/useNetworkStats';
import { Ionicons } from '@expo/vector-icons';

export default function MonitoringScreen() {
  const theme = useTheme();
  const { isMonitoring, startMonitoring, stopMonitoring, currentStats } = useNetworkStats();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          Surveillance
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          {isMonitoring ? 'Surveillance en cours...' : 'Surveillance inactive'}
        </Text>
      </View>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.statusContainer}>
          <View style={styles.statusIcon}>
            {isMonitoring ? (
              <ActivityIndicator size="small" color={theme.colors.primary} />
            ) : (
              <Ionicons 
                name="pulse" 
                size={24} 
                color={theme.colors.onSurfaceVariant} 
              />
            )}
          </View>
          <Button
            mode="contained"
            onPress={isMonitoring ? stopMonitoring : startMonitoring}
            style={styles.button}
          >
            {isMonitoring ? 'Arrêter la surveillance' : 'Démarrer la surveillance'}
          </Button>
        </View>
      </Card>

      {isMonitoring && currentStats && (
        <View style={styles.statsGrid}>
          <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.statsLabel, { color: theme.colors.onSurfaceVariant }]}>
                Données envoyées
              </Text>
              <Text style={[styles.statsValue, { color: theme.colors.onSurface }]}>
                {(currentStats.bytesSent / 1024 / 1024).toFixed(2)} MB
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.statsLabel, { color: theme.colors.onSurfaceVariant }]}>
                Données reçues
              </Text>
              <Text style={[styles.statsValue, { color: theme.colors.onSurface }]}>
                {(currentStats.bytesReceived / 1024 / 1024).toFixed(2)} MB
              </Text>
            </Card.Content>
          </Card>
        </View>
      )}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
  },
  card: {
    borderRadius: 10,
    marginBottom: 20,
  },
  statusContainer: {
    padding: 16,
    alignItems: 'center',
  },
  statusIcon: {
    marginBottom: 16,
    height: 24,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  statsLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 