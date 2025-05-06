import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function BotInsightCard({ insight, onViewDetails }) {
    // Get destination based on insight type
    const getDestination = (type) => {
        switch (type) {
            case "strategy":
                return "/dashboard/strategies";
            case "campaign":
                return "/dashboard/campaigns";
            case "call_script":
                return "/dashboard/calls";
            default:
                return "/dashboard";
        }
    };
    // Get badge color based on insight type
    const getBadgeVariant = (type) => {
        switch (type) {
            case "strategy":
                return "default";
            case "campaign":
                return "secondary";
            case "call_script":
                return "outline";
            default:
                return "default";
        }
    };
    // Get display label based on insight type
    const getTypeLabel = (type) => {
        switch (type) {
            case "strategy":
                return "Strategy";
            case "campaign":
                return "Campaign";
            case "call_script":
                return "Call Script";
            default:
                return "Insight";
        }
    };
    return (_jsxs(Card, { className: "transition-all duration-200 hover:shadow-md overflow-hidden", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx(Badge, { variant: getBadgeVariant(insight.type), className: "mb-2", children: getTypeLabel(insight.type) }), _jsx("div", { className: "text-xs text-muted-foreground", children: new Date(insight.createdAt).toLocaleDateString() })] }), _jsx(CardTitle, { className: "text-lg line-clamp-2", children: insight.title }), _jsx(CardDescription, { children: _jsxs("div", { className: "flex items-center mt-1", children: [_jsxs(Avatar, { className: "h-6 w-6 mr-2", children: [_jsx(AvatarImage, { src: insight.primaryBot.avatar ||
                                                `/avatars/${insight.primaryBot.name.toLowerCase().replace(/\s+/g, "-")}.png`, alt: insight.primaryBot.name }), _jsx(AvatarFallback, { children: insight.primaryBot.name[0] })] }), _jsx("span", { className: "text-sm", children: insight.primaryBot.name })] }) })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm text-muted-foreground line-clamp-3", children: insight.description }) }), _jsxs(CardFooter, { className: "pt-2 flex justify-between", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs", onClick: () => onViewDetails(insight), children: [_jsx(MessageSquare, { className: "h-3.5 w-3.5 mr-1" }), "View details"] }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-xs", asChild: true, children: _jsxs(Link, { to: getDestination(insight.type), children: [_jsx(ArrowUpRight, { className: "h-3.5 w-3.5 mr-1" }), "Go to ", getTypeLabel(insight.type)] }) })] })] }));
}
