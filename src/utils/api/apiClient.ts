
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { API_CONFIG } from '@/config/appConfig';

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
  code?: string;
};

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
  status: 'success' | 'error';
};

type ApiRequestOptions = {
  errorMessage?: string;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
  timeout?: number;
};

/**
 * Wrapper for API calls with consistent error handling and timeouts
 * @param apiCall - The async function making the API call
 * @param options - Configuration options for the API call
 * @returns Standardized API response
 */
export async function apiRequest<T>(
  apiCall: () => Promise<any>,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    errorMessage = 'An error occurred',
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = 'Operation completed successfully',
    timeout = API_CONFIG.defaultTimeout
  } = options;

  // Create a timeout promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject({
        message: 'Request timed out',
        status: 408,
        code: 'TIMEOUT'
      });
    }, timeout);
  });

  try {
    // Race the API call against the timeout
    const response = await Promise.race([apiCall(), timeoutPromise]);
    
    // Handle Supabase error format
    if (response.error) {
      throw {
        message: response.error.message || errorMessage,
        status: response.error.status,
        code: response.error.code,
        details: response.error
      };
    }
    
    if (showSuccessToast) {
      toast.success(successMessage);
    }
    
    return {
      data: response.data,
      error: null,
      status: 'success'
    };
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.message || errorMessage,
      status: error.status || 500,
      code: error.code,
      details: error
    };
    
    console.error('API Error:', apiError);
    
    if (showErrorToast) {
      toast.error(apiError.message);
    }
    
    return {
      data: null,
      error: apiError,
      status: 'error'
    };
  }
}

/**
 * Helper function to safely parse JSON
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    return fallback;
  }
}

/**
 * Helper function to check if a response is a Supabase error
 */
export function isSupabaseError(error: any): boolean {
  return error && 
    typeof error === 'object' && 
    'code' in error &&
    'message' in error;
}
