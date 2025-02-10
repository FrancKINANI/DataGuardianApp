import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Searchbar, useTheme, Divider, Button, Menu, Portal, Modal, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useDataAlerts } from '../../hooks/useDataAlerts';

type NetworkEvent = {
  id: string;
  timestamp: Date;
  type: 'sent' | 'received';
  bytes: number;
  app: string;
};

// Données de test étendues
const mockEvents: NetworkEvent[] = [
  {
    id: '1',
    timestamp: new Date(),
    type: 'sent',
    bytes: 1024 * 1024 * 2.5,
    app: 'WhatsApp',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000),
    type: 'received',
    bytes: 1024 * 1024 * 5.7,
    app: 'Chrome',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 7200000),
    type: 'sent',
    bytes: 1024 * 1024 * 1.2,
    app: 'Gmail',
  },
];

type SortOption = 'time' | 'size' | 'app';
type FilterType = 'all' | 'sent' | 'received';

export default function HistoryScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [events] = useState<NetworkEvent[]>(mockEvents);
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showThresholdModal, setShowThresholdModal] = useState(false);
  const [thresholdInput, setThresholdInput] = useState('');

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.app.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || event.type === filterType;
      const matchesDate = event.timestamp.toDateString() === selectedDate.toDateString();
      return matchesSearch && matchesType && matchesDate;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return b.timestamp.getTime() - a.timestamp.getTime();
        case 'size':
          return b.bytes - a.bytes;
        case 'app':
          return a.app.localeCompare(b.app);
        default:
          return 0;
      }
    });
  }, [events, searchQuery, sortBy, filterType, selectedDate]);

  const stats = useMemo(() => {
    const total = filteredAndSortedEvents.reduce((acc, event) => acc + event.bytes, 0);
    const sent = filteredAndSortedEvents
      .filter(e => e.type === 'sent')
      .reduce((acc, event) => acc + event.bytes, 0);
    const received = filteredAndSortedEvents
      .filter(e => e.type === 'received')
      .reduce((acc, event) => acc + event.bytes, 0);

    return { total, sent, received };
  }, [filteredAndSortedEvents]);

  const { threshold, updateThreshold } = useDataAlerts(stats.total);

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportToCSV = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        alert('Le partage n\'est pas disponible sur cet appareil');
        return;
      }

      const header = 'Date,Application,Type,Taille (MB)\n';
      const rows = filteredAndSortedEvents.map(event => {
        return `${event.timestamp.toISOString()},${event.app},${event.type},${(event.bytes / 1024 / 1024).toFixed(2)}`;
      }).join('\n');
      
      const csvContent = header + rows;
      const path = `${FileSystem.documentDirectory}network_history.csv`;
      
      await FileSystem.writeAsStringAsync(path, csvContent);
      await Sharing.shareAsync(path, {
        mimeType: 'text/csv',
        dialogTitle: 'Exporter l\'historique',
        UTI: 'public.comma-separated-values-text'
      });
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      alert('Une erreur est survenue lors de l\'export');
    }
  };

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyData = last7Days.map(date => {
      const dayEvents = filteredAndSortedEvents.filter(
        event => event.timestamp.toISOString().split('T')[0] === date
      );
      return dayEvents.reduce((sum, event) => sum + event.bytes, 0) / 1024 / 1024;
    });

    return {
      labels: last7Days.map(date => date.split('-')[2]),
      datasets: [{ data: dailyData }],
    };
  }, [filteredAndSortedEvents]);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            Historique
          </Text>
          <Button
            mode="contained-tonal"
            onPress={() => setShowStatsModal(true)}
            style={styles.statsButton}
          >
            Statistiques
          </Button>
        </View>
        <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Activité réseau récente
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          icon="calendar"
          style={styles.dateButton}
        >
          {selectedDate.toLocaleDateString()}
        </Button>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              icon="sort"
              style={styles.sortButton}
            >
              Trier
            </Button>
          }
        >
          <Menu.Item 
            onPress={() => { setSortBy('time'); setMenuVisible(false); }}
            title="Par date"
            leadingIcon="clock-outline"
          />
          <Menu.Item 
            onPress={() => { setSortBy('size'); setMenuVisible(false); }}
            title="Par taille"
            leadingIcon="arrow-up-down"
          />
          <Menu.Item 
            onPress={() => { setSortBy('app'); setMenuVisible(false); }}
            title="Par application"
            leadingIcon="apps"
          />
        </Menu>
      </View>

      <View style={styles.filterChips}>
        <Button
          mode={filterType === 'all' ? 'contained' : 'outlined'}
          onPress={() => setFilterType('all')}
          style={styles.filterChip}
        >
          Tout
        </Button>
        <Button
          mode={filterType === 'sent' ? 'contained' : 'outlined'}
          onPress={() => setFilterType('sent')}
          style={styles.filterChip}
        >
          Envoyé
        </Button>
        <Button
          mode={filterType === 'received' ? 'contained' : 'outlined'}
          onPress={() => setFilterType('received')}
          style={styles.filterChip}
        >
          Reçu
        </Button>
      </View>

      <Searchbar
        placeholder="Rechercher une application..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={[styles.searchbar, { backgroundColor: theme.colors.surface }]}
        iconColor={theme.colors.onSurfaceVariant}
        inputStyle={{ color: theme.colors.onSurface }}
      />

      <View style={styles.eventsContainer}>
        {filteredAndSortedEvents.map((event, index) => (
          <Card 
            key={event.id}
            style={[styles.eventCard, { backgroundColor: theme.colors.surface }]}
          >
            <Card.Content style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <View style={styles.eventIcon}>
                  <Ionicons
                    name={event.type === 'sent' ? 'arrow-up-circle' : 'arrow-down-circle'}
                    size={24}
                    color={event.type === 'sent' ? theme.colors.primary : theme.colors.secondary}
                  />
                </View>
                <View style={styles.eventInfo}>
                  <Text style={[styles.eventApp, { color: theme.colors.onSurface }]}>
                    {event.app}
                  </Text>
                  <Text style={[styles.eventTime, { color: theme.colors.onSurfaceVariant }]}>
                    {formatTime(event.timestamp)}
                  </Text>
                </View>
                <Text style={[styles.eventBytes, { color: theme.colors.onSurface }]}>
                  {formatBytes(event.bytes)}
                </Text>
              </View>
            </Card.Content>
            {index < filteredAndSortedEvents.length - 1 && (
              <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
            )}
          </Card>
        ))}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      <Portal>
        <Modal
          visible={showStatsModal}
          onDismiss={() => setShowStatsModal(false)}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: theme.colors.surface }
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
            Statistiques du jour
          </Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statLabel}>Total</Text>
                <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                  {formatBytes(stats?.total || 0)}
                </Text>
              </Card.Content>
            </Card>
            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statLabel}>Envoyé</Text>
                <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                  {formatBytes(stats?.sent || 0)}
                </Text>
              </Card.Content>
            </Card>
            <Card style={styles.statCard}>
              <Card.Content>
                <Text style={styles.statLabel}>Reçu</Text>
                <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                  {formatBytes(stats?.received || 0)}
                </Text>
              </Card.Content>
            </Card>
          </View>
          <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.chartTitle, { color: theme.colors.onSurface }]}>
                Tendance sur 7 jours
              </Text>
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 60}
                height={220}
                chartConfig={{
                  backgroundColor: theme.colors.surface,
                  backgroundGradientFrom: theme.colors.surface,
                  backgroundGradientTo: theme.colors.surface,
                  decimalPlaces: 1,
                  color: (opacity = 1) => theme.colors.primary,
                  labelColor: (opacity = 1) => theme.colors.onSurfaceVariant,
                  style: { borderRadius: 16 },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: theme.colors.primary,
                  },
                }}
                bezier
                style={styles.chart}
              />
            </Card.Content>
          </Card>
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={exportToCSV}
              icon="download"
              style={styles.actionButton}
            >
              Exporter CSV
            </Button>
            <Button
              mode="outlined"
              onPress={() => setShowThresholdModal(true)}
              icon="bell"
              style={styles.actionButton}
            >
              Définir alerte
            </Button>
          </View>
          <Button mode="contained" onPress={() => setShowStatsModal(false)}>
            Fermer
          </Button>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={showThresholdModal}
          onDismiss={() => setShowThresholdModal(false)}
          contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
            Définir le seuil d'alerte
          </Text>
          <TextInput
            label="Seuil en MB"
            value={thresholdInput}
            onChangeText={setThresholdInput}
            keyboardType="numeric"
            style={styles.thresholdInput}
          />
          <Button 
            mode="contained" 
            onPress={() => {
              const newThreshold = Number(thresholdInput) * 1024 * 1024;
              updateThreshold(newThreshold);
              setShowThresholdModal(false);
            }}
          >
            Enregistrer
          </Button>
        </Modal>
      </Portal>
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
  },
  searchbar: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 0,
  },
  eventsContainer: {
    gap: 12,
  },
  eventCard: {
    borderRadius: 10,
    marginBottom: 8,
  },
  eventContent: {
    padding: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIcon: {
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventApp: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
  },
  eventBytes: {
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 0.5,
  },
  statsButton: {
    borderRadius: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateButton: {
    flex: 1,
    marginRight: 8,
  },
  sortButton: {
    flex: 1,
    marginLeft: 8,
  },
  filterChips: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterChip: {
    flex: 1,
  },
  modal: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    marginRight: 10,
  },
  thresholdInput: {
    marginBottom: 20,
  },
}); 