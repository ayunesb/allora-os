
import { useState, useEffect } from "react";
import { AuthLoadingState } from "./AuthLoadingState";
import { AuthErrorState } from "./AuthErrorState";

interface AuthStateHandlerProps {
  isLoading: boolean;
  authError: string | null;
  onRetry: () => Promise<void>;
  isRetrying: boolean;
  children: React.ReactNode;
}

export const AuthStateHandler = ({
  isLoading,
  authError,
  onRetry,
  isRetrying,
  children
}: AuthStateHandlerProps) => {
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Set a timeout to avoid infinite loading
  useEffect(() => {
    let timer: number;
    if (isLoading && !loadingTimeout) {
      timer = window.setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000); // 10 seconds loading timeout
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, loadingTimeout]);

  // Show loading state but with timeout protection
  if (isLoading && !loadingTimeout) {
    return <AuthLoadingState />;
  }

  // If loading took too long, give user the option to retry or navigate back
  if (loadingTimeout && isLoading) {
    return (
      <AuthErrorState 
        error="Loading took too long. There might be an issue with the connection." 
        onRetry={onRetry} 
        isRetrying={isRetrying} 
      />
    );
  }

  if (authError) {
    return <AuthErrorState 
      error={authError} 
      onRetry={onRetry} 
      isRetrying={isRetrying} 
    />;
  }

  return <>{children}</>;
};
