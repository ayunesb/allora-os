
import React from 'react';
import { useVerification } from '@/hooks/admin/useVerification';
import { EnhancedVerificationChecklist } from '@/components/admin/launch-verification/EnhancedVerificationChecklist';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { ChecklistCategory, ChecklistItemStatus, ChecklistItem as ChecklistItemType } from './launch-verification/types';

export function LaunchVerification() {
  const { validation, error, runVerification } = useVerification();
  const { user } = useAuth();

  const handleRunChecks = async () => {
    await runVerification();
  };

  // Convert validation results to checklist categories
  const mapValidationToCategories = (): ChecklistCategory[] => {
    const { results } = validation;
    if (!results) return [];

    const categories: ChecklistCategory[] = [
      {
        id: 'auth',
        name: 'Authentication & Authorization',
        description: 'Verify user authentication and permissions are set up correctly',
        items: [
          {
            id: 'auth-1',
            name: 'User Authentication',
            status: mapStatus(results.authentication?.valid),
            isRequired: true,
            statusMessage: results.authentication?.message || 'Waiting for verification'
          },
          {
            id: 'auth-2',
            name: 'Role-Based Access Control',
            status: mapStatus(results.authentication?.valid),
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
            status: mapStatus(results.database?.valid),
            isRequired: true,
            statusMessage: results.database?.message || 'Waiting for check'
          },
          {
            id: 'db-2',
            name: 'Required Tables Exist',
            status: results.databaseTables ? 'completed' : 'pending',
            isRequired: true,
            statusMessage: results.databaseTables 
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
            status: mapStatus(results.apis?.valid),
            isRequired: true,
            statusMessage: results.apis?.message || 'API endpoints not checked'
          }
        ]
      }
    ];

    // Add database tables as individual checklist items if available
    if (results.databaseTables && results.databaseTables.length > 0) {
      const tableItems: ChecklistItemType[] = results.databaseTables.map(table => ({
        id: `table-${table.name}`,
        name: `Table: ${table.name}`,
        status: mapTableStatus(table.status),
        isRequired: true,
        statusMessage: table.message
      }));

      categories.push({
        id: 'tables',
        name: 'Database Tables',
        description: 'Verify all required database tables exist and have RLS enabled',
        items: tableItems
      });
    }

    return categories;
  };

  // Map validation status to checklist item status
  const mapStatus = (valid?: boolean): ChecklistItemStatus => {
    if (valid === undefined) return 'pending';
    return valid ? 'completed' : 'error';
  };

  // Map table status to checklist item status
  const mapTableStatus = (status?: 'success' | 'warning' | 'error'): ChecklistItemStatus => {
    if (!status) return 'pending';
    switch (status) {
      case 'success': return 'completed';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'pending';
    }
  };

  const categories = mapValidationToCategories();

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Pre-Launch Verification</CardTitle>
          <Button onClick={handleRunChecks} disabled={validation.loading}>
            {validation.loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Running Checks...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Verification
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Run these checks to ensure your application is ready for production deployment.
            Address any warnings or errors before proceeding with the launch.
          </p>
          
          <EnhancedVerificationChecklist 
            categories={categories}
            isLoading={validation.loading}
            onRerun={runVerification}
            onReset={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
}
