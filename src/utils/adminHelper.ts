
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
    const { data, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .eq('tablename', tableName)
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
