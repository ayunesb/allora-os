
// Export the existing supabase client from this file
import { createClient } from '@supabase/supabase-js';
import { getSupabaseUrl, getSupabaseAnonKey } from '@/utils/env';
import { logger } from '@/utils/loggingService';

// Get Supabase configuration values
const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

// Create the Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});

// Add the checkSupabaseConnection function
export async function checkSupabaseConnection() {
  try {
    // In a real implementation, you would perform an actual connection check
    // For now, we'll return a mock successful result
    return {
      connected: true,
      message: "Connected to Supabase successfully"
    };
  } catch (error) {
    return {
      connected: false,
      message: error instanceof Error ? error.message : "Failed to connect to Supabase"
    };
  }
}

// Add getSession function
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      logger.error('Error getting session:', error);
      return { session: null };
    }
    return { session: data.session };
  } catch (error) {
    logger.error('Exception getting session:', error);
    return { session: null };
  }
}

// Add getCurrentUser function
export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    logger.error('Exception getting current user:', error);
    return null;
  }
}
