import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStats() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [networkStats, setNetworkStats] = useState({
    type: '',
    isConnected: false,
    details: null
  });

  const startMonitoring = () => {
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  useEffect(() => {
    if (!isMonitoring) return;

    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkStats({
        type: state.type,
        isConnected: state.isConnected ?? false,
        details: state.details
      });
    });

    return () => {
      unsubscribe();
    };
  }, [isMonitoring]);

  return {
    isMonitoring,
    networkStats,
    startMonitoring,
    stopMonitoring
  };
} 