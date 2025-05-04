import { useCallback } from 'react';
import { useSelfLearning } from '@/hooks/useSelfLearning';
export function useCampaignTracking() {
    const { trackAction } = useSelfLearning();
    const trackCampaignView = useCallback((campaignId, campaignName) => {
        trackAction('view_campaign', 'campaign_view', campaignId, 'campaign', {
            campaignId,
            name: campaignName
        });
    }, [trackAction]);
    const trackCampaignApprove = useCallback((campaignId, campaignName, executiveName) => {
        trackAction('approve_campaign', 'campaign_feedback', campaignId, 'campaign', {
            campaignId,
            name: campaignName,
            executiveName
        });
    }, [trackAction]);
    return {
        trackCampaignView,
        trackCampaignApprove
    };
}
