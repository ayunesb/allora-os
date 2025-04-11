
import { useState } from 'react';
import { Campaign } from '@/models/campaign';
import { toast } from 'sonner';
import { createCampaign as apiCreateCampaign, updateCampaign as apiUpdateCampaign, deleteCampaign as apiDeleteCampaign } from '@/utils/campaignHelpers';

export function useCampaignMutations(companyId?: string) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const createCampaign = async (campaign: Partial<Campaign>) => {
    if (!companyId) {
      toast.error("Company ID is required to create a campaign");
      return null;
    }
    
    setIsCreating(true);
    try {
      const newCampaign = await apiCreateCampaign(
        companyId,
        campaign.name || 'Unnamed Campaign',
        campaign.platform || 'Other',
        campaign.budget || 1000
      );
      
      if (newCampaign) {
        toast.success("Campaign created successfully");
        return newCampaign;
      } else {
        throw new Error("Failed to create campaign");
      }
    } catch (error: any) {
      toast.error(`Failed to create campaign: ${error.message}`);
      return null;
    } finally {
      setIsCreating(false);
    }
  };
  
  const updateCampaign = async (campaign: Campaign) => {
    setIsUpdating(true);
    try {
      const { id, ...updates } = campaign;
      
      const success = await apiUpdateCampaign(id, updates);
      
      if (success) {
        toast.success("Campaign updated successfully");
        return campaign;
      } else {
        throw new Error("Failed to update campaign");
      }
    } catch (error: any) {
      toast.error(`Failed to update campaign: ${error.message}`);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };
  
  const deleteCampaign = async (id: string) => {
    setIsDeleting(true);
    try {
      const success = await apiDeleteCampaign(id);
      
      if (success) {
        toast.success("Campaign deleted successfully");
        return true;
      } else {
        throw new Error("Failed to delete campaign");
      }
    } catch (error: any) {
      toast.error(`Failed to delete campaign: ${error.message}`);
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
