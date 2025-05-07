import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageTitle } from "@/components/ui/page-title";
export default function DevDebugPage() {
    return (_jsxs("div", { className: "container mx-auto py-6", children: [_jsx(PageTitle, { title: "Debug Page", description: "For development and testing", children: "Debug Page" }), _jsx("div", { className: "mt-6 space-y-6", children: _jsxs("div", { className: "p-4 border rounded-lg", children: [_jsx("h3", { className: "text-lg font-medium", children: "Debug Information" }), _jsx("p", { className: "text-muted-foreground", children: "Development tools and settings" })] }) })] }));
}
