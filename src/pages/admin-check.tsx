
import React, { useEffect, useState } from 'react';
import { useVerification, VerificationResponse } from '@/hooks/admin/useVerification';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw, Loader2, Shield } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DatabaseTablesSection } from "@/components/admin/launch-verification/DatabaseTablesSection";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { checkSupabaseConnection } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function AdminCheck() {
  const { validation, runVerification } = useVerification();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    checked: boolean;
    connected: boolean;
    message?: string;
  }>({
    checked: false,
    connected: false
  });

  // Run verification on mount
  useEffect(() => {
    const verifySystem = async () => {
      try {
        // Check Supabase connection first
        const status = await checkSupabaseConnection();
        setConnectionStatus({
          checked: true,
          connected: status.connected,
          message: status.message
        });

        if (status.connected) {
          // Run full verification if connected
          await runVerification();
          setVerificationComplete(true);
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("An error occurred during system verification");
      }
    };

    verifySystem();
  }, [runVerification]);

  const handleRunVerification = async () => {
    try {
      await runVerification();
      setVerificationComplete(true);
      toast.success("System verification completed");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during system verification");
    }
  };

  // Calculate health status
  const getSystemHealth = () => {
    const { results } = validation;
    if (!results) return { status: 'pending', label: 'Not Verified', color: 'bg-gray-500' };

    const errorCount = Object.values(results)
      .filter(value => typeof value === 'object' && value !== null && 'valid' in value)
      .filter(item => !(item as any).valid).length;

    const tableErrorCount = results.databaseTables?.filter(t => t.status === 'error').length || 0;
    const tableWarningCount = results.databaseTables?.filter(t => t.status === 'warning').length || 0;

    const totalIssues = errorCount + tableErrorCount;
    
    if (totalIssues > 0) {
      return { 
        status: 'critical', 
        label: 'Critical Issues', 
        color: 'bg-red-500',
        count: totalIssues
      };
    } else if (tableWarningCount > 0) {
      return { 
        status: 'warning', 
        label: 'Warnings', 
        color: 'bg-amber-500',
        count: tableWarningCount
      };
    } else {
      return { 
        status: 'healthy', 
        label: 'Healthy', 
        color: 'bg-green-500',
        count: 0 
      };
    }
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const { results } = validation;
    if (!results) return 0;

    const totalChecks = 3 + (results.databaseTables?.length || 0);  // 3 base checks + number of tables
    
    const passedChecks = [
      results.authentication?.valid,
      results.database?.valid,
      results.apis?.valid
    ].filter(Boolean).length;
    
    const passedTables = results.databaseTables?.filter(t => t.status === 'success').length || 0;
    
    return Math.round(((passedChecks + passedTables) / totalChecks) * 100);
  };

  // Render system health indicator
  const healthStatus = getSystemHealth();
  const progressPercentage = calculateProgress();

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">System Health Check</h1>
          <p className="text-muted-foreground">Comprehensive audit of your system configuration and readiness</p>
        </div>
        <Button 
          onClick={handleRunVerification}
          disabled={validation.loading}
        >
          {validation.loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Verification
            </>
          )}
        </Button>
      </div>

      {!connectionStatus.connected && connectionStatus.checked && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            {connectionStatus.message || "Could not connect to the database. Please check your configuration."}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${healthStatus.color} text-white`}>
                {healthStatus.status === 'healthy' && <CheckCircle2 className="h-8 w-8" />}
                {healthStatus.status === 'warning' && <AlertTriangle className="h-8 w-8" />}
                {healthStatus.status === 'critical' && <XCircle className="h-8 w-8" />}
                {healthStatus.status === 'pending' && <Loader2 className="h-8 w-8 animate-spin" />}
              </div>
              <div>
                <p className="font-medium text-lg">
                  {healthStatus.label}
                  {(healthStatus.count > 0) && (
                    <span className="ml-2">({healthStatus.count})</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {healthStatus.status === 'healthy' && 'All systems operational'}
                  {healthStatus.status === 'warning' && 'System operational with warnings'}
                  {healthStatus.status === 'critical' && 'Critical issues detected'}
                  {healthStatus.status === 'pending' && 'Verification in progress'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Verification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Completion</span>
                <span>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {validation.loading
                  ? 'Verification in progress...'
                  : verificationComplete 
                    ? 'Verification complete' 
                    : 'Verification not started'}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {validation.results?.authentication?.valid ? (
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              )}
              <div>
                <p className="font-medium">
                  {validation.results?.authentication?.valid ? 'Authenticated' : 'Not Authenticated'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {validation.results?.authentication?.message || 'Authentication status not verified'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          <TabsContent value="overview" className="mt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Database Connection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    {validation.results?.database?.valid ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">
                        {validation.results?.database?.valid ? 'Connected' : 'Connection Issue'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {validation.results?.database?.message || 'Database connection not verified'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">API Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    {validation.results?.apis?.valid ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">
                        {validation.results?.apis?.valid ? 'API Available' : 'API Issue'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {validation.results?.apis?.message || 'API endpoints not verified'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Critical Security Checks</CardTitle>
                  <Badge 
                    variant={validation.results?.overallStatus === 'ready' ? 'default' : 'destructive'}
                  >
                    {validation.results?.overallStatus === 'ready' ? 'Secure' : 'Issues Found'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Row-Level Security (RLS)</p>
                      <p className="text-sm text-muted-foreground">
                        {(validation.results?.databaseTables?.every(table => table.hasRLS))
                          ? 'All tables have RLS policies enabled'
                          : 'Some tables are missing RLS policies'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="database" className="mt-0">
            {validation.results?.databaseTables && (
              <DatabaseTablesSection tables={validation.results.databaseTables} />
            )}
            {(!validation.results?.databaseTables || validation.results.databaseTables.length === 0) && (
              <div className="text-center py-10">
                <div className="text-muted-foreground">No database information available</div>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={handleRunVerification}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Verify Database
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="configuration" className="mt-0 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Environment Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm border-b pb-2">
                    <span className="font-medium">Supabase URL</span>
                    <span className="truncate">{import.meta.env.VITE_SUPABASE_URL || 'Not configured'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm border-b pb-2">
                    <span className="font-medium">API Base URL</span>
                    <span>{import.meta.env.VITE_API_BASE_URL || 'Not configured'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm border-b pb-2">
                    <span className="font-medium">Environment</span>
                    <span>{import.meta.env.MODE || 'development'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium">Node Environment</span>
                    <span>{import.meta.env.NODE_ENV || 'development'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm border-b pb-2">
                    <span className="font-medium">User ID</span>
                    <span className="truncate">{user?.id || 'Not authenticated'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm border-b pb-2">
                    <span className="font-medium">Email</span>
                    <span>{user?.email || 'Not available'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm border-b pb-2">
                    <span className="font-medium">Role</span>
                    <span>{profile?.role || 'Not available'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium">Company ID</span>
                    <span className="truncate">{user?.company_id || 'Not available'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => navigate('/admin/audit')}>
              Full Audit Dashboard
            </Button>
            <Button onClick={() => navigate('/admin/launch-verification')}>
              Launch Verification
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <Card className="mb-6 border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            System Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Enable RLS policies on all database tables to improve security</li>
            <li>Implement proper error handling for database operations</li>
            <li>Set up regular database backups if not already configured</li>
            <li>Configure proper environment variables for production deployment</li>
            <li>Implement rate limiting to prevent API abuse</li>
            <li>Set up monitoring and alerting for critical systems</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="text-center text-muted-foreground text-sm mt-10">
        <p>Last verification: {verificationComplete ? new Date().toLocaleString() : 'Not completed'}</p>
      </div>
    </div>
  );
}
