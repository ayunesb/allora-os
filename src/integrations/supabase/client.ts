
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '@/config/appConfig';

// Create a single supabase client for interacting with the database
export const supabase = createClient(
  SUPABASE_CONFIG.url, 
  SUPABASE_CONFIG.anonKey, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: typeof window !== 'undefined' ? localStorage : undefined
    }
  }
);

// Export functions to get sessions and current user
export async function getSession() {
  return await supabase.auth.getSession();
}

export async function getCurrentUser() {
  const { data: { session } } = await getSession();
  return { user: session?.user || null, session };
}
