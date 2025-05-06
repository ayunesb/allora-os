import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar"; // Changed from { Navbar } to default import
import AdminSettingsProvider from "@/components/admin/settings/AdminSettingsProvider";
import APIKeysTab from "@/components/admin/APIKeysTab";
import WebhooksTab from "@/components/admin/WebhooksTab";
import { SecurityTab } from "@/components/admin/security";
import NotificationsTab from "@/components/admin/NotificationsTab";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("api-keys");
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const isTabletView = breakpoint === "tablet";
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), " ", _jsxs("div", { className: "container mx-auto px-4 pt-24 pb-12", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold", children: "System Settings" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Configure the Allora AI platform" })] }), _jsx(AdminSettingsProvider, { children: ({ companyId, isLoading, apiKeys, securitySettings }) => (_jsxs(Tabs, { defaultValue: "api-keys", value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: `mb-6 ${isMobileView ? "w-full tabs-scrollable flex" : isTabletView ? "tabs-flex-wrap" : ""}`, children: [_jsx(TabsTrigger, { value: "api-keys", className: isMobileView
                                                ? "text-xs flex-1 tab-compact"
                                                : isTabletView
                                                    ? "text-sm"
                                                    : "", children: "API Keys" }), _jsx(TabsTrigger, { value: "webhooks", className: isMobileView
                                                ? "text-xs flex-1 tab-compact"
                                                : isTabletView
                                                    ? "text-sm"
                                                    : "", children: "Webhooks" }), _jsx(TabsTrigger, { value: "security", className: isMobileView
                                                ? "text-xs flex-1 tab-compact"
                                                : isTabletView
                                                    ? "text-sm"
                                                    : "", children: "Security" }), _jsx(TabsTrigger, { value: "notifications", className: isMobileView
                                                ? "text-xs flex-1 tab-compact"
                                                : isTabletView
                                                    ? "text-sm"
                                                    : "", children: "Notifications" })] }), _jsx(TabsContent, { value: "api-keys", children: _jsx(APIKeysTab, { companyId: companyId, initialApiKeys: apiKeys, isLoading: isLoading }) }), _jsx(TabsContent, { value: "webhooks", children: _jsx(WebhooksTab, {}) }), _jsx(TabsContent, { value: "security", children: _jsx(SecurityTab, { initialSettings: securitySettings }) }), _jsx(TabsContent, { value: "notifications", children: _jsx(NotificationsTab, {}) })] })) })] })] }));
}
