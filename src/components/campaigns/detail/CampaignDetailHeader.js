import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowLeft, RefreshCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Facebook } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
export function CampaignDetailHeader({ campaign, onBack, onDeploy, isDeploying, }) {
    const getStatusBadge = () => {
        if (campaign.payment_status !== "paid") {
            return _jsx(Badge, { variant: "destructive", children: "Payment Required" });
        }
        if (campaign.deployment_status === "pending") {
            return _jsx(Badge, { variant: "outline", children: "Pending Deployment" });
        }
        if (campaign.deployment_status === "ready") {
            return (_jsx(Badge, { variant: "outline", className: "bg-yellow-100 text-yellow-800 border-yellow-300", children: "Ready to Deploy" }));
        }
        if (campaign.deployment_status === "deployed") {
            if (campaign.platform_status === "ACTIVE" ||
                campaign.platform_status === "CAMPAIGN_STATUS_ENABLE") {
                return (_jsx(Badge, { variant: "outline", className: "bg-green-100 text-green-800 border-green-300", children: "Live" }));
            }
            else {
                return _jsx(Badge, { variant: "secondary", children: campaign.platform_status });
            }
        }
        return _jsx(Badge, { children: campaign.deployment_status });
    };
    // Helper function to determine platform safely
    const getPlatform = () => {
        return campaign.ad_platform || campaign.platform;
    };
    return (_jsxs("div", { className: "flex items-center mb-8", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, className: "mr-4", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }), "Back"] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-2xl font-bold", children: campaign.name }), getStatusBadge()] }), _jsxs("div", { className: "flex items-center text-muted-foreground mt-1", children: [getPlatform() === "meta" ? (_jsx(Facebook, { className: "h-4 w-4 mr-1 text-blue-600" })) : (_jsx(TikTokIcon, { className: "h-4 w-4 mr-1" })), _jsx("span", { children: getPlatform() === "meta" ? "Meta Ads" : "TikTok Ads" })] })] }), _jsx("div", { className: "ml-auto flex gap-2", children: campaign.payment_status === "paid" &&
                    campaign.deployment_status === "ready" && (_jsx(Button, { onClick: onDeploy, disabled: isDeploying, children: isDeploying ? (_jsxs(_Fragment, { children: [_jsx(RefreshCcw, { className: "mr-2 h-4 w-4 animate-spin" }), "Deploying..."] })) : (_jsxs(_Fragment, { children: [_jsx(Share2, { className: "mr-2 h-4 w-4" }), "Deploy Campaign"] })) })) })] }));
}
