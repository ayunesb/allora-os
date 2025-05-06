import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, Calendar, CheckCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useAccessibility } from "@/hooks/useAccessibility";
export default function SocialMediaPostList({ posts, onEditPost, onDeletePost, onSchedulePost, onApprovePost, "aria-label": ariaLabel, }) {
    const { screenReaderFriendly } = useAccessibility();
    const getPlatformColor = (platform) => {
        switch (platform) {
            case "Facebook":
                return "bg-blue-100 text-blue-800";
            case "Instagram":
                return "bg-purple-100 text-purple-800";
            case "LinkedIn":
                return "bg-blue-900 text-white";
            case "Twitter":
                return "bg-blue-400 text-white";
            case "TikTok":
                return "bg-black text-white";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "draft":
                return "bg-amber-100 text-amber-800 border-amber-200";
            case "scheduled":
                return "bg-green-100 text-green-800 border-green-200";
            case "published":
                return "bg-blue-100 text-blue-800 border-blue-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };
    return (_jsx("div", { className: "space-y-4", role: screenReaderFriendly ? "list" : undefined, "aria-label": ariaLabel, children: posts.map((post) => (_jsx(Card, { className: "overflow-hidden hover:shadow-md transition-shadow", role: screenReaderFriendly ? "listitem" : undefined, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Badge, { className: cn("font-normal", getPlatformColor(post.platform)), children: post.platform }), _jsx(Badge, { variant: "outline", className: getStatusColor(post.status), children: post.status }), post.is_approved && (_jsxs(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: [_jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), "Approved"] }))] }), _jsx("h3", { className: "text-lg font-medium mb-1", onClick: () => onEditPost(post), children: post.title }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-2", children: post.content }), _jsxs("div", { className: "flex items-center text-xs text-muted-foreground gap-2", children: [_jsx(Calendar, { className: "h-3 w-3" }), _jsxs("time", { dateTime: post.scheduled_date, children: [format(parseISO(post.scheduled_date), "MMM d, yyyy"), post.publish_time ? ` at ${post.publish_time}` : ""] })] })] }), _jsxs("div", { className: "flex items-center gap-2 self-end sm:self-auto mt-2 sm:mt-0", children: [post.status === "draft" && !post.is_approved && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => onApprovePost(post.id), "aria-label": screenReaderFriendly
                                        ? `Approve post: ${post.title}`
                                        : undefined, children: "Approve" })), post.status === "draft" && post.is_approved && (_jsx(Button, { size: "sm", onClick: () => onSchedulePost(post.id), "aria-label": screenReaderFriendly
                                        ? `Schedule post: ${post.title}`
                                        : undefined, children: "Schedule" })), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { size: "icon", variant: "ghost", "aria-label": screenReaderFriendly
                                                    ? `More options for post: ${post.title}`
                                                    : "More options", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Actions" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: () => onEditPost(post), children: "Edit" }), _jsx(DropdownMenuItem, { onClick: () => onDeletePost(post.id), className: "text-destructive focus:text-destructive", children: "Delete" })] })] })] })] }) }) }, post.id))) }));
}
