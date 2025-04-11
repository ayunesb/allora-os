
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if the current user has admin privileges
 */
export async function checkIfUserIsAdmin(): Promise<boolean> {
  try {
    // Get current user's profile
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }
    
    // Check if user has admin role in profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return profile?.role === 'admin';
  } catch (error) {
    console.error('Error in checkIfUserIsAdmin:', error);
    return false;
  }
}

/**
 * Helper function to check if a database table exists
 */
export async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    // For Supabase/PostgreSQL, we need to query information_schema instead of pg_tables
    // as pg_tables is not directly accessible through the client
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', tableName)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error(`Error in checkTableExists for ${tableName}:`, error);
    return false;
  }
}
