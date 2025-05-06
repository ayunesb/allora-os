import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function CampaignTabs({ activeTab, onTabChange }) {
    return (_jsx(Tabs, { defaultValue: activeTab, className: "mb-8", onValueChange: onTabChange, children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "all", children: "All Campaigns" }), _jsx(TabsTrigger, { value: "active", children: "Active" }), _jsx(TabsTrigger, { value: "pending", children: "Pending" }), _jsx(TabsTrigger, { value: "meta", children: "Meta" }), _jsx(TabsTrigger, { value: "tiktok", children: "TikTok" })] }) }));
}
