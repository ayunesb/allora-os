
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
        // First check if the table exists by querying the information schema
        const { data: tableExists, error: tableError } = await supabase
          .from('information_schema.tables')
          .select('table_name')
          .eq('table_schema', 'public')
          .eq('table_name', tableName)
          .maybeSingle();
        
        if (tableError || !tableExists) {
          // If table doesn't exist, skip RLS check
          policyResults.push({
            table: tableName,
            exists: false,
            message: `Cannot check RLS for table ${tableName} because it doesn't exist`
          });
          continue;
        }
        
        // Check if RLS is enabled for this table
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
          // Function exists but returned no data
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
