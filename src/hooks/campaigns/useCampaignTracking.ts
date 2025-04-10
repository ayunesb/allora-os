
import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSelfLearning } from '@/hooks/useSelfLearning';
import { toast } from 'sonner';

export function useCampaignTracking() {
  const { user } = useAuth();
  const { trackAction } = useSelfLearning();
  
  /**
   * Track when a user views a campaign detail
   */
  const trackCampaignView = useCallback((campaignId: string, name: string) => {
    if (!user?.id) return;
    
    trackAction(
      'view_campaign',
      'campaign_view',
      campaignId,
      'campaign',
      { name }
    );
  }, [user, trackAction]);
  
  /**
   * Track when a user approves a campaign
   */
  const trackCampaignApprove = useCallback((campaignId: string, name: string, executiveBot?: string) => {
    if (!user?.id) return;
    
    trackAction(
      'campaign_approve',
      'campaign_feedback',
      campaignId,
      'campaign',
      { 
        name,
        executiveBot,
        action: 'approve'
      }
    );
    
    toast.success('Campaign approved! Our AI will learn from your preference.');
  }, [user, trackAction]);
  
  /**
   * Track when a user rejects a campaign
   */
  const trackCampaignReject = useCallback((campaignId: string, name: string, executiveBot?: string, reason?: string) => {
    if (!user?.id) return;
    
    trackAction(
      'campaign_reject',
      'campaign_feedback',
      campaignId,
      'campaign',
      { 
        name,
        executiveBot,
        reason,
        action: 'reject' 
      }
    );
    
    toast.success('Feedback recorded. We'll improve our recommendations.');
  }, [user, trackAction]);
  
  return {
    trackCampaignView,
    trackCampaignApprove,
    trackCampaignReject,
    isLoggedIn: !!user?.id
  };
}
