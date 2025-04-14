
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function SupabaseConnectionStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Try a simple query to test the connection
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
        
        if (error) {
          throw error;
        }
        
        setStatus('connected');
      } catch (err) {
        console.error('Supabase connection error:', err);
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Unknown connection error');
      }
    };

    checkConnection();
  }, []);

  if (status === 'checking') {
    return (
      <Alert className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Checking Connection</AlertTitle>
        <AlertDescription>Verifying connection to backend services...</AlertDescription>
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Connection Error</AlertTitle>
        <AlertDescription>
          {errorMessage || "Unable to connect to backend services. Some features might be limited."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="success" className="mb-4 bg-green-50 text-green-800 border-green-200">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle>Connected</AlertTitle>
      <AlertDescription>
        Successfully connected to backend services.
      </AlertDescription>
    </Alert>
  );
}
