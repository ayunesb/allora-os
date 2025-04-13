
import React, { useState, useEffect, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';

interface ErrorRecoveryWrapperProps {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onReset?: () => void;
  errorTitle?: string;
  errorMessage?: string;
  componentName?: string;
}

export function ErrorRecoveryWrapper({
  children,
  fallbackComponent,
  onReset,
  errorTitle = "Something went wrong",
  errorMessage = "We encountered an error loading this component. Your data is safe, and you can try again.",
  componentName = "unknown component"
}: ErrorRecoveryWrapperProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);
  
  // Reset error state when children change
  useEffect(() => {
    setHasError(false);
    setError(null);
  }, [children]);
  
  const handleReset = () => {
    setHasError(false);
    setError(null);
    
    // Execute custom reset logic if provided
    if (onReset) {
      onReset();
    }
    
    toast.success("Component has been reset");
  };
  
  const handleCatchError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log the error
    logger.error(`Error in ${componentName}:`, error, {
      component: componentName,
      errorInfo: errorInfo.componentStack
    });
    
    // Update state
    setHasError(true);
    setError(error);
    setErrorInfo(errorInfo);
  };
  
  if (hasError) {
    // Use custom fallback if provided, otherwise show default error UI
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }
    
    return (
      <Card className="w-full border border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg">{errorTitle}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{errorMessage}</p>
          
          {process.env.NODE_ENV !== 'production' && error && (
            <div className="bg-muted p-3 rounded-md overflow-auto max-h-32 text-xs">
              <p className="font-mono text-red-500">{error.toString()}</p>
              {errorInfo && (
                <pre className="mt-2 text-muted-foreground">
                  {errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button onClick={handleReset} className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Use error boundary class to catch errors in children
  return (
    <ErrorBoundaryClass onError={handleCatchError}>
      {children}
    </ErrorBoundaryClass>
  );
}

// Class component is required for error boundaries
class ErrorBoundaryClass extends React.Component<{
  children: ReactNode;
  onError: (error: Error, errorInfo: React.ErrorInfo) => void;
}> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error, errorInfo);
  }
  
  render() {
    return this.props.children;
  }
}
