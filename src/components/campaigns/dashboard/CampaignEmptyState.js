import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export function CampaignEmptyState({ onCreateCampaign }) {
    return (_jsx(Card, { className: "text-center py-12", children: _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(BarChart3, { className: "h-12 w-12 text-muted-foreground mb-4" }), _jsx("h2", { className: "text-xl font-semibold mb-2", children: "No Campaigns Yet" }), _jsx("p", { className: "text-muted-foreground max-w-md mx-auto mb-6", children: "Start by creating your first advertising campaign to reach your target audience." }), _jsxs(Button, { onClick: onCreateCampaign, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Create Your First Campaign"] })] }) }) }));
}
