
import { useState } from "react";
import { toast } from "sonner";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { useAiMemory } from "@/hooks/useAiMemory";

export function useCampaignTracking() {
  const [isTrackingView, setIsTrackingView] = useState(false);
  const [isTrackingApprove, setIsTrackingApprove] = useState(false);
  
  const { trackAction } = useSelfLearning();
  const { storeInteraction } = useAiMemory();

  /**
   * Track when a user views a campaign's details
   */
  const trackCampaignView = async (campaignId: string, campaignName: string) => {
    setIsTrackingView(true);
    
    try {
      await trackAction(
        'view_campaign',
        'campaign_management',
        campaignId,
        'campaign',
        { 
          name: campaignName,
          timestamp: new Date().toISOString()
        }
      );
    } catch (error) {
      console.error("Error tracking campaign view:", error);
    } finally {
      setIsTrackingView(false);
    }
  };

  /**
   * Track when a user approves (likes) an AI recommendation on a campaign
   */
  const trackCampaignApprove = async (campaignId: string, campaignName: string, executiveBot?: string) => {
    setIsTrackingApprove(true);
    
    try {
      // Track the approval action
      await trackAction(
        'approve_campaign_recommendation',
        'campaign_management',
        campaignId,
        'campaign',
        { 
          name: campaignName,
          executiveBot,
          timestamp: new Date().toISOString()
        }
      );
      
      // Store the interaction for the bot's memory if we have an executive
      if (executiveBot) {
        const botRole = getBotRoleFromName(executiveBot);
        
        await storeInteraction(
          executiveBot,
          botRole,
          `What do you think of the ${campaignName} campaign?`,
          `I recommend proceeding with the ${campaignName} campaign. It aligns well with your business goals.`,
          { 
            campaignId,
            interactionType: 'campaign_recommendation',
            approved: true
          }
        );
      }
    } catch (error) {
      console.error("Error tracking campaign approval:", error);
    } finally {
      setIsTrackingApprove(false);
    }
  };

  // Helper function to extract bot role from executive name
  const getBotRoleFromName = (executiveName: string): string => {
    // In a real app, we would look up the role from the executiveBots mapping
    return "marketing_advisor";
  };

  return {
    trackCampaignView,
    trackCampaignApprove,
    isTrackingView,
    isTrackingApprove
  };
}
