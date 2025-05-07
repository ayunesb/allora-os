import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function CampaignHeader({ onNewCampaign }) {
    return (_jsxs("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 animate-fadeIn", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(BarChart, { className: "h-8 w-8 text-primary mr-3" }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Marketing Campaigns" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Create and manage ad campaigns with AI executive assistance" })] })] }), _jsxs(Button, { onClick: onNewCampaign, variant: "gradient", className: "shadow-lg hover:shadow-primary/20", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New Campaign"] })] }));
}
