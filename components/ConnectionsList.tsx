import { StyleSheet, FlatList, View } from 'react-native';
import { Connection } from '../hooks/useConnectionHistory';
import ConnectionCard from './ConnectionCard';

type ConnectionsListProps = {
  connections: Connection[];
  onConnectionPress?: (connection: Connection) => void;
};

export default function ConnectionsList({ 
  connections,
  onConnectionPress
}: ConnectionsListProps) {
  return (
    <FlatList
      data={connections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <ConnectionCard
            destination={item.destination}
            protocol={item.protocol}
            timestamp={new Date(item.timestamp).toLocaleTimeString()}
            bytesIn={item.bytesIn}
            bytesOut={item.bytesOut}
            appName={item.appName}
          />
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
}); 