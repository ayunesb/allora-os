
import { useCompanyId } from "@/hooks/useCompanyId";
import { Campaign } from "@/models/campaign";
import { fetchCompanyCampaigns, createCampaign, updateCampaign, deleteCampaign } from "@/utils/campaignHelpers";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCampaigns() {
  const companyId = useCompanyId();
  const queryClient = useQueryClient();
  
  // Fetch campaigns
  const {
    data: campaigns,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['campaigns', companyId],
    queryFn: () => fetchCompanyCampaigns(companyId || ''),
    enabled: !!companyId,
  });
  
  // Create campaign
  const createMutation = useMutation({
    mutationFn: (newCampaign: { 
      name: string; 
      platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok';
      budget: number;
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
      platform?: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok';
      budget?: number;
    }) => {
      return updateCampaign(
        updatedCampaign.id,
        {
          name: updatedCampaign.name,
          platform: updatedCampaign.platform,
          budget: updatedCampaign.budget
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
    campaigns: campaigns || [],
    isLoading,
    isError,
    error,
    refetch,
    createCampaign: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCampaign: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCampaign: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
}
