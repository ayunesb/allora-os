import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export function CompanyHeader({ onAddCompanyClick }) {
    return (_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Company Management" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Manage organizations in the platform" })] }), _jsxs(Button, { onClick: onAddCompanyClick, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add Company"] })] }));
}
