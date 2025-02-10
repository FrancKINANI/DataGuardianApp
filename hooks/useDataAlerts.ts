import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA_THRESHOLD_KEY = '@data_threshold';
const DEFAULT_THRESHOLD = 1024 * 1024 * 1024; // 1 GB

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

export const useDataAlerts = (currentUsage: number) => {
  const [threshold, setThreshold] = useState<number>(DEFAULT_THRESHOLD);
  const notificationListener = useRef<any>();

  useEffect(() => {
    loadThreshold();
    setupNotifications();
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentUsage > threshold) {
      sendNotification();
    }
  }, [currentUsage, threshold]);

  const loadThreshold = async () => {
    try {
      const saved = await AsyncStorage.getItem(DATA_THRESHOLD_KEY);
      if (saved) setThreshold(Number(saved));
    } catch (error) {
      console.error('Erreur lors du chargement du seuil:', error);
    }
  };

  const setupNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission de notification non accordée');
        return;
      }

      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    } catch (error) {
      console.error('Erreur lors de la configuration des notifications:', error);
    }
  };

  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alerte d\'utilisation des données',
          body: `Votre utilisation de données (${formatBytes(currentUsage)}) a dépassé le seuil défini (${formatBytes(threshold)})`,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
    }
  };

  const updateThreshold = async (newThreshold: number) => {
    try {
      await AsyncStorage.setItem(DATA_THRESHOLD_KEY, String(newThreshold));
      setThreshold(newThreshold);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du seuil:', error);
    }
  };

  return { threshold, updateThreshold };
}; 