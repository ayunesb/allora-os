
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Shield, Code } from 'lucide-react';
import { DatabaseTablesCheck } from './DatabaseTablesCheck';
import { RlsPoliciesCheck } from './RlsPoliciesCheck';
import { DatabaseFunctionsCheck } from './DatabaseFunctionsCheck';
import { DatabaseVerificationResult } from './types';

interface DatabaseVerificationDashboardProps {
  result: DatabaseVerificationResult;
  onVerify: () => Promise<void>;
}

export function DatabaseVerificationDashboard({ 
  result, 
  onVerify 
}: DatabaseVerificationDashboardProps) {
  const { tables, policies, functions, isVerifying } = result;
  
  const tablesValid = tables.every(table => table.exists);
  const policiesValid = policies.every(policy => policy.exists);
  const functionsValid = functions.every(func => func.exists && func.isSecure);
  
  const allValid = tablesValid && policiesValid && functionsValid;

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Database Verification
          {allValid && !isVerifying && 
            <span className="text-sm font-normal bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
              All checks passed
            </span>
          }
        </CardTitle>
        <CardDescription>
          Verify database tables, RLS policies, and function configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isVerifying ? (
          <div className="flex flex-col items-center justify-center py-6">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Verifying database configuration...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 h-auto py-3" 
                onClick={onVerify}
              >
                <Database className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">Verify All</span>
                  <span className="text-xs text-muted-foreground">Run comprehensive check</span>
                </div>
              </Button>
              
              <div className={`flex items-center justify-center gap-2 rounded-md border py-3 px-4 ${tablesValid ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
                <Database className={`h-5 w-5 ${tablesValid ? 'text-green-500' : 'text-amber-500'}`} />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{tables.length} Tables</span>
                  <span className="text-xs text-muted-foreground">
                    {tablesValid ? 'All tables exist' : 'Some tables missing'}
                  </span>
                </div>
              </div>
              
              <div className={`flex items-center justify-center gap-2 rounded-md border py-3 px-4 ${policiesValid ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
                <Shield className={`h-5 w-5 ${policiesValid ? 'text-green-500' : 'text-amber-500'}`} />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{policies.length} RLS Policies</span>
                  <span className="text-xs text-muted-foreground">
                    {policiesValid ? 'Security policies active' : 'Security policies issues'}
                  </span>
                </div>
              </div>
            </div>
            
            <DatabaseTablesCheck tables={tables} />
            <RlsPoliciesCheck policies={policies} />
            <DatabaseFunctionsCheck functions={functions} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
