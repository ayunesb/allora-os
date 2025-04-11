
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
      // Run all verification checks in parallel for better performance
      const [tables, policies, functions] = await Promise.all([
        verifyDatabaseTables(),
        verifyRlsPolicies(),
        verifyDatabaseFunctions()
      ]);
      
      // Update state with all results
      setVerificationResult({
        tables,
        policies,
        functions,
        isVerifying: false
      });
      
      // Display user-friendly messages based on results
      displayVerificationResults(tables, policies, functions);
      
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
