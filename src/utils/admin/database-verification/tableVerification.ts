
import { supabase } from '@/integrations/supabase/client';
import { DatabaseTableStatus } from '@/types/databaseVerification';
import { toast } from 'sonner';

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
    // First, check if user is authenticated before proceeding
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Authentication error or no session during table verification:', sessionError);
      tableResults.push({
        name: 'database_connection',
        exists: false,
        message: sessionError ? 
          `Authentication error: ${sessionError.message}` : 
          'No active session found. Please sign in to verify database tables.'
      });
      return tableResults;
    }
    
    console.log("Authentication check passed, proceeding with table verification");
    
    // Check if we can use our dedicated function to verify RLS and table existence
    let canUseRlsCheck = false;
    
    try {
      const { data: rlsCheck, error: rlsCheckError } = await supabase
        .rpc('check_table_rls', { table_name: 'profiles' });
      
      canUseRlsCheck = !rlsCheckError;
      console.log("Can use check_table_rls function:", canUseRlsCheck);
    } catch (err) {
      console.log("check_table_rls function not available:", err);
      canUseRlsCheck = false;
    }
    
    // Check if we have a direct database connection before proceeding
    try {
      const { data: connectionTest, error: connectionError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
        
      if (connectionError && !connectionError.code.includes('PGRST116')) {
        console.error('Initial database connection test failed:', connectionError);
        tableResults.push({
          name: 'database_connection',
          exists: false,
          message: `Database connection error: ${connectionError.message}. Status code: ${connectionError.code}`
        });
        
        // Enhanced error handling for specific error codes
        if (connectionError.code === 'PGRST301' || connectionError.code === '3000') {
          toast.error("Authentication issue detected", {
            description: "Your session might have expired. Please try logging in again."
          });
        } else if (connectionError.code === '42P01') {
          toast.error("Table not found", {
            description: "The profiles table doesn't exist in your database. Please run the setup SQL."
          });
        } else if (connectionError.code.includes('CORS')) {
          toast.error("CORS issue detected", {
            description: "There seems to be a CORS issue. Please check your network settings."
          });
        }
        
        return tableResults;
      }
      
      // Add a successful connection status
      tableResults.push({
        name: 'database_connection',
        exists: true,
        message: 'Successfully connected to database'
      });
      
      console.log("Database connection verified successfully");
    } catch (err: any) {
      console.error('Unexpected error during connection check:', err);
      tableResults.push({
        name: 'database_connection',
        exists: false,
        message: `Connection error: ${err.message || String(err)}`
      });
      return tableResults;
    }
    
    // If we can use the check_table_rls function, use it for all tables
    if (canUseRlsCheck) {
      for (const tableName of requiredTables) {
        try {
          // Check if RLS is enabled for this table using our function
          const { data: rlsEnabled, error: rlsError } = await supabase
            .rpc('check_table_rls', { table_name: tableName });
          
          if (rlsError) {
            // If we get an error, it's likely the table doesn't exist
            if (rlsError.code === '42P01' || rlsError.message.includes('does not exist')) {
              tableResults.push({
                name: tableName,
                exists: false,
                message: `Table ${tableName} is missing`
              });
            } else {
              tableResults.push({
                name: tableName,
                exists: false,
                message: `Error checking table ${tableName}: ${rlsError.message}`
              });
            }
          } else {
            // If no error, the table exists - check if RLS is enabled
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
            message: `Error: ${err.message || String(err)}`
          });
        }
      }
    } else {
      // Fall back to the original method if check_table_rls is not available
      console.log("Using fallback method for table verification");
      
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
