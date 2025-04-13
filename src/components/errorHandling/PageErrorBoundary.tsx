
import React, { ReactNode } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageErrorBoundaryProps {
  children: ReactNode;
  pageName: string;
}

export function PageErrorBoundary({ children, pageName }: PageErrorBoundaryProps) {
  const navigate = useNavigate();

  const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle>Error in {pageName}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We encountered an error while loading this page. Our team has been notified of the issue.
          </p>
          <div className="bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-40">
            {error.message}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button
            onClick={resetErrorBoundary}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <ErrorFallback 
          error={error} 
          resetErrorBoundary={resetErrorBoundary} 
        />
      )}
      onError={(error, info) => {
        console.error(`Error in ${pageName}:`, error);
        console.error("Component stack:", info.componentStack);
        // Here you could also send to a monitoring service like Sentry
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
