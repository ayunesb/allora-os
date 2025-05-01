
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useVerification(companyId: string | null) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAddingDemo, setIsAddingDemo] = useState(false);
  const [isVerifyingTables, setIsVerifyingTables] = useState(false);
  const [isCheckingIndexes, setIsCheckingIndexes] = useState(false);
  const [isVerifyingRLS, setIsVerifyingRLS] = useState(false);
  const [isVerifyingFunctions, setIsVerifyingFunctions] = useState(false);
  
  const [results, setResults] = useState<any>(null);
  const [isReady, setIsReady] = useState<boolean | null>(null);

  // Run all verification checks
  const runChecks = async (): Promise<void> => {
    if (!companyId) {
      toast.error('Company ID is required for verification checks');
      return;
    }

    setIsChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-launch-readiness', {
        body: { tenant_id: companyId }
      });

      if (error) throw new Error(error.message);
      
      setResults(data);
      setIsReady(data.overallStatus?.valid || false);
      
      if (data.overallStatus?.valid) {
        toast.success('All verification checks passed!');
      } else {
        toast.warning('Some verification checks failed. Please review the results.');
      }
    } catch (err: any) {
      console.error('Error running verification checks:', err);
      toast.error('Failed to run verification checks');
    } finally {
      setIsChecking(false);
    }
  };

  // Add demo data
  const handleAddDemoData = async (): Promise<void> => {
    if (!companyId) {
      toast.error('Company ID is required to add demo data');
      return;
    }

    setIsAddingDemo(true);
    try {
      const { error } = await supabase.functions.invoke('add-demo-data', {
        body: { tenant_id: companyId }
      });

      if (error) throw new Error(error.message);
      toast.success('Demo data added successfully');
    } catch (err: any) {
      console.error('Error adding demo data:', err);
      toast.error('Failed to add demo data');
    } finally {
      setIsAddingDemo(false);
    }
  };

  // Verify required tables
  const verifyRequiredTables = async (): Promise<void> => {
    if (!companyId) {
      toast.error('Company ID is required to verify tables');
      return;
    }

    setIsVerifyingTables(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-database-tables', {
        body: { tenant_id: companyId }
      });

      if (error) throw new Error(error.message);
      
      setResults((prev: any) => ({
        ...prev,
        databaseTables: data.tables
      }));
      
      toast.success('Tables verified');
    } catch (err: any) {
      console.error('Error verifying tables:', err);
      toast.error('Failed to verify tables');
    } finally {
      setIsVerifyingTables(false);
    }
  };

  // Check database indexes
  const checkDatabaseIndexes = async (): Promise<void> => {
    if (!companyId) {
      toast.error('Company ID is required to check indexes');
      return;
    }

    setIsCheckingIndexes(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-database-indexes', {
        body: { tenant_id: companyId }
      });

      if (error) throw new Error(error.message);
      
      setResults((prev: any) => ({
        ...prev,
        databaseIndexes: data.indexes
      }));
      
      toast.success('Indexes verified');
    } catch (err: any) {
      console.error('Error checking indexes:', err);
      toast.error('Failed to check indexes');
    } finally {
      setIsCheckingIndexes(false);
    }
  };

  // Verify RLS policies
  const verifyRLSPolicies = async (): Promise<void> => {
    if (!companyId) {
      toast.error('Company ID is required to verify RLS policies');
      return;
    }

    setIsVerifyingRLS(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-rls-policies', {
        body: { tenant_id: companyId }
      });

      if (error) throw new Error(error.message);
      
      setResults((prev: any) => ({
        ...prev,
        rlsPolicies: data.policies
      }));
      
      toast.success('RLS policies verified');
    } catch (err: any) {
      console.error('Error verifying RLS policies:', err);
      toast.error('Failed to verify RLS policies');
    } finally {
      setIsVerifyingRLS(false);
    }
  };

  // Verify database functions
  const verifyDatabaseFunctions = async (): Promise<void> => {
    if (!companyId) {
      toast.error('Company ID is required to verify functions');
      return;
    }

    setIsVerifyingFunctions(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-database-functions', {
        body: { tenant_id: companyId }
      });

      if (error) throw new Error(error.message);
      
      setResults((prev: any) => ({
        ...prev,
        databaseFunctions: data.functions
      }));
      
      toast.success('Database functions verified');
    } catch (err: any) {
      console.error('Error verifying functions:', err);
      toast.error('Failed to verify functions');
    } finally {
      setIsVerifyingFunctions(false);
    }
  };

  return {
    isChecking,
    results,
    isReady,
    isAddingDemo,
    isVerifyingTables,
    isCheckingIndexes,
    isVerifyingRLS,
    isVerifyingFunctions,
    runChecks,
    handleAddDemoData,
    verifyRequiredTables,
    checkDatabaseIndexes,
    verifyRLSPolicies,
    verifyDatabaseFunctions
  };
}
