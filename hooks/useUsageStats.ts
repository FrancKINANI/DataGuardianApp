import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type TimeRange = 'day' | 'week' | 'month';
type UsageStats = {
  total: number;
  sent: number;
  received: number;
  byApp: { [key: string]: number };
};

export const useUsageStats = (timeRange: TimeRange = 'day') => {
  const [stats, setStats] = useState<UsageStats>({
    total: 0,
    sent: 0,
    received: 0,
    byApp: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state: { user } } = useAuth();

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user, timeRange]);

  const getTimeFilter = () => {
    const now = new Date();
    switch (timeRange) {
      case 'day':
        return now.setHours(0, 0, 0, 0);
      case 'week':
        return now.setDate(now.getDate() - 7);
      case 'month':
        return now.setMonth(now.getMonth() - 1);
      default:
        return now.setHours(0, 0, 0, 0);
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const timeFilter = getTimeFilter();

      const { data, error: fetchError } = await supabase
        .from('network_events')
        .select('*')
        .eq('user_id', user?.id)
        .gte('timestamp', new Date(timeFilter).toISOString());

      if (fetchError) throw fetchError;

      const byApp: { [key: string]: number } = {};
      let sent = 0;
      let received = 0;

      data?.forEach(event => {
        byApp[event.app_name] = (byApp[event.app_name] || 0) + event.bytes;
        if (event.event_type === 'sent') {
          sent += event.bytes;
        } else {
          received += event.bytes;
        }
      });

      setStats({
        total: sent + received,
        sent,
        received,
        byApp,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    fetchStats,
  };
}; 