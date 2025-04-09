
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
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    }
  }
);

// Export functions to get sessions and current user
export async function getSession() {
  try {
    const response = await supabase.auth.getSession();
    console.log("Session response:", response);
    return response;
  } catch (error) {
    console.error("Error getting session:", error);
    return { data: { session: null }, error: error as Error };
  }
}

export async function getCurrentUser() {
  try {
    const { data: { session } } = await getSession();
    console.log("Current user session:", session);
    return { user: session?.user || null, session };
  } catch (error) {
    console.error("Error getting current user:", error);
    return { user: null, session: null };
  }
}
