
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { DatabaseVerificationResult } from '@/components/admin/database-verification/types';
import { 
  verifyDatabaseTables, 
  verifyRlsPolicies, 
  verifyDatabaseFunctions,
  displayVerificationResults 
} from '@/utils/admin/databaseVerification';

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
      console.log('Starting database verification process...');
      
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
