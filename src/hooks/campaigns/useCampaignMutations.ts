
import { useState } from 'react';
import { createCampaign as createCampaignHelper, updateCampaign as updateCampaignHelper, deleteCampaign as deleteCampaignHelper } from '@/utils/campaignHelpers';
import { Platform, Campaign } from '@/models/campaign';
import { toast } from 'sonner';
import { triggerBusinessEvent } from '@/lib/zapier';

export function useCampaignMutations(companyId: string) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const createCampaign = async (
    campaignData: {
      name: string;
      platform: Platform;
      budget: number;
      status?: string;
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
        // Trigger the Zapier business event for campaign creation
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
        
        console.log('Campaign created and Zapier event triggered', result);
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
    campaignData: Partial<Campaign> & { id: string }
  ) => {
    setIsUpdating(true);
    try {
      const { id, ...updates } = campaignData;
      
      // Special tracking for campaign approval events
      const isApprovalEvent = updates.status === 'Approved' || updates.status === 'Active';
      
      const success = await updateCampaignHelper(id, updates);
      
      if (success) {
        // Determine the appropriate event type
        const eventType = isApprovalEvent ? 'campaign_approved' : 'campaign_updated';
        
        // Trigger the Zapier business event for campaign update/approval
        await triggerBusinessEvent(eventType, {
          companyId,
          entityId: id,
          entityType: 'campaign',
          ...updates,
          timestamp: new Date().toISOString()
        });
        
        console.log(`Campaign ${eventType} and Zapier event triggered`, { id, ...updates });
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
