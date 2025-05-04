import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
export function useExternalLangChainAPI() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const executeQuery = async (params) => {
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
        }
        catch (err) {
            const errorMessage = err.message || 'An unknown error occurred';
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "LangChain API Error",
                description: errorMessage,
            });
            return { result: '', error: errorMessage };
        }
        finally {
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
