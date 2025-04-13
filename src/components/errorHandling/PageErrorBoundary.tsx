
import React from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";
import { ErrorRecoveryWrapper } from "@/components/dashboard/ErrorRecoveryWrapper";
import { toast } from "sonner";
import { logger } from "@/utils/loggingService";

interface PageErrorBoundaryProps {
  children: React.ReactNode;
  pageName: string;
  fallback?: React.ReactNode;
}

/**
 * A specialized error boundary component for pages that provides:
 * 1. Multiple levels of error handling (component-level and page-level)
 * 2. Automatic error logging and recovery
 * 3. User-friendly error messages
 */
export function PageErrorBoundary({ children, pageName, fallback }: PageErrorBoundaryProps) {
  // Handle component-level errors
  const handleComponentError = (error: Error, errorInfo: React.ErrorInfo) => {
    logger.error(`Component error in ${pageName}:`, error, {
      componentStack: errorInfo.componentStack,
      pageName
    });
    
    toast.error(`Error in ${pageName}`, {
      description: "We're having trouble with part of this page. Our team has been notified.",
      duration: 5000
    });
  };
  
  // Handle page-level errors
  const handlePageError = (error: Error, errorInfo: React.ErrorInfo) => {
    logger.error(`Page-level error in ${pageName}:`, error, {
      componentStack: errorInfo.componentStack,
      pageName
    });
    
    // Additional analytics or error reporting could be added here
  };
  
  // Nested error boundaries to provide better UX
  return (
    <GlobalErrorBoundary onError={handlePageError} fallback={fallback}>
      <ErrorBoundary onError={handleComponentError}>
        <ErrorRecoveryWrapper 
          errorTitle={`Error in ${pageName}`}
          errorMessage="We encountered an issue loading this page. Try refreshing or navigating to another section."
        >
          {children}
        </ErrorRecoveryWrapper>
      </ErrorBoundary>
    </GlobalErrorBoundary>
  );
}
