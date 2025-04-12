
import { supabase } from '@/integrations/supabase/client';
import { PolicyStatus } from '@/types/databaseVerification';
import { toast } from 'sonner';

/**
 * Verifies the RLS policies for database tables
 * @returns Promise with array of policy verification results
 */
export async function verifyRlsPolicies(): Promise<PolicyStatus[]> {
  // Key tables that should have RLS enabled
  const tablesToCheck = [
    'profiles', 'companies', 'campaigns', 'strategies', 
    'leads', 'communications', 'user_preferences', 'ai_boardroom_debates'
  ];
  
  const policyResults: PolicyStatus[] = [];
  
  try {
    // First check if user is authenticated before proceeding
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error('Authentication error or no session during RLS verification:', sessionError);
      policyResults.push({
        table: 'authentication',
        exists: false,
        message: sessionError ? 
          `Authentication error: ${sessionError.message}` : 
          'No active session found. Please sign in to verify RLS policies.'
      });
      return policyResults;
    }
    
    console.log("Authentication check passed, proceeding with RLS verification");
    
    // Check if we can use our dedicated function to verify RLS
    let canUseRlsCheck = false;
    
    try {
      const { data: rlsCheck, error: rlsCheckError } = await supabase
        .rpc('check_table_rls', { table_name: 'profiles' });
      
      canUseRlsCheck = !rlsCheckError;
      console.log("Can use check_table_rls function for RLS verification:", canUseRlsCheck);
    } catch (err) {
      console.log("check_table_rls function not available for RLS verification:", err);
      canUseRlsCheck = false;
    }
    
    // Check database connection before proceeding
    try {
      const { error: connectionError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);
        
      if (connectionError && !connectionError.code.includes('PGRST116')) {
        console.error('Database connection test failed during RLS verification:', connectionError);
        policyResults.push({
          table: 'database_connection',
          exists: false,
          message: `Database connection error: ${connectionError.message}. Please check your connection settings.`
        });
        return policyResults;
      }
    } catch (err: any) {
      console.error('Unexpected error during connection check:', err);
      policyResults.push({
        table: 'database_connection',
        exists: false,
        message: `Connection error: ${err.message || String(err)}`
      });
      return policyResults;
    }
    
    // If we can use the check_table_rls function, use it for all tables
    if (canUseRlsCheck) {
      for (const tableName of tablesToCheck) {
        try {
          // Check if RLS is enabled for this table using our function
          const { data: rlsEnabled, error: rlsError } = await supabase
            .rpc('check_table_rls', { table_name: tableName });
          
          if (rlsError) {
            // If we get an error, it's likely the table doesn't exist
            if (rlsError.code === '42P01' || rlsError.message.includes('does not exist')) {
              policyResults.push({
                table: tableName,
                exists: false,
                message: `Cannot check RLS for table ${tableName} because it doesn't exist`
              });
            } else {
              policyResults.push({
                table: tableName,
                exists: false,
                message: `Error checking RLS for table ${tableName}: ${rlsError.message}`
              });
            }
          } else {
            // If no error, we know if RLS is enabled
            policyResults.push({
              table: tableName,
              exists: !!rlsEnabled,
              message: rlsEnabled ? 
                `RLS is enabled for ${tableName}` : 
                `RLS is disabled for ${tableName}`
            });
          }
        } catch (err: any) {
          console.error(`Error in RLS verification for ${tableName}:`, err);
          policyResults.push({
            table: tableName,
            exists: false,
            message: `Error: ${err.message || String(err)}`
          });
        }
      }
    } else {
      // Fall back to the old method
      console.log("Using fallback method for RLS verification");
      
      // Check RLS for each table using various methods
      for (const tableName of tablesToCheck) {
        try {
          // First check if the table exists
          const { error: tableError } = await supabase
            .from(tableName)
            .select('id')
            .limit(1);
          
          if (tableError && tableError.code === '42P01') {
            // Table doesn't exist
            policyResults.push({
              table: tableName,
              exists: false,
              message: `Cannot check RLS for table ${tableName} because it doesn't exist`
            });
            continue;
          }
          
          // Try to determine if RLS is enabled by the nature of the error
          // PGRST116 usually means the RLS policy is refusing access
          if (tableError && tableError.code.includes('PGRST116')) {
            policyResults.push({
              table: tableName,
              exists: true,
              message: `RLS appears to be enabled for ${tableName} (access denied)`
            });
          } else if (!tableError) {
            // We could query the table, which might mean:
            // 1. RLS is disabled, or
            // 2. RLS is enabled but we have the right policy
            policyResults.push({
              table: tableName,
              exists: true,
              message: `Table ${tableName} is accessible, RLS might be enabled with the right policy`
            });
          } else {
            // Some other error
            policyResults.push({
              table: tableName,
              exists: false,
              message: `Error checking RLS for ${tableName}: ${tableError.message}`
            });
          }
        } catch (err: any) {
          console.error(`Error in RLS verification for ${tableName}:`, err);
          policyResults.push({
            table: tableName,
            exists: false,
            message: `Error: ${err.message || String(err)}`
          });
        }
      }
    }
  } catch (err: any) {
    console.error('Unexpected error in RLS verification:', err);
    policyResults.push({
      table: 'verification_process',
      exists: false,
      message: `Verification process error: ${err.message || String(err)}`
    });
  }
  
  return policyResults;
}
