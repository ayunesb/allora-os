
import { toast } from 'sonner';
import { fetchApi } from './apiClient';
import { handleApiError } from '@/utils/api/errorHandling';
import { useState } from 'react';

export interface UseProtectedApiOptions {
  showSuccessToast?: boolean;
  successMessage?: string;
  showErrorToast?: boolean;
  errorMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useProtectedApi<T, P = any>(
  apiFunction: (params?: P) => Promise<T>,
  options: UseProtectedApiOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const execute = async (params?: P): Promise<T> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(params);
      
      if (options.showSuccessToast) {
        toast.success(options.successMessage || 'Operation completed successfully');
      }
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (err: any) {
      setError(err);
      
      if (options.showErrorToast) {
        toast.error(options.errorMessage || err.message || 'An error occurred');
      }
      
      if (options.onError) {
        options.onError(err);
      }
      
      handleApiError(err, {
        showToast: false, // We're already showing a toast above
        rethrow: false
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { execute, isLoading, error };
}

export function useApiClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async <T, U = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: U,
    additionalHeaders?: Record<string, string>
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchApi<T>(endpoint, method, data, additionalHeaders);
      return result;
    } catch (err: any) {
      setError(err);
      handleApiError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchApi,
    execute,
    isLoading,
    error
  };
}
