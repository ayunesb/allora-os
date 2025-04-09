
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Create a single supabase client for interacting with the database
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});

// Export functions to get sessions and current user
export async function getSession() {
  return await supabase.auth.getSession();
}

export async function getCurrentUser() {
  const { data: { session } } = await getSession();
  return { user: session?.user || null, session };
}
