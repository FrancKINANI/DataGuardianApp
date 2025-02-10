import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Connection = {
  id: string;
  timestamp: string;
  destination: string;
  protocol: string;
  bytesIn: number;
  bytesOut: number;
  appName?: string;
};

export function useConnectionHistory() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    loadConnections();
  }, [selectedDate]);

  const loadConnections = async () => {
    try {
      setLoading(true);
      const storedConnections = await AsyncStorage.getItem('connections');
      if (storedConnections) {
        const allConnections = JSON.parse(storedConnections) as Connection[];
        // Filtrer par date sélectionnée
        const filteredConnections = allConnections.filter(conn => {
          const connDate = new Date(conn.timestamp);
          return isSameDay(connDate, selectedDate);
        });
        setConnections(filteredConnections);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    connections,
    loading,
    selectedDate,
    setSelectedDate,
  };
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
} 