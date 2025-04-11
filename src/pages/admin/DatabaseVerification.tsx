
import React from 'react';
import { DatabaseVerificationDashboard } from '@/components/admin/database-verification';
import { useDatabaseVerification } from '@/hooks/admin/useDatabaseVerification';
import { AlertCircle } from 'lucide-react';

export default function DatabaseVerification() {
  const { verificationResult, verifyDatabaseConfiguration } = useDatabaseVerification();

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
      
      {verificationResult.isVerifying === false && verificationResult.tables.length === 0 && (
        <div className="p-4 rounded-md border border-amber-200 bg-amber-50">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
            <div>
              <h3 className="font-medium text-amber-800">Not yet verified</h3>
              <p className="text-amber-700 text-sm mt-1">
                Click "Verify Database" to check your database configuration
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">Database Verification Tips</h3>
        <ul className="list-disc pl-5 text-blue-700 text-sm space-y-1">
          <li>Make sure all required tables exist and have the correct schema</li>
          <li>Verify that Row Level Security (RLS) policies are properly configured</li>
          <li>Check that database functions use SECURITY DEFINER and have proper search_path settings</li>
          <li>Ensure database indexes are set up for optimal performance</li>
        </ul>
      </div>
    </div>
  );
}
