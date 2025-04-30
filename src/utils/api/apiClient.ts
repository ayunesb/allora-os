
/**
 * API client options interface
 */
export interface ApiRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  timeout?: number;
  retry?: boolean;
  maxRetries?: number;
  cacheTTL?: number;
  cacheKey?: string;
  successMessage?: string;
  errorMessage?: string;
}

// API function type that handles both fetch and Supabase queries
export type ApiFetchFunction = (() => Promise<Response>) | (() => Promise<{ data: any; error?: any }>);

/**
 * Core API request function
 */
export const apiRequest = async <T>(
  fetchFunction: ApiFetchFunction,
  options: ApiRequestOptions = {}
): Promise<{ data: T | null; error: Error | null; status: 'success' | 'error' }> => {
  try {
    const response = await fetchFunction();
    
    // Handle both standard fetch responses and Supabase responses
    if ('ok' in response) {
      // Standard fetch response
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      return { data, error: null, status: 'success' };
    } else {
      // Supabase response
      if (response.error) {
        throw new Error(response.error.message || 'Unknown Supabase error');
      }
      return { data: response.data, error: null, status: 'success' };
    }
  } catch (error) {
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Unknown error'), 
      status: 'error' 
    };
  }
};

// API cache management
const apiCache = new Map<string, { data: any; timestamp: number }>();

export const clearApiCache = (endpoint?: string) => {
  if (endpoint) {
    apiCache.delete(endpoint);
  } else {
    apiCache.clear();
  }
};

// Expose the clearApiCache function globally
if (typeof window !== 'undefined') {
  window.clearApiCache = clearApiCache;
}

// Add the clearApiCache to the Window interface
declare global {
  interface Window {
    clearApiCache: (endpoint?: string) => void;
  }
}

/**
 * Fetch API wrapper for making HTTP requests with enhanced features
 */
export const fetchApi = async <T>(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  additionalHeaders?: Record<string, string>
): Promise<T> => {
  const headers = {
    'Content-Type': 'application/json',
    ...(additionalHeaders || {}),
  };

  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage: string;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || `API error: ${response.status}`;
    } catch {
      errorMessage = errorText || `API error: ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};
