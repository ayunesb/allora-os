
import { useCallback } from 'react';
import { useSelfLearning } from '@/hooks/useSelfLearning';

export function useCampaignTracking() {
  const { trackAction } = useSelfLearning();
  
  const trackCampaignView = useCallback((campaignId: string, campaignName: string) => {
    trackAction(
      'view_campaign',
      'campaign_view',
      campaignId,
      'campaign',
      { 
        campaignId,
        name: campaignName
      }
    );
  }, [trackAction]);
  
  const trackCampaignApprove = useCallback((campaignId: string, campaignName: string, executiveName: string) => {
    trackAction(
      'approve_campaign',
      'campaign_feedback',
      campaignId,
      'campaign',
      { 
        campaignId,
        name: campaignName,
        executiveName
      }
    );
  }, [trackAction]);
  
  return {
    trackCampaignView,
    trackCampaignApprove
  };
}
