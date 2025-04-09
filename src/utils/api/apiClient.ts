
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
  status: 'success' | 'error';
};

/**
 * Wrapper for Supabase API calls with consistent error handling
 * @param apiCall - The function making the Supabase API call
 * @param options - Configuration options for the API call
 * @returns Standardized API response
 */
export async function apiRequest<T>(
  apiCall: () => Promise<any>,
  options: {
    errorMessage?: string;
    showErrorToast?: boolean;
    showSuccessToast?: boolean;
    successMessage?: string;
  } = {}
): Promise<ApiResponse<T>> {
  const {
    errorMessage = 'An error occurred',
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = 'Operation completed successfully'
  } = options;

  try {
    const response = await apiCall();
    
    // Handle Supabase error format
    if (response.error) {
      throw {
        message: response.error.message || errorMessage,
        status: response.error.status,
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
