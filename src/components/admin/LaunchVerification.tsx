
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { validateLaunchReadiness } from '@/utils/launchValidator';
import { 
  validateRLSPolicies,
  validateDatabaseFunctions,
  validatePerformanceOptimization
} from '@/utils/validators';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { addDemoDataButton } from '@/utils/demoData';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { VerificationContent, VerificationActions } from './launch-verification';
import type { ValidationResultsUI } from './launch-verification/types';

export default function LaunchVerification() {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<ValidationResultsUI | null>(null);
  const [isReady, setIsReady] = useState<boolean | null>(null);
  const [isAddingDemo, setIsAddingDemo] = useState(false);
  const [isVerifyingTables, setIsVerifyingTables] = useState(false);
  const [isCheckingIndexes, setIsCheckingIndexes] = useState(false);
  const [isVerifyingRLS, setIsVerifyingRLS] = useState(false);
  const [isVerifyingFunctions, setIsVerifyingFunctions] = useState(false);
  const { profile } = useAuth();
  
  const runChecks = async () => {
    setIsChecking(true);
    try {
      const validation = await validateLaunchReadiness();
      setResults(validation.results);
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
      await addDemoDataButton(profile?.company_id);
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
    
    const tableResults: Record<string, { exists: boolean, message: string }> = {};
    
    try {
      for (const table of requiredTables) {
        try {
          const { error } = await supabase
            .from(table)
            .select('id')
            .limit(1);
            
          if (error) {
            if (error.code === '42P01') {
              tableResults[table] = {
                exists: false,
                message: `Table '${table}' does not exist in the database`
              };
            } else {
              tableResults[table] = {
                exists: false,
                message: `Error checking table '${table}': ${error.message}`
              };
            }
          } else {
            tableResults[table] = {
              exists: true,
              message: `Table '${table}' exists and is accessible`
            };
          }
        } catch (err: any) {
          tableResults[table] = {
            exists: false,
            message: `Error checking table '${table}': ${err.message}`
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
      
      setResults(prev => ({
        ...prev,
        databaseTables: tableResults
      }));
      
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
      
      const formattedResults = {
        name: 'Performance Optimization',
        status: indexResults.valid ? 'verified' : 'issues',
        message: indexResults.message
      };
      
      setResults(prev => ({
        ...prev,
        databaseIndexes: [formattedResults]
      }));
      
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
      
      const formattedResults = {
        table: 'All tables',
        status: rlsResults.valid ? 'verified' : 'issues',
        message: rlsResults.message
      };
      
      setResults(prev => ({
        ...prev,
        rlsPolicies: [formattedResults]
      }));
      
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
      
      const formattedResults = {
        name: 'Database Functions',
        status: functionResults.valid ? 'verified' : 'issues',
        message: functionResults.message
      };
      
      setResults(prev => ({
        ...prev,
        databaseFunctions: [formattedResults]
      }));
      
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
  
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Launch Readiness Verification
          {isReady === true && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          {isReady === false && <AlertCircle className="h-5 w-5 text-red-500" />}
        </CardTitle>
        <CardDescription>
          Verify that all critical systems are working correctly before launch
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerificationContent 
          results={results} 
          isChecking={isChecking} 
        />
      </CardContent>
      <CardFooter>
        <VerificationActions 
          isChecking={isChecking}
          isAddingDemo={isAddingDemo}
          isVerifyingTables={isVerifyingTables}
          isCheckingIndexes={isCheckingIndexes}
          isVerifyingRLS={isVerifyingRLS}
          isVerifyingFunctions={isVerifyingFunctions}
          onRunChecks={runChecks}
          onAddDemoData={handleAddDemoData}
          onVerifyTables={verifyRequiredTables}
          onCheckIndexes={checkDatabaseIndexes}
          onVerifyRLS={verifyRLSPolicies}
          onVerifyFunctions={verifyDatabaseFunctions}
          hasResults={results !== null}
        />
      </CardFooter>
    </Card>
  );
}
