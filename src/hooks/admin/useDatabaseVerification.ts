
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  validateDatabaseSecurity, 
  validateRLSPolicies,
  validateDatabaseFunctions
} from '@/utils/validators';
import { DatabaseVerificationResult } from '@/components/admin/database-verification/types';

export function useDatabaseVerification() {
  const [verificationResult, setVerificationResult] = useState<DatabaseVerificationResult>({
    tables: [],
    policies: [],
    functions: [],
    isVerifying: false
  });

  const requiredTables = [
    'profiles',
    'companies',
    'strategies', 
    'leads',
    'campaigns',
    'user_legal_acceptances',
    'communications',
    'debates'
  ];

  const requiredPolicies = [
    { table: 'profiles', name: 'Users can view own profile' },
    { table: 'companies', name: 'Company members can view' },
    { table: 'strategies', name: 'Company members can view' },
    { table: 'leads', name: 'Company members can view' },
    { table: 'campaigns', name: 'Company members can view' }
  ];

  const requiredFunctions = [
    { name: 'update_profile_after_company_creation', isSecurityDefiner: true },
    { name: 'get_security_settings', isSecurityDefiner: true },
    { name: 'update_security_settings', isSecurityDefiner: true },
    { name: 'get_user_preferences', isSecurityDefiner: true },
    { name: 'update_user_preferences', isSecurityDefiner: true }
  ];

  const verifyDatabaseConfiguration = useCallback(async () => {
    setVerificationResult(prev => ({ ...prev, isVerifying: true }));
    
    try {
      // 1. Verify tables
      const tableResults: DatabaseVerificationResult['tables'] = [];
      
      for (const tableName of requiredTables) {
        try {
          const { error } = await supabase
            .from(tableName)
            .select('id')
            .limit(1);
            
          tableResults.push({
            name: tableName,
            exists: !error,
            message: error ? `Error: ${error.message}` : `Table exists`
          });
        } catch (err: any) {
          tableResults.push({
            name: tableName,
            exists: false,
            message: `Error checking table: ${err.message}`
          });
        }
      }
      
      // 2. Verify RLS policies
      const rlsResult = await validateRLSPolicies();
      const databaseSecurityResult = await validateDatabaseSecurity();
      
      const policyResults: DatabaseVerificationResult['policies'] = requiredPolicies.map(policy => ({
        table: policy.table,
        name: policy.name,
        exists: rlsResult.valid && databaseSecurityResult.valid,
        message: rlsResult.valid ? 'Policy exists and is configured correctly' : rlsResult.message
      }));
      
      // 3. Verify functions
      const functionsResult = await validateDatabaseFunctions();
      
      const functionResults: DatabaseVerificationResult['functions'] = requiredFunctions.map(func => ({
        name: func.name,
        exists: functionsResult.valid,
        isSecure: functionsResult.valid,
        message: functionsResult.valid ? 
          `Function exists and has proper security settings` : 
          functionsResult.message
      }));
      
      setVerificationResult({
        tables: tableResults,
        policies: policyResults,
        functions: functionResults,
        isVerifying: false
      });
      
      const allValid = 
        tableResults.every(t => t.exists) && 
        policyResults.every(p => p.exists) && 
        functionResults.every(f => f.exists && f.isSecure);
        
      if (allValid) {
        toast.success('Database configuration verified successfully');
      } else {
        toast.error('Database configuration has issues that need attention');
      }
      
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
