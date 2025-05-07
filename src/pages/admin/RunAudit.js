var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
export default function RunAudit() {
    const [isRunning, setIsRunning] = useState(false);
    const [auditResults, setAuditResults] = useState([]);
    const handleRunAudit = () => __awaiter(this, void 0, void 0, function* () {
        setIsRunning(true);
        try {
            // Wait for a simulated audit process
            yield new Promise((resolve) => setTimeout(resolve, 2000));
            // Simulate some audit results
            const mockResults = [
                {
                    type: "security",
                    message: "Two-factor authentication is not enabled",
                    valid: false,
                    severity: "warning",
                },
                {
                    type: "performance",
                    message: "All API endpoints are responding within acceptable time limits",
                    valid: true,
                },
                {
                    type: "compliance",
                    message: "Privacy policy is up to date",
                    valid: true,
                },
            ];
            setAuditResults(mockResults);
            toast.success("Audit Complete", {
                description: "System audit has been completed successfully.",
            });
        }
        catch (error) {
            console.error("Audit error:", error);
            toast.error("Audit Failed", {
                description: error instanceof Error ? error.message : "An unknown error occurred",
            });
        }
        finally {
            setIsRunning(false);
        }
    });
    return (_jsxs("div", { className: "container mx-auto py-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "System Audit" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Run a comprehensive audit to identify potential issues and ensure system health." }), _jsx(Button, { onClick: handleRunAudit, disabled: isRunning, children: isRunning ? "Running Audit..." : "Run System Audit" }), auditResults.length > 0 && (_jsxs("div", { className: "mt-8 space-y-4", children: [_jsx("h2", { className: "text-2xl font-semibold", children: "Audit Results" }), auditResults.map((result, index) => (_jsxs(Card, { className: "border", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsxs(CardTitle, { className: "text-sm font-medium", children: [result.type, " Check"] }), result.valid ? (_jsx(CheckCircle, { className: "text-green-500 h-4 w-4" })) : (_jsx(AlertTriangle, { className: "text-red-500 h-4 w-4" }))] }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm text-muted-foreground", children: result.message }) })] }, index)))] }))] }));
}
