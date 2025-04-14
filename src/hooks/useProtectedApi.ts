
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import { addCsrfToFormData, getCsrfToken } from "@/utils/csrfProtection";
import { logger } from "@/utils/loggingService";

type ApiFunction<T, R> = (params: T) => Promise<R>;

interface UseProtectedApiOptions {
  requireAuth?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  redirectOnUnauth?: boolean;
  requireCsrf?: boolean;
}

export function useProtectedApi<T, R>(
  apiFunction: ApiFunction<T, R>,
  options: UseProtectedApiOptions = {}
) {
  const {
    requireAuth = true,
    showSuccessToast = false,
    successMessage = "Operation successful",
    showErrorToast = true,
    redirectOnUnauth = true,
    requireCsrf = true
  } = options;
  
  const { user, refreshSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<R | null>(null);

  const execute = async (params: T): Promise<R | null> => {
    // Check if user is authenticated when required
    if (requireAuth && !user) {
      const authError = new Error("Authentication required");
      setError(authError);
      
      if (showErrorToast) {
        toast.error("Please login to perform this action");
      }
      
      if (redirectOnUnauth) {
        // We could add a redirect here if needed
        // navigate("/login");
      }
      
      return null;
    }
    
    // Check for CSRF token when required
    if (requireCsrf && !getCsrfToken()) {
      logger.warn("Missing CSRF token for protected API call");
      await refreshSession(); // This will regenerate the CSRF token
      
      if (!getCsrfToken()) {
        const csrfError = new Error("Security token missing");
        setError(csrfError);
        
        if (showErrorToast) {
          toast.error("Security verification failed. Please try again.");
        }
        
        return null;
      }
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add CSRF token to params if required and params is an object
      const secureParams = requireCsrf && typeof params === 'object' && params !== null
        ? addCsrfToFormData(params as Record<string, any>) as unknown as T
        : params;
      
      const result = await apiFunction(secureParams);
      setData(result);
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      return result;
    } catch (err: any) {
      const errorObject = err instanceof Error ? err : new Error(err?.message || "An unknown error occurred");
      setError(errorObject);
      
      // Log security related errors
      if (err?.message?.includes('CSRF') || err?.message?.includes('token')) {
        logger.warn("Possible security issue in API call:", { 
          error: err?.message,
          path: window.location.pathname
        });
      }
      
      if (showErrorToast) {
        toast.error(err?.message || "An error occurred");
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute,
    isLoading,
    error,
    data
  };
}
