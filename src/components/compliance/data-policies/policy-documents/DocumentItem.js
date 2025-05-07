import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { Download, ExternalLink, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useCompliance } from "@/context/ComplianceContext";
export default function DocumentItem({ document, updatingDocId }) {
    const { applyUpdate, isApplyingUpdate } = useCompliance();
    const handleUpdateDocument = (docId) => {
        applyUpdate(docId);
    };
    return (_jsxs("li", { className: "flex justify-between items-center p-3 border rounded-md", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: document.name }), document.updateAvailable && (_jsx(Badge, { variant: "outline", className: "border-amber-500 text-amber-500", children: "Update Available" }))] }), _jsxs("div", { className: "text-xs text-muted-foreground", children: [_jsxs("span", { className: "mr-2", children: ["Version: ", document.version] }), _jsxs("span", { children: ["Last updated: ", document.lastUpdated] })] })] }), _jsxs("div", { className: "flex space-x-2", children: [document.updateAvailable && (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "text-amber-500 border-amber-500", onClick: () => handleUpdateDocument(document.id), disabled: updatingDocId === document.id || isApplyingUpdate, children: [_jsx(RefreshCw, { className: `h-4 w-4 mr-1 ${updatingDocId === document.id ? "animate-spin" : ""}` }), updatingDocId === document.id ? "Updating..." : "Update"] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Update to the latest version" }) })] }) })), _jsx(Button, { variant: "outline", size: "sm", asChild: true, children: _jsxs(Link, { to: document.path, children: [_jsx(ExternalLink, { className: "h-4 w-4 mr-1" }), "View"] }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Download, { className: "h-4 w-4" }) })] })] }));
}
