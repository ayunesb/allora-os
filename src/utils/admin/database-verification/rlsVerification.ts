
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
    // First check if we can use our new check_table_rls function
    let canUseRlsCheck = false;
    
    try {
      const { data: rlsCheck, error: rlsCheckError } = await supabase
        .rpc('check_table_rls', { table_name: 'profiles' });
      
      canUseRlsCheck = !rlsCheckError;
      console.log("Can use RLS check function for policies:", canUseRlsCheck);
    } catch (err) {
      console.log("RLS check function not available for policies:", err);
      canUseRlsCheck = false;
    }
    
    // If we can use the check_table_rls function, use it for all tables
    if (canUseRlsCheck) {
      for (const tableName of tablesToCheck) {
        try {
          // First check if the table exists
          const { error: tableExistsError } = await supabase
            .from(tableName)
            .select('id')
            .limit(1);
          
          if (tableExistsError && tableExistsError.code === '42P01') {
            // Table doesn't exist, skip RLS check
            policyResults.push({
              table: tableName,
              exists: false,
              message: `Cannot check RLS for table ${tableName} because it doesn't exist`
            });
            continue;
          }
          
          // Check if RLS is enabled for this table using our function
          const { data: rlsEnabled, error: rlsError } = await supabase
            .rpc('check_table_rls', { table_name: tableName });
          
          if (rlsError) {
            console.error(`Error checking RLS for ${tableName}:`, rlsError);
            policyResults.push({
              table: tableName,
              exists: false,
              message: `Error checking RLS for table ${tableName}: ${rlsError.message}`
            });
          } else {
            policyResults.push({
              table: tableName,
              exists: !!rlsEnabled,
              message: rlsEnabled 
                ? `RLS is enabled for ${tableName}` 
                : `RLS is disabled for ${tableName}`
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
      // Fall back to the original method using check_rls_enabled RPC
      // First check if the user is authenticated
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        console.error('Authentication error during RLS verification:', authError);
        return [{
          table: 'authentication',
          exists: false,
          message: `Authentication error: ${authError.message}. Please sign in to verify RLS policies.`
        }];
      }
      
      if (!session) {
        console.warn('No active session found during RLS verification');
        return [{
          table: 'authentication',
          exists: false,
          message: 'No active session found. Please sign in to verify RLS policies.'
        }];
      }
      
      // Check RLS for each table
      for (const tableName of tablesToCheck) {
        try {
          // First check if the table exists by querying it directly
          const { error: tableError } = await supabase
            .from(tableName)
            .select('id')
            .limit(1);
          
          if (tableError && tableError.code === '42P01') {
            // Table doesn't exist, skip RLS check
            policyResults.push({
              table: tableName,
              exists: false,
              message: `Cannot check RLS for table ${tableName} because it doesn't exist`
            });
            continue;
          }
          
          // Try to use check_rls_enabled function
          const { data, error } = await supabase.rpc('check_rls_enabled', { table_name: tableName });
          
          if (error) {
            console.error(`Error checking RLS for ${tableName}:`, error);
            
            // If the error is about the function not existing, return a special message
            if (error.message.includes('does not exist')) {
              policyResults.push({
                table: tableName,
                exists: false,
                message: `Unable to verify RLS. The check_rls_enabled function is missing from the database.`
              });
            } else {
              policyResults.push({
                table: tableName,
                exists: false,
                message: `Error checking RLS for table ${tableName}: ${error.message}`
              });
            }
          } else if (data && data.length > 0) {
            // Function exists and returned data
            const isEnabled = data[0].rls_enabled;
            policyResults.push({
              table: tableName,
              exists: isEnabled,
              message: isEnabled 
                ? `RLS is enabled for ${tableName}` 
                : `RLS is disabled for ${tableName}`
            });
          } else {
            // Function exists but returned no data - this would be unusual
            policyResults.push({
              table: tableName,
              exists: false,
              message: `Could not determine RLS status for ${tableName}`
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
