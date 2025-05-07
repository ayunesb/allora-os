import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { BarChart2, Download, PlusCircle } from "lucide-react";
export const LeadsHeader = ({ isMobileView, onAddLead }) => {
    return (_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold", children: "Lead Management" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Oversee all leads generated through the platform" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(BarChart2, { className: "h-4 w-4 mr-2" }), "Analytics"] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] }), onAddLead && (_jsxs(Button, { size: "sm", onClick: onAddLead, children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), "Add Lead"] }))] })] }));
};
