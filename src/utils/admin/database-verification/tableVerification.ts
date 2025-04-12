
import { supabase } from '@/integrations/supabase/client';
import { DatabaseTableStatus } from '@/types/databaseVerification';

/**
 * Verifies the existence of required database tables
 * @returns Promise with array of table verification results
 */
export async function verifyDatabaseTables(): Promise<DatabaseTableStatus[]> {
  const requiredTables = [
    'profiles', 'companies', 'campaigns', 'strategies', 
    'leads', 'communications', 'user_preferences', 'ai_boardroom_debates'
  ];
  
  const tableResults: DatabaseTableStatus[] = [];
  
  try {
    // First do a basic connection check
    const { data: connectionTest, error: connectionError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);
      
    if (connectionError) {
      console.error('Initial database connection test failed:', connectionError);
      
      // Special handling for auth errors
      if (connectionError.code === '3000' || connectionError.code === 'PGRST301') {
        return [{
          name: 'database_connection',
          exists: false,
          message: `Authentication error: ${connectionError.message}. Please check your Supabase API key and user permissions.`
        }];
      }
      
      return [{
        name: 'database_connection',
        exists: false,
        message: `Database connection error: ${connectionError.message}`
      }];
    }
    
    console.log('Database connection established, proceeding with table verification');
    
    // Proceed with checking each required table
    for (const tableName of requiredTables) {
      try {
        // Check if table exists by attempting to query it
        const { data, error } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')
          .eq('table_name', tableName)
          .single();
        
        const exists = error ? false : !!data;
        
        tableResults.push({
          name: tableName,
          exists,
          message: exists ? `Table ${tableName} exists` : `Table ${tableName} is missing`
        });
      } catch (err: any) {
        console.error(`Error checking table ${tableName}:`, err);
        tableResults.push({
          name: tableName,
          exists: false,
          message: `Error checking table ${tableName}: ${err.message || String(err)}`
        });
      }
    }
  } catch (err: any) {
    console.error('Unexpected error in table verification:', err);
    tableResults.push({
      name: 'verification_process',
      exists: false,
      message: `Verification process error: ${err.message || String(err)}`
    });
  }
  
  return tableResults;
}
