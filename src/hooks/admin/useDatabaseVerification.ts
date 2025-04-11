
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
      
      // Correct query for pg_tables - it's already in public schema
      const { data: tablesData, error: tablesError } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (tablesError) {
        console.error('Error fetching tables:', tablesError);
        throw tablesError;
      }
      
      const existingTables = (tablesData || []).map(t => t.tablename);
      
      // Check each required table
      for (const table of requiredTables) {
        tableResults.push({
          name: table,
          exists: existingTables.includes(table),
          message: existingTables.includes(table) 
            ? `Table ${table} exists` 
            : `Table ${table} is missing`
        });
      }
      
      // Check for RLS policies
      const policyResults: PolicyStatus[] = [];
      const tablesWithRls = ['profiles', 'companies', 'campaigns', 'leads'];
      
      for (const table of tablesWithRls) {
        if (existingTables.includes(table)) {
          // Check if RLS is enabled using a more reliable method
          try {
            const { data: rlsData, error: rlsError } = await supabase
              .rpc('check_table_rls', { table_name: table });
            
            if (rlsError) {
              // If the function doesn't exist, fall back to a direct check
              const { data: policiesData, error: policiesError } = await supabase
                .from('pg_policies')
                .select('*')
                .eq('tablename', table);
                
              if (policiesError) {
                policyResults.push({
                  table,
                  exists: false,
                  message: `Could not verify RLS for ${table}: ${policiesError.message}`
                });
              } else {
                const hasRlsPolicies = policiesData && policiesData.length > 0;
                policyResults.push({
                  table,
                  exists: hasRlsPolicies,
                  message: hasRlsPolicies 
                    ? `Table ${table} has RLS policies` 
                    : `No RLS policies found for ${table}`
                });
              }
            } else {
              policyResults.push({
                table,
                exists: !!rlsData,
                message: rlsData ? `RLS enabled for ${table}` : `RLS not enabled for ${table}`
              });
            }
          } catch (err) {
            // Fall back to a more direct check
            try {
              const { data: policies, error: policiesError } = await supabase
                .from('pg_policies')
                .select('*')
                .eq('tablename', table);
                
              if (policiesError) {
                policyResults.push({
                  table,
                  exists: false,
                  message: `Error checking RLS for ${table}: ${policiesError.message}`
                });
              } else {
                policyResults.push({
                  table,
                  exists: policies && policies.length > 0,
                  message: (policies && policies.length > 0) 
                    ? `Found ${policies.length} policies for ${table}` 
                    : `No policies found for ${table}`
                });
              }
            } catch (policyErr) {
              policyResults.push({
                table,
                exists: false,
                message: `Error checking policies for ${table}: ${policyErr instanceof Error ? policyErr.message : String(policyErr)}`
              });
            }
          }
        } else {
          policyResults.push({
            table,
            exists: false,
            message: `Table ${table} doesn't exist, can't check RLS`
          });
        }
      }
      
      // Check database functions
      const functionResults: FunctionStatus[] = [];
      const requiredFunctions = [
        'handle_new_user', 
        'update_profile_after_company_creation'
      ];
      
      // Correct query for pg_proc
      for (const func of requiredFunctions) {
        try {
          const { data: funcData, error: funcError } = await supabase
            .from('pg_proc')
            .select('proname, prosecdef')
            .eq('proname', func);
          
          if (funcError) {
            functionResults.push({
              name: func,
              exists: false,
              isSecure: false,
              message: `Error checking function ${func}: ${funcError.message}`
            });
          } else {
            const exists = (funcData || []).length > 0;
            const isSecure = exists ? funcData[0].prosecdef : false;
            
            functionResults.push({
              name: func,
              exists,
              isSecure,
              message: exists 
                ? (isSecure 
                  ? `Function ${func} exists and is SECURITY DEFINER` 
                  : `Function ${func} exists but is NOT SECURITY DEFINER`)
                : `Function ${func} does not exist`
            });
          }
        } catch (err) {
          functionResults.push({
            name: func,
            exists: false,
            isSecure: false,
            message: `Error checking function ${func}: ${err instanceof Error ? err.message : String(err)}`
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
      toast.error(`Verification failed: ${error.message}`);
      setVerificationResult(prev => ({ ...prev, isVerifying: false }));
    }
  }, []);

  return {
    verificationResult,
    verifyDatabaseConfiguration
  };
}
