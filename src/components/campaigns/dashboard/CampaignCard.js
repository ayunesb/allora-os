import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, format } from "date-fns";
import { BarChart2, Calendar, Edit, Trash2, PlayCircle, PauseCircle, CheckCircle, } from "lucide-react";
export function CampaignCard({ campaign, onEdit, onDelete, onViewAnalytics, onStatusChange, }) {
    var _a, _b, _c;
    const { id, name, description, status, startDate, endDate, budget, platform = "All Platforms", metrics, createdAt, } = campaign;
    // Format dates with fallbacks
    const formatDate = (dateString) => {
        if (!dateString)
            return null;
        try {
            return format(new Date(dateString), "MMM d, yyyy");
        }
        catch (e) {
            return null;
        }
    };
    const timeAgo = (dateString) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        }
        catch (e) {
            return "some time ago";
        }
    };
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const dateRange = formattedStartDate && formattedEndDate
        ? `${formattedStartDate} - ${formattedEndDate}`
        : formattedStartDate
            ? `Started ${formattedStartDate}`
            : "No dates set";
    const isDraft = status === "draft";
    const isActive = status === "active";
    const isPaused = status === "paused";
    const isCompleted = status === "completed";
    const statusColor = {
        draft: "bg-gray-200 text-gray-800",
        active: "bg-green-100 text-green-800",
        paused: "bg-amber-100 text-amber-800",
        completed: "bg-blue-100 text-blue-800",
    };
    const getStatusColor = () => {
        if (isDraft)
            return statusColor.draft;
        if (isActive)
            return statusColor.active;
        if (isPaused)
            return statusColor.paused;
        if (isCompleted)
            return statusColor.completed;
        return statusColor.draft;
    };
    return (_jsxs(Card, { className: "overflow-hidden", children: [_jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium text-lg", children: name }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: platform }), _jsx("span", { className: `text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`, children: status.charAt(0).toUpperCase() + status.slice(1) })] })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => onViewAnalytics(id), children: [_jsx(BarChart2, { className: "h-4 w-4 mr-1" }), "Analytics"] })] }), description && _jsx("p", { className: "text-sm mb-3", children: description }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-3", children: metrics && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-muted p-2 rounded text-center", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Impressions" }), _jsx("p", { className: "font-medium", children: ((_a = metrics.impressions) === null || _a === void 0 ? void 0 : _a.toLocaleString()) || "0" })] }), _jsxs("div", { className: "bg-muted p-2 rounded text-center", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Clicks" }), _jsx("p", { className: "font-medium", children: ((_b = metrics.clicks) === null || _b === void 0 ? void 0 : _b.toLocaleString()) || "0" })] }), _jsxs("div", { className: "bg-muted p-2 rounded text-center", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Conversions" }), _jsx("p", { className: "font-medium", children: ((_c = metrics.conversions) === null || _c === void 0 ? void 0 : _c.toLocaleString()) || "0" })] })] })) }), _jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground", children: [budget && (_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Budget:" }), " $", budget.toLocaleString()] })), _jsxs("div", { className: "flex items-center", children: [_jsx(Calendar, { className: "h-3 w-3 mr-1" }), dateRange] }), _jsxs("div", { children: ["Created ", timeAgo(createdAt)] })] })] }), _jsxs(CardFooter, { className: "px-4 py-3 border-t bg-muted/30 flex justify-between", children: [onStatusChange && (_jsxs("div", { className: "flex space-x-2", children: [isDraft && (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onStatusChange(id, "active"), children: [_jsx(PlayCircle, { className: "h-4 w-4 mr-1" }), "Activate"] })), isActive && (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onStatusChange(id, "paused"), children: [_jsx(PauseCircle, { className: "h-4 w-4 mr-1" }), "Pause"] })), isPaused && (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onStatusChange(id, "active"), children: [_jsx(PlayCircle, { className: "h-4 w-4 mr-1" }), "Resume"] })), !isCompleted && (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onStatusChange(id, "completed"), children: [_jsx(CheckCircle, { className: "h-4 w-4 mr-1" }), "Complete"] }))] })), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => onEdit(id), children: [_jsx(Edit, { className: "h-4 w-4 mr-1" }), "Edit"] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => onDelete(id), className: "text-destructive", children: [_jsx(Trash2, { className: "h-4 w-4 mr-1" }), "Delete"] })] })] })] }));
}
