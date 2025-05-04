import { Component, Suspense } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { logger } from "@/utils/loggingService";
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
        this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    }
    static getDerivedStateFromError(error) {
        logger.error('ErrorBoundary caught an error:', error);
        console.error('ErrorBoundary caught an error:', error);
        return { hasError: true, error, errorInfo: null };
    }
    componentDidCatch(error, errorInfo) {
        // Log the error
        logger.error("Uncaught error in component:", error, {
            componentStack: errorInfo.componentStack,
            componentName: this.constructor.name
        });
        console.error("Component error stack:", errorInfo.componentStack);
        // Update state with error info
        this.setState({ errorInfo });
        // Call the onError prop if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }
    resetErrorBoundary() {
        this.setState({ hasError: false, error: null, errorInfo: null });
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                if (typeof this.props.fallback === 'function') {
                    return this.props.fallback({
                        error: this.state.error || new Error('Unknown error'),
                        resetErrorBoundary: this.resetErrorBoundary
                    });
                }
                return this.props.fallback;
            }
            return (<div className="flex items-center justify-center min-h-screen p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-destructive"/>
                <CardTitle>Something went wrong</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                An unexpected error occurred. Our team has been notified.
              </p>
              {this.state.error && (<div className="bg-muted p-3 rounded-md overflow-auto max-h-40 text-xs">
                  <p className="font-mono">{this.state.error.toString()}</p>
                  {this.state.errorInfo && (<pre className="mt-2 text-xs font-mono overflow-auto max-h-40">
                      {this.state.errorInfo.componentStack}
                    </pre>)}
                </div>)}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                Go to Home
              </Button>
              <Button onClick={() => {
                    this.resetErrorBoundary();
                    window.location.reload();
                }}>
                <RefreshCw className="mr-2 h-4 w-4"/>
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </div>);
        }
        return (<Suspense fallback={<div className="flex items-center justify-center p-8"><RefreshCw className="w-6 h-6 animate-spin text-muted-foreground"/></div>}>
        {this.props.children}
      </Suspense>);
    }
}
export default ErrorBoundary;
