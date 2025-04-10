
import { useState } from 'react';
import { createCampaign as createCampaignHelper, updateCampaign as updateCampaignHelper, deleteCampaign as deleteCampaignHelper } from '@/utils/campaignHelpers';
import { Platform, Campaign, CampaignStatus } from '@/models/campaign';
import { toast } from 'sonner';
import { triggerBusinessEvent } from '@/lib/zapier';
import { onCampaignLaunched } from '@/utils/zapierEventTriggers';

export function useCampaignMutations(companyId: string) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const createCampaign = async (
    campaignData: {
      name: string;
      platform: Platform;
      budget: number;
      status?: CampaignStatus;
      executiveBot?: string;
      justification?: string;
      roi?: string;
    }
  ) => {
    setIsCreating(true);
    try {
      const result = await createCampaignHelper(
        companyId,
        campaignData.name,
        campaignData.platform,
        campaignData.budget
      );
      
      if (result) {
        // Original business event trigger for backward compatibility
        await triggerBusinessEvent('campaign_created', {
          companyId,
          entityId: result.id,
          entityType: 'campaign',
          name: result.name,
          platform: result.platform,
          budget: result.budget,
          status: result.status || 'Draft',
          botName: campaignData.executiveBot || 'Marketing AI',
          timestamp: new Date().toISOString()
        });
        
        // If the campaign is created with Active status, treat it as launched
        if (campaignData.status === 'Active') {
          await onCampaignLaunched({
            campaignId: result.id,
            companyId: companyId,
            campaignTitle: result.name,
            platform: result.platform,
            owner: campaignData.executiveBot || 'Marketing AI'
          });
        }
        
        console.log('Campaign created and Zapier events triggered', result);
        return result;
      }
      return null;
    } catch (error: any) {
      toast.error(`Failed to create campaign: ${error.message}`);
      console.error('Error creating campaign:', error);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const updateCampaign = async (
    campaignData: Partial<Campaign & { status?: CampaignStatus }> & { id: string }
  ) => {
    setIsUpdating(true);
    try {
      const { id, ...updates } = campaignData;
      
      // Special tracking for campaign approval events
      const isApprovalEvent = updates.status === 'Approved' || updates.status === 'Active';
      
      // Get the original campaign to check if status is changing from non-active to active
      const isActivationEvent = 
        updates.status === 'Active' && 
        (await getCurrentCampaignStatus(id)) !== 'Active';
      
      const success = await updateCampaignHelper(id, updates);
      
      if (success) {
        // Determine the appropriate event type
        const eventType = isApprovalEvent ? 'campaign_approved' : 'campaign_updated';
        
        // Original business event trigger for backward compatibility
        await triggerBusinessEvent(eventType, {
          companyId,
          entityId: id,
          entityType: 'campaign',
          ...updates,
          timestamp: new Date().toISOString()
        });
        
        // If campaign is being activated, trigger the campaign launched event
        if (isActivationEvent && campaignData.name) {
          await onCampaignLaunched({
            campaignId: id,
            companyId: companyId,
            campaignTitle: campaignData.name,
            platform: campaignData.platform || 'unknown',
            owner: typeof campaignData.executiveBot === 'string' 
              ? campaignData.executiveBot 
              : (campaignData.executiveBot?.name || 'Marketing AI')
          });
        }
        
        console.log(`Campaign ${eventType} and Zapier events triggered`, { id, ...updates });
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(`Failed to update campaign: ${error.message}`);
      console.error('Error updating campaign:', error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper function to get current campaign status
  async function getCurrentCampaignStatus(campaignId: string): Promise<CampaignStatus | undefined> {
    try {
      const campaign = await fetchCampaign(campaignId);
      return campaign?.status;
    } catch (error) {
      console.error("Error getting campaign status:", error);
      return undefined;
    }
  }
  
  // Helper function to fetch a single campaign
  async function fetchCampaign(campaignId: string): Promise<Campaign | null> {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Error fetching campaign:", error);
      return null;
    }
  }

  const deleteCampaign = async (id: string) => {
    setIsDeleting(true);
    try {
      const success = await deleteCampaignHelper(id);
      
      if (success) {
        // Trigger the Zapier business event for campaign deletion
        await triggerBusinessEvent('campaign_deleted', {
          companyId,
          entityId: id,
          entityType: 'campaign',
          timestamp: new Date().toISOString()
        });
        
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(`Failed to delete campaign: ${error.message}`);
      console.error('Error deleting campaign:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    createCampaign,
    isCreating,
    updateCampaign,
    isUpdating,
    deleteCampaign,
    isDeleting
  };
}
