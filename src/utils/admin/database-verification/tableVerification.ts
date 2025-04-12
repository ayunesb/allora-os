
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
    // First, try to use the new check_table_rls function to check tables
    let canUseRlsCheck = false;
    
    try {
      const { data: rlsCheck, error: rlsCheckError } = await supabase
        .rpc('check_table_rls', { table_name: 'profiles' });
      
      canUseRlsCheck = !rlsCheckError;
      console.log("Can use RLS check function:", canUseRlsCheck);
    } catch (err) {
      console.log("RLS check function not available:", err);
      canUseRlsCheck = false;
    }
    
    // If we can use the check_table_rls function, use it for all tables
    if (canUseRlsCheck) {
      for (const tableName of requiredTables) {
        try {
          // First check if table exists by attempting to query it
          const { error: tableExistsError } = await supabase
            .from(tableName)
            .select('id')
            .limit(1);
          
          if (tableExistsError && tableExistsError.code === '42P01') {
            // Table doesn't exist
            tableResults.push({
              name: tableName,
              exists: false,
              message: `Table ${tableName} is missing`
            });
            continue;
          }
          
          // Now check if RLS is enabled using our function
          const { data: rlsEnabled, error: rlsError } = await supabase
            .rpc('check_table_rls', { table_name: tableName });
          
          if (rlsError) {
            console.error(`Error checking RLS for ${tableName}:`, rlsError);
            tableResults.push({
              name: tableName,
              exists: true,
              message: `Table ${tableName} exists but couldn't check RLS: ${rlsError.message}`
            });
          } else {
            tableResults.push({
              name: tableName,
              exists: true,
              message: rlsEnabled ? 
                `Table ${tableName} exists with RLS enabled` : 
                `Table ${tableName} exists but RLS is disabled`
            });
          }
        } catch (err: any) {
          console.error(`Error checking table ${tableName}:`, err);
          tableResults.push({
            name: tableName,
            exists: false,
            message: `Error checking table ${tableName}: ${err.message || String(err)}`
          });
        }
      }
    } else {
      // Fall back to the original method if check_table_rls is not available
      console.log("Using fallback method for table verification");
      
      // Do a basic connection check
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
      
      // Check each required table directly
      for (const tableName of requiredTables) {
        try {
          // Check if table exists by attempting to query it directly
          const { data, error } = await supabase
            .from(tableName)
            .select('id')
            .limit(1);
          
          if (error) {
            if (error.code === '42P01') { // Table doesn't exist
              tableResults.push({
                name: tableName,
                exists: false,
                message: `Table ${tableName} is missing`
              });
            } else {
              // If there's an error but it's not "table doesn't exist",
              // it likely means the table exists but we can't access it due to RLS
              tableResults.push({
                name: tableName,
                exists: true,
                message: `Table ${tableName} exists but might have RLS restrictions: ${error.message}`
              });
            }
          } else {
            tableResults.push({
              name: tableName,
              exists: true,
              message: `Table ${tableName} exists`
            });
          }
        } catch (err: any) {
          console.error(`Error checking table ${tableName}:`, err);
          tableResults.push({
            name: tableName,
            exists: false,
            message: `Error checking table ${tableName}: ${err.message || String(err)}`
          });
        }
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
