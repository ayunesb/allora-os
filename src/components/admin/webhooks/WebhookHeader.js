import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Webhook } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBreakpoint } from "@/hooks/use-mobile";
const WebhookHeader = ({ activeTab, onTabChange }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "sm", "mobile"].includes(breakpoint);
    return (_jsxs(_Fragment, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Webhook, { className: "h-5 w-5" }), "Webhooks"] }), _jsx(CardDescription, { children: "Configure and monitor webhook endpoints for service integrations" }), _jsx(Tabs, { defaultValue: "config", value: activeTab, onValueChange: onTabChange, className: "w-full", children: _jsxs(TabsList, { className: `${isMobileView ? "w-full mt-2 overflow-x-auto scrollbar-thin" : "w-auto"}`, children: [_jsx(TabsTrigger, { value: "config", className: isMobileView ? "flex-1 text-sm px-3" : "", children: isMobileView ? "Config" : "Configuration" }), _jsx(TabsTrigger, { value: "history", className: isMobileView ? "flex-1 text-sm px-3" : "", children: isMobileView ? "History" : "Event History" })] }) })] }));
};
export default WebhookHeader;
