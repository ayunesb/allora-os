import { Strategy } from "@/models/strategy";
export declare function useStrategies(): {
    strategies: Strategy[];
    isLoading: boolean;
    error: Error;
    refetch: () => Promise<void>;
};
