import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export type Profile = {
  id: string;
  email: string;
  created_at: string;
  last_login: string | null;
  data_threshold: number;
};

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state: { user } } = useAuth();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (fetchError) throw fetchError;
      setProfile(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du profil');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateLastLogin = async () => {
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          last_login: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (updateError) {
        console.error('Erreur détaillée:', updateError);
        throw updateError;
      }
      // Recharger le profil après la mise à jour
      await fetchProfile();
    } catch (err) {
      console.error('Erreur lors de la mise à jour de last_login:', err);
    }
  };

  useEffect(() => {
    const initProfile = async () => {
      if (user) {
        await fetchProfile();
        await updateLastLogin();
      }
    };

    initProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setLoading(true);
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id)
        .select()
        .single();

      if (updateError) throw updateError;
      setProfile(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour du profil');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDataThreshold = async (threshold: number) => {
    return updateProfile({ data_threshold: threshold });
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    updateDataThreshold,
  };
}; 