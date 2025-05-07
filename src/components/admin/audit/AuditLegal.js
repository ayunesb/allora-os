var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, FileText, } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
export function AuditLegal({ status, onStatusChange }) {
    const [isRunning, setIsRunning] = useState(false);
    const [items, setItems] = useState([
        {
            id: "legal-1",
            title: "Privacy Policy",
            description: "GDPR and CCPA compliant Privacy Policy",
            status: "pending",
            required: true,
        },
        {
            id: "legal-2",
            title: "Terms of Service",
            description: "Clear Terms of Service document",
            status: "pending",
            required: true,
        },
        {
            id: "legal-3",
            title: "Cookie Policy",
            description: "Cookie usage details and opt-out options",
            status: "pending",
            required: true,
        },
        {
            id: "legal-4",
            title: "GDPR Compliance",
            description: "Data deletion and export options",
            status: "pending",
            required: true,
        },
        {
            id: "legal-5",
            title: "Refund Policy",
            description: "Clear refund terms for paid services",
            status: "pending",
            required: false,
        },
        {
            id: "legal-6",
            title: "Consent Management",
            description: "Cookie consent banner implementation",
            status: "pending",
            required: true,
        },
    ]);
    const runTest = () => __awaiter(this, void 0, void 0, function* () {
        setIsRunning(true);
        // Check for existence of legal pages in routes
        try {
            // For each item, perform a check (simulated for now)
            for (let i = 0; i < items.length; i++) {
                // Update item to in-progress
                setItems((prev) => prev.map((item, idx) => idx === i ? Object.assign(Object.assign({}, item), { status: "in-progress" }) : item));
                // Wait a short time to simulate check
                yield new Promise((resolve) => setTimeout(resolve, 500));
                // Check the routes for legal documents
                const hasDocument = checkForLegalDocument(items[i].id);
                // Update item status
                setItems((prev) => prev.map((item, idx) => idx === i
                    ? Object.assign(Object.assign({}, item), { status: hasDocument ? "passed" : "failed" }) : item));
            }
            // Check overall status
            const requiredItems = items.filter((item) => item.required);
            const allRequiredPassed = requiredItems.every((item) => item.status === "passed");
            onStatusChange(allRequiredPassed ? "passed" : "failed");
            if (allRequiredPassed) {
                toast.success("Legal documents check passed!");
            }
            else {
                toast.error("Some required legal documents are missing!");
            }
        }
        catch (error) {
            console.error("Error checking legal documents:", error);
            onStatusChange("failed");
            toast.error("Error checking legal documents");
        }
        finally {
            setIsRunning(false);
        }
    });
    // Helper to check for legal document (simplified for demo)
    const checkForLegalDocument = (id) => {
        // In a real app, this would check the routes or API for the document
        const documentMap = {
            "legal-1": "/privacy",
            "legal-2": "/terms",
            "legal-3": "/cookie-policy",
            "legal-4": "/gdpr",
            "legal-5": "/refund-policy",
            "legal-6": "/cookie-consent",
        };
        // Simulate checking routes
        // For demo purposes, let's pass all but refund policy
        return id !== "legal-5";
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "passed":
                return _jsx(CheckCircle2, { className: "h-4 w-4 text-green-500" });
            case "failed":
                return _jsx(XCircle, { className: "h-4 w-4 text-red-500" });
            case "in-progress":
                return _jsx(Loader2, { className: "h-4 w-4 animate-spin text-blue-500" });
            default:
                return _jsx(AlertCircle, { className: "h-4 w-4 text-muted-foreground" });
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-5 w-5 text-primary/80" }), _jsx(CardTitle, { children: "Legal Documents Audit" })] }), _jsx(Button, { onClick: runTest, disabled: isRunning, size: "sm", children: isRunning ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Checking..."] })) : ("Check Documents") })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: items.map((item) => (_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx("div", { className: "mt-0.5", children: getStatusIcon(item.status) }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium", children: item.title }), !item.required && (_jsx("span", { className: "text-xs bg-primary/10 text-primary/90 px-1.5 py-0.5 rounded", children: "Optional" }))] }), _jsx("div", { className: "text-xs text-muted-foreground", children: item.description })] }), _jsx("div", { className: "ml-auto flex items-center", children: _jsx(Checkbox, { id: item.id, checked: item.status === "passed", disabled: isRunning, onCheckedChange: (checked) => {
                                        setItems((prev) => prev.map((i) => i.id === item.id
                                            ? Object.assign(Object.assign({}, i), { status: checked ? "passed" : "failed" }) : i));
                                    } }) })] }, item.id))) }) })] }));
}
