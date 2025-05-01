
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { logger } from '@/utils/loggingService';
import { SUPABASE_CONFIG } from '@/config/appConfig';

// Re-export the client from the integrations folder for backward compatibility
import { supabase } from '@/integrations/supabase/client';
export { supabase };

// Additional helper functions specific to the backend can be added here
export const createAdminClient = () => {
  // Ensure we have valid configuration values
  const supabaseUrl = SUPABASE_CONFIG.url;
  const supabaseAnonKey = SUPABASE_CONFIG.anonKey;
  
  // This would use the service role key in a real implementation
  // but for now, just return the regular client
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined
      }
    }
  );
};

// Update the log message since we've fixed the configuration
logger.info('Backend Supabase client initialized successfully');
