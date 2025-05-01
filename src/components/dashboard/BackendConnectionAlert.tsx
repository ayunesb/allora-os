
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SUPABASE_CONFIG } from "@/config/appConfig";

export function BackendConnectionAlert() {
  // Safely check for fallback mode with proper type handling
  let usingFallback = false;
  
  if (SUPABASE_CONFIG && typeof SUPABASE_CONFIG === 'object') {
    usingFallback = 'usingFallback' in SUPABASE_CONFIG ? 
      Boolean(SUPABASE_CONFIG.usingFallback) : false;
  }
  
  // Only show this alert when we're using fallback values
  if (!usingFallback) return null;
  
  return (
    <Alert variant="warning" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Backend Connection Issue</AlertTitle>
      <AlertDescription>
        <p className="mb-2">The application is running with limited functionality because it couldn't connect to the backend services.</p>
        <div className="flex space-x-2 mt-2">
          <Button size="sm" variant="outline" asChild>
            <a 
              href="https://docs.lovable.dev/integrations/supabase/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Setup Guide
            </a>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
