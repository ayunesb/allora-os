
import React, { useEffect } from 'react';
import { DatabaseVerificationDashboard } from '@/components/admin/database-verification';
import { useDatabaseVerification } from '@/hooks/admin/useDatabaseVerification';
import { AlertCircle } from 'lucide-react';

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

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Database Verification</h1>
        <p className="text-muted-foreground mt-1">
          Verify the configuration of your Supabase database for the application
        </p>
      </div>
      
      <DatabaseVerificationDashboard 
        result={verificationResult}
        onVerify={verifyDatabaseConfiguration}
      />
      
      <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">Database Verification Tips</h3>
        <ul className="list-disc pl-5 text-blue-700 text-sm space-y-1">
          <li>Make sure all required tables exist and have the correct schema</li>
          <li>Verify that Row Level Security (RLS) policies are properly configured</li>
          <li>Check that database functions use SECURITY DEFINER and have proper search_path settings</li>
          <li>Ensure database indexes are set up for optimal performance</li>
          <li>If issues persist after running SQL migrations, try refreshing the browser cache</li>
        </ul>
      </div>
      
      {verificationResult.tables.some(t => !t.exists) && (
        <div className="p-4 rounded-md bg-amber-50 border border-amber-200">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Missing Database Tables</h3>
              <p className="text-amber-700 text-sm mt-1">
                Some required tables are missing from your database. Please check the Supabase project 
                and ensure all required tables are created with the correct schema.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
