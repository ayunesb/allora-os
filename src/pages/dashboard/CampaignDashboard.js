var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaigns } from "@/hooks/campaigns";
import { useFilteredCampaigns } from "@/hooks/campaigns/useFilteredCampaigns";
import { useAdPlatformConnections } from "@/hooks/campaigns/useAdPlatformConnections";
import { refreshCampaignData } from "@/components/campaigns/dashboard/CampaignRefresh";
import { toast } from "sonner";
import { refreshData } from "@/utils/shared/dataRefresh";
// Component imports
import { CampaignHeader } from "@/components/campaigns/dashboard/CampaignHeader";
import { CampaignStats } from "@/components/campaigns/dashboard/CampaignStats";
import { CampaignTabs } from "@/components/campaigns/dashboard/CampaignTabs";
import { CampaignList } from "@/components/campaigns/dashboard/CampaignList";
import { CampaignLoadingState } from "@/components/campaigns/LoadingState";
/**
 * CampaignDashboard Component
 *
 * Provides a centralized view for managing all marketing campaigns
 * with filtering, refresh capabilities, and creation workflow.
 */
export default function CampaignDashboard() {
    const navigate = useNavigate();
    const { campaigns, isLoading, refetch } = useCampaigns();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const { hasAdPlatformConnections } = useAdPlatformConnections();
    // Get filtered campaigns based on active tab
    const filteredCampaigns = useFilteredCampaigns(campaigns, activeTab);
    /**
     * Navigates to campaign creation or ad account connection page
     * based on whether the user has connected ad platforms
     */
    const handleCreateCampaign = () => {
        if (hasAdPlatformConnections) {
            navigate("/dashboard/campaigns/create");
        }
        else {
            navigate("/dashboard/ad-accounts");
        }
    };
    /**
     * Refreshes campaign data from ad platforms
     * Returns a Promise to match the expected type in CampaignHeader
     */
    const handleRefreshData = () => __awaiter(this, void 0, void 0, function* () {
        try {
            // Use the shared refreshData utility for consistent refresh behavior
            return refreshData({
                fetchFn: () => __awaiter(this, void 0, void 0, function* () {
                    // Call the specific campaign refresh function
                    yield refreshCampaignData({
                        campaigns: campaigns,
                        onComplete: () => __awaiter(this, void 0, void 0, function* () {
                            yield refetch();
                        }),
                        setIsRefreshing,
                    });
                }),
                onComplete: () => __awaiter(this, void 0, void 0, function* () {
                    yield refetch();
                }),
                setIsRefreshing,
                successMessage: "Campaign data refreshed successfully",
                errorMessage: "Failed to refresh campaign data",
            });
        }
        catch (error) {
            console.error("Error refreshing campaigns:", error);
            toast.error("Failed to refresh campaign data");
            setIsRefreshing(false);
            return Promise.resolve();
        }
    });
    if (isLoading) {
        return _jsx(CampaignLoadingState, {});
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx(CampaignHeader, { onRefresh: handleRefreshData, onCreateCampaign: handleCreateCampaign, isRefreshing: isRefreshing }), _jsx(CampaignStats, { campaigns: campaigns }), _jsx(CampaignTabs, { activeTab: activeTab, onTabChange: setActiveTab }), _jsx(CampaignList, { campaigns: campaigns, filteredCampaigns: filteredCampaigns, onCreateCampaign: handleCreateCampaign })] }));
}
