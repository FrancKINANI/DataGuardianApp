import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Settings {
  notificationsEnabled: boolean;
  keepHistory: boolean;
  filteringEnabled: boolean;
  historyRetentionDays: number;
  notifyOnSuspiciousTraffic: boolean;
  notifyOnDataUsage: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  notificationsEnabled: true,
  keepHistory: true,
  filteringEnabled: false,
  historyRetentionDays: 30,
  notifyOnSuspiciousTraffic: true,
  notifyOnDataUsage: true,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem('settings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      await AsyncStorage.setItem('settings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres:', error);
    }
  };

  return {
    settings,
    loading,
    updateSettings,
  };
} 