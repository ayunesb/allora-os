
import React, { useEffect } from 'react';
import { DatabaseVerificationDashboard } from '@/components/admin/database-verification';
import { useDatabaseVerification } from '@/hooks/admin/useDatabaseVerification';
import { AlertCircle, Database, RefreshCw, ShieldAlert, Info, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

/**
 * Admin page for verifying database configuration.
 * Checks database tables, RLS policies, and functions.
 */
export default function DatabaseVerification() {
  const { verificationResult, connectionStatus, verifyDatabaseConfiguration } = useDatabaseVerification();
  const { user, profile } = useAuth();
  
  const isAdmin = profile?.role === 'admin';
  const isLoadingAuth = !user && !profile;
  
  // Check for issues
  const hasMissingTables = verificationResult.tables.some(t => !t.exists);
  const hasMissingPolicies = verificationResult.policies.some(p => !p.exists);
  const hasMissingFunctions = verificationResult.functions.some(f => !f.exists);
  
  const missingTablesCount = verificationResult.tables.filter(t => !t.exists).length;
  const missingPoliciesCount = verificationResult.policies.filter(p => !p.exists).length;
  const missingFunctionsCount = verificationResult.functions.filter(f => !f.exists).length;
  
  // Is there any data to show?
  const hasVerificationData = verificationResult.tables.length > 0 || 
                             verificationResult.policies.length > 0 || 
                             verificationResult.functions.length > 0;

  // Effect to run verification when user becomes authenticated as admin
  useEffect(() => {
    if (user && isAdmin && connectionStatus.checked && connectionStatus.connected && 
        !verificationResult.isVerifying && !hasVerificationData) {
      console.log("User is authenticated as admin, running verification...");
      verifyDatabaseConfiguration();
    }
  }, [user, isAdmin, connectionStatus.checked, connectionStatus.connected, verifyDatabaseConfiguration]);

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
      
      {/* Authentication Status Card */}
      {!user && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
              <LogIn className="h-5 w-5 text-amber-500" />
              Authentication Required
            </CardTitle>
            <CardDescription className="text-amber-700">
              You need to be logged in as an admin to use the database verification features
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Admin Check Card */}
      {user && !isAdmin && !isLoadingAuth && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              Admin Access Required
            </CardTitle>
            <CardDescription className="text-amber-700">
              Database verification requires admin privileges
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link to="/dev-admin-helper">Get Admin Access</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Connection Status Card */}
      <Card className={`border-${connectionStatus.connected ? 'green' : 'red'}-200 ${connectionStatus.connected ? 'bg-green-50' : 'bg-red-50'}`}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-${connectionStatus.connected ? 'green' : 'red'}-800 text-lg flex items-center gap-2`}>
            {!connectionStatus.checked ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : connectionStatus.connected ? (
              <Database className="h-5 w-5 text-green-500" />
            ) : (
              <ShieldAlert className="h-5 w-5 text-red-500" />
            )}
            Database Connection Status
          </CardTitle>
          <CardDescription className={`text-${connectionStatus.connected ? 'green' : 'red'}-700`}>
            {!connectionStatus.checked
              ? "Checking database connection..."
              : connectionStatus.connected
                ? `Connected to Supabase database ${connectionStatus.authenticated ? 'and authenticated' : 'but not authenticated'}`
                : "Database connection issue detected"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          {connectionStatus.checked && !connectionStatus.connected && (
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
          
          {connectionStatus.checked && connectionStatus.connected && !connectionStatus.authenticated && (
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
          
          {connectionStatus.accessError && (
            <div className="rounded-md bg-amber-100 p-3 mb-3">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                <div>
                  <p className="text-amber-700 font-medium">Access Denied</p>
                  <p className="text-amber-600">
                    {connectionStatus.accessError}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {connectionStatus.checked && !verificationResult.isVerifying && !hasVerificationData && (
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
              try {
                // Force a complete refresh of connection and verification
                window.location.reload();
              } catch (error) {
                console.error("Error during page refresh:", error);
              }
            }}
            disabled={!connectionStatus.checked}
            variant={connectionStatus.connected ? "outline" : "default"}
          >
            {!connectionStatus.checked ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Page
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <DatabaseVerificationDashboard 
        result={verificationResult}
        onVerify={verifyDatabaseConfiguration}
      />
      
      {/* Debugging Information Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-800 text-lg">Database Verification Debug Info</CardTitle>
          <CardDescription className="text-blue-700">
            If you're experiencing issues, the following information might be helpful
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-blue-700">
            <div>
              <span className="font-semibold">Connection Status:</span> 
              {!connectionStatus.checked ? " Checking..." : connectionStatus.connected ? " Connected" : " Not connected"}
            </div>
            <div>
              <span className="font-semibold">Authentication Status:</span> 
              {!connectionStatus.checked ? " Checking..." : connectionStatus.authenticated ? " Authenticated" : " Not authenticated"}
            </div>
            <div>
              <span className="font-semibold">User:</span> {user ? user.email : "Not logged in"}
            </div>
            <div>
              <span className="font-semibold">Role:</span> {profile?.role || "Not loaded"}
            </div>
            <div>
              <span className="font-semibold">Verification Status:</span> 
              {verificationResult.isVerifying ? " Running verification..." : hasVerificationData ? " Data received" : " No data returned"}
            </div>
            <div>
              <span className="font-semibold">Data Counts:</span> 
              Tables: {verificationResult.tables.length}, 
              Policies: {verificationResult.policies.length}, 
              Functions: {verificationResult.functions.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
