
import { useQuery } from "@tanstack/react-query";
import { useCompanyId } from "@/hooks/useCompanyId";
import { Campaign } from "@/models/campaign";
import { fetchCompanyCampaigns } from "@/utils/campaignHelpers";

/**
 * Hook for fetching campaigns data
 */
export function useCampaignFetch() {
  const companyId = useCompanyId();
  
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
  
  return {
    campaigns: campaigns || [],
    isLoading,
    isError,
    error,
    refetch,
    companyId
  };
}
