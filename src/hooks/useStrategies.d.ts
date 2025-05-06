import { Strategy } from "@/models/strategy";
export declare function useStrategies(): {
  strategies: Strategy[];
  isLoading: boolean;
  error: Error;
  createStrategy: (
    strategyData: Omit<Strategy, "id" | "created_at">,
  ) => Promise<any>;
  isCreating: boolean;
  updateStrategy: (
    strategyId: string,
    updates: Partial<Omit<Strategy, "id" | "created_at">>,
  ) => Promise<boolean>;
  isUpdating: boolean;
  deleteStrategy: (strategyId: string) => Promise<boolean>;
  isDeleting: boolean;
  refetch: () => Promise<void>;
};
