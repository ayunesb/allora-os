
import React, { useEffect, useState } from 'react';
import { DatabaseVerificationDashboard } from '@/components/admin/database-verification';
import { useDatabaseVerification } from '@/hooks/admin/useDatabaseVerification';
import { AlertCircle, Database, RefreshCw, ShieldAlert, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { checkSupabaseConnection } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Admin page for verifying database configuration.
 * Checks database tables, RLS policies, and functions.
 */
export default function DatabaseVerification() {
  const { verificationResult, verifyDatabaseConfiguration } = useDatabaseVerification();
  const [connectionStatus, setConnectionStatus] = useState<{
    checking: boolean;
    connected: boolean;
    authenticated: boolean;
    error?: any;
  }>({
    checking: false,
    connected: false,
    authenticated: false
  });

  // Check Supabase connection when page loads
  useEffect(() => {
    const checkConnection = async () => {
      setConnectionStatus(prev => ({ ...prev, checking: true }));
      try {
        console.log("Initiating connection check");
        const result = await checkSupabaseConnection();
        console.log("Connection check result:", result);
        
        setConnectionStatus({
          checking: false,
          connected: result.connected,
          authenticated: result.authenticated,
          error: result.error
        });
        
        // If connected and authenticated, run verification
        if (result.connected && result.authenticated) {
          console.log("Connected and authenticated, running verification...");
          if (verificationResult.tables.length === 0 && 
              verificationResult.policies.length === 0 && 
              verificationResult.functions.length === 0 && 
              !verificationResult.isVerifying) {
            verifyDatabaseConfiguration();
          }
        } else if (!result.authenticated) {
          toast.error("Authentication required", {
            description: "Please log in to verify database configuration"
          });
        } else if (!result.connected) {
          toast.error("Database connection failed", {
            description: result.error?.message || "Could not connect to Supabase"
          });
        }
      } catch (error) {
        console.error("Error checking connection:", error);
        setConnectionStatus({
          checking: false,
          connected: false,
          authenticated: false,
          error
        });
        
        toast.error("Connection check failed", {
          description: error instanceof Error ? error.message : "Unknown error"
        });
      }
    };
    
    checkConnection();
  }, []);

  // Run verification automatically when user becomes authenticated
  useEffect(() => {
    if (connectionStatus.authenticated && 
        connectionStatus.connected && 
        verificationResult.tables.length === 0 && 
        verificationResult.policies.length === 0 && 
        verificationResult.functions.length === 0 && 
        !verificationResult.isVerifying) {
      verifyDatabaseConfiguration();
    }
  }, [connectionStatus.authenticated, connectionStatus.connected, verificationResult, verifyDatabaseConfiguration]);

  const hasMissingTables = verificationResult.tables.some(t => !t.exists);
  const hasMissingPolicies = verificationResult.policies.some(p => !p.exists);
  const hasMissingFunctions = verificationResult.functions.some(f => !f.exists);
  
  const missingTablesCount = verificationResult.tables.filter(t => !t.exists).length;
  const missingPoliciesCount = verificationResult.policies.filter(p => !p.exists).length;
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
      
      {/* Connection Status Card */}
      <Card className={`border-${connectionStatus.connected ? 'green' : 'red'}-200 ${connectionStatus.connected ? 'bg-green-50' : 'bg-red-50'}`}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-${connectionStatus.connected ? 'green' : 'red'}-800 text-lg flex items-center gap-2`}>
            {connectionStatus.checking ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : connectionStatus.connected ? (
              <Database className="h-5 w-5 text-green-500" />
            ) : (
              <ShieldAlert className="h-5 w-5 text-red-500" />
            )}
            Database Connection Status
          </CardTitle>
          <CardDescription className={`text-${connectionStatus.connected ? 'green' : 'red'}-700`}>
            {connectionStatus.checking
              ? "Checking database connection..."
              : connectionStatus.connected
                ? `Connected to Supabase database ${connectionStatus.authenticated ? 'and authenticated' : 'but not authenticated'}`
                : "Database connection issue detected"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          {!connectionStatus.checking && !connectionStatus.connected && (
            <div className="rounded-md bg-red-100 p-3 mb-3">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <p className="text-red-700 font-medium">Connection Error</p>
                  <p className="text-red-600">
                    {connectionStatus.error?.message || "Could not connect to the Supabase database. Please check your configuration."}
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-red-600 text-xs">
                    <li>Make sure you are logged in to your Supabase account</li>
                    <li>Check that your API keys are correctly configured</li>
                    <li>Verify your network connection is stable</li>
                    <li>Ensure the Supabase project is up and running</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {!connectionStatus.checking && connectionStatus.connected && !connectionStatus.authenticated && (
            <div className="rounded-md bg-amber-100 p-3 mb-3">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                <div>
                  <p className="text-amber-700 font-medium">Authentication Required</p>
                  <p className="text-amber-600">
                    Connected to database but not authenticated. Please log in to access database verification features.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {!connectionStatus.checking && !verificationResult.isVerifying && verificationResult.tables.length === 0 && 
           verificationResult.policies.length === 0 && verificationResult.functions.length === 0 && (
            <div className="rounded-md bg-blue-100 p-3 mb-3">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="text-blue-700 font-medium">No Verification Data</p>
                  <p className="text-blue-600">
                    No database verification data was returned. This could be due to connection issues or authentication problems.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <Button 
            size="sm" 
            onClick={async () => {
              setConnectionStatus(prev => ({ ...prev, checking: true }));
              try {
                const result = await checkSupabaseConnection();
                setConnectionStatus({
                  checking: false,
                  connected: result.connected,
                  authenticated: result.authenticated,
                  error: result.error
                });
                
                if (result.connected && result.authenticated) {
                  toast.success("Connection verified successfully");
                  verifyDatabaseConfiguration();
                }
              } catch (error) {
                setConnectionStatus({
                  checking: false,
                  connected: false,
                  authenticated: false,
                  error
                });
              }
            }}
            disabled={connectionStatus.checking}
            variant={connectionStatus.connected ? "outline" : "default"}
          >
            {connectionStatus.checking ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Recheck Connection
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <DatabaseVerificationDashboard 
        result={verificationResult}
        onVerify={verifyDatabaseConfiguration}
      />
      
      {/* Quick Action Card for Missing Tables */}
      {hasMissingTables && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="py-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-amber-800 text-base">Missing Database Tables</CardTitle>
                <CardDescription className="text-amber-700 mt-1">
                  {missingTablesCount} required {missingTablesCount === 1 ? 'table is' : 'tables are'} missing from your database. 
                  Please check the Supabase project and ensure all required tables are created with the correct schema.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
      
      {/* Quick Action Card for Missing RLS Policies */}
      {hasMissingPolicies && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="py-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-amber-800 text-base">Missing RLS Policies</CardTitle>
                <CardDescription className="text-amber-700 mt-1">
                  {missingPoliciesCount} {missingPoliciesCount === 1 ? 'table has' : 'tables have'} missing or disabled Row Level Security policies.
                  RLS is crucial for securing your database and ensuring users can only access their own data.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
      
      {/* Quick Action Card for Missing Functions */}
      {hasMissingFunctions && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="py-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <CardTitle className="text-amber-800 text-base">Missing Database Functions</CardTitle>
                <CardDescription className="text-amber-700 mt-1">
                  {missingFunctionsCount} required database {missingFunctionsCount === 1 ? 'function is' : 'functions are'} missing. 
                  These functions are needed for proper user management and security.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
      
      {/* Tips Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-800 text-lg">Database Verification Tips</CardTitle>
          <CardDescription className="text-blue-700">
            Follow these recommendations to ensure your database is configured correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 text-blue-700 text-sm space-y-1.5">
            <li>Make sure you are logged in with Supabase authentication</li>
            <li>Verify that all required tables exist and have the correct schema</li>
            <li>Ensure that Row Level Security (RLS) policies are properly configured</li>
            <li>Check that database functions use SECURITY DEFINER and have proper search_path settings</li>
            <li>Ensure database indexes are set up for optimal performance</li>
            <li>If issues persist after running SQL migrations, try refreshing the browser cache</li>
            <li>Check your network connection if you're having connectivity issues</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
