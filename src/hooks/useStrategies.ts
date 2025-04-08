
import { useCompanyId } from "@/hooks/useCompanyId";
import { Strategy } from "@/models/strategy";
import { fetchCompanyStrategies, createStrategy, updateStrategy, deleteStrategy } from "@/utils/strategyHelpers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useStrategies() {
  const companyId = useCompanyId();
  const queryClient = useQueryClient();
  
  // Fetch strategies
  const {
    data: strategies,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['strategies', companyId],
    queryFn: () => fetchCompanyStrategies(companyId || ''),
    enabled: !!companyId,
  });
  
  // Create strategy
  const createMutation = useMutation({
    mutationFn: (newStrategy: { title: string; description: string; riskLevel: 'Low' | 'Medium' | 'High' }) => {
      if (!companyId) throw new Error("No company ID available");
      return createStrategy(
        companyId,
        newStrategy.title,
        newStrategy.description,
        newStrategy.riskLevel
      );
    },
    onSuccess: () => {
      toast.success("Strategy created successfully");
      queryClient.invalidateQueries({ queryKey: ['strategies', companyId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to create strategy: ${error.message}`);
    }
  });
  
  // Update strategy
  const updateMutation = useMutation({
    mutationFn: (updatedStrategy: { id: string; title?: string; description?: string; riskLevel?: 'Low' | 'Medium' | 'High' }) => {
      return updateStrategy(
        updatedStrategy.id,
        {
          title: updatedStrategy.title,
          description: updatedStrategy.description,
          risk_level: updatedStrategy.riskLevel
        }
      );
    },
    onSuccess: () => {
      toast.success("Strategy updated successfully");
      queryClient.invalidateQueries({ queryKey: ['strategies', companyId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update strategy: ${error.message}`);
    }
  });
  
  // Delete strategy
  const deleteMutation = useMutation({
    mutationFn: (strategyId: string) => {
      return deleteStrategy(strategyId);
    },
    onSuccess: () => {
      toast.success("Strategy deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['strategies', companyId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to delete strategy: ${error.message}`);
    }
  });

  return {
    strategies: strategies || [],
    isLoading,
    isError,
    error,
    refetch,
    createStrategy: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateStrategy: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteStrategy: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
}
