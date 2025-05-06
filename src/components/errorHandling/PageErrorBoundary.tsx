import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
class ErrorBoundaryFallback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error(`Error in ${this.props.pageName}:`, error);
    console.error("Component stack:", errorInfo.componentStack);
    // Here you could also send the error to a monitoring service like Sentry
  }
  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };
  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallbackUI
          error={this.state.error}
          pageName={this.props.pageName}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }
    return this.props.children;
  }
}
// Separate the UI component to use hooks
function ErrorFallbackUI({ error, pageName, resetErrorBoundary }) {
  const navigate = useNavigate();
  return (
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
            We encountered an error while loading this page. Our team has been
            notified of the issue.
          </p>
          <div className="bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-40">
            {error.message}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
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
}
// Wrapper component with hooks
export function PageErrorBoundary({ children, pageName }) {
  return (
    <ErrorBoundaryFallback pageName={pageName}>
      {children}
    </ErrorBoundaryFallback>
  );
}
