
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { DatabaseVerificationResult, DatabaseTableStatus, PolicyStatus, FunctionStatus } from '@/types/databaseVerification';
import { 
  verifyDatabaseTables, 
  verifyRlsPolicies, 
  verifyDatabaseFunctions,
  displayVerificationResults,
  checkVerificationAccess
} from '@/utils/admin/database-verification';
import { supabase, checkSupabaseConnection } from '@/integrations/supabase/client';

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
  
  const [connectionStatus, setConnectionStatus] = useState({
    checked: false,
    connected: false,
    authenticated: false,
    error: null as any,
    accessError: null as string | null
  });

  // Check connection status on mount
  useEffect(() => {
    const initialConnectionCheck = async () => {
      try {
        console.log("Performing initial connection check...");
        const status = await checkSupabaseConnection();
        
        // Check verification access permissions
        const accessCheck = await checkVerificationAccess();
        
        setConnectionStatus({
          checked: true,
          connected: status.connected,
          authenticated: status.authenticated,
          error: status.error || null,
          accessError: !accessCheck.canAccess ? accessCheck.message : null
        });
        
        // If not connected or not authenticated, we don't need to try verification
        if (!status.connected || !status.authenticated || !accessCheck.canAccess) {
          console.log("Not proceeding with verification due to connection/auth issues");
          return;
        }
        
        // Auto-verify if we're connected and authenticated and have access
        console.log("Connection check passed, proceeding with verification");
        verifyDatabaseConfiguration();
      } catch (err) {
        console.error("Initial connection check failed:", err);
        setConnectionStatus(prev => ({
          ...prev,
          checked: true,
          error: err
        }));
      }
    };
    
    if (!connectionStatus.checked) {
      initialConnectionCheck();
    }
  }, [connectionStatus.checked]);

  /**
   * Attempts to ensure the check_function_exists RPC exists
   * This function will not create the RPC but will check for its existence
   */
  const createFunctionCheckerRPC = async () => {
    try {
      // Log API details to help troubleshoot connection issues
      console.log('Checking Supabase connection status...');
      
      // Basic connection test to check auth token validity
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.warn("No active session found during function verification setup");
        toast.error("Authentication required", {
          description: "Please log in to verify database functions"
        });
        return false;
      }
      
      // Check if the helper function exists
      const { data, error } = await supabase.rpc('check_function_exists', { function_name: 'check_function_exists' });
      
      if (error) {
        console.error('Error checking function existence:', error);
        
        // Only show toast for specific errors, not if the function doesn't exist
        if (!error.message.includes('does not exist')) {
          toast.error('Error with database verification tools', {
            description: error.message
          });
        }
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Error setting up function checker:', err);
      return false;
    }
  };

  /**
   * Triggers the verification process for database configuration
   * Checks tables, RLS policies, and functions in parallel
   */
  const verifyDatabaseConfiguration = useCallback(async () => {
    // First check connection
    setVerificationResult(prev => ({ ...prev, isVerifying: true }));
    
    try {
      console.log('Starting database verification process...');
      const connectionStatus = await checkSupabaseConnection();
      
      if (!connectionStatus.connected) {
        toast.error("Cannot verify database - connection failed", {
          description: "Please check your Supabase connection and try again."
        });
        setVerificationResult(prev => ({ ...prev, isVerifying: false }));
        return;
      }
      
      if (!connectionStatus.authenticated) {
        toast.error("Cannot verify database - authentication required", {
          description: "Please sign in to access database verification features."
        });
        setVerificationResult(prev => ({ ...prev, isVerifying: false }));
        return;
      }
      
      // Check access permissions
      const accessCheck = await checkVerificationAccess();
      if (!accessCheck.canAccess) {
        toast.error("Access denied", {
          description: accessCheck.message
        });
        setVerificationResult(prev => ({ ...prev, isVerifying: false }));
        return;
      }
      
      // Create function checker if needed
      await createFunctionCheckerRPC();
      
      // Run all verification checks in parallel for better performance
      const [tablesResults, policiesResults, functionsResults] = await Promise.all([
        verifyDatabaseTables(),
        verifyRlsPolicies(),
        verifyDatabaseFunctions()
      ]);
      
      // Convert to the correct types required by DatabaseVerificationResult
      const tables: DatabaseTableStatus[] = tablesResults.map(item => ({
        name: item.name,
        exists: item.exists,
        message: item.message || (item.exists ? `Table '${item.name}' exists` : `Table '${item.name}' missing`)
      }));
      
      const policies: PolicyStatus[] = policiesResults.map(item => ({
        table: item.table,
        exists: item.exists,
        message: item.message || (item.exists ? `RLS enabled for '${item.table}'` : `RLS not enabled for '${item.table}'`)
      }));
      
      const functions: FunctionStatus[] = functionsResults || [];
      
      console.log('Verification results:', { 
        tables, 
        policies, 
        functions,
        tablesCount: tables.length,
        policiesCount: policies.length,
        functionsCount: functions.length
      });
      
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
      
      if (tables.length === 0 && policies.length === 0 && functions.length === 0) {
        toast.error("No database verification data returned", {
          description: "Check your Supabase connection and permissions"
        });
      } else if (issuesCount === 0) {
        toast.success("Database verification completed - All checks passed");
      } else {
        toast.warning(`Database verification completed - ${issuesCount} issues found`, {
          description: "Some tables, policies or functions need configuration"
        });
      }
      
    } catch (error: any) {
      console.error('Error during database verification:', error);
      toast.error(`Verification failed: ${error.message || String(error)}`);
      setVerificationResult(prev => ({ ...prev, isVerifying: false }));
    }
  }, []);

  return {
    verificationResult,
    connectionStatus,
    verifyDatabaseConfiguration
  };
}
