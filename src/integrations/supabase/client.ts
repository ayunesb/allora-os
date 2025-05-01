
import { createClient } from '@supabase/supabase-js';
import { getSupabaseUrl, getSupabaseAnonKey } from '@/utils/env';

const SUPABASE_URL = getSupabaseUrl();
const SUPABASE_ANON_KEY = getSupabaseAnonKey();

// Log the values being used for debugging (non-sensitive)
console.log(`Initializing Supabase client with URL: ${SUPABASE_URL ? "Valid URL" : "Invalid URL"}`);

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
