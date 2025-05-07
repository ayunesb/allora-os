var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, RefreshCcw } from "lucide-react";
import { checkCampaignPaymentStatus, deployCampaign, getCampaign, } from "@/services/campaignService";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
export default function CampaignPaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [campaign, setCampaign] = useState(null);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentStatus, setDeploymentStatus] = useState("pending");
    const sessionId = searchParams.get("session_id");
    useEffect(() => {
        const verifyPayment = () => __awaiter(this, void 0, void 0, function* () {
            if (!sessionId) {
                navigate("/dashboard/campaigns");
                return;
            }
            try {
                // Find the campaign with this Stripe session ID
                const { data: campaigns, error } = yield supabase
                    .from("campaigns")
                    .select("*")
                    .eq("stripe_payment_id", sessionId)
                    .limit(1);
                if (error)
                    throw error;
                if (!campaigns || campaigns.length === 0) {
                    toast.error("Campaign not found");
                    navigate("/dashboard/campaigns");
                    return;
                }
                const campaignId = campaigns[0].id;
                // Check payment status
                const paymentStatus = yield checkCampaignPaymentStatus(campaignId);
                if (!paymentStatus.success) {
                    toast.error("Failed to verify payment");
                    navigate("/dashboard/campaigns");
                    return;
                }
                if (paymentStatus.status !== "paid") {
                    // Update payment status in real time
                    const campaignData = yield getCampaign(campaignId);
                    setCampaign(campaignData);
                    setIsLoading(false);
                    // Poll for payment status
                    const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                        const status = yield checkCampaignPaymentStatus(campaignId);
                        if (status.status === "paid") {
                            clearInterval(interval);
                            // Refresh campaign data
                            const updatedCampaign = yield getCampaign(campaignId);
                            setCampaign(updatedCampaign);
                        }
                    }), 2000);
                    return () => clearInterval(interval);
                }
                else {
                    // Payment is already verified
                    const campaignData = yield getCampaign(campaignId);
                    setCampaign(campaignData);
                    setIsLoading(false);
                }
            }
            catch (error) {
                console.error("Error verifying payment:", error);
                toast.error("Failed to verify payment");
                navigate("/dashboard/campaigns");
            }
        });
        verifyPayment();
    }, [sessionId, navigate]);
    const handleDeployCampaign = () => __awaiter(this, void 0, void 0, function* () {
        if (!campaign)
            return;
        setIsDeploying(true);
        setDeploymentStatus("deploying");
        try {
            const result = yield deployCampaign(campaign.id);
            if (result.success) {
                setDeploymentStatus("deployed");
                // Refresh campaign data
                const updatedCampaign = yield getCampaign(campaign.id);
                setCampaign(updatedCampaign);
                toast.success("Campaign deployed successfully!");
            }
            else {
                setDeploymentStatus("failed");
                toast.error("Failed to deploy campaign");
            }
        }
        catch (error) {
            console.error("Error deploying campaign:", error);
            setDeploymentStatus("failed");
            toast.error("Failed to deploy campaign");
        }
        finally {
            setIsDeploying(false);
        }
    });
    const handleViewCampaigns = () => {
        navigate("/dashboard/campaigns");
    };
    if (isLoading) {
        return (_jsx("div", { className: "container mx-auto px-4 py-12 flex justify-center", children: _jsx(Card, { className: "w-full max-w-md", children: _jsxs(CardHeader, { className: "text-center", children: [_jsx(CardTitle, { className: "flex justify-center", children: _jsx(RefreshCcw, { className: "h-6 w-6 animate-spin" }) }), _jsx(CardDescription, { children: "Verifying payment..." })] }) }) }));
    }
    return (_jsx("div", { className: "container mx-auto px-4 py-12", children: _jsx("div", { className: "flex flex-col items-center", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsxs(CardTitle, { className: "flex flex-col items-center gap-2", children: [_jsx(CheckCircle, { className: "h-16 w-16 text-green-500" }), _jsx("span", { children: "Payment Successful!" })] }), _jsx(CardDescription, { children: "Your payment has been processed successfully." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-muted p-4 rounded-md space-y-2", children: [_jsx("h3", { className: "font-medium", children: "Campaign Details" }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Campaign:" }), _jsx("span", { children: campaign === null || campaign === void 0 ? void 0 : campaign.name }), _jsx("span", { className: "text-muted-foreground", children: "Platform:" }), _jsx("span", { children: (campaign === null || campaign === void 0 ? void 0 : campaign.ad_platform) === "meta"
                                                            ? "Meta (Facebook/Instagram)"
                                                            : "TikTok" }), _jsx("span", { className: "text-muted-foreground", children: "Budget:" }), _jsxs("span", { children: ["$", campaign === null || campaign === void 0 ? void 0 : campaign.budget] }), _jsx("span", { className: "text-muted-foreground", children: "Management Fee:" }), _jsxs("span", { children: ["$", campaign === null || campaign === void 0 ? void 0 : campaign.management_fee] }), _jsx("span", { className: "text-muted-foreground", children: "Total Amount:" }), _jsxs("span", { children: ["$", campaign === null || campaign === void 0 ? void 0 : campaign.total_amount] })] })] }), _jsxs("div", { className: "bg-green-50 dark:bg-green-950 p-4 rounded-md border border-green-200 dark:border-green-800", children: [_jsx("h3", { className: "font-medium text-green-700 dark:text-green-300 mb-2", children: "Next Steps" }), _jsxs("p", { className: "text-sm text-green-600 dark:text-green-400", children: ["Your campaign is ready for deployment. Click the button below to automatically deploy it to", " ", (campaign === null || campaign === void 0 ? void 0 : campaign.ad_platform) === "meta"
                                                        ? "Meta Ads"
                                                        : "TikTok Ads", "."] })] })] }) }), _jsxs(CardFooter, { className: "flex flex-col gap-3", children: [deploymentStatus === "deployed" ? (_jsxs(Button, { className: "w-full", onClick: handleViewCampaigns, children: ["View Campaign Dashboard", _jsx(ChevronRight, { className: "ml-2 h-4 w-4" })] })) : (_jsx(Button, { className: "w-full", onClick: handleDeployCampaign, disabled: isDeploying || (campaign === null || campaign === void 0 ? void 0 : campaign.deployment_status) === "deployed", children: isDeploying ? (_jsxs(_Fragment, { children: [_jsx(RefreshCcw, { className: "mr-2 h-4 w-4 animate-spin" }), "Deploying Campaign..."] })) : deploymentStatus === "failed" ? ("Retry Deployment") : (campaign === null || campaign === void 0 ? void 0 : campaign.deployment_status) === "deployed" ? ("Campaign Already Deployed") : ("Deploy Campaign Now") })), _jsx(Button, { variant: "outline", className: "w-full", onClick: handleViewCampaigns, children: "View All Campaigns" })] })] }) }) }) }));
}
