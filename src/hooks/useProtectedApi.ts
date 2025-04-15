
import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ApiOptions {
  requireAuth?: boolean;
  headers?: Record<string, string>;
  baseUrl?: string;
  defaultErrorMessage?: string;
}

export function useProtectedApi(options: ApiOptions = {}) {
  const {
    requireAuth = true,
    headers: customHeaders = {},
    baseUrl = '/api',
    defaultErrorMessage = 'API request failed'
  } = options;

  const { user, session } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchApi = useCallback(
    async <T = any>(
      endpoint: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
      data?: Record<string, any> | FormData,
      additionalHeaders: Record<string, string> = {}
    ): Promise<{ data: T | null; error: string | null }> => {
      if (requireAuth && !session) {
        const error = 'Authentication required';
        toast({
          title: 'Authentication Error',
          description: 'You must be logged in to perform this action',
          variant: 'destructive'
        });
        return { data: null, error };
      }

      setIsLoading(true);
      setError(null);

      try {
        const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
        
        // Default headers
        const defaultHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          ...customHeaders,
          ...additionalHeaders
        };
        
        // Add authorization header if user is logged in
        if (session?.access_token) {
          defaultHeaders['Authorization'] = `Bearer ${session.access_token}`;
        }

        // Don't set Content-Type for FormData
        if (data instanceof FormData) {
          delete defaultHeaders['Content-Type'];
        }

        // Build request options
        const requestOptions: RequestInit = {
          method,
          headers: defaultHeaders,
        };

        // Add body for non-GET requests
        if (method !== 'GET' && data) {
          if (data instanceof FormData) {
            requestOptions.body = data;
          } else {
            // Convert data to FormData if needed
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
              formData.append(key, value);
            });
            requestOptions.body = formData;
          }
        }

        const response = await fetch(url, requestOptions);
        
        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');
        let responseData: T;
        
        if (contentType?.includes('application/json')) {
          responseData = await response.json();
        } else if (contentType?.includes('text/')) {
          responseData = await response.text() as unknown as T;
        } else {
          responseData = await response.blob() as unknown as T;
        }

        if (!response.ok) {
          throw new Error(
            responseData && typeof responseData === 'object' && 'error' in responseData
              ? (responseData as any).error
              : defaultErrorMessage
          );
        }

        return { data: responseData, error: null };
      } catch (err: any) {
        const errorMessage = err.message || defaultErrorMessage;
        setError(err);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive'
        });
        return { data: null, error: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl, customHeaders, requireAuth, session, toast]
  );

  return {
    fetchApi,
    isLoading,
    error
  };
}
