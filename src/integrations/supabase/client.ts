
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '@/config/appConfig';
import { logger } from '@/utils/loggingService';

// Create a demo/mock client when we don't have real credentials
const createDemoClient = (): SupabaseClient => {
  logger.warn('Using demo Supabase client - functionality will be limited');
  // Create a client with placeholder values - this will initialize without errors
  // but most operations will fail gracefully
  return createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    }
  );
};

// Create and export the Supabase client
export const supabase = createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

// Utility functions
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    logger.error('Error getting session:', error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    logger.error('Error getting current user:', error);
    return null;
  }
};

// Log Supabase initialization status
if (SUPABASE_CONFIG.usingFallback) {
  logger.warn('Supabase initialized with fallback values. Full functionality may be limited.');
} else {
  logger.info('Supabase client initialized successfully');
}
