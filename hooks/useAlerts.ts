import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Alert } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state: { user } } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAlerts();
    }
  }, [user]);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('alerts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setAlerts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async (type: string, message: string) => {
    try {
      const { data, error: insertError } = await supabase
        .from('alerts')
        .insert([
          {
            type,
            message,
            user_id: user?.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      setAlerts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return null;
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      const { error: updateError } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('id', alertId)
        .eq('user_id', user?.id);

      if (updateError) throw updateError;
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return {
    alerts,
    loading,
    error,
    fetchAlerts,
    createAlert,
    markAsRead,
  };
}; 