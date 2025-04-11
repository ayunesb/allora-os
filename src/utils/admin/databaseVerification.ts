
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  DatabaseTableStatus, 
  PolicyStatus, 
  FunctionStatus 
} from '@/components/admin/database-verification/types';

/**
 * Verifies the existence of required database tables
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
      const { error } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', tableName)
        .maybeSingle();
      
      const exists = !error;
      
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
 */
export async function verifyRlsPolicies(): Promise<PolicyStatus[]> {
  const tablesWithRls = ['profiles', 'companies', 'campaigns', 'strategies', 'leads', 'communications', 'user_preferences'];
  const policyResults: PolicyStatus[] = [];
  
  for (const table of tablesWithRls) {
    try {
      // First verify the table exists
      const { data: tableData, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', table)
        .maybeSingle();
        
      if (tableError || !tableData) {
        policyResults.push({
          table,
          exists: false,
          message: `Table ${table} doesn't exist, can't check RLS`
        });
        continue;
      }
      
      // Check if RLS is enabled for the table
      const { data: rlsData, error: rlsError } = await supabase
        .rpc('check_rls_enabled', { table_name: table });
      
      const hasRls = rlsData && rlsData.length > 0 && rlsData[0]?.rls_enabled;
        
      policyResults.push({
        table,
        exists: hasRls,
        message: hasRls 
          ? `RLS is enabled for ${table}` 
          : `RLS is disabled for ${table}`
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
 */
export async function verifyDatabaseFunctions(): Promise<FunctionStatus[]> {
  const requiredFunctions = [
    'handle_new_user', 
    'update_profile_after_company_creation'
  ];
  const functionResults: FunctionStatus[] = [];
  
  for (const funcName of requiredFunctions) {
    try {
      // Query information_schema.routines for functions
      const { data, error } = await supabase
        .from('information_schema.routines')
        .select('routine_name, security_type')
        .eq('routine_schema', 'public')
        .eq('routine_name', funcName);
        
      if (error) {
        console.error(`Error checking function ${funcName}:`, error);
        functionResults.push({
          name: funcName,
          exists: false,
          isSecure: false,
          message: `Error checking function ${funcName}: ${error.message}`
        });
      } else {
        const exists = Array.isArray(data) && data.length > 0;
        const isSecure = exists && data[0]?.security_type === 'DEFINER';
        
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
      }
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
  if (missingRls.length === 0) {
    toast.success('RLS policies verified successfully');
  } else {
    toast.error(`RLS issues found on tables: ${missingRls.join(', ')}`);
  }
  
  // Function issues
  const functionIssues = functions.filter(f => !f.exists || !f.isSecure).map(f => f.name);
  if (functionIssues.length === 0) {
    toast.success('Database functions verified successfully');
  } else {
    toast.error(`Issues with functions: ${functionIssues.join(', ')}`);
  }
}
