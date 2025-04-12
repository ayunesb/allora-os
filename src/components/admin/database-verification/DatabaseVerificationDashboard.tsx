
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DatabaseTablesCheck } from './DatabaseTablesCheck';
import { RlsPoliciesCheck } from './RlsPoliciesCheck';
import { DatabaseFunctionsCheck } from './DatabaseFunctionsCheck';
import { DatabaseVerificationResult } from '@/types/databaseVerification';
import { RefreshCw, Database, Shield, Code, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, checkSupabaseConnection } from '@/integrations/supabase/client';
import { checkVerificationAccess } from '@/utils/admin/database-verification';

interface DatabaseVerificationDashboardProps {
  result: DatabaseVerificationResult;
  onVerify: () => Promise<void>;
}

export function DatabaseVerificationDashboard({ 
  result, 
  onVerify 
}: DatabaseVerificationDashboardProps) {
  const { tables, policies, functions, isVerifying } = result;
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<{
    isChecking: boolean;
    isAuthenticated: boolean;
    hasAdminAccess: boolean;
    error: string | null;
  }>({
    isChecking: true,
    isAuthenticated: false,
    hasAdminAccess: false,
    error: null
  });
  const [lastVerifiedAt, setLastVerifiedAt] = useState<Date | null>(null);
  
  const hasTablesData = tables && tables.length > 0;
  const hasPoliciesData = policies && policies.length > 0;
  const hasFunctionsData = functions && functions.length > 0;
  
  // Check auth status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      setAuthStatus(prev => ({ ...prev, isChecking: true }));
      
      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setAuthStatus({
            isChecking: false,
            isAuthenticated: false,
            hasAdminAccess: false,
            error: 'Not authenticated. Please sign in to verify database.'
          });
          return;
        }
        
        // Check if user has admin access
        const access = await checkVerificationAccess();
        
        setAuthStatus({
          isChecking: false,
          isAuthenticated: true,
          hasAdminAccess: access.canAccess,
          error: !access.canAccess ? access.message : null
        });
      } catch (err) {
        console.error('Error checking authentication status:', err);
        setAuthStatus({
          isChecking: false,
          isAuthenticated: false,
          hasAdminAccess: false,
          error: 'Error checking authentication status'
        });
      }
    };
    
    checkAuth();
  }, []);
  
  // Calculate ready state based on verification results
  const calculateIsReady = () => {
    if (!hasTablesData || !hasPoliciesData || !hasFunctionsData) return null;
    
    const missingTables = tables.some(t => !t.exists);
    const missingPolicies = policies.some(p => !p.exists);
    const missingFunctions = functions.some(f => !f.exists || !f.isSecure);
    
    return !missingTables && !missingPolicies && !missingFunctions;
  };
  
  const isReady = calculateIsReady();
  
  // Run verification automatically when component mounts if no data and user is authenticated with admin access
  useEffect(() => {
    if (!hasTablesData && !hasPoliciesData && !hasFunctionsData && !isVerifying && 
        !authStatus.isChecking && authStatus.isAuthenticated && authStatus.hasAdminAccess) {
      console.log("No verification data available and user has access, running verification automatically");
      checkConnection();
    }
  }, [hasTablesData, hasPoliciesData, hasFunctionsData, isVerifying, authStatus]);
  
  const countIssues = () => {
    const tableMissing = (tables || []).filter(t => !t.exists).length;
    const policiesMissing = (policies || []).filter(p => !p.exists).length;
    const functionIssues = (functions || []).filter(f => !f.exists || !f.isSecure).length;
    
    return tableMissing + policiesMissing + functionIssues;
  };
  
  const issueCount = hasTablesData ? countIssues() : 0;
  
  // Check database connection issue indicators
  const getConnectionStatus = () => {
    if (authStatus.error) return "error";
    if (connectionError) return "error";
    if (!hasTablesData && !isVerifying && !isCheckingConnection) return "unknown";
    if (issueCount === 0 && hasTablesData) return "success";
    return "warning";
  };
  
  const connectionStatus = getConnectionStatus();
  
  // Helper to print debug info about the result
  const printDebugInfo = () => {
    console.log("Database verification result:", {
      hasTablesData,
      hasPoliciesData,
      hasFunctionsData,
      isVerifying,
      tablesCount: tables?.length || 0,
      policiesCount: policies?.length || 0,
      functionsCount: functions?.length || 0,
      issues: issueCount,
      auth: authStatus
    });
  };
  
  // Call printDebugInfo on component mount and when the data changes
  useEffect(() => {
    printDebugInfo();
  }, [tables, policies, functions, isVerifying, authStatus]);
  
  // Check Supabase connection before verification
  const checkConnection = async () => {
    setIsCheckingConnection(true);
    setConnectionError(null);
    
    // First check authentication and permissions
    if (!authStatus.isAuthenticated) {
      setConnectionError("You must be logged in to verify the database");
      setIsCheckingConnection(false);
      toast.error("Authentication required", {
        description: "Please sign in to verify database configuration"
      });
      return false;
    }
    
    if (!authStatus.hasAdminAccess) {
      setConnectionError(authStatus.error || "Admin access required");
      setIsCheckingConnection(false);
      toast.error("Access denied", {
        description: authStatus.error || "Admin role required for database verification"
      });
      return false;
    }
    
    try {
      // Improved connection check using the checkSupabaseConnection helper
      const status = await checkSupabaseConnection();
      
      if (!status.connected) {
        console.error("Database connection failed:", status.error);
        setConnectionError(status.error?.message || "Could not connect to database");
        
        if (status.error?.code === 'PGRST301' || status.error?.message?.includes('JWT')) {
          toast.error("Authentication issue detected", {
            description: "Your session might have expired. Please try logging in again."
          });
        } else {
          toast.error("Database connection failed", {
            description: status.error?.message || "Could not connect to database"
          });
        }
        
        setIsCheckingConnection(false);
        return false;
      }
      
      // If connection was successful, run the verification
      setIsCheckingConnection(false);
      await onVerify();
      setLastVerifiedAt(new Date());
      return true;
    } catch (err: any) {
      console.error("Connection check error:", err);
      setConnectionError(err.message || "Unknown connection error");
      toast.error("Connection check failed", {
        description: err.message || "Unknown error"
      });
      setIsCheckingConnection(false);
      return false;
    }
  };
  
  const handleVerifyClick = async () => {
    await checkConnection();
  };
  
  // Show connection/auth errors prominently
  const getErrorMessage = () => {
    if (authStatus.error) {
      return {
        title: "Authentication Issue",
        message: authStatus.error
      };
    }
    
    if (connectionError) {
      return {
        title: "Connection Error",
        message: connectionError
      };
    }
    
    return null;
  };
  
  const errorInfo = getErrorMessage();
  
  return (
    <div className="space-y-6">
      <Card className={`border-${connectionStatus === "success" ? "green" : connectionStatus === "error" ? "red" : connectionStatus === "warning" ? "amber" : "border"}/50 shadow-sm`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Database Verification
              {issueCount === 0 && hasTablesData && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5 font-medium">
                  All checks passed
                </span>
              )}
              {issueCount > 0 && hasTablesData && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 font-medium">
                  {issueCount} {issueCount === 1 ? 'issue' : 'issues'} found
                </span>
              )}
            </div>
            {isReady === true && <CheckCircle className="h-5 w-5 text-green-500" />}
            {isReady === false && <AlertTriangle className="h-5 w-5 text-amber-500" />}
            {isReady === null && <Info className="h-5 w-5 text-blue-500" />}
          </CardTitle>
          <CardDescription className="flex justify-between items-center">
            <span>
              Check if your database has all required tables, RLS policies, and functions
            </span>
            {lastVerifiedAt && (
              <span className="text-xs text-muted-foreground">
                Last verified: {lastVerifiedAt.toLocaleTimeString()}
              </span>
            )}
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
            <Button 
              onClick={handleVerifyClick} 
              disabled={isVerifying || isCheckingConnection || authStatus.isChecking || 
                (!authStatus.isAuthenticated || !authStatus.hasAdminAccess)}
              variant={lastVerifiedAt ? "outline" : "default"}
              className={lastVerifiedAt ? "border-green-200 hover:border-green-300" : ""}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isVerifying || isCheckingConnection || authStatus.isChecking ? 'animate-spin' : ''}`} />
              {isVerifying ? 'Verifying...' : 
               isCheckingConnection ? 'Checking connection...' : 
               authStatus.isChecking ? 'Checking permissions...' :
               'Verify Database'}
            </Button>
          </div>
          
          {/* Authentication/permission error message */}
          {errorInfo && (
            <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">{errorInfo.title}</h3>
                  <p className="text-xs text-red-700 mt-1">
                    {errorInfo.message}
                  </p>
                  {connectionError && (
                    <ul className="list-disc pl-5 mt-2 text-xs text-red-700">
                      <li>Make sure you are logged in to your Supabase account</li>
                      <li>Check your API keys and connection settings</li>
                      <li>Verify that the Supabase project is running</li>
                      <li>Check your network connection</li>
                      <li>If you're an admin, try refreshing your auth token</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Loading states */}
          {(isVerifying || isCheckingConnection || authStatus.isChecking) && (
            <div className="py-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">
                {authStatus.isChecking ? "Checking user permissions..." : 
                 isCheckingConnection ? "Checking database connection..." : 
                 "Checking database configuration..."}
              </p>
            </div>
          )}
          
          {/* No data state */}
          {!hasTablesData && !hasPoliciesData && !hasFunctionsData && 
           !isVerifying && !isCheckingConnection && !authStatus.isChecking && 
           !errorInfo && (
            <div className="py-8 text-center text-muted-foreground">
              Click "Verify Database" to check your database configuration
            </div>
          )}
          
          {/* Issue summary */}
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

          {/* Success message */}
          {issueCount === 0 && hasTablesData && (
            <div className="mb-6 p-4 border border-green-200 bg-green-50 rounded-md">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Database Configuration Verified</h3>
                  <p className="text-xs text-green-700 mt-1">
                    All database tables, RLS policies, and functions are properly configured and ready to use.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* No data message */}
          {!issueCount && !hasTablesData && !isVerifying && !isCheckingConnection && !authStatus.isChecking && !errorInfo && (
            <div className="mb-6 p-4 border border-blue-200 bg-blue-50 rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">No Verification Data</h3>
                  <p className="text-xs text-blue-700 mt-1">
                    No database verification data is being returned. This could indicate connection issues, 
                    authentication problems, or missing permissions. Try logging in as an admin user or 
                    check your Supabase API key configuration.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Verification results */}
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
