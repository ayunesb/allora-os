import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { FileText } from "lucide-react";
import DocumentList from "./policy-documents/DocumentList";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function PolicyDocuments() {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: isMobileView ? "px-4 py-3" : undefined, children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(FileText, { className: "mr-2 h-5 w-5 text-primary" }), "Policy Documents"] }), _jsx(CardDescription, { children: "Legal and compliance documents" })] }), _jsx(CardContent, { className: isMobileView ? "px-4 py-3 pt-0" : undefined, children: _jsx(DocumentList, {}) })] }));
}
