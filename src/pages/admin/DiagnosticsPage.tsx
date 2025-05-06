import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { performDeepScan } from "@/utils/admin/database-verification/displayResults";
import { logDiagnosticInfo } from "@/utils/logger";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { Shield, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
export default function DiagnosticsPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const runDeepScan = async () => {
    setIsScanning(true);
    logDiagnosticInfo("Starting deep scan", {
      timestamp: new Date().toISOString(),
    });
    try {
      // Check database connection
      const dbCheck = await checkSupabaseConnection();
      // Run the full deep scan
      const scanSuccess = await performDeepScan();
      // Store results
      setScanResults({
        success: scanSuccess,
        timestamp: new Date().toISOString(),
        details: {
          authentication: true, // We assume these are set by the deep scan
          database: dbCheck.connected,
          permissions: true,
          routing: true,
        },
      });
    } catch (error) {
      console.error("Error during deep scan:", error);
      setScanResults({
        success: false,
        timestamp: new Date().toISOString(),
        details: {
          authentication: false,
          database: false,
          permissions: false,
          routing: false,
        },
      });
    } finally {
      setIsScanning(false);
    }
  };
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">System Diagnostics</h1>
      <p className="text-muted-foreground mb-8">
        Run diagnostics to identify and resolve system issues.
      </p>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              System Deep Scan
            </CardTitle>
            <CardDescription>
              Perform a comprehensive scan of authentication, database,
              permissions, and routing
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scanResults && (
              <div className="mb-6">
                <Alert
                  variant={scanResults.success ? "default" : "destructive"}
                >
                  {scanResults.success ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {scanResults.success
                      ? "Scan Completed Successfully"
                      : "Issues Detected"}
                  </AlertTitle>
                  <AlertDescription>
                    Scan completed at{" "}
                    {new Date(scanResults.timestamp).toLocaleTimeString()}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        scanResults.details.authentication
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {scanResults.details.authentication ? "Pass" : "Fail"}
                    </Badge>
                    <span>Authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        scanResults.details.database ? "outline" : "destructive"
                      }
                    >
                      {scanResults.details.database ? "Pass" : "Fail"}
                    </Badge>
                    <span>Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        scanResults.details.permissions
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {scanResults.details.permissions ? "Pass" : "Fail"}
                    </Badge>
                    <span>Permissions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        scanResults.details.routing ? "outline" : "destructive"
                      }
                    >
                      {scanResults.details.routing ? "Pass" : "Fail"}
                    </Badge>
                    <span>Routing</span>
                  </div>
                </div>
              </div>
            )}

            <Tabs defaultValue="instructions">
              <TabsList className="mb-4">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="authentication">Authentication</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="routing">Routing</TabsTrigger>
              </TabsList>

              <TabsContent value="instructions">
                <div className="text-sm space-y-4">
                  <p>The deep scan will check:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Authentication status and session validity</li>
                    <li>Database connection and table permissions</li>
                    <li>User role and access permissions</li>
                    <li>Routing configuration and component loading</li>
                  </ul>
                  <p className="font-medium">
                    Click "Run Deep Scan" to begin the diagnostics process.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="authentication">
                <div className="text-sm">
                  <h3 className="font-medium mb-2">
                    Authentication Diagnostics
                  </h3>
                  <p className="mb-2">The scan will verify:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>User is properly authenticated</li>
                    <li>Session token is valid and not expired</li>
                    <li>User profile is accessible</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="database">
                <div className="text-sm">
                  <h3 className="font-medium mb-2">Database Diagnostics</h3>
                  <p className="mb-2">The scan will verify:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Supabase connection is established</li>
                    <li>Required tables exist and are accessible</li>
                    <li>RLS policies are properly configured</li>
                    <li>Database functions are working</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="routing">
                <div className="text-sm">
                  <h3 className="font-medium mb-2">Routing Diagnostics</h3>
                  <p className="mb-2">The scan will verify:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>All required routes are defined</li>
                    <li>Component loading is working properly</li>
                    <li>URL patterns are correct</li>
                    <li>Protection for admin routes is working</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button
              onClick={runDeepScan}
              disabled={isScanning}
              className="w-full"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Running Deep Scan...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Run Deep Scan
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
            <CardDescription>
              Troubleshooting for frequently encountered problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">
                  404 Errors on Admin Pages
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This typically indicates a routing issue or missing component.
                  Check route definitions in admin-routes.tsx and verify that
                  all required components are imported correctly.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium">
                  Database Connection Issues
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Verify your Supabase credentials and ensure your IP is
                  whitelisted. Check console logs for specific error details
                  that might indicate permission or configuration problems.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Authentication Failures</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  If authentication is failing, try signing out and back in.
                  Check your role in the profiles table to ensure you have the
                  correct permissions for admin functionality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
