import { toast } from 'sonner';
import { fetchApi } from './apiClient';
import { handleApiError } from '@/utils/api/errorHandling';
import { useState } from 'react';
export function useProtectedApi(apiFunction, options = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const execute = async (params) => {
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
        }
        catch (err) {
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
        }
        finally {
            setIsLoading(false);
        }
    };
    return { execute, isLoading, error };
}
export function useApiClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const execute = async (endpoint, method = 'GET', data, additionalHeaders) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fetchApi(endpoint, method, data, additionalHeaders);
            return result;
        }
        catch (err) {
            setError(err);
            handleApiError(err);
            throw err;
        }
        finally {
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
