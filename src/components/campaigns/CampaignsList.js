import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CampaignCard from "./CampaignCard";
export default function CampaignsList({ campaigns, isLoading, handleEditCampaign, deleteCampaign, onCreateCampaign, onApproveCampaign, onExportCampaign, }) {
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6", children: [...Array(3)].map((_, i) => (_jsx(Card, { className: "overflow-hidden", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: "p-6", children: [_jsx(Skeleton, { className: "h-5 w-3/4 mb-2" }), _jsx(Skeleton, { className: "h-4 w-1/2 mb-6" }), _jsx(Skeleton, { className: "h-2 w-full mb-3" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-full" })] }), _jsx(Skeleton, { className: "h-24 w-full mb-4" })] }), _jsxs("div", { className: "border-t p-4 flex justify-between", children: [_jsx(Skeleton, { className: "h-9 w-[48%]" }), _jsx(Skeleton, { className: "h-9 w-[48%]" })] })] }) }, i))) }));
    }
    if (campaigns.length === 0) {
        return (_jsx(Card, { className: "mt-6", children: _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-10 text-center", children: [_jsx("div", { className: "rounded-full bg-primary/10 p-3 mb-4", children: _jsx(LineChart, { className: "h-6 w-6 text-primary" }) }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "No campaigns yet" }), _jsx("p", { className: "text-sm text-muted-foreground max-w-md mb-6", children: "Create your first marketing campaign to start promoting your business and tracking results." }), _jsxs(Button, { onClick: onCreateCampaign, children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "Create Your First Campaign"] })] }) }));
    }
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6", children: campaigns.map((campaign) => (_jsx(CampaignCard, { campaign: campaign, onEdit: handleEditCampaign, onDelete: deleteCampaign, onFeedback: (id, isPositive) => {
                if (isPositive && onApproveCampaign) {
                    onApproveCampaign(id);
                }
            }, onExport: (id, format) => {
                if (onExportCampaign) {
                    onExportCampaign(id, format);
                }
            } }, campaign.id))) }));
}
