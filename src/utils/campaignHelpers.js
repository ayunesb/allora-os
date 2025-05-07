var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
export function fetchCompanyCampaigns(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("campaigns")
                .select("*")
                .eq("company_id", companyId)
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            // Cast the data to ensure it matches the Campaign type
            return (data || []).map((campaign) => (Object.assign(Object.assign({}, campaign), { platform: campaign.platform })));
        }
        catch (error) {
            console.error("Error fetching campaigns:", error.message);
            return [];
        }
    });
}
export function fetchCampaign(campaignId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("campaigns")
                .select("*")
                .eq("id", campaignId)
                .single();
            if (error) {
                throw error;
            }
            // Cast the data to ensure it matches the Campaign type
            return data
                ? Object.assign(Object.assign({}, data), { platform: data.platform }) : null;
        }
        catch (error) {
            console.error("Error fetching campaign:", error.message);
            return null;
        }
    });
}
export function createCampaign(companyId, name, platform, budget) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("campaigns")
                .insert([
                {
                    company_id: companyId,
                    name,
                    platform,
                    budget,
                },
            ])
                .select()
                .single();
            if (error) {
                throw error;
            }
            toast.success("Campaign created successfully");
            // Cast the data to ensure it matches the Campaign type
            return data
                ? Object.assign(Object.assign({}, data), { platform: data.platform }) : null;
        }
        catch (error) {
            toast.error(`Failed to create campaign: ${error.message}`);
            return null;
        }
    });
}
export function updateCampaign(campaignId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("campaigns")
                .update(updates)
                .eq("id", campaignId);
            if (error) {
                throw error;
            }
            toast.success("Campaign updated successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to update campaign: ${error.message}`);
            return false;
        }
    });
}
export function deleteCampaign(campaignId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("campaigns")
                .delete()
                .eq("id", campaignId);
            if (error) {
                throw error;
            }
            toast.success("Campaign deleted successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to delete campaign: ${error.message}`);
            return false;
        }
    });
}
