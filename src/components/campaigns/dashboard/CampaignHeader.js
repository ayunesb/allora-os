import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RefreshCcw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
/**
 * CampaignHeader Component
 *
 * Displays the header for the campaign dashboard with title and action buttons
 * for refreshing data and creating new campaigns.
 */
export function CampaignHeader({ onRefresh, onCreateCampaign, isRefreshing }) {
    return (_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold mb-1", children: "Campaign Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your advertising campaigns across different platforms" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", onClick: onRefresh, disabled: isRefreshing, "aria-label": isRefreshing ? "Refreshing campaign data" : "Refresh campaign data", children: [_jsx(RefreshCcw, { className: `mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}` }), isRefreshing ? "Refreshing..." : "Refresh Data"] }), _jsxs(Button, { onClick: onCreateCampaign, "aria-label": "Create new campaign", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Campaign"] })] })] }));
}
