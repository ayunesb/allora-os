
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  DatabaseTableStatus, 
  PolicyStatus, 
  FunctionStatus 
} from '@/components/admin/database-verification/types';
import { checkTableExists, checkRlsEnabled } from '@/utils/adminHelper';

/**
 * Verifies the existence of required database tables
 */
export async function verifyDatabaseTables(): Promise<DatabaseTableStatus[]> {
  const requiredTables = [
    'profiles', 'companies', 'campaigns', 'strategies', 
    'leads', 'communications', 'user_preferences'
  ];
  
  const tableResults: DatabaseTableStatus[] = [];
  
  for (const tableName of requiredTables) {
    try {
      // Use the helper function to check if table exists
      const exists = await checkTableExists(tableName);
      
      tableResults.push({
        name: tableName,
        exists,
        message: exists ? `Table ${tableName} exists` : `Table ${tableName} is missing`
      });
    } catch (err: any) {
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
  const tablesWithRls = ['profiles', 'companies', 'campaigns', 'leads'];
  const policyResults: PolicyStatus[] = [];
  
  for (const table of tablesWithRls) {
    try {
      // First verify the table exists
      const tableExists = await checkTableExists(table);
        
      if (!tableExists) {
        policyResults.push({
          table,
          exists: false,
          message: `Table ${table} doesn't exist, can't check RLS`
        });
        continue;
      }
      
      // Check if RLS is enabled for the table
      const hasRls = await checkRlsEnabled(table);
        
      policyResults.push({
        table,
        exists: hasRls,
        message: hasRls 
          ? `RLS is enabled for ${table}` 
          : `RLS appears to be disabled for ${table}`
      });
    } catch (err: any) {
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
  
  // Query information_schema.routines for functions
  for (const funcName of requiredFunctions) {
    try {
      const { data, error } = await supabase
        .from('information_schema.routines')
        .select('routine_name, security_type')
        .eq('routine_schema', 'public')
        .eq('routine_name', funcName);
        
      if (error) {
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
