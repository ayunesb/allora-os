
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCampaign, updateCampaign, deleteCampaign } from "@/utils/campaignHelpers";
import { Platform } from "@/models/campaign";

/**
 * Hook for campaign create, update, and delete mutations
 */
export function useCampaignMutations(companyId: string | undefined) {
  const queryClient = useQueryClient();
  
  // Create campaign
  const createMutation = useMutation({
    mutationFn: (newCampaign: { 
      name: string; 
      platform: Platform;
      budget: number;
      [key: string]: any;
    }) => {
      if (!companyId) throw new Error("No company ID available");
      return createCampaign(
        companyId,
        newCampaign.name,
        newCampaign.platform,
        newCampaign.budget
      );
    },
    onSuccess: () => {
      toast.success("Campaign created successfully");
      queryClient.invalidateQueries({ queryKey: ['campaigns', companyId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to create campaign: ${error.message}`);
    }
  });
  
  // Update campaign
  const updateMutation = useMutation({
    mutationFn: (updatedCampaign: { 
      id: string; 
      name?: string; 
      platform?: Platform;
      budget?: number;
      [key: string]: any;
    }) => {
      return updateCampaign(
        updatedCampaign.id,
        {
          name: updatedCampaign.name,
          platform: updatedCampaign.platform,
          budget: updatedCampaign.budget,
          status: updatedCampaign.status,
          executiveBot: updatedCampaign.executiveBot,
          justification: updatedCampaign.justification,
          roi: updatedCampaign.roi
        }
      );
    },
    onSuccess: () => {
      toast.success("Campaign updated successfully");
      queryClient.invalidateQueries({ queryKey: ['campaigns', companyId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update campaign: ${error.message}`);
    }
  });
  
  // Delete campaign
  const deleteMutation = useMutation({
    mutationFn: (campaignId: string) => {
      return deleteCampaign(campaignId);
    },
    onSuccess: () => {
      toast.success("Campaign deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['campaigns', companyId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to delete campaign: ${error.message}`);
    }
  });

  return {
    createCampaign: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCampaign: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCampaign: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
}
