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
import { CheckCircle2, XCircle, AlertCircle, Loader2, Plug, } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
export function AuditIntegrations({ status, onStatusChange }) {
    const [isRunning, setIsRunning] = useState(false);
    const [items, setItems] = useState([
        {
            id: "int-1",
            title: "Supabase Connection",
            description: "Database connection is active",
            status: "pending",
            required: true,
        },
        {
            id: "int-2",
            title: "Authentication Integration",
            description: "Auth provider integration works",
            status: "pending",
            required: true,
        },
        {
            id: "int-3",
            title: "OpenAI Integration",
            description: "AI service connection is active",
            status: "pending",
            required: true,
        },
        {
            id: "int-4",
            title: "Stripe Integration",
            description: "Payment processing is functioning",
            status: "pending",
            required: false,
        },
        {
            id: "int-5",
            title: "Email Provider",
            description: "Email notifications can be sent",
            status: "pending",
            required: true,
        },
    ]);
    const runTest = () => __awaiter(this, void 0, void 0, function* () {
        setIsRunning(true);
        try {
            // Check each integration
            for (let i = 0; i < items.length; i++) {
                setItems((prev) => prev.map((item, idx) => idx === i ? Object.assign(Object.assign({}, item), { status: "in-progress" }) : item));
                yield new Promise((resolve) => setTimeout(resolve, 600));
                // For demo purposes, let's pass all but Stripe
                const passed = items[i].id !== "int-4";
                setItems((prev) => prev.map((item, idx) => idx === i
                    ? Object.assign(Object.assign({}, item), { status: passed ? "passed" : "failed" }) : item));
            }
            // Check if all required integrations pass
            const requiredItems = items.filter((item) => item.required);
            const allRequiredPassed = requiredItems.every((item) => {
                const updatedItem = items.find((i) => i.id === item.id);
                return (updatedItem === null || updatedItem === void 0 ? void 0 : updatedItem.status) === "passed";
            });
            onStatusChange(allRequiredPassed ? "passed" : "failed");
            if (allRequiredPassed) {
                toast.success("Integrations check passed!");
            }
            else {
                toast.error("Some integrations failed! Please review and fix.");
            }
        }
        catch (error) {
            console.error("Integrations check error:", error);
            onStatusChange("failed");
            toast.error("Error checking integrations");
        }
        finally {
            setIsRunning(false);
        }
    });
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
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Plug, { className: "h-5 w-5 text-primary/80" }), _jsx(CardTitle, { children: "Integrations Check" })] }), _jsx(Button, { onClick: runTest, disabled: isRunning, size: "sm", children: isRunning ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Checking..."] })) : ("Test Integrations") })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: items.map((item) => (_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx("div", { className: "mt-0.5", children: getStatusIcon(item.status) }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-medium", children: item.title }), !item.required && (_jsx("span", { className: "text-xs bg-primary/10 text-primary/90 px-1.5 py-0.5 rounded", children: "Optional" }))] }), _jsx("div", { className: "text-xs text-muted-foreground", children: item.description })] }), _jsx("div", { className: "ml-auto flex items-center", children: _jsx(Checkbox, { id: item.id, checked: item.status === "passed", disabled: isRunning, onCheckedChange: (checked) => {
                                        setItems((prev) => prev.map((i) => i.id === item.id
                                            ? Object.assign(Object.assign({}, i), { status: checked ? "passed" : "failed" }) : i));
                                    } }) })] }, item.id))) }) })] }));
}
