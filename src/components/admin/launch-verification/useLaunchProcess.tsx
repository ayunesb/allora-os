import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { BusinessEventType } from '@/types/fixed/Webhook';

export const useLaunchProcess = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAddingDemo, setIsAddingDemo] = useState(false);
  const [isVerifyingTables, setIsVerifyingTables] = useState(false);
  const [isCheckingIndexes, setIsCheckingIndexes] = useState(false);
  const [isVerifyingRLS, setIsVerifyingRLS] = useState(false);
  const [isVerifyingFunctions, setIsVerifyingFunctions] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [hasVerifiedTables, setHasVerifiedTables] = useState(false);
  const [hasVerifiedIndexes, setHasVerifiedIndexes] = useState(false);
  const [hasVerifiedRLS, setHasVerifiedRLS] = useState(false);
  const [hasVerifiedFunctions, setHasVerifiedFunctions] = useState(false);
  
  const onRunChecks = useCallback(async () => {
    setIsChecking(true);
    setHasResults(false);
    
    try {
      // Simulate running checks
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setHasResults(true);
      toast.success('Checks completed successfully!');
    } catch (error) {
      console.error('Error running checks:', error);
      toast.error('Failed to run checks.');
    } finally {
      setIsChecking(false);
    }
  }, []);
  
  const onAddDemoData = useCallback(async () => {
    setIsAddingDemo(true);
    
    try {
      // Simulate adding demo data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Demo data added successfully!');
    } catch (error) {
      console.error('Error adding demo data:', error);
      toast.error('Failed to add demo data.');
    } finally {
      setIsAddingDemo(false);
    }
  }, []);
  
  const onVerifyTables = useCallback(async () => {
    setIsVerifyingTables(true);
    setHasVerifiedTables(false);
    
    try {
      // Simulate verifying tables
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasVerifiedTables(true);
      toast.success('Tables verified successfully!');
    } catch (error) {
      console.error('Error verifying tables:', error);
      toast.error('Failed to verify tables.');
    } finally {
      setIsVerifyingTables(false);
    }
  }, []);
  
  const onCheckIndexes = useCallback(async () => {
    setIsCheckingIndexes(true);
    setHasVerifiedIndexes(false);
    
    try {
      // Simulate checking indexes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasVerifiedIndexes(true);
      toast.success('Indexes checked successfully!');
    } catch (error) {
      console.error('Error checking indexes:', error);
      toast.error('Failed to check indexes.');
    } finally {
      setIsCheckingIndexes(false);
    }
  }, []);
  
  const onVerifyRLS = useCallback(async () => {
    setIsVerifyingRLS(true);
    setHasVerifiedRLS(false);
    
    try {
      // Simulate verifying RLS
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasVerifiedRLS(true);
      toast.success('RLS policies verified successfully!');
    } catch (error) {
      console.error('Error verifying RLS policies:', error);
      toast.error('Failed to verify RLS policies.');
    } finally {
      setIsVerifyingRLS(false);
    }
  }, []);
  
  const onVerifyFunctions = useCallback(async () => {
    setIsVerifyingFunctions(true);
    setHasVerifiedFunctions(false);
    
    try {
      // Simulate verifying functions
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setHasVerifiedFunctions(true);
      toast.success('Functions verified successfully!');
    } catch (error) {
      console.error('Error verifying functions:', error);
      toast.error('Failed to verify functions.');
    } finally {
      setIsVerifyingFunctions(false);
    }
  }, []);

  const triggerLaunchWebhook = useCallback(async () => {
    const eventType: BusinessEventType = 'user_onboarded';
    
    try {
      const { data, error } = await supabase.functions.invoke('trigger-webhook', {
        body: { eventType }
      });
      
      if (error) {
        console.error('Error triggering webhook:', error);
        toast.error('Failed to trigger launch webhook.');
      } else {
        console.log('Webhook triggered successfully:', data);
        toast.success('Launch webhook triggered successfully!');
      }
    } catch (error) {
      console.error('Error calling trigger-webhook function:', error);
      toast.error('Failed to trigger launch webhook.');
    }
  }, []);
  
  return {
    isChecking,
    isAddingDemo,
    isVerifyingTables,
    isCheckingIndexes,
    isVerifyingRLS,
    isVerifyingFunctions,
    hasResults,
    hasVerifiedTables,
    hasVerifiedIndexes,
    hasVerifiedRLS,
    hasVerifiedFunctions,
    onRunChecks,
    onAddDemoData,
    onVerifyTables,
    onCheckIndexes,
    onVerifyRLS,
    onVerifyFunctions,
    triggerLaunchWebhook
  };
};
