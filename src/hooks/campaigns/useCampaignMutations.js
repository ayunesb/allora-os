var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useState } from "react";
import { toast } from "sonner";
import { createCampaign as apiCreateCampaign, updateCampaign as apiUpdateCampaign, deleteCampaign as apiDeleteCampaign, } from "@/utils/campaignHelpers";
export function useCampaignMutations(companyId) {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const createCampaign = (campaign) => __awaiter(this, void 0, void 0, function* () {
        if (!companyId) {
            toast.error("Company ID is required to create a campaign");
            return null;
        }
        setIsCreating(true);
        try {
            const platformValue = campaign.platform || "meta";
            const normalizedPlatform = typeof platformValue === "string"
                ? platformValue.toLowerCase()
                : "meta";
            const newCampaign = yield apiCreateCampaign(companyId, campaign.name || "Unnamed Campaign", normalizedPlatform, campaign.budget || 1000);
            if (newCampaign) {
                toast.success("Campaign created successfully");
                return newCampaign;
            }
            else {
                throw new Error("Failed to create campaign");
            }
        }
        catch (error) {
            toast.error(`Failed to create campaign: ${error.message}`);
            return null;
        }
        finally {
            setIsCreating(false);
        }
    });
    const updateCampaign = (campaign) => __awaiter(this, void 0, void 0, function* () {
        setIsUpdating(true);
        try {
            const { id } = campaign, updates = __rest(campaign, ["id"]);
            const success = yield apiUpdateCampaign(id, updates);
            if (success) {
                toast.success("Campaign updated successfully");
                return campaign;
            }
            else {
                throw new Error("Failed to update campaign");
            }
        }
        catch (error) {
            toast.error(`Failed to update campaign: ${error.message}`);
            return null;
        }
        finally {
            setIsUpdating(false);
        }
    });
    const deleteCampaign = (id) => __awaiter(this, void 0, void 0, function* () {
        setIsDeleting(true);
        try {
            const success = yield apiDeleteCampaign(id);
            if (success) {
                toast.success("Campaign deleted successfully");
                return true;
            }
            else {
                throw new Error("Failed to delete campaign");
            }
        }
        catch (error) {
            toast.error(`Failed to delete campaign: ${error.message}`);
            return false;
        }
        finally {
            setIsDeleting(false);
        }
    });
    return {
        createCampaign,
        isCreating,
        updateCampaign,
        isUpdating,
        deleteCampaign,
        isDeleting,
    };
}
