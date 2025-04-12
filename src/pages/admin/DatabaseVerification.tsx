
import React, { useEffect } from 'react';
import { DatabaseVerificationDashboard } from '@/components/admin/database-verification';
import { useDatabaseVerification } from '@/hooks/admin/useDatabaseVerification';
import { AlertCircle, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Admin page for verifying database configuration.
 * Checks database tables, RLS policies, and functions.
 */
export default function DatabaseVerification() {
  const { verificationResult, verifyDatabaseConfiguration } = useDatabaseVerification();

  // Run verification automatically when page loads
  useEffect(() => {
    if (verificationResult.tables.length === 0 && 
        verificationResult.policies.length === 0 && 
        verificationResult.functions.length === 0 && 
        !verificationResult.isVerifying) {
      verifyDatabaseConfiguration();
    }
  }, [verificationResult, verifyDatabaseConfiguration]);

  const hasMissingTables = verificationResult.tables.some(t => !t.exists);
  const hasMissingFunctions = verificationResult.functions.some(f => !f.exists);
  const missingTablesCount = verificationResult.tables.filter(t => !t.exists).length;
  const missingFunctionsCount = verificationResult.functions.filter(f => !f.exists).length;

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Database Verification</h1>
          <p className="text-muted-foreground mt-1">
            Verify the configuration of your Supabase database for the application
          </p>
        </div>
        
        <div className="rounded-full bg-primary/10 p-2">
          <Database className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <DatabaseVerificationDashboard 
        result={verificationResult}
        onVerify={verifyDatabaseConfiguration}
      />
      
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-800 text-lg">Database Verification Tips</CardTitle>
          <CardDescription className="text-blue-700">
            Follow these recommendations to ensure your database is configured correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 text-blue-700 text-sm space-y-1.5">
            <li>Make sure all required tables exist and have the correct schema</li>
            <li>Verify that Row Level Security (RLS) policies are properly configured</li>
            <li>Check that database functions use SECURITY DEFINER and have proper search_path settings</li>
            <li>Ensure database indexes are set up for optimal performance</li>
            <li>If issues persist after running SQL migrations, try refreshing the browser cache</li>
          </ul>
        </CardContent>
      </Card>
      
      {hasMissingTables && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="py-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-amber-800 text-base">Missing Database Tables</CardTitle>
                <CardDescription className="text-amber-700 mt-1">
                  {missingTablesCount} required tables are missing from your database. Please check the Supabase project 
                  and ensure all required tables are created with the correct schema.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
      
      {hasMissingFunctions && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="py-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-amber-800 text-base">Missing Database Functions</CardTitle>
                <CardDescription className="text-amber-700 mt-1">
                  {missingFunctionsCount} required database functions are missing. These functions are needed for proper user management and security.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
