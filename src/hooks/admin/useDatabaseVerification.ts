
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DatabaseVerificationResult, DatabaseTableStatus, PolicyStatus, FunctionStatus } from '@/components/admin/database-verification/types';

export function useDatabaseVerification() {
  const [verificationResult, setVerificationResult] = useState<DatabaseVerificationResult>({
    tables: [],
    policies: [],
    functions: [],
    isVerifying: false
  });

  const verifyDatabaseConfiguration = useCallback(async () => {
    setVerificationResult(prev => ({ ...prev, isVerifying: true }));
    
    try {
      // Verify required tables exist
      const requiredTables = [
        'profiles', 'companies', 'campaigns', 'strategies', 
        'leads', 'communications', 'user_preferences'
      ];
      
      const tableResults: DatabaseTableStatus[] = [];
      
      // Check each required table using information_schema
      for (const tableName of requiredTables) {
        try {
          const { data, error } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
            .eq('table_name', tableName)
            .single();
          
          if (error) {
            tableResults.push({
              name: tableName,
              exists: false,
              message: `Error checking table ${tableName}: ${error.message}`
            });
          } else {
            tableResults.push({
              name: tableName,
              exists: !!data,
              message: data ? `Table ${tableName} exists` : `Table ${tableName} is missing`
            });
          }
        } catch (err: any) {
          tableResults.push({
            name: tableName,
            exists: false,
            message: `Error checking table ${tableName}: ${err.message || String(err)}`
          });
        }
      }
      
      // Check for RLS policies
      const policyResults: PolicyStatus[] = [];
      const tablesWithRls = ['profiles', 'companies', 'campaigns', 'leads'];
      
      for (const table of tablesWithRls) {
        try {
          // First verify the table exists
          const { data: tableExists } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')
            .eq('table_name', table)
            .single();
            
          if (!tableExists) {
            policyResults.push({
              table,
              exists: false,
              message: `Table ${table} doesn't exist, can't check RLS`
            });
            continue;
          }
          
          // Try to check RLS by attempting a SELECT without filters
          // If RLS is active and configured properly, this should get a permission error
          const { data: testData, error: testError } = await supabase
            .from(table)
            .select('*')
            .limit(1);
            
          const hasRlsError = testError && 
            (testError.message.includes('permission denied') || 
             testError.code === 'PGRST116');
            
          policyResults.push({
            table,
            exists: hasRlsError,
            message: hasRlsError
              ? `RLS is enabled and active for ${table}`
              : `RLS may not be properly configured for ${table}`
          });
        } catch (err: any) {
          policyResults.push({
            table,
            exists: false,
            message: `Error checking RLS for ${table}: ${err.message || String(err)}`
          });
        }
      }
      
      // Check database functions
      const functionResults: FunctionStatus[] = [];
      const requiredFunctions = [
        'handle_new_user', 
        'update_profile_after_company_creation'
      ];
      
      // Query information_schema.routines for functions
      for (const funcName of requiredFunctions) {
        try {
          const { data, error } = await supabase
            .from('information_schema.routines')
            .select('routine_name, security_type')
            .eq('routine_schema', 'public')
            .eq('routine_name', funcName)
            .single();
            
          if (error) {
            functionResults.push({
              name: funcName,
              exists: false,
              isSecure: false,
              message: `Error checking function ${funcName}: ${error.message}`
            });
          } else {
            const exists = !!data;
            const isSecure = exists && data.security_type === 'DEFINER';
            
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
      
      setVerificationResult({
        tables: tableResults,
        policies: policyResults,
        functions: functionResults,
        isVerifying: false
      });
      
      toast.success("Database verification completed");
      
    } catch (error: any) {
      console.error('Error during database verification:', error);
      toast.error(`Verification failed: ${error.message || String(error)}`);
      setVerificationResult(prev => ({ ...prev, isVerifying: false }));
    }
  }, []);

  return {
    verificationResult,
    verifyDatabaseConfiguration
  };
}
