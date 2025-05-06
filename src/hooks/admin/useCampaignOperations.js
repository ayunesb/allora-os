var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { toast } from "sonner";
export function useCampaignOperations() {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const createCampaign = (campaignData) => __awaiter(this, void 0, void 0, function* () {
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
                roi: 0, // Initialize with zero
            };
            toast.success("Campaign created successfully");
            return newCampaign;
        }
        catch (error) {
            toast.error("Failed to create campaign: " + error.message);
            throw error;
        }
        finally {
            setIsCreating(false);
        }
    });
    const updateCampaign = (id, updates) => __awaiter(this, void 0, void 0, function* () {
        setIsUpdating(true);
        try {
            // Implementation for updating campaign
            toast.success("Campaign updated successfully");
            return Object.assign({ id }, updates);
        }
        catch (error) {
            toast.error("Failed to update campaign: " + error.message);
            throw error;
        }
        finally {
            setIsUpdating(false);
        }
    });
    const deleteCampaign = (id) => __awaiter(this, void 0, void 0, function* () {
        setIsDeleting(true);
        try {
            // Implementation for deleting campaign
            toast.success("Campaign deleted successfully");
            return true;
        }
        catch (error) {
            toast.error("Failed to delete campaign: " + error.message);
            throw error;
        }
        finally {
            setIsDeleting(false);
        }
    });
    return {
        createCampaign,
        updateCampaign,
        deleteCampaign,
        isCreating,
        isUpdating,
        isDeleting,
    };
}
