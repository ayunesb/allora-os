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
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { getCampaign, syncCampaignData, deployCampaign, } from "@/services/campaignService";
import CampaignMetrics from "@/components/campaigns/CampaignMetrics";
// Import refactored components
import { CampaignDetailHeader } from "@/components/campaigns/detail/CampaignDetailHeader";
import { CampaignMetricCards } from "@/components/campaigns/detail/CampaignMetricCards";
import { CampaignDetails } from "@/components/campaigns/detail/CampaignDetails";
import { CampaignDetailLoadingState } from "@/components/campaigns/detail/CampaignLoadingState";
import { CampaignNotFound } from "@/components/campaigns/detail/CampaignNotFound";
export default function CampaignDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    useEffect(() => {
        const fetchCampaign = () => __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return;
            setIsLoading(true);
            try {
                const campaignData = yield getCampaign(id);
                setCampaign(campaignData);
            }
            catch (error) {
                console.error("Error fetching campaign:", error);
                toast.error("Failed to load campaign details");
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchCampaign();
    }, [id]);
    const handleRefreshData = () => __awaiter(this, void 0, void 0, function* () {
        if (!campaign)
            return;
        setIsRefreshing(true);
        try {
            const result = yield syncCampaignData(campaign.id);
            if (result.success) {
                // Refresh campaign data
                const updatedCampaign = yield getCampaign(campaign.id);
                setCampaign(updatedCampaign);
                toast.success("Campaign data refreshed");
            }
            else {
                throw new Error(result.error);
            }
        }
        catch (error) {
            console.error("Error refreshing campaign data:", error);
            toast.error(`Failed to refresh data: ${error.message}`);
        }
        finally {
            setIsRefreshing(false);
        }
    });
    const handleDeployCampaign = () => __awaiter(this, void 0, void 0, function* () {
        if (!campaign)
            return;
        setIsDeploying(true);
        try {
            const result = yield deployCampaign(campaign.id);
            if (result.success) {
                // Refresh campaign data
                const updatedCampaign = yield getCampaign(campaign.id);
                setCampaign(updatedCampaign);
                toast.success("Campaign deployed successfully!");
            }
            else {
                throw new Error(result.error);
            }
        }
        catch (error) {
            console.error("Error deploying campaign:", error);
            toast.error(`Failed to deploy campaign: ${error.message}`);
        }
        finally {
            setIsDeploying(false);
        }
    });
    if (isLoading) {
        return _jsx(CampaignDetailLoadingState, {});
    }
    if (!campaign) {
        return _jsx(CampaignNotFound, { onBack: () => navigate("/dashboard/campaigns") });
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-12", children: [_jsx(CampaignDetailHeader, { campaign: campaign, onBack: () => navigate("/dashboard/campaigns"), onDeploy: handleDeployCampaign, isDeploying: isDeploying }), _jsx(CampaignMetricCards, { campaign: campaign }), campaign.payment_status === "paid" &&
                campaign.deployment_status === "deployed" && (_jsx(Card, { className: "mb-8", children: _jsx(CardContent, { className: "pt-6", children: _jsx(CampaignMetrics, { campaign: campaign, onRefresh: handleRefreshData, isRefreshing: isRefreshing }) }) })), _jsx(CampaignDetails, { campaign: campaign })] }));
}
