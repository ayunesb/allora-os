
import { supabase } from '@/integrations/supabase/client';
import { PolicyStatus } from '@/types/databaseVerification';

/**
 * Verifies that RLS policies are properly configured for critical tables
 * @returns Promise with array of policy verification results
 */
export async function verifyRlsPolicies(): Promise<PolicyStatus[]> {
  const tablesWithRls = ['profiles', 'companies', 'campaigns', 'strategies', 'leads', 'communications', 'user_preferences', 'ai_boardroom_debates'];
  const policyResults: PolicyStatus[] = [];
  
  for (const table of tablesWithRls) {
    try {
      // First verify the table exists
      const { data: tableData, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', table)
        .single();
        
      if (tableError || !tableData) {
        policyResults.push({
          table,
          exists: false,
          message: `Table ${table} doesn't exist, can't check RLS`
        });
        continue;
      }
      
      // Check if the table has RLS policies
      const { data: policiesData, error: policiesError } = await supabase
        .from('pg_policies')
        .select('*')
        .eq('tablename', table)
        .eq('schemaname', 'public');
        
      const hasRlsPolicies = !policiesError && policiesData && policiesData.length > 0;
        
      policyResults.push({
        table,
        exists: hasRlsPolicies,
        message: hasRlsPolicies 
          ? `RLS policies are enabled for ${table}` 
          : `RLS policies are disabled for ${table}`
      });
    } catch (err: any) {
      console.error(`Error checking RLS for ${table}:`, err);
      policyResults.push({
        table,
        exists: false,
        message: `Error checking RLS for ${table}: ${err.message || String(err)}`
      });
    }
  }
  
  return policyResults;
}
