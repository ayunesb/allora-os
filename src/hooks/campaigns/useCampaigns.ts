
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useCampaignFetch } from "./useCampaignFetch";
import { Campaign, CampaignCreate, CampaignUpdate } from "@/models/campaign";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "@/context/AuthContext";
import { useCampaignMutations } from "./useCampaignMutations";
import { useSelfLearning } from "../useSelfLearning";
import { standardizeApiResponse } from "@/utils/api/responseHandler";

export function useCampaigns() {
  const { campaigns, isLoading, isError, error, refetch, companyId } = useCampaignFetch();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { createCampaignMutation, updateCampaignMutation, deleteCampaignMutation } = useCampaignMutations();
  const { trackAction } = useSelfLearning();
  const { profile } = useAuth();
  
  const createCampaign = useCallback(async (campaignData: CampaignCreate) => {
    if (!companyId) {
      toast.error("Company ID not found");
      return null;
    }
    
    setIsCreating(true);
    
    try {
      // Generate a temporary ID for optimistic updates
      const tempId = uuidv4();
      const newCampaign: Campaign = {
        id: tempId,
        company_id: companyId,
        name: campaignData.name,
        platform: campaignData.platform,
        budget: campaignData.budget,
        status: campaignData.status || "Active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        executiveBot: campaignData.executiveBot,
        justification: campaignData.justification,
        roi: campaignData.roi
      };
      
      // Track this action
      if (profile) {
        trackAction(
          'create_campaign',
          'campaign_management',
          tempId,
          'campaign',
          {
            name: campaignData.name,
            platform: campaignData.platform
          }
        );
      }
      
      // Execute the mutation
      const result = await createCampaignMutation.mutateAsync(campaignData);
      return standardizeApiResponse(result, "Campaign created successfully");
    } catch (err: any) {
      console.error("Error creating campaign:", err);
      toast.error(err?.message || "Failed to create campaign");
      return standardizeApiResponse(null, "Failed to create campaign", err);
    } finally {
      setIsCreating(false);
    }
  }, [companyId, createCampaignMutation, trackAction, profile]);
  
  const updateCampaign = useCallback(async (campaignData: CampaignUpdate) => {
    if (!campaignData.id) {
      toast.error("Campaign ID is required for updates");
      return null;
    }
    
    setIsUpdating(true);
    
    try {
      // Track this action
      if (profile) {
        trackAction(
          'update_campaign',
          'campaign_management',
          campaignData.id,
          'campaign',
          {
            name: campaignData.name,
            platform: campaignData.platform
          }
        );
      }
      
      // Execute the mutation
      const result = await updateCampaignMutation.mutateAsync(campaignData);
      return standardizeApiResponse(result, "Campaign updated successfully");
    } catch (err: any) {
      console.error("Error updating campaign:", err);
      toast.error(err?.message || "Failed to update campaign");
      return standardizeApiResponse(null, "Failed to update campaign", err);
    } finally {
      setIsUpdating(false);
    }
  }, [updateCampaignMutation, trackAction, profile]);
  
  const deleteCampaign = useCallback(async (campaignId: string) => {
    setIsDeleting(true);
    
    try {
      // Track this action
      if (profile) {
        trackAction(
          'delete_campaign',
          'campaign_management',
          campaignId,
          'campaign',
          { action: 'delete' }
        );
      }
      
      // Execute the mutation
      const result = await deleteCampaignMutation.mutateAsync(campaignId);
      return standardizeApiResponse(result, "Campaign deleted successfully");
    } catch (err: any) {
      console.error("Error deleting campaign:", err);
      toast.error(err?.message || "Failed to delete campaign");
      return standardizeApiResponse(null, "Failed to delete campaign", err);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteCampaignMutation, trackAction, profile]);
  
  return {
    campaigns,
    isLoading,
    isError,
    error,
    createCampaign,
    isCreating,
    updateCampaign,
    isUpdating,
    deleteCampaign,
    isDeleting,
    refetch
  };
}
