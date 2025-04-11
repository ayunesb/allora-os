
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DatabaseTablesCheck } from './DatabaseTablesCheck';
import { RlsPoliciesCheck } from './RlsPoliciesCheck';
import { DatabaseFunctionsCheck } from './DatabaseFunctionsCheck';
import { DatabaseVerificationResult } from './types';
import { RefreshCw, Database, Shield, Code, AlertTriangle } from 'lucide-react';

interface DatabaseVerificationDashboardProps {
  result: DatabaseVerificationResult;
  onVerify: () => Promise<void>;
}

export function DatabaseVerificationDashboard({ 
  result, 
  onVerify 
}: DatabaseVerificationDashboardProps) {
  const { tables, policies, functions, isVerifying } = result;
  
  const hasTablesData = tables && tables.length > 0;
  const hasPoliciesData = policies && policies.length > 0;
  const hasFunctionsData = functions && functions.length > 0;
  
  // Run verification automatically when component mounts
  useEffect(() => {
    if (!hasTablesData && !hasPoliciesData && !hasFunctionsData && !isVerifying) {
      onVerify();
    }
  }, [hasTablesData, hasPoliciesData, hasFunctionsData, isVerifying, onVerify]);
  
  const countIssues = () => {
    const tableMissing = tables.filter(t => !t.exists).length;
    const policiesMissing = policies.filter(p => !p.exists).length;
    const functionIssues = functions.filter(f => !f.exists || !f.isSecure).length;
    
    return tableMissing + policiesMissing + functionIssues;
  };
  
  const issueCount = hasTablesData ? countIssues() : 0;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Database Verification
          </CardTitle>
          <CardDescription>
            Check if your database has all required tables, RLS policies, and functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div>
              {(hasTablesData || hasPoliciesData || hasFunctionsData) && (
                <div className="text-sm">
                  {issueCount === 0 ? (
                    <span className="text-green-600 font-medium">All checks passed</span>
                  ) : (
                    <span className="text-amber-600 font-medium">
                      {issueCount} {issueCount === 1 ? 'issue' : 'issues'} found
                    </span>
                  )}
                </div>
              )}
            </div>
            <Button onClick={onVerify} disabled={isVerifying}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isVerifying ? 'animate-spin' : ''}`} />
              {isVerifying ? 'Verifying...' : 'Verify Database'}
            </Button>
          </div>
          
          {!hasTablesData && !hasPoliciesData && !hasFunctionsData && isVerifying && (
            <div className="py-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Checking database configuration...</p>
            </div>
          )}
          
          {!hasTablesData && !hasPoliciesData && !hasFunctionsData && !isVerifying && (
            <div className="py-8 text-center text-muted-foreground">
              Click "Verify Database" to check your database configuration
            </div>
          )}
          
          {issueCount > 0 && (
            <div className="mb-6 p-4 border border-amber-200 bg-amber-50 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Database Configuration Issues Detected</h3>
                  <p className="text-xs text-amber-700 mt-1">
                    Your Supabase database is missing required tables, policies, or functions. 
                    Please run the SQL setup script from the setup documentation to fix these issues.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            {hasTablesData && <DatabaseTablesCheck tables={tables} />}
            {hasPoliciesData && <RlsPoliciesCheck policies={policies} />}
            {hasFunctionsData && <DatabaseFunctionsCheck functions={functions} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
