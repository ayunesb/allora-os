
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { logger } from "@/utils/loggingService";
import { toast } from "sonner";

interface GlobalErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

export class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  private errorTimestamps: number[] = [];

  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<GlobalErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Log the error to our logging service
    logger.error("Unhandled application error:", error, {
      componentStack: errorInfo.componentStack,
      errorCount: this.state.errorCount + 1
    });

    // Track error timestamps to detect rapid error cycles
    const now = Date.now();
    this.errorTimestamps.push(now);
    this.errorTimestamps = this.errorTimestamps.filter(t => t > now - 60000); // Keep last minute only

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // If many errors occur in a short time, suggest refreshing the app
    if (this.errorTimestamps.length >= 3) {
      toast.error("Multiple errors detected. Try refreshing the application.", {
        duration: 10000,
        action: {
          label: "Refresh",
          onClick: () => window.location.reload()
        }
      });
    }
  }

  handleReset = (): void => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  handleReload = (): void => {
    window.location.reload();
  }

  handleGoToHome = (): void => {
    window.location.href = "/";
    this.handleReset();
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Provide a progressively more serious error message based on error count
      const severity = this.state.errorCount > 3 ? "critical" : this.state.errorCount > 1 ? "serious" : "standard";
      
      let errorTitle = "Something went wrong";
      let errorMessage = "We apologize for the inconvenience. The application encountered an error.";
      
      if (severity === "serious") {
        errorTitle = "Repeated error detected";
        errorMessage = "The application has encountered multiple errors. Your data is safe, but you may need to refresh the page.";
      } else if (severity === "critical") {
        errorTitle = "Application error";
        errorMessage = "Multiple serious errors have been detected. We recommend reloading the application to resolve this issue.";
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle>{errorTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {errorMessage} Our team has been notified of this issue.
              </p>
              {process.env.NODE_ENV !== 'production' && this.state.error && (
                <div className="bg-muted p-3 rounded-md overflow-auto max-h-32 text-xs">
                  <p className="font-mono">{this.state.error.toString()}</p>
                  {this.state.errorInfo && (
                    <pre className="mt-2 text-muted-foreground text-[10px] leading-tight overflow-auto max-h-24">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}
              
              <div className="mt-4 text-sm bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 p-3 rounded">
                <p className="font-medium text-amber-800 dark:text-amber-300">Your data is safe</p>
                <p className="text-amber-700 dark:text-amber-400 mt-1">
                  This error won't affect your saved information. You can try to continue or reload the page.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={this.handleGoToHome}
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Button>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={this.handleReset}
                >
                  Try to Continue
                </Button>
                <Button
                  onClick={this.handleReload}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reload App
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
