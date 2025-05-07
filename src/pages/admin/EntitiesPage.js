import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import AdminUsers from "./AdminUsers";
import AdminCompanies from "./AdminCompanies";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { HelpButton } from "@/components/ui/help-button";
import { getHelpContent } from "@/utils/help/helpContent";
export default function EntitiesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState(tabFromUrl === "companies" ? "companies" : "users");
    // Update the URL when the tab changes
    useEffect(() => {
        if (tabFromUrl !== activeTab) {
            setSearchParams({ tab: activeTab });
        }
    }, [activeTab, setSearchParams, tabFromUrl]);
    // Handle URL parameter changes
    useEffect(() => {
        if (tabFromUrl === "companies" || tabFromUrl === "users") {
            setActiveTab(tabFromUrl);
        }
    }, [tabFromUrl]);
    // Get help content for the entities page
    const entitiesHelp = getHelpContent("admin.entities") || {
        id: "admin.entities",
        title: "Entities Management",
        description: "Manage users and companies within the Allora AI platform",
    };
    return (_jsxs(PageErrorBoundary, { pageName: "Entities Management", children: [_jsx(Helmet, { children: _jsx("title", { children: "Entities Management | Allora AI" }) }), _jsxs("div", { className: "space-y-6 animate-in fade-in duration-500", children: [_jsx(AdminBreadcrumb, {}), _jsxs("div", { className: "pb-2 flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Entities Management" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Manage users and companies within the Allora AI platform" })] }), _jsx(HelpButton, { helpContent: entitiesHelp, variant: "outline", size: "sm" })] }), _jsxs(Tabs, { defaultValue: "users", value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "users", children: "Users" }), _jsx(TabsTrigger, { value: "companies", children: "Companies" })] }), _jsx(TabsContent, { value: "users", className: "space-y-4", children: _jsx(AdminUsers, {}) }), _jsx(TabsContent, { value: "companies", className: "space-y-4", children: _jsx(AdminCompanies, {}) })] })] })] }));
}
