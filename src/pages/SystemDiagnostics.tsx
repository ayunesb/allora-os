import React, { useState, useEffect } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Shield,
  Database,
  Server,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileWarning,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function SystemDiagnostics() {
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    connected: false,
    error: null,
  });
  const [routeErrors, setRouteErrors] = useState([]);
  const [componentErrors, setComponentErrors] = useState([]);
  const [diagnosticError, setDiagnosticError] = useState<string | null>(null);

  // Check database connection
  const checkDatabaseConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);
      if (error) {
        setConnectionStatus({ connected: false, error: error.message });
      } else {
        setConnectionStatus({ connected: true, error: null });
      }
    } catch (error) {
      setConnectionStatus({
        connected: false,
        error:
          error instanceof Error ? error.message : "Unknown database error",
      });
    } finally {
      setIsCheckingConnection(false);
    }
  };

  // Initial checks
  useEffect(() => {
    // Check DB connection on mount
    checkDatabaseConnection();
    // Known issues diagnostics
    setComponentErrors([
      {
        component: "DocumentLegalContent",
        error:
          "Component is using useCompliance hook outside of ComplianceProvider",
        status: "error",
      },
      {
        component: "LegalDocument",
        error: "Not properly wrapped with ComplianceProvider",
        status: "error",
      },
    ]);
    setRouteErrors([
      {
        path: "/legal/terms-of-service",
        error: "Compliance context missing",
        status: "error",
      },
      {
        path: "/admin/diagnostics",
        error: "Route may be inaccessible due to other errors",
        status: "warning",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">System Diagnostics</h1>
          <div className="flex space-x-2">
            <Button variant="outline" asChild={true}>
              <Link to="/">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button variant="outline" asChild={true}>
              <Link to="/admin">
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Database Connection Status */}
          <Card
            className={
              connectionStatus.connected ? "border-green-200" : "border-red-200"
            }
          >
            <CardHeader>
              <CardDescription>
                Status of your Supabase database connection
              </CardDescription>
            </CardHeader>{" "}
            {/* Fixed closing tag for CardHeader */}
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Badge
                    variant={
                      connectionStatus.connected ? "outline" : "destructive"
                    }
                    className="mr-2"
                  >
                    {connectionStatus.connected ? "Connected" : "Disconnected"}
                  </Badge>
                  {connectionStatus.connected ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>

                {!connectionStatus.connected && connectionStatus.error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Connection Error</AlertTitle>
                    <AlertDescription>
                      {connectionStatus.error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={checkDatabaseConnection}
                disabled={isCheckingConnection}
                variant="outline"
                className="w-full"
              >
                {isCheckingConnection ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Checking Connection...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Check Connection
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          {/* Application Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5 text-primary" />
                Application Status
              </CardTitle>
              <CardDescription>
                Overall application health diagnostics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Component Errors</h3>
                  <div className="space-y-2">
                    {componentErrors.map((error, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-sm ${
                          error.status === "error"
                            ? "bg-red-50 text-red-800"
                            : error.status === "warning"
                              ? "bg-amber-50 text-amber-800"
                              : "bg-green-50 text-green-800"
                        }`}
                      >
                        <div className="font-medium">{error.component}</div>
                        <div>{error.error}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Route Issues</h3>
                  <div className="space-y-2">
                    {routeErrors.map((error, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded text-sm ${
                          error.status === "error"
                            ? "bg-red-50 text-red-800"
                            : error.status === "warning"
                              ? "bg-amber-50 text-amber-800"
                              : "bg-green-50 text-green-800"
                        }`}
                      >
                        <div className="font-medium">{error.path}</div>
                        <div>{error.error}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>{" "}
          {/* Fixed closing tag for Card */}
        </div>

        {/* Quick Fixes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileWarning className="mr-2 h-5 w-5 text-primary" />
              Recommended Fixes
            </CardTitle>
            <CardDescription>
              Automated fixes for detected issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded">
                <h3 className="font-medium mb-2">
                  Fix ComplianceProvider Issue
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The Legal Document component needs to be properly wrapped with
                  ComplianceProvider. This fix will modify LegalDocument.tsx to
                  ensure proper context is provided.
                </p>
                <div className="bg-muted p-2 rounded text-sm font-mono mb-3">
                  <pre>{`import { ComplianceProvider } from "@/context/ComplianceContext";

export default function LegalDocument() {
  return (
    <ComplianceProvider>
      <DocumentLegalContent />
    </ComplianceProvider>
  );
}`}</pre>
                </div>
                <Button asChild className="w-full">
                  <Link to="/admin/diagnostics">Go to Admin Diagnostics</Link>
                </Button>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Route Access Issues</AlertTitle>
                <AlertDescription>
                  You may be experiencing issues accessing certain routes due to
                  the compliance context error. Try accessing the{" "}
                  <Link to="/admin" className="underline">
                    Admin Dashboard
                  </Link>{" "}
                  directly.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
