
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

/**
 * Checks the Supabase connection and authentication status
 * @returns An object with connection status information
 */
export const checkSupabaseConnection = async () => {
  try {
    // Try to make a simple API call to test the connection
    const { data, error } = await supabase.from('system_settings').select('id').limit(1);
    
    // Check if the user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (error) {
      return {
        connected: false,
        authenticated: false,
        error: error.message,
        message: `Database connection failed: ${error.message}`
      };
    }
    
    return {
      connected: true,
      authenticated: !!session,
      message: `Database connected successfully. Authentication: ${session ? 'Active' : 'Not logged in'}`
    };
  } catch (error) {
    logger.error('Error checking Supabase connection:', error);
    return {
      connected: false,
      authenticated: false,
      error,
      message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

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
