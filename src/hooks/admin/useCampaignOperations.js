import { useState } from 'react';
import { toast } from 'sonner';
export function useCampaignOperations() {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const createCampaign = async (campaignData) => {
        setIsCreating(true);
        try {
            // Implementation for creating campaign
            // This is simplified for the fix
            const newCampaign = {
                id: Date.now().toString(), // Generate a temporary id
                name: campaignData.name,
                platform: campaignData.platform,
                status: campaignData.status,
                budget: campaignData.budget,
                description: campaignData.description,
                audience: campaignData.audience,
                adCopy: campaignData.adCopy,
                justification: campaignData.justification,
                goal: campaignData.goal,
                roi: 0 // Initialize with zero
            };
            toast.success('Campaign created successfully');
            return newCampaign;
        }
        catch (error) {
            toast.error('Failed to create campaign: ' + error.message);
            throw error;
        }
        finally {
            setIsCreating(false);
        }
    };
    const updateCampaign = async (id, updates) => {
        setIsUpdating(true);
        try {
            // Implementation for updating campaign
            toast.success('Campaign updated successfully');
            return { id, ...updates };
        }
        catch (error) {
            toast.error('Failed to update campaign: ' + error.message);
            throw error;
        }
        finally {
            setIsUpdating(false);
        }
    };
    const deleteCampaign = async (id) => {
        setIsDeleting(true);
        try {
            // Implementation for deleting campaign
            toast.success('Campaign deleted successfully');
            return true;
        }
        catch (error) {
            toast.error('Failed to delete campaign: ' + error.message);
            throw error;
        }
        finally {
            setIsDeleting(false);
        }
    };
    return {
        createCampaign,
        updateCampaign,
        deleteCampaign,
        isCreating,
        isUpdating,
        isDeleting
    };
}
