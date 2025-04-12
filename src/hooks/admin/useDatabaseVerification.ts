
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { DatabaseVerificationResult } from '@/types/databaseVerification';
import { 
  verifyDatabaseTables, 
  verifyRlsPolicies, 
  verifyDatabaseFunctions,
  displayVerificationResults 
} from '@/utils/admin/databaseVerification';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook for verifying database configuration.
 * Provides functionality to check database tables, RLS policies, and functions.
 * @returns Object containing verification results and function to trigger verification
 */
export function useDatabaseVerification() {
  const [verificationResult, setVerificationResult] = useState<DatabaseVerificationResult>({
    tables: [],
    policies: [],
    functions: [],
    isVerifying: false
  });

  /**
   * Attempts to ensure the check_function_exists RPC exists
   * This function will not create the RPC but will check for its existence
   */
  const createFunctionCheckerRPC = async () => {
    try {
      // Check if the helper function exists
      const { data, error } = await supabase.rpc('check_function_exists', { function_name: 'check_function_exists' });
      
      if (error) {
        console.error('Error checking function existence:', error);
        // The check_function_exists function may not exist yet, which is expected
        // We'll continue with the verification process
      }
    } catch (err) {
      console.error('Error setting up function checker:', err);
      // We'll use a fallback method in verifyDatabaseFunctions
    }
  };

  /**
   * Triggers the verification process for database configuration
   * Checks tables, RLS policies, and functions in parallel
   */
  const verifyDatabaseConfiguration = useCallback(async () => {
    setVerificationResult(prev => ({ ...prev, isVerifying: true }));
    
    try {
      console.log('Starting database verification process...');
      
      // Create function checker if needed
      await createFunctionCheckerRPC();
      
      // Run all verification checks in parallel for better performance
      const [tables, policies, functions] = await Promise.all([
        verifyDatabaseTables(),
        verifyRlsPolicies(),
        verifyDatabaseFunctions()
      ]);
      
      console.log('Verification results:', { tables, policies, functions });
      
      // Update state with all results
      setVerificationResult({
        tables,
        policies,
        functions,
        isVerifying: false
      });
      
      // Display user-friendly messages based on results
      displayVerificationResults(tables, policies, functions);
      
      // Count issues
      const issuesCount = 
        tables.filter(t => !t.exists).length +
        policies.filter(p => !p.exists).length +
        functions.filter(f => !f.exists || !f.isSecure).length;
      
      if (issuesCount === 0) {
        toast.success("Database verification completed - All checks passed");
      } else {
        toast.error(`Database verification completed - ${issuesCount} issues found`);
      }
      
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
