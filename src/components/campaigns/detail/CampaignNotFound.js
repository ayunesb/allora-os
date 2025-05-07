import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export function CampaignNotFound({ onBack }) {
    return (_jsx("div", { className: "container mx-auto px-4 py-12", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Campaign Not Found" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "The campaign you're looking for doesn't exist or you don't have access to it." }), _jsxs(Button, { onClick: onBack, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back to Campaigns"] })] }) }));
}
