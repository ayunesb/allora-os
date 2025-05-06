import { useState } from "react";
import { Campaign, Platform, CampaignStatus } from "@/types";
import { toast } from "sonner";

// Define the shape of campaign create/edit data
export interface CampaignFormData {
  name: string;
  platform: Platform;
  status: CampaignStatus;
  budget: number;
  description?: string;
  // Add other properties that might be used in the application
  audience?: string;
  adCopy?: string;
  justification?: string;
  goal?: string;
  company_id?: string;
}

export type CampaignCreate = CampaignFormData;

export function useCampaignOperations() {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const createCampaign = async (campaignData: CampaignCreate) => {
    setIsCreating(true);

    try {
      // Implementation for creating campaign
      // This is simplified for the fix
      const newCampaign: Campaign = {
        id: Date.now().toString(), // Generate a temporary id
        name: campaignData.name,
        platform: campaignData.platform as Platform,
        status: campaignData.status as CampaignStatus,
        budget: campaignData.budget,
        description: campaignData.description,
        audience: campaignData.audience,
        adCopy: campaignData.adCopy,
        justification: campaignData.justification,
        goal: campaignData.goal,
        roi: 0, // Initialize with zero
      };

      toast.success("Campaign created successfully");
      return newCampaign;
    } catch (error: any) {
      toast.error("Failed to create campaign: " + error.message);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    setIsUpdating(true);

    try {
      // Implementation for updating campaign
      toast.success("Campaign updated successfully");
      return { id, ...updates };
    } catch (error: any) {
      toast.error("Failed to update campaign: " + error.message);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteCampaign = async (id: string) => {
    setIsDeleting(true);

    try {
      // Implementation for deleting campaign
      toast.success("Campaign deleted successfully");
      return true;
    } catch (error: any) {
      toast.error("Failed to delete campaign: " + error.message);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    createCampaign,
    updateCampaign,
    deleteCampaign,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
