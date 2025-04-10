import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { validateLaunchReadiness } from '@/utils/launchValidator';
import { 
  validateRLSPolicies,
  validateDatabaseFunctions,
  validatePerformanceOptimization
} from '@/utils/validators';
import { CheckCircle2, AlertCircle, RefreshCw, Database, ListChecks, Shield, Zap, Lock, FileCode } from 'lucide-react';
import { addDemoDataButton } from '@/utils/demoData';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function LaunchVerification() {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<any>(null);
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
        {results && (
          <div className="space-y-3">
            {Object.entries(results).map(([key, result]: [string, any]) => {
              if (['databaseTables', 'databaseIndexes', 'rlsPolicies', 'databaseFunctions'].includes(key)) return null;
              
              return (
                <div key={key} className={`p-3 rounded-md ${result.valid ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                  <div className="flex items-start gap-2">
                    {result.valid ? 
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> : 
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    }
                    <div>
                      <p className={`font-medium ${result.valid ? 'text-green-700' : 'text-red-700'}`}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className={`text-sm ${result.valid ? 'text-green-600' : 'text-red-600'}`}>{result.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {results.databaseTables && (
              <div className="p-3 rounded-md bg-secondary/10 border border-border">
                <h3 className="font-medium mb-2">Database Tables Check</h3>
                <div className="space-y-1.5">
                  {Object.entries(results.databaseTables).map(([table, result]: [string, any]) => (
                    <div key={table} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{table}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${result.exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {result.exists ? 'Exists' : 'Missing'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {results.databaseIndexes && (
              <div className="p-3 rounded-md bg-secondary/10 border border-border">
                <h3 className="font-medium mb-2">Database Indexes Check</h3>
                <div className="space-y-1.5">
                  {results.databaseIndexes.map((index: any) => (
                    <div key={index.name} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{index.tableName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${index.exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {index.exists ? 'Indexed' : 'Not Indexed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {results.rlsPolicies && (
              <div className="p-3 rounded-md bg-secondary/10 border border-border">
                <h3 className="font-medium mb-2">RLS Policies Check</h3>
                <div className="space-y-1.5">
                  {results.rlsPolicies.map((policy: any) => (
                    <div key={policy.table} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{policy.table}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800`}>
                        {policy.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {results.databaseFunctions && (
              <div className="p-3 rounded-md bg-secondary/10 border border-border">
                <h3 className="font-medium mb-2">Database Functions Check</h3>
                <div className="space-y-1.5">
                  {results.databaseFunctions.map((func: any) => (
                    <div key={func.name} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{func.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800`}>
                        {func.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {!results && !isChecking && (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-muted-foreground mb-4 text-center">
              Run a comprehensive check to verify all systems are ready for production
            </p>
          </div>
        )}
        
        {isChecking && (
          <div className="flex flex-col items-center justify-center py-6">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Running verification checks...</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button 
          onClick={runChecks} 
          disabled={isChecking}
          className="w-full sm:w-auto"
        >
          {isChecking ? 'Checking...' : results ? 'Run Checks Again' : 'Run Pre-Launch Checks'}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleAddDemoData}
          disabled={isAddingDemo}
          className="w-full sm:w-auto"
        >
          <Database className="mr-2 h-4 w-4" />
          {isAddingDemo ? 'Adding...' : 'Add Demo Data'}
        </Button>
        
        <Button
          variant="outline"
          onClick={verifyRequiredTables}
          disabled={isVerifyingTables}
          className="w-full sm:w-auto"
        >
          <ListChecks className="mr-2 h-4 w-4" />
          {isVerifyingTables ? 'Verifying...' : 'Verify Tables'}
        </Button>
        
        <Button
          variant="outline"
          onClick={checkDatabaseIndexes}
          disabled={isCheckingIndexes}
          className="w-full sm:w-auto"
        >
          <Zap className="mr-2 h-4 w-4" />
          {isCheckingIndexes ? 'Checking...' : 'Verify Indexes'}
        </Button>
        
        <Button
          variant="outline"
          onClick={verifyRLSPolicies}
          disabled={isVerifyingRLS}
          className="w-full sm:w-auto"
        >
          <Lock className="mr-2 h-4 w-4" />
          {isVerifyingRLS ? 'Verifying...' : 'Verify RLS'}
        </Button>
        
        <Button
          variant="outline"
          onClick={verifyDatabaseFunctions}
          disabled={isVerifyingFunctions}
          className="w-full sm:w-auto"
        >
          <FileCode className="mr-2 h-4 w-4" />
          {isVerifyingFunctions ? 'Checking...' : 'Verify Functions'}
        </Button>
      </CardFooter>
    </Card>
  );
}
