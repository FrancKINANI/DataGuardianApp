import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { NetworkEvent } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

export const useNetworkEvents = () => {
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state: { user } } = useAuth();

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('network_events')
        .select('*')
        .eq('user_id', user?.id)
        .order('timestamp', { ascending: false });

      if (fetchError) throw fetchError;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (event: Omit<NetworkEvent, 'id' | 'user_id' | 'timestamp'>) => {
    try {
      const { data, error: insertError } = await supabase
        .from('network_events')
        .insert([
          {
            ...event,
            user_id: user?.id,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      setEvents(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      return null;
    }
  };

  const getStats = () => {
    const total = events.reduce((acc, event) => acc + event.bytes, 0);
    const sent = events.filter(e => e.type === 'sent').reduce((acc, event) => acc + event.bytes, 0);
    const received = events.filter(e => e.type === 'received').reduce((acc, event) => acc + event.bytes, 0);
    return { total, sent, received };
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    addEvent,
    getStats,
  };
}; 