import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, Download, ThumbsUp, ThumbsDown, } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
export default function CampaignCard({ campaign, onEdit, onDelete, onFeedback, onExport, }) {
    var _a;
    const executiveName = typeof campaign.executiveBot === "string"
        ? campaign.executiveBot
        : ((_a = campaign.executiveBot) === null || _a === void 0 ? void 0 : _a.name) || "";
    const getStatusColor = () => {
        var _a;
        const status = (_a = campaign.status) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        switch (status) {
            case "active":
                return "bg-green-500/10 text-green-500";
            case "paused":
                return "bg-yellow-500/10 text-yellow-500";
            case "completed":
                return "bg-blue-500/10 text-blue-500";
            case "draft":
                return "bg-gray-500/10 text-gray-500";
            case "approved":
                return "bg-purple-500/10 text-purple-500";
            default:
                return "bg-gray-500/10 text-gray-500";
        }
    };
    const getHealthColor = () => {
        switch (campaign.healthScore) {
            case "good":
                return "bg-green-500/10 text-green-500";
            case "warning":
                return "bg-yellow-500/10 text-yellow-500";
            case "critical":
                return "bg-red-500/10 text-red-500";
            default:
                return "bg-gray-500/10 text-gray-500";
        }
    };
    const renderMetrics = () => {
        const metrics = [];
        if (campaign.impressions !== undefined)
            metrics.push(`Impressions: ${campaign.impressions.toLocaleString()}`);
        if (campaign.clicks !== undefined)
            metrics.push(`Clicks: ${campaign.clicks.toLocaleString()}`);
        if (campaign.leads !== undefined)
            metrics.push(`Leads: ${campaign.leads}`);
        return metrics.length > 0 ? metrics.join(" | ") : "No metrics available";
    };
    return (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: campaign.name }), _jsxs(CardDescription, { className: "flex items-center mt-1", children: [_jsx(Badge, { variant: "outline", className: "mr-2", children: campaign.platform }), campaign.status && (_jsx(Badge, { variant: "outline", className: getStatusColor(), children: campaign.status }))] })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { onClick: () => onEdit(campaign.id), children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit"] }), onExport && (_jsxs(_Fragment, { children: [_jsxs(DropdownMenuItem, { onClick: () => onExport(campaign.id, "pdf"), children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export as PDF"] }), _jsxs(DropdownMenuItem, { onClick: () => onExport(campaign.id, "csv"), children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export as CSV"] })] })), _jsxs(DropdownMenuItem, { onClick: () => onDelete(campaign.id), className: "text-destructive", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"] })] })] })] }) }), _jsx(CardContent, { className: "pb-2", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "grid grid-cols-2 gap-y-1 text-sm mb-2", children: [_jsx("span", { className: "text-muted-foreground", children: "Budget:" }), _jsxs("span", { children: ["$", campaign.budget || 0] }), _jsx("span", { className: "text-muted-foreground", children: "Health:" }), _jsx(Badge, { variant: "outline", className: getHealthColor(), children: campaign.healthScore
                                                ? campaign.healthScore.charAt(0).toUpperCase() +
                                                    campaign.healthScore.slice(1)
                                                : "N/A" }), _jsx("span", { className: "text-muted-foreground", children: "Created by:" }), _jsx("span", { children: executiveName || "N/A" })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: renderMetrics() })] }), campaign.justification && (_jsxs("div", { className: "bg-muted p-3 rounded-md text-sm", children: [_jsx("p", { className: "font-medium mb-1", children: "Executive Justification:" }), _jsx("p", { className: "text-muted-foreground", children: campaign.justification })] }))] }) }), _jsx(CardFooter, { className: "flex flex-col space-y-2", children: _jsxs("div", { className: "w-full flex space-x-2", children: [_jsxs(Button, { variant: "outline", className: "flex-1", onClick: () => onEdit(campaign.id), children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit"] }), onFeedback && campaign.aiGenerated && (_jsxs("div", { className: "flex space-x-2 flex-1", children: [_jsxs(Button, { variant: "outline", className: "flex-1 bg-green-500/10 hover:bg-green-500/20 border-green-500/30", onClick: () => onFeedback(campaign.id, true), children: [_jsx(ThumbsUp, { className: "mr-2 h-4 w-4" }), "Approve"] }), _jsxs(Button, { variant: "outline", className: "flex-1 bg-red-500/10 hover:bg-red-500/20 border-red-500/30", onClick: () => onFeedback(campaign.id, false), children: [_jsx(ThumbsDown, { className: "mr-2 h-4 w-4" }), "Reject"] })] }))] }) })] }));
}
