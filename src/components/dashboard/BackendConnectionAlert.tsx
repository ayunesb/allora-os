
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SUPABASE_CONFIG } from "@/config/appConfig";

export function BackendConnectionAlert() {
  // Create a safe check for usingFallback property
  const usingFallback = SUPABASE_CONFIG && 
    (SUPABASE_CONFIG as any).usingFallback === true;
  
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
