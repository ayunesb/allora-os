import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
export const CampaignList = ({ campaigns, filteredCampaigns, onCreateCampaign, isLoading = false, }) => {
    const [expandedCampaignId, setExpandedCampaignId] = useState(null);
    const campaignsToDisplay = filteredCampaigns || campaigns;
    const toggleCampaign = (id) => {
        setExpandedCampaignId(expandedCampaignId === id ? null : id);
    };
    // Helper function to safely format dates
    const formatDate = (dateString) => {
        if (!dateString)
            return null;
        try {
            return format(parseISO(dateString), "MMM dd, yyyy");
        }
        catch (e) {
            return "Invalid date";
        }
    };
    if (isLoading) {
        return _jsx("p", { children: "Loading campaigns..." });
    }
    if (!campaignsToDisplay || campaignsToDisplay.length === 0) {
        return (_jsxs("div", { className: "text-center p-8", children: [_jsx("p", { children: "No campaigns found." }), onCreateCampaign && (_jsx(Button, { onClick: onCreateCampaign, className: "mt-4", children: "Create Campaign" }))] }));
    }
    return (_jsx("div", { className: "grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3", children: campaignsToDisplay.map((campaign) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: campaign.name }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: campaign.description }), _jsx("div", { className: "mt-2", children: _jsx(Badge, { variant: "secondary", children: campaign.status }) })] }), _jsxs(CardFooter, { className: "flex items-center justify-between", children: [_jsx("div", { children: campaign.startDate && (_jsxs("p", { className: "text-xs text-muted-foreground", children: ["Starts: ", formatDate(campaign.startDate)] })) }), _jsx(Button, { asChild: true, variant: "link", children: _jsx(Link, { to: `/dashboard/campaigns/${campaign.id}`, children: "View Details" }) })] })] }, campaign.id))) }));
};
