
import { supabase } from '@/integrations/supabase/client';

/**
 * Checks if a table exists in the database
 */
export async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    // Check if the table exists by querying the information_schema
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', tableName)
      .maybeSingle();
      
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
      return false;
    }
    
    return !!data;
  } catch (err) {
    console.error(`Exception checking if table ${tableName} exists:`, err);
    return false;
  }
}

/**
 * Checks if Row Level Security is enabled for a table
 */
export async function checkRlsEnabled(tableName: string): Promise<boolean> {
  try {
    // Check if RLS is enabled for the table
    const { data, error } = await supabase
      .rpc('check_rls_enabled', { table_name: tableName })
      .single();
    
    if (error) {
      // If the RPC function doesn't exist, we'll do a test select
      // If RLS is properly configured, this will be restricted
      const { error: selectError } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);
      
      // If we get a permission error, that suggests RLS is working
      if (selectError && 
          (selectError.code === '42501' || 
           selectError.message.includes('permission denied') ||
           selectError.code === 'PGRST116')) {
        return true;
      }
      
      console.warn(`Could not check RLS status for ${tableName}:`, error);
      return false;
    }
    
    return !!data?.rls_enabled;
  } catch (err) {
    console.error(`Exception checking RLS for ${tableName}:`, err);
    return false;
  }
}
