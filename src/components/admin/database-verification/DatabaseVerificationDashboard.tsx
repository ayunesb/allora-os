import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCw, DatabaseIcon, AlertCircle } from "lucide-react";
import { DatabaseTablesCheck } from "./DatabaseTablesCheck";
import { RlsPoliciesCheck } from "./RlsPoliciesCheck";
import { DatabaseFunctionsCheck } from "./DatabaseFunctionsCheck";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
export function DatabaseVerificationDashboard({ result, onVerify }) {
  const [connectionStatus, setConnectionStatus] = useState({
    checked: false,
    connected: false,
  });
  const checkConnection = async () => {
    const status = await checkSupabaseConnection();
    setConnectionStatus({
      checked: true,
      connected: status.connected,
      message: status.message,
    });
  };
  return (
    <div className="space-y-6">
      {!connectionStatus.checked ? (
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={checkConnection}>
            Check Database Connection
          </Button>
        </div>
      ) : connectionStatus.connected ? (
        <Alert className="mb-4">
          <DatabaseIcon className="h-4 w-4" />
          <AlertDescription>
            Database connection successful. You can now verify database
            configuration.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {connectionStatus.message ||
              "Database connection failed. Please check your configuration."}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Database Verification</h2>
        <Button onClick={onVerify} disabled={result.isVerifying}>
          {result.isVerifying ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Verify Database
            </>
          )}
        </Button>
      </div>

      <div className="space-y-6">
        <DatabaseTablesCheck tables={result.tables} />
        <RlsPoliciesCheck policies={result.policies} />
        <DatabaseFunctionsCheck functions={result.functions} />
      </div>

      {result.tables.length === 0 &&
        result.policies.length === 0 &&
        result.functions.length === 0 &&
        !result.isVerifying && (
          <div className="text-center py-8 text-muted-foreground">
            Click "Verify Database" to check your database configuration
          </div>
        )}
    </div>
  );
}
