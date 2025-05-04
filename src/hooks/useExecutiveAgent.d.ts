import { ExecutiveResponse } from '@/types/agents';
export declare function useExecutiveAgent(): {
    executeQuery: (prompt: string, executiveRole: string, options?: Record<string, any>) => Promise<ExecutiveResponse>;
    isLoading: boolean;
    response: ExecutiveResponse;
    error: string;
    reset: () => void;
};
