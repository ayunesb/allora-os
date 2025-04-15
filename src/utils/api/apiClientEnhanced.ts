
import { toast } from 'sonner';
import { fetchApi } from './apiClient';
import { ErrorType } from '@/utils/errorHandling/errorTypes';
import { handleApiError } from '@/utils/errorHandling/errorHandler';

export function useApiClient() {
  const isLoading = false; // This would be state in a real implementation
  const error = null; // This would be state in a real implementation

  const execute = async <T, U = any>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: U,
    additionalHeaders?: Record<string, string>
  ): Promise<T> => {
    try {
      return await fetchApi<T>(endpoint, method, data, additionalHeaders);
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  return {
    fetchApi,
    execute,
    isLoading,
    error
  };
}
