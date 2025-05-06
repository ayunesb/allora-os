import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface ExternalAgentQuery {
  query: string;
  context?: Record<string, any>;
}

interface ExternalAgentResponse {
  result: string;
  error?: string;
}

export function useExternalLangChainAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executeQuery = async (params: ExternalAgentQuery): Promise<ExternalAgentResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const apiEndpoint = localStorage.getItem('langchain_api_endpoint');
      
      if (!apiEndpoint) {
        throw new Error("LangChain API endpoint not configured. Please set up the API endpoint in the settings.");
      }
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: params.query,
          context: params.context || {}
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
      }
      
      const data = await response.json();
      
      if (!data.result) {
        throw new Error("API response missing result data");
      }
      
      setResult(data.result);
      return { result: data.result };
    } catch (err: any) {
      const errorMessage = err.message || 'An unknown error occurred';
      setError(errorMessage);
      const toastConfig = {
        title: 'Error',
        description: 'API failure',
        variant: 'destructive' as const, // Use proper typing
        children: 'Error details', // Added missing 'children' property
      };
      toast(toastConfig);
      return { result: '', error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeQuery,
    isLoading,
    result,
    error,
    clearResult: () => setResult(null),
    clearError: () => setError(null),
  };
}
