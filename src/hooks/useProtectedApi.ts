
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

type ApiFunction<T, R> = (params: T) => Promise<R>;

interface UseProtectedApiOptions {
  requireAuth?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  redirectOnUnauth?: boolean;
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
    redirectOnUnauth = true
  } = options;
  
  const { user } = useAuth();
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
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(params);
      setData(result);
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      return result;
    } catch (err: any) {
      const errorObject = err instanceof Error ? err : new Error(err?.message || "An unknown error occurred");
      setError(errorObject);
      
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
