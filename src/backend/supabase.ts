
import { createClient, type User, AuthError } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { logger } from '@/utils/loggingService';
import { SUPABASE_CONFIG } from '@/config/appConfig';

// Standard client for the backend
export const supabase = createClient<Database>(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    }
  }
);

// Add these helper functions to make the code cleaner elsewhere
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      logger.error('Error getting session:', { error });
    }
    return { session: data.session, error };
  } catch (error) {
    logger.error('Unexpected error getting session:', { error });
    return { session: null, error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      logger.error('Error getting current user:', { error });
    }
    return { user: data.user, error };
  } catch (error) {
    logger.error('Unexpected error getting current user:', { error });
    return { user: null, error };
  }
};
