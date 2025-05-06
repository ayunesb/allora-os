import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Users, Building2, Webhook, Key, Database, Settings, RocketIcon, } from "lucide-react";
export function AdminModuleGrid({ modules, isLoading } = {}) {
    // If modules are provided, use them. Otherwise use the default ones.
    const gridModules = modules || [
        {
            title: "User Management",
            description: "Manage system users and permissions",
            icon: _jsx(Users, { className: "h-5 w-5" }),
            href: "/admin/users",
            count: undefined,
        },
        {
            title: "Companies",
            description: "Manage company accounts and details",
            icon: _jsx(Building2, { className: "h-5 w-5" }),
            href: "/admin/companies",
            count: undefined,
        },
        {
            title: "Webhooks",
            description: "Configure integrations with external services",
            icon: _jsx(Webhook, { className: "h-5 w-5" }),
            href: "/admin/webhooks",
            count: undefined,
        },
        {
            title: "API Keys",
            description: "Manage API keys for external services",
            icon: _jsx(Key, { className: "h-5 w-5" }),
            href: "/admin/api-config",
            count: undefined,
        },
        {
            title: "Database Verification",
            description: "Verify database structure and security",
            icon: _jsx(Database, { className: "h-5 w-5" }),
            href: "/admin/database",
            count: undefined,
        },
        {
            title: "Launch Check",
            description: "Verify system readiness for production",
            icon: _jsx(RocketIcon, { className: "h-5 w-5" }),
            href: "/admin/launch-check",
            count: undefined,
        },
        {
            title: "Launch Preparation",
            description: "Prepare and deploy the application",
            icon: _jsx(RocketIcon, { className: "h-5 w-5" }),
            href: "/admin/launch-prep",
            highlight: true,
            count: undefined,
        },
        {
            title: "System Settings",
            description: "Configure global system preferences",
            icon: _jsx(Settings, { className: "h-5 w-5" }),
            href: "/admin/settings",
            count: undefined,
        },
    ];
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6", children: gridModules.map((module, index) => (_jsx(ModuleCard, { title: module.title, description: module.description, icon: module.icon, href: module.href, highlight: module.highlight, count: module.count }, index))) }));
}
function ModuleCard({ title, description, icon, href, count, highlight = false, }) {
    return (_jsxs(Link, { to: href, className: `flex flex-col p-6 rounded-xl transition-all ${highlight
            ? "bg-primary/10 border border-primary/20 hover:bg-primary/15"
            : "bg-card border border-border hover:bg-accent/50"}`, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: `p-2 rounded-full w-fit ${highlight ? "bg-primary/20" : "bg-secondary"}`, children: icon }), count && (_jsx("span", { className: "text-sm font-semibold bg-secondary/80 px-2 py-1 rounded", children: count }))] }), _jsx("h3", { className: `text-lg font-medium mt-4 ${highlight ? "text-primary" : ""}`, children: title }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: description })] }));
}
