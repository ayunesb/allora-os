
import { useCampaignFetch } from "./useCampaignFetch";
import { useCampaignMutations } from "./useCampaignMutations";

/**
 * Main hook for campaign management
 * Composes functionality from fetch and mutation hooks
 */
export function useCampaigns() {
  const { 
    campaigns, 
    isLoading, 
    isError,
    error,
    refetch,
    companyId
  } = useCampaignFetch();
  
  const {
    createCampaign,
    isCreating,
    updateCampaign,
    isUpdating,
    deleteCampaign,
    isDeleting
  } = useCampaignMutations(companyId);

  return {
    campaigns,
    isLoading,
    isError,
    error,
    refetch,
    createCampaign,
    isCreating,
    updateCampaign,
    isUpdating,
    deleteCampaign,
    isDeleting
  };
}
