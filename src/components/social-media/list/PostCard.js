import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, CardFooter, CardHeader, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Calendar, CheckCircle } from "lucide-react";
import { format } from "date-fns";
export function PostCard({ post, onEdit, onDelete, onSchedule, onApprove }) {
    // Function to get platform badge color
    const getPlatformColor = (platform) => {
        switch (platform.toLowerCase()) {
            case "linkedin":
                return "bg-blue-100 text-blue-800";
            case "facebook":
                return "bg-indigo-100 text-indigo-800";
            case "instagram":
                return "bg-pink-100 text-pink-800";
            case "twitter":
                return "bg-sky-100 text-sky-800";
            case "tiktok":
                return "bg-slate-100 text-slate-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    // Function to get status badge color
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "published":
                return "bg-green-100 text-green-800";
            case "scheduled":
                return "bg-amber-100 text-amber-800";
            case "draft":
                return "bg-gray-100 text-gray-800";
            case "failed":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    // Fix date formatting
    const formatDate = (date) => {
        if (!date)
            return "Not scheduled";
        try {
            return format(new Date(date), "MMM d, yyyy h:mm a");
        }
        catch (e) {
            return "Invalid date";
        }
    };
    // Determine which action buttons to show based on post status
    const renderActionButtons = () => {
        switch (post.status.toLowerCase()) {
            case "draft":
                return (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: onSchedule, children: [_jsx(Calendar, { className: "mr-1 h-4 w-4" }), "Schedule"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: onApprove, children: [_jsx(CheckCircle, { className: "mr-1 h-4 w-4" }), "Publish"] })] }));
            case "scheduled":
                return (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: onEdit, children: [_jsx(Edit, { className: "mr-1 h-4 w-4" }), "Edit"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: onApprove, children: [_jsx(CheckCircle, { className: "mr-1 h-4 w-4" }), "Publish Now"] })] }));
            default:
                return (_jsxs(Button, { variant: "outline", size: "sm", onClick: onEdit, children: [_jsx(Edit, { className: "mr-1 h-4 w-4" }), "View"] }));
        }
    };
    return (_jsxs(Card, { className: "h-full flex flex-col", children: [_jsxs(CardHeader, { className: "px-4 py-3 flex-row justify-between items-center space-y-0 gap-x-2", children: [_jsx(Badge, { variant: "outline", className: getPlatformColor(post.platform), children: post.platform }), _jsx(Badge, { variant: "outline", className: getStatusColor(post.status), children: post.status })] }), _jsxs(CardContent, { className: "px-4 py-3 flex-grow", children: [_jsx("h3", { className: "font-medium mb-2", children: post.title || post.content.substring(0, 50) }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-3 mb-2", children: post.content }), _jsxs("div", { className: "text-xs text-muted-foreground mt-2", children: [post.scheduled_date ? (_jsxs("p", { children: ["Scheduled:", " ", formatDate(`${post.scheduled_date}T${post.publish_time}:00`)] })) : (_jsx("p", { children: "Not scheduled" })), post.published_at && (_jsxs("p", { className: "mt-1", children: ["Published: ", formatDate(post.published_at)] }))] }), post.tags && post.tags.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: post.tags.map((tag, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, index))) }))] }), _jsxs(CardFooter, { className: "px-4 py-3 flex justify-between border-t", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: onDelete, children: _jsx(Trash, { className: "h-4 w-4" }) }), _jsx("div", { className: "flex gap-2", children: renderActionButtons() })] })] }));
}
