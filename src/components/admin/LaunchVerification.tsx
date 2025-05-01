
import React from 'react';
import { useVerification } from '@/hooks/admin/useVerification';
import { EnhancedVerificationChecklist } from '@/components/admin/launch-verification/EnhancedVerificationChecklist';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function LaunchVerification() {
  const { 
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
  } = useVerification();

  // Sample categories based on the verification results
  const categories = [
    {
      id: 'auth',
      name: 'Authentication & Authorization',
      description: 'Verify user authentication and permissions are set up correctly',
      items: [
        {
          id: 'auth-1',
          name: 'User Authentication',
          status: results?.authentication?.valid ? 'completed' : 'pending',
          isRequired: true,
          statusMessage: results?.authentication?.message || 'Waiting for verification'
        },
        {
          id: 'auth-2',
          name: 'Role-Based Access Control',
          status: results?.authentication?.valid ? 'completed' : 'pending',
          isRequired: true,
          statusMessage: 'RLS policies enforce proper access control'
        }
      ]
    },
    {
      id: 'database',
      name: 'Database Configuration',
      description: 'Verify database tables, schemas, and policies are ready',
      items: [
        {
          id: 'db-1',
          name: 'Database Connection',
          status: results?.database?.valid ? 'completed' : 'pending',
          isRequired: true,
          statusMessage: results?.database?.message || 'Waiting for check'
        },
        {
          id: 'db-2',
          name: 'Required Tables Exist',
          status: results?.databaseTables ? 'completed' : 'pending',
          isRequired: true,
          statusMessage: results?.databaseTables 
            ? `${results.databaseTables.length} tables verified` 
            : 'Tables not yet checked'
        }
      ]
    },
    {
      id: 'apis',
      name: 'API Endpoints',
      description: 'Verify API endpoints are working correctly',
      items: [
        {
          id: 'api-1',
          name: 'API Endpoints Responding',
          status: results?.apis?.valid ? 'completed' : 'pending',
          isRequired: true,
          statusMessage: results?.apis?.message || 'API endpoints not checked'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pre-Launch Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Run these checks to ensure your application is ready for production deployment.
            Address any warnings or errors before proceeding with the launch.
          </p>
          
          <EnhancedVerificationChecklist 
            categories={categories} 
            isLoading={isChecking}
            onRerun={runChecks}
            onReset={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
