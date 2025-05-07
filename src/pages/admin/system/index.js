import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import SystemHealthPage from "@/pages/admin/system-health/SystemHealthPage";
import ProductionDataPage from "./ProductionDataPage";
export default function SystemPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTab = location.hash ? location.hash.substring(1) : "health";
    const handleTabChange = (value) => {
        navigate({ hash: value });
    };
    return (_jsx("div", { className: "container py-6 max-w-7xl mx-auto", children: _jsxs(Tabs, { defaultValue: currentTab, onValueChange: handleTabChange, className: "w-full", children: [_jsxs(TabsList, { className: "mb-6", children: [_jsx(TabsTrigger, { value: "health", children: "System Health" }), _jsx(TabsTrigger, { value: "production", children: "Production Data" }), _jsx(TabsTrigger, { value: "security", children: "Security" }), _jsx(TabsTrigger, { value: "logs", children: "System Logs" })] }), _jsx(TabsContent, { value: "health", className: "mt-0", children: _jsx(SystemHealthPage, {}) }), _jsx(TabsContent, { value: "production", className: "mt-0", children: _jsx(ProductionDataPage, {}) }), _jsx(TabsContent, { value: "security", className: "mt-0", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Security Settings" }), _jsx("p", { className: "text-muted-foreground", children: "This page is under construction" })] }) }), _jsx(TabsContent, { value: "logs", className: "mt-0", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "System Logs" }), _jsx("p", { className: "text-muted-foreground", children: "This page is under construction" })] }) })] }) }));
}
