import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exogjnksyqcgexaxxvgc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4b2dqbmtzeXFjZ2V4YXh4dmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNTM1MDMsImV4cCI6MjA1NDcyOTUwM30.tT72PWLtG0a2mpasdfwCB8Zt37QPsrnLZWmsuWNT4V0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
    redirectTo: 'dataguardian://',
  },
});

// Helper functions pour l'authentification
export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'dataguardian://auth/callback',
      data: {
        created_at: new Date().toISOString(),
        data_threshold: 1024 * 1024 * 1024, // 1GB par défaut
      }
    }
  });
  return { data, error };
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Helper pour vérifier si l'utilisateur est connecté
export const isAuthenticated = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { isLoggedIn: !!session, error };
}; 