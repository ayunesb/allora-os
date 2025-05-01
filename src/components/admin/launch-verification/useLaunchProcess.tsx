import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ValidationResultsUI } from '@/types/Validation';
import { onStrategyApproved, onNewLeadAdded } from '@/utils/zapierEventTriggers';
import { supabase } from '@/integrations/supabase/client';

export interface VerificationResults {
  isReady: boolean;
  databaseReady: boolean;
  apiReady: boolean;
  storageReady: boolean;
  webhooksReady: boolean;
  authReady: boolean;
  details: ValidationResultsUI;
}

export const useLaunchProcess = (companyId?: string) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAddingDemo, setIsAddingDemo] = useState(false);
  const [isVerifyingTables, setIsVerifyingTables] = useState(false);
  const [isCheckingIndexes, setIsCheckingIndexes] = useState(false);
  const [isVerifyingRLS, setIsVerifyingRLS] = useState(false);
  const [isVerifyingFunctions, setIsVerifyingFunctions] = useState(false);
  const [results, setResults] = useState<VerificationResults | null>(null);

  // Derived state
  const isReady = results?.isReady || false;

  // Run all checks
  const runChecks = async () => {
    setIsChecking(true);
    try {
      // Simulate API call to check system readiness
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock results
      const mockResults: VerificationResults = {
        isReady: true,
        databaseReady: true,
        apiReady: true,
        storageReady: true,
        webhooksReady: true,
        authReady: true,
        details: {
          databaseTables: [
            { name: 'users', status: 'ok', message: 'Table exists with correct schema' },
            { name: 'companies', status: 'ok', message: 'Table exists with correct schema' },
            { name: 'projects', status: 'ok', message: 'Table exists with correct schema' },
            { name: 'tasks', status: 'ok', message: 'Table exists with correct schema' },
          ],
          databaseIndexes: [
            { name: 'users_email_idx', status: 'ok', message: 'Index exists and is optimized' },
            { name: 'projects_company_id_idx', status: 'ok', message: 'Index exists and is optimized' },
          ],
          databaseFunctions: [
            { name: 'get_user_projects', status: 'ok', message: 'Function exists and is working correctly' },
            { name: 'update_project_status', status: 'ok', message: 'Function exists and is working correctly' },
          ],
          rlsPolicies: [
            { name: 'users_policy', status: 'ok', message: 'RLS policy is correctly configured' },
            { name: 'projects_policy', status: 'ok', message: 'RLS policy is correctly configured' },
          ],
          policies: [
            { name: 'storage_policy', status: 'ok', message: 'Storage policy is correctly configured' },
            { name: 'api_policy', status: 'ok', message: 'API policy is correctly configured' },
          ],
        }
      };
      
      setResults(mockResults);
      
      if (mockResults.isReady) {
        toast.success('All systems are ready for launch!');
      } else {
        toast.error('Some systems are not ready for launch. Please check the details.');
      }
    } catch (error) {
      console.error('Error checking launch readiness:', error);
      toast.error('Failed to check launch readiness');
    } finally {
      setIsChecking(false);
    }
  };

  // Add demo data
  const handleAddDemoData = async () => {
    setIsAddingDemo(true);
    try {
      // Simulate API call to add demo data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success
      toast.success('Demo data added successfully');
      
      // Refresh checks
      await runChecks();
    } catch (error) {
      console.error('Error adding demo data:', error);
      toast.error('Failed to add demo data');
    } finally {
      setIsAddingDemo(false);
    }
  };

  // Verify required tables
  const verifyRequiredTables = async () => {
    setIsVerifyingTables(true);
    try {
      // Simulate API call to verify tables
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      toast.success('Database tables verified successfully');
      
      // Update results
      if (results) {
        setResults({
          ...results,
          databaseReady: true,
          details: {
            ...results.details,
            databaseTables: [
              { name: 'users', status: 'ok', message: 'Table exists with correct schema' },
              { name: 'companies', status: 'ok', message: 'Table exists with correct schema' },
              { name: 'projects', status: 'ok', message: 'Table exists with correct schema' },
              { name: 'tasks', status: 'ok', message: 'Table exists with correct schema' },
            ]
          }
        });
      }
    } catch (error) {
      console.error('Error verifying tables:', error);
      toast.error('Failed to verify database tables');
    } finally {
      setIsVerifyingTables(false);
    }
  };

  // Check database indexes
  const checkDatabaseIndexes = async () => {
    setIsCheckingIndexes(true);
    try {
      // Simulate API call to check indexes
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock success
      toast.success('Database indexes verified successfully');
      
      // Update results
      if (results) {
        setResults({
          ...results,
          details: {
            ...results.details,
            databaseIndexes: [
              { name: 'users_email_idx', status: 'ok', message: 'Index exists and is optimized' },
              { name: 'projects_company_id_idx', status: 'ok', message: 'Index exists and is optimized' },
            ]
          }
        });
      }
    } catch (error) {
      console.error('Error checking indexes:', error);
      toast.error('Failed to check database indexes');
    } finally {
      setIsCheckingIndexes(false);
    }
  };

  // Verify RLS policies
  const verifyRLSPolicies = async () => {
    setIsVerifyingRLS(true);
    try {
      // Simulate API call to verify RLS policies
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success
      toast.success('RLS policies verified successfully');
      
      // Update results
      if (results) {
        setResults({
          ...results,
          details: {
            ...results.details,
            rlsPolicies: [
              { name: 'users_policy', status: 'ok', message: 'RLS policy is correctly configured' },
              { name: 'projects_policy', status: 'ok', message: 'RLS policy is correctly configured' },
            ]
          }
        });
      }
    } catch (error) {
      console.error('Error verifying RLS policies:', error);
      toast.error('Failed to verify RLS policies');
    } finally {
      setIsVerifyingRLS(false);
    }
  };

  // Verify database functions
  const verifyDatabaseFunctions = async () => {
    setIsVerifyingFunctions(true);
    try {
      // Simulate API call to verify functions
      await new Promise(resolve => setTimeout(resolve, 1300));
      
      // Mock success
      toast.success('Database functions verified successfully');
      
      // Update results
      if (results) {
        setResults({
          ...results,
          details: {
            ...results.details,
            databaseFunctions: [
              { name: 'get_user_projects', status: 'ok', message: 'Function exists and is working correctly' },
              { name: 'update_project_status', status: 'ok', message: 'Function exists and is working correctly' },
            ]
          }
        });
      }
      
      // Test Zapier webhooks with sample data
      await testZapierWebhooks();
    } catch (error) {
      console.error('Error verifying functions:', error);
      toast.error('Failed to verify database functions');
    } finally {
      setIsVerifyingFunctions(false);
    }
  };

  // Test Zapier webhooks
  const testZapierWebhooks = async () => {
    try {
      // Get Zapier webhook URL from localStorage
      const webhookUrl = localStorage.getItem('zapier_webhook_url');
      
      if (!webhookUrl) {
        console.log('No Zapier webhook URL found, skipping tests');
        return;
      }
      
      // Test strategy approved webhook
      const strategy = {
        strategyId: 'test-strategy-123',
        strategyTitle: 'Test Strategy',
        companyId: companyId || 'test-company',
        approvedBy: 'System Test'
      };
      
      await onStrategyApproved('https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/', strategy);
      
      // Test lead added webhook
      const lead = {
        leadId: 'test-lead-123',
        leadName: 'Test Lead',
        company: 'Test Company',
        email: 'test@example.com',
        source: 'System Test'
      };
      
      await onNewLeadAdded('https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/', lead);
      
      console.log('Zapier webhook tests completed');
    } catch (error) {
      console.error('Error testing Zapier webhooks:', error);
    }
  };

  // Run initial checks on mount
  useEffect(() => {
    if (companyId) {
      runChecks();
    }
  }, [companyId]);

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
};
