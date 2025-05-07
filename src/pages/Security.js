import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
export default function Security() {
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Security Settings - Allora AI" }) }), _jsx(PageErrorBoundary, { pageName: "Security Settings", children: _jsxs("div", { className: "container mx-auto px-4 py-6", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight mb-6", children: "Security Settings" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your security settings and authentication preferences" }), _jsxs("div", { className: "mt-8 p-6 border rounded-lg bg-card", children: [_jsx("h2", { className: "text-xl font-medium mb-4", children: "Security Options" }), _jsx("p", { children: "This is a placeholder for the Security page content." })] })] }) })] }));
}
