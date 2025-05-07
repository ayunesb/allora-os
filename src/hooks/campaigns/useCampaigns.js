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
import { useState, useCallback } from "react";
import { useApiClient } from "@/utils/api/enhancedApiClient";
import { toast } from "sonner";
export function useCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const { execute } = useApiClient();
    const fetchCampaigns = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield execute("/api/campaigns", "GET");
            setCampaigns(result);
            return result;
        }
        catch (err) {
            setError(err.message || "Failed to fetch campaigns");
            toast.error(err.message || "Failed to fetch campaigns");
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }), [execute]);
    const fetchCampaignById = useCallback((campaignId) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            return yield execute(`/api/campaigns/${campaignId}`, "GET");
        }
        catch (err) {
            setError(err.message || "Failed to fetch campaign");
            toast.error(err.message || "Failed to fetch campaign");
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }), [execute]);
    const createCampaign = useCallback((params) => __awaiter(this, void 0, void 0, function* () {
        setIsCreating(true);
        setError(null);
        try {
            const result = yield execute("/api/campaigns", "POST", params);
            setCampaigns((prev) => [...prev, result]);
            toast.success("Campaign created successfully");
            return result;
        }
        catch (err) {
            setError(err.message || "Failed to create campaign");
            toast.error(err.message || "Failed to create campaign");
            throw err;
        }
        finally {
            setIsCreating(false);
        }
    }), [execute]);
    const updateCampaign = useCallback((params) => __awaiter(this, void 0, void 0, function* () {
        setIsUpdating(true);
        setError(null);
        try {
            const { id } = params, updateData = __rest(params, ["id"]);
            const result = yield execute(`/api/campaigns/${id}`, "PUT", updateData);
            setCampaigns((prev) => prev.map((campaign) => (campaign.id === id ? result : campaign)));
            toast.success("Campaign updated successfully");
            return result;
        }
        catch (err) {
            setError(err.message || "Failed to update campaign");
            toast.error(err.message || "Failed to update campaign");
            throw err;
        }
        finally {
            setIsUpdating(false);
        }
    }), [execute]);
    const deleteCampaign = useCallback((campaignId) => __awaiter(this, void 0, void 0, function* () {
        setIsDeleting(true);
        setError(null);
        try {
            yield execute(`/api/campaigns/${campaignId}`, "DELETE");
            setCampaigns((prev) => prev.filter((campaign) => campaign.id !== campaignId));
            toast.success("Campaign deleted successfully");
        }
        catch (err) {
            setError(err.message || "Failed to delete campaign");
            toast.error(err.message || "Failed to delete campaign");
            throw err;
        }
        finally {
            setIsDeleting(false);
        }
    }), [execute]);
    // Add refetch as an alias for fetchCampaigns for compatibility
    const refetch = fetchCampaigns;
    return {
        campaigns,
        isLoading,
        isCreating,
        isUpdating,
        isDeleting,
        error,
        fetchCampaigns,
        fetchCampaignById,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        refetch,
    };
}
