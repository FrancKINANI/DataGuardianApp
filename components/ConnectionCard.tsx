import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

type ConnectionCardProps = {
  appName?: string;
  destination: string;
  protocol: string;
  timestamp: string;
  bytesIn: number;
  bytesOut: number;
};

export default function ConnectionCard({
  appName,
  destination,
  protocol,
  timestamp,
  bytesIn,
  bytesOut,
}: ConnectionCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card style={[styles.card, { backgroundColor: colors.cardBackground }]}>
      <Card.Content>
        {appName && (
          <Text style={styles.appName}>{appName}</Text>
        )}
        <Text style={styles.destination}>{destination}</Text>
        <Text style={styles.details}>
          {protocol} • {timestamp}
        </Text>
        <Text style={styles.traffic}>
          ↓ {formatBytes(bytesIn)} • ↑ {formatBytes(bytesOut)}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  appName: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  destination: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    opacity: 0.7,
  },
  traffic: {
    fontSize: 14,
    marginTop: 4,
  },
});

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
} 