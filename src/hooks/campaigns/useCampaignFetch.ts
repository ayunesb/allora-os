
import { useQuery } from "@tanstack/react-query";
import { useCompanyId } from "@/hooks/useCompanyId";
import { Campaign } from "@/models/campaign";
import { fetchCompanyCampaigns } from "@/utils/campaignHelpers";

/**
 * Hook for fetching campaigns data with optimized caching
 */
export function useCampaignFetch() {
  const companyId = useCompanyId();
  
  // Fetch campaigns with optimized settings
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
    // Performance optimization settings
    staleTime: 5 * 60 * 1000, // 5 minutes before data is considered stale
    cacheTime: 10 * 60 * 1000, // 10 minutes before unused data is garbage collected
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Refetch data when component mounts
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
