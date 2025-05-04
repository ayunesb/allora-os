import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { runLangChainAgent } from '../agent';
import { toast } from 'sonner';
import { logger } from '@/utils/loggingService';
export function useAgentQuery(options) {
    const [query, setQuery] = useState('');
    const [context, setContext] = useState({});
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['agent-query', query, context],
        queryFn: async () => {
            if (!query) {
                return { result: '' };
            }
            logger.info('Executing agent query', { query, contextKeys: Object.keys(context) });
            return await runLangChainAgent({ query, context });
        },
        enabled: options.enabled !== false && !!query,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        meta: {
            onSettled: (_data, error) => {
                if (error) {
                    toast.error("Agent query failed", { description: error.message });
                    if (options.onError)
                        options.onError(error);
                }
            }
        }
    });
    const executeQuery = async (newQuery, newContext) => {
        try {
            setQuery(newQuery);
            if (newContext) {
                setContext(newContext);
            }
            const result = await refetch();
            if (result.data && !result.error && options.onSuccess) {
                options.onSuccess(result.data);
            }
            return result.data;
        }
        catch (err) {
            logger.error('Error executing agent query', err);
            toast.error("Failed to run agent query", { description: err.message });
            throw err;
        }
    };
    return {
        executeQuery,
        result: data?.result || '',
        toolCalls: data?.toolCalls || [],
        isLoading: isLoading || isFetching,
        error: error || data?.error,
        setContext
    };
}
