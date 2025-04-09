
import { createClient, type User, AuthError } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { logger } from '@/utils/loggingService';
import { SUPABASE_CONFIG } from '@/config/appConfig';

// Re-export the client from the integrations folder for backward compatibility
import { supabase, getSession, getCurrentUser } from '@/integrations/supabase/client';
export { supabase, getSession, getCurrentUser };

// Additional helper functions specific to the backend can be added here
export const createAdminClient = () => {
  // This would use the service role key in a real implementation
  // but for now, just return the regular client
  return createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined
      }
    }
  );
};
