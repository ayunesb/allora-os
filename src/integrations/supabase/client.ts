import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});

/**
 * Temporary stubs to avoid build errors — update with real logic as needed
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return error ? null : data.session;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return error ? null : data.user;
};
