
import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logger } from '@/utils/loggingService';

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log to our centralized logging service
    logger.error('Global application error:', error, {
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent
    });
    
    // Here you could also integrate with error monitoring services like Sentry
    console.error('Global error caught:', error);
    console.error('Component stack:', errorInfo.componentStack);
  };
  
  const GlobalErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <Card className="w-full max-w-md border-destructive/20">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertOctagon className="h-6 w-6 text-destructive" />
            <CardTitle>Application Error</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We've encountered an unexpected error. Our team has been notified and is working to fix it.
          </p>
          
          <div className="bg-muted/50 border border-border p-3 rounded-md overflow-auto max-h-40">
            <p className="font-mono text-sm">{error.message || 'Unknown error'}</p>
          </div>
          
          <div className="bg-card p-4 border border-border rounded-md">
            <h3 className="text-sm font-medium mb-2">You can try:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Refreshing the page</li>
              <li>• Checking your internet connection</li>
              <li>• Going back to the home page</li>
              <li>• Logging out and back in</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button 
            onClick={() => {
              resetErrorBoundary();
              window.location.reload();
            }}
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reload App
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
  
  return (
    <ErrorBoundary
      fallback={({ error, resetErrorBoundary }) => (
        <GlobalErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
}
