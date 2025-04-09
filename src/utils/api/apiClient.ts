
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { API_CONFIG } from '@/config/appConfig';
import { logger } from '@/utils/loggingService';
import { sanitizeInput } from '@/utils/sanitizers';

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
  retry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
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
    timeout = API_CONFIG.defaultTimeout,
    retry = false,
    maxRetries = API_CONFIG.retryAttempts,
    retryDelay = 1000
  } = options;

  let attempts = 0;

  // Function to execute the API call with retries
  const executeWithRetries = async (): Promise<ApiResponse<T>> => {
    attempts++;
    
    try {
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

      // Race the API call against the timeout
      const response = await Promise.race([apiCall(), timeoutPromise]);
      
      // Handle Supabase error format
      if (response.error) {
        throw {
          message: sanitizeInput(response.error.message) || errorMessage,
          status: response.error.status,
          code: response.error.code,
          details: response.error
        };
      }
      
      if (showSuccessToast) {
        toast.success(sanitizeInput(successMessage));
      }
      
      logger.info('API request successful', { 
        successMessage, 
        dataType: typeof response.data 
      });
      
      return {
        data: response.data,
        error: null,
        status: 'success'
      };
    } catch (error: any) {
      const apiError: ApiError = {
        message: sanitizeInput(error.message) || errorMessage,
        status: error.status || 500,
        code: error.code,
        details: error
      };
      
      logger.error('API Error:', apiError);
      
      // Handle retry logic
      if (retry && attempts < maxRetries) {
        logger.info(`Retrying API call (${attempts}/${maxRetries})...`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempts));
        
        // Recursive retry
        return executeWithRetries();
      }
      
      if (showErrorToast) {
        toast.error(apiError.message);
      }
      
      return {
        data: null,
        error: apiError,
        status: 'error'
      };
    }
  };

  return executeWithRetries();
}

/**
 * Helper function to safely parse JSON
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    logger.error('Failed to parse JSON:', { error: e, json: json.substring(0, 100) });
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

/**
 * Utility to create a cancellable API request
 * @returns An object with the cancel function and a token to pass to fetch
 */
export function createCancellableRequest() {
  const controller = new AbortController();
  const signal = controller.signal;
  
  return {
    cancel: () => controller.abort(),
    signal
  };
}
