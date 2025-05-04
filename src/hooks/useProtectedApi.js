import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
export function useProtectedApi() {
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();
    const makeRequest = async (options) => {
        const { url, method = 'GET', headers = {}, body, skipAuthCheck = false, quiet = false } = options;
        setIsLoading(true);
        try {
            // Check if user is authenticated unless explicitly skipped
            if (!skipAuthCheck && (!auth.user || !auth.session)) {
                throw new Error('User not authenticated');
            }
            // Prepare request headers with authentication token if available
            const requestHeaders = {
                'Content-Type': 'application/json',
                ...headers,
            };
            // Add auth token if available
            if (auth.session?.access_token) {
                requestHeaders['Authorization'] = `Bearer ${auth.session.access_token}`;
            }
            // Make the API request
            const response = await fetch(url, {
                method,
                headers: requestHeaders,
                body: body ? JSON.stringify(body) : undefined,
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Network response was not ok' }));
                throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            setIsLoading(false);
            return data;
        }
        catch (error) {
            setIsLoading(false);
            if (!quiet) {
                toast.error('API request failed', {
                    description: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
            throw error;
        }
    };
    return { makeRequest, isLoading };
}
export default useProtectedApi;
