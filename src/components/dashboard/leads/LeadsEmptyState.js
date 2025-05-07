import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Upload } from "lucide-react";
import { AddLeadDialog } from "@/components/admin/leads/AddLeadDialog";
import { useCampaigns } from "@/hooks/campaigns";
export const LeadsEmptyState = () => {
    const { campaigns } = useCampaigns();
    const formattedCampaigns = campaigns.map((campaign) => ({
        id: campaign.id,
        name: campaign.name,
    }));
    return (_jsxs(Card, { className: "w-full shadow-md", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx(CardTitle, { className: "text-2xl font-bold", children: "No Leads Yet" }), _jsx(CardDescription, { children: "Start building your leads database to track potential customers" })] }), _jsxs(CardContent, { className: "flex flex-col items-center space-y-6 py-8", children: [_jsx("div", { className: "rounded-full bg-primary/10 p-6", children: _jsx(UserPlus, { className: "h-10 w-10 text-primary" }) }), _jsx("div", { className: "text-center max-w-md", children: _jsx("p", { className: "mb-4", children: "Add your first lead to start managing your sales pipeline. You can manually add leads or import them from a CSV file." }) })] }), _jsxs(CardFooter, { className: "flex justify-center gap-4", children: [_jsx(AddLeadDialog, { onLeadAdded: () => { }, campaigns: formattedCampaigns, isMobileView: false }), _jsxs(Button, { variant: "outline", className: "gap-2", children: [_jsx(Upload, { className: "h-4 w-4" }), "Import from CSV"] })] })] }));
};
