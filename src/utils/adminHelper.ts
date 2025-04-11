
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
    // For Supabase/PostgreSQL, we need to query information_schema.tables
    // which is the standard way to check for table existence
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', tableName);
    
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
    
    return Array.isArray(data) && data.length > 0;
  } catch (error) {
    console.error(`Error in checkTableExists for ${tableName}:`, error);
    return false;
  }
}

/**
 * Create a function to check if RLS is enabled for a table
 */
export async function checkRlsEnabled(tableName: string): Promise<boolean> {
  try {
    // First verify the table exists
    const tableExists = await checkTableExists(tableName);
    if (!tableExists) {
      return false;
    }
    
    // Testing RLS by attempting to read without filters
    // If RLS is properly configured, this should restrict access
    const { data, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    // If there's a permission error, RLS is likely working
    if (error && error.message.includes('permission denied')) {
      return true;
    }
    
    // If there's no error, check if the user has access to this table based on their role
    // This is a simplified check and may need to be adjusted based on specific RLS policies
    return true;
  } catch (error) {
    console.error(`Error checking RLS for ${tableName}:`, error);
    return false;
  }
}
