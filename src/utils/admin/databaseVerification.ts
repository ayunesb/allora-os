
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  DatabaseTableStatus, 
  PolicyStatus, 
  FunctionStatus 
} from '@/types/databaseVerification';

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
  
  return tableResults;
}

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

/**
 * Verifies that required database functions exist and are secure
 * Uses check_function_exists RPC with fallback to direct pg_proc querying
 * @returns Promise with array of function verification results
 */
export async function verifyDatabaseFunctions(): Promise<FunctionStatus[]> {
  const requiredFunctions = [
    'handle_new_user', 
    'update_profile_after_company_creation'
  ];
  const functionResults: FunctionStatus[] = [];
  
  for (const funcName of requiredFunctions) {
    try {
      // Try to use our check_function_exists function
      const { data, error } = await supabase
        .rpc('check_function_exists', { function_name: funcName });
        
      if (error) {
        console.warn(`Using fallback method to check function ${funcName}:`, error);
        
        // Fallback: Query pg_proc directly
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('pg_proc')
          .select('proname, prosecdef')
          .eq('proname', funcName)
          .single();
          
        if (fallbackError) {
          console.error(`Error checking function ${funcName} with fallback:`, fallbackError);
          functionResults.push({
            name: funcName,
            exists: false,
            isSecure: false,
            message: `Function ${funcName} could not be verified: ${fallbackError.message}`
          });
          continue;
        }
        
        const exists = !!fallbackData;
        const isSecure = exists && fallbackData.prosecdef;
          
        functionResults.push({
          name: funcName,
          exists,
          isSecure,
          message: exists 
            ? (isSecure 
              ? `Function ${funcName} exists and is SECURITY DEFINER` 
              : `Function ${funcName} exists but is NOT SECURITY DEFINER`)
            : `Function ${funcName} does not exist`
        });
        continue;
      }
      
      // Parse check_function_exists results
      const exists = !!data && data.function_exists;
      const isSecure = !!data && data.is_secure;
        
      functionResults.push({
        name: funcName,
        exists,
        isSecure,
        message: exists 
          ? (isSecure 
            ? `Function ${funcName} exists and is SECURITY DEFINER` 
            : `Function ${funcName} exists but is NOT SECURITY DEFINER`)
          : `Function ${funcName} does not exist`
      });
    } catch (err: any) {
      console.error(`Error checking function ${funcName}:`, err);
      functionResults.push({
        name: funcName,
        exists: false,
        isSecure: false,
        message: `Error checking function ${funcName}: ${err.message || String(err)}`
      });
    }
  }
  
  return functionResults;
}

/**
 * Shows success or error toast messages based on verification results
 * @param tables Results of table verification
 * @param policies Results of RLS policy verification
 * @param functions Results of function verification
 */
export function displayVerificationResults(
  tables: DatabaseTableStatus[],
  policies: PolicyStatus[],
  functions: FunctionStatus[]
): void {
  // Check tables
  const missingTables = tables.filter(t => !t.exists).map(t => t.name);
  if (missingTables.length === 0) {
    toast.success('All required database tables exist');
  } else {
    toast.error(`Missing tables: ${missingTables.join(', ')}`);
  }
  
  // Check RLS policies
  const missingRls = policies.filter(p => !p.exists).map(p => p.table);
  if (missingRls.length === 0 && policies.length > 0) {
    toast.success('RLS policies verified successfully');
  } else if (missingRls.length > 0) {
    toast.error(`RLS issues found on tables: ${missingRls.join(', ')}`);
  }
  
  // Function issues
  const functionIssues = functions.filter(f => !f.exists || !f.isSecure).map(f => f.name);
  if (functionIssues.length === 0 && functions.length > 0) {
    toast.success('Database functions verified successfully');
  } else if (functionIssues.length > 0) {
    toast.error(`Issues with functions: ${functionIssues.join(', ')}`);
  }
}
