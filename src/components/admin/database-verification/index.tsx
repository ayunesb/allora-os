
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { validateDatabaseSecurity } from '@/utils/validators/databaseValidator';
import { validateRLSPolicies } from '@/utils/validators/rlsValidator';
import { DatabaseTableStatus, PolicyStatus, FunctionStatus } from '@/types/databaseVerification';

interface DatabaseVerificationDashboardProps {
  result: {
    tables: DatabaseTableStatus[];
    policies: PolicyStatus[];
    functions: FunctionStatus[];
    isVerifying: boolean;
  };
  onVerify: () => void;
}

export function DatabaseVerificationDashboard({
  result,
  onVerify
}: DatabaseVerificationDashboardProps) {
  const { tables, policies, functions, isVerifying } = result;
  
  const getTablesWithIssues = () => {
    return tables.filter(table => table.status !== 'success');
  };
  
  const getPoliciesWithIssues = () => {
    return policies.filter(policy => policy.status !== 'success');
  };
  
  const getFunctionsWithIssues = () => {
    return functions.filter(func => func.status !== 'success');
  };
  
  const hasIssues = 
    getTablesWithIssues().length > 0 || 
    getPoliciesWithIssues().length > 0 || 
    getFunctionsWithIssues().length > 0;
    
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Database Configuration Verification</h3>
        <Button 
          onClick={onVerify} 
          disabled={isVerifying}
          variant="outline"
          className="gap-2"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Database Configuration'
          )}
        </Button>
      </div>
      
      {(tables.length > 0 || policies.length > 0 || functions.length > 0) && (
        <Tabs defaultValue="issues" className="w-full">
          <TabsList>
            <TabsTrigger value="issues">
              Issues {hasIssues ? `(${getTablesWithIssues().length + getPoliciesWithIssues().length + getFunctionsWithIssues().length})` : ''}
            </TabsTrigger>
            <TabsTrigger value="tables">Tables ({tables.length})</TabsTrigger>
            <TabsTrigger value="policies">Policies ({policies.length})</TabsTrigger>
            <TabsTrigger value="functions">Functions ({functions.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="issues" className="space-y-4 mt-4">
            {!hasIssues ? (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>No Issues Found</AlertTitle>
                <AlertDescription>Your database configuration appears to be secure.</AlertDescription>
              </Alert>
            ) : (
              <>
                {getTablesWithIssues().length > 0 && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Table Issues</h4>
                    <div className="space-y-2">
                      {getTablesWithIssues().map((table, index) => (
                        <Alert key={index} variant={table.status === 'warning' ? 'default' : 'destructive'}>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>{table.name}</AlertTitle>
                          <AlertDescription>{table.message}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </Card>
                )}
                
                {getPoliciesWithIssues().length > 0 && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Policy Issues</h4>
                    <div className="space-y-2">
                      {getPoliciesWithIssues().map((policy, index) => (
                        <Alert key={index} variant={policy.status === 'warning' ? 'default' : 'destructive'}>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>{policy.table}: {policy.name}</AlertTitle>
                          <AlertDescription>{policy.message}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </Card>
                )}
                
                {getFunctionsWithIssues().length > 0 && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Function Issues</h4>
                    <div className="space-y-2">
                      {getFunctionsWithIssues().map((func, index) => (
                        <Alert key={index} variant={func.status === 'warning' ? 'default' : 'destructive'}>
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>{func.name}</AlertTitle>
                          <AlertDescription>{func.message}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
          
          {/* Table details tab */}
          <TabsContent value="tables" className="space-y-4 mt-4">
            {tables.map((table, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{table.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    table.status === 'success' ? 'bg-green-100 text-green-800' : 
                    table.status === 'warning' ? 'bg-amber-100 text-amber-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {table.status === 'success' ? 'Secure' : 
                     table.status === 'warning' ? 'Warning' : 'Error'}
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {table.message}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">RLS:</span>
                    <span className={table.hasRLS ? 'text-green-600' : 'text-red-600'}>
                      {table.hasRLS ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          {/* Policies tab */}
          <TabsContent value="policies" className="space-y-4 mt-4">
            {policies.map((policy, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{policy.name}</h4>
                    <div className="text-sm text-muted-foreground">Table: {policy.table}</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    policy.status === 'success' ? 'bg-green-100 text-green-800' : 
                    policy.status === 'warning' ? 'bg-amber-100 text-amber-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {policy.status === 'success' ? 'Secure' : 
                     policy.status === 'warning' ? 'Warning' : 'Error'}
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {policy.message}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium mr-2">Security Status:</span>
                  <span className={policy.isSecure ? 'text-green-600' : 'text-red-600'}>
                    {policy.isSecure ? 'Secure' : 'Vulnerable'}
                  </span>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          {/* Functions tab */}
          <TabsContent value="functions" className="space-y-4 mt-4">
            {functions.map((func, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{func.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    func.status === 'success' ? 'bg-green-100 text-green-800' : 
                    func.status === 'warning' ? 'bg-amber-100 text-amber-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {func.status === 'success' ? 'Secure' : 
                     func.status === 'warning' ? 'Warning' : 'Error'}
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {func.message}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium mr-2">Security Definer:</span>
                  <span className={func.isSecure ? 'text-green-600' : 'text-yellow-600'}>
                    {func.isSecure ? 'Yes (Secure)' : 'No (Review Needed)'}
                  </span>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}
      
      {tables.length === 0 && policies.length === 0 && functions.length === 0 && !isVerifying && (
        <Card className="p-6 text-center">
          <div className="mb-4">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Verification Results</h3>
          <p className="text-muted-foreground mb-4">
            Click the verify button above to check your database configuration.
          </p>
          <Button onClick={onVerify}>Verify Now</Button>
        </Card>
      )}
    </div>
  );
}
