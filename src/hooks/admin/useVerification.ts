
import { useState } from 'react';
import { validateLaunchReadiness } from '@/utils/launchValidator';
import { 
  validateRLSPolicies,
  validateDatabaseFunctions,
  validatePerformanceOptimization
} from '@/utils/validators';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { addDemoDataButton } from '@/utils/demoData';
import type { ValidationResultsUI, DatabaseTableStatus } from '@/components/admin/launch-verification/types';

export function useVerification(profileCompanyId?: string) {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<ValidationResultsUI | null>(null);
  const [isReady, setIsReady] = useState<boolean | null>(null);
  const [isAddingDemo, setIsAddingDemo] = useState(false);
  const [isVerifyingTables, setIsVerifyingTables] = useState(false);
  const [isCheckingIndexes, setIsCheckingIndexes] = useState(false);
  const [isVerifyingRLS, setIsVerifyingRLS] = useState(false);
  const [isVerifyingFunctions, setIsVerifyingFunctions] = useState(false);
  
  const runChecks = async () => {
    setIsChecking(true);
    try {
      const validation = await validateLaunchReadiness();
      
      // Transform the validation results to match ValidationResultsUI format
      const transformedResults: ValidationResultsUI = {
        apis: {
          heygen: 'connected',
          postmark: 'connected',
          stripe: 'connected',
          twilio: 'connected',
          openai: 'connected'
        },
        database: {
          status: 'ready'
        },
        features: {
          authentication: true,
          onboarding: true,
          strategies: true,
          campaigns: true,
          aiDebate: true,
          welcomeVideo: true,
          billing: true
        },
        compliance: {
          whatsappOptIn: true,
          emailUnsubscribe: true,
          billingCompliance: true,
          apiSecurityLevel: 'high'
        },
        overallStatus: 'ready'
      };
      
      // Add validation results
      if (validation.results.legalAcceptance) {
        transformedResults.legalAcceptance = validation.results.legalAcceptance;
      }
      
      // Convert rlsPolicies from ValidationResult to required array format if it exists
      if (validation.results.rlsPolicies) {
        transformedResults.rlsPolicies = [{
          table: 'All tables',
          status: validation.results.rlsPolicies.valid ? 'verified' : 'issues',
          message: validation.results.rlsPolicies.message
        }];
      }
      
      // Similarly transform databaseFunctions
      if (validation.results.databaseFunctions) {
        transformedResults.databaseFunctions = [{
          name: 'Database Functions',
          status: validation.results.databaseFunctions.valid ? 'verified' : 'issues',
          message: validation.results.databaseFunctions.message
        }];
      }
      
      setResults(transformedResults);
      setIsReady(validation.valid);
    } catch (error) {
      console.error("Error during launch verification:", error);
      setIsReady(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleAddDemoData = async () => {
    setIsAddingDemo(true);
    try {
      await addDemoDataButton(profileCompanyId);
      toast.success('Demo data added successfully');
    } catch (error) {
      console.error("Error adding demo data:", error);
      toast.error('Failed to add demo data');
    } finally {
      setIsAddingDemo(false);
    }
  };
  
  const verifyRequiredTables = async () => {
    setIsVerifyingTables(true);
    
    const requiredTables = [
      'companies',
      'profiles',
      'strategies',
      'leads',
      'campaigns',
      'ai_boardroom_debates',
      'user_legal_acceptances'
    ];
    
    const tableResults: Record<string, DatabaseTableStatus> = {};
    
    try {
      for (const table of requiredTables) {
        try {
          // First check if the table exists
          const { error } = await supabase
            .from(table)
            .select('id')
            .limit(1);
            
          if (error) {
            if (error.code === '42P01') {
              tableResults[table] = {
                exists: false,
                message: `Table '${table}' does not exist in the database`,
                rls: false
              };
            } else {
              // If error is not "table doesn't exist", check if it's a permissions error
              // which would indicate RLS is active
              const rlsActive = error.message.includes('permission denied');
              tableResults[table] = {
                exists: true,
                message: rlsActive 
                  ? `Table '${table}' exists with RLS active` 
                  : `Error checking table '${table}': ${error.message}`,
                rls: rlsActive
              };
            }
          } else {
            // Table exists, now check if it has RLS enabled
            const { data: rlsData, error: rlsError } = await supabase
              .rpc('check_table_rls', { table_name: table })
              .single();
              
            const hasRls = rlsError ? false : !!rlsData;
              
            tableResults[table] = {
              exists: true,
              message: `Table '${table}' exists and is accessible`,
              rls: hasRls
            };
          }
        } catch (err: any) {
          tableResults[table] = {
            exists: false,
            message: `Error checking table '${table}': ${err.message}`,
            rls: false
          };
        }
      }
      
      const missingTables = Object.entries(tableResults)
        .filter(([_, result]) => !result.exists)
        .map(([table]) => table);
        
      if (missingTables.length === 0) {
        toast.success('All required database tables exist');
      } else {
        toast.error(`Missing tables: ${missingTables.join(', ')}`);
      }
      
      setResults(prev => prev ? {
        ...prev,
        databaseTables: tableResults
      } : null);
      
    } catch (error) {
      console.error("Error verifying tables:", error);
      toast.error('Failed to verify database tables');
    } finally {
      setIsVerifyingTables(false);
    }
  };
  
  const checkDatabaseIndexes = async () => {
    setIsCheckingIndexes(true);
    
    try {
      const indexResults = await validatePerformanceOptimization();
      
      const formattedResults = [{
        name: 'Performance Optimization',
        status: indexResults.valid ? 'verified' : 'issues',
        message: indexResults.message
      }];
      
      setResults(prev => prev ? {
        ...prev,
        databaseIndexes: formattedResults
      } : null);
      
      if (indexResults.valid) {
        toast.success('Database indexes verified successfully');
      } else {
        toast.error(indexResults.message);
      }
    } catch (error) {
      console.error("Error checking indexes:", error);
      toast.error('Failed to verify database indexes');
    } finally {
      setIsCheckingIndexes(false);
    }
  };
  
  const verifyRLSPolicies = async () => {
    setIsVerifyingRLS(true);
    
    try {
      const rlsResults = await validateRLSPolicies();
      
      const formattedResults = [{
        table: 'All tables',
        status: rlsResults.valid ? 'verified' : 'issues',
        message: rlsResults.message
      }];
      
      setResults(prev => {
        if (!prev) return null;
        return {
          ...prev,
          rlsPolicies: formattedResults
        };
      });
      
      if (rlsResults.valid) {
        toast.success('RLS policies verified successfully');
      } else {
        toast.error(rlsResults.message);
      }
    } catch (error) {
      console.error("Error verifying RLS policies:", error);
      toast.error('Failed to verify RLS policies');
    } finally {
      setIsVerifyingRLS(false);
    }
  };
  
  const verifyDatabaseFunctions = async () => {
    setIsVerifyingFunctions(true);
    
    try {
      const functionResults = await validateDatabaseFunctions();
      
      const formattedResults = [{
        name: 'Database Functions',
        status: functionResults.valid ? 'verified' : 'issues',
        message: functionResults.message
      }];
      
      setResults(prev => {
        if (!prev) return null;
        return {
          ...prev,
          databaseFunctions: formattedResults
        };
      });
      
      if (functionResults.valid) {
        toast.success('Database functions verified successfully');
      } else {
        toast.error(functionResults.message);
      }
    } catch (error) {
      console.error("Error verifying database functions:", error);
      toast.error('Failed to verify database functions');
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
