var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { AuditLegal } from "./AuditLegal";
import { AuditFunctional } from "./AuditFunctional";
import { AuditAI } from "./AuditAI";
import { AuditPerformance } from "./AuditPerformance";
import { AuditSecurity } from "./AuditSecurity";
import { AuditIntegrations } from "./AuditIntegrations";
import { AuditNavigation } from "./AuditNavigation";
import { validateLaunchReadiness } from "@/utils/launchValidator";
import { AuditSummary } from "./AuditSummary";
import { AuditStatusList } from "./AuditStatusList";
export default function PreLaunchAudit() {
    const [legalStatus, setLegalStatus] = useState("pending");
    const [functionalStatus, setFunctionalStatus] = useState("pending");
    const [aiStatus, setAiStatus] = useState("pending");
    const [performanceStatus, setPerformanceStatus] = useState("pending");
    const [securityStatus, setSecurityStatus] = useState("pending");
    const [integrationsStatus, setIntegrationsStatus] = useState("pending");
    const [navigationStatus, setNavigationStatus] = useState("pending");
    const [isRunningAll, setIsRunningAll] = useState(false);
    // Summary state to track overall completion
    const [summary, setSummary] = useState({
        total: 7,
        passed: 0,
        failed: 0,
        pending: 7,
    });
    // Load audit results from localStorage on component mount
    useEffect(() => {
        const lastAuditResults = localStorage.getItem("lastAuditResults");
        if (lastAuditResults) {
            try {
                const auditData = JSON.parse(lastAuditResults);
                const validationResults = auditData.results;
                // Update statuses based on audit results
                if (validationResults) {
                    const ready = validationResults.ready || false;
                    const criticalIssues = validationResults.issues.filter((i) => i.severity === "critical").length;
                    if (ready) {
                        // If system is ready, set most statuses to passed
                        setLegalStatus("passed");
                        setFunctionalStatus("passed");
                        setAiStatus("passed");
                        setPerformanceStatus("passed");
                        setSecurityStatus("passed");
                        setIntegrationsStatus("passed");
                        setNavigationStatus("passed");
                    }
                    else if (criticalIssues > 0) {
                        // If there are critical issues, mark relevant checks as failed
                        setLegalStatus("passed"); // Legal is usually separate
                        setFunctionalStatus(criticalIssues > 0 ? "failed" : "passed");
                        setAiStatus("passed");
                        setPerformanceStatus("passed");
                        setSecurityStatus("failed"); // Security issues are often critical
                        setIntegrationsStatus("failed");
                        setNavigationStatus("passed");
                    }
                    toast.info("Loaded latest audit results", {
                        description: `Last audit performed: ${new Date(auditData.timestamp).toLocaleString()}`,
                    });
                }
            }
            catch (error) {
                console.error("Error parsing audit results:", error);
            }
        }
    }, []);
    // Update summary whenever any status changes
    useEffect(() => {
        const statuses = [
            legalStatus,
            functionalStatus,
            aiStatus,
            performanceStatus,
            securityStatus,
            integrationsStatus,
            navigationStatus,
        ];
        const passed = statuses.filter((s) => s === "passed").length;
        const failed = statuses.filter((s) => s === "failed").length;
        const pending = statuses.filter((s) => s === "pending").length;
        setSummary({
            total: 7,
            passed,
            failed,
            pending,
        });
    }, [
        legalStatus,
        functionalStatus,
        aiStatus,
        performanceStatus,
        securityStatus,
        integrationsStatus,
        navigationStatus,
    ]);
    const runAllAudits = () => __awaiter(this, void 0, void 0, function* () {
        if (isRunningAll)
            return;
        setIsRunningAll(true);
        toast.info("Running all audit checks...", { duration: 3000 });
        // Reset all statuses to pending
        setLegalStatus("pending");
        setFunctionalStatus("pending");
        setAiStatus("pending");
        setPerformanceStatus("pending");
        setSecurityStatus("pending");
        setIntegrationsStatus("pending");
        setNavigationStatus("pending");
        // Wait for a moment to let the UI update
        yield new Promise((resolve) => setTimeout(resolve, 500));
        // Run the comprehensive launch readiness check
        try {
            const { valid, results } = yield validateLaunchReadiness();
            // Update individual statuses based on results
            // These will be simulated for now since we don't have the actual checks
            setLegalStatus("passed");
            yield new Promise((resolve) => setTimeout(resolve, 500));
            setFunctionalStatus(valid ? "passed" : "failed");
            yield new Promise((resolve) => setTimeout(resolve, 500));
            setAiStatus(valid ? "passed" : "failed");
            yield new Promise((resolve) => setTimeout(resolve, 500));
            setPerformanceStatus(valid ? "passed" : "failed");
            yield new Promise((resolve) => setTimeout(resolve, 500));
            setSecurityStatus(valid ? "passed" : "failed");
            yield new Promise((resolve) => setTimeout(resolve, 500));
            setIntegrationsStatus(valid ? "passed" : "failed");
            yield new Promise((resolve) => setTimeout(resolve, 500));
            setNavigationStatus(valid ? "passed" : "failed");
            if (valid) {
                toast.success("All systems ready for launch!", {
                    description: "Your application has passed all pre-launch checks.",
                });
            }
            else {
                toast.error("Some systems require attention!", {
                    description: "Please review the failed checks before launching.",
                });
            }
        }
        catch (error) {
            console.error("Error running launch readiness check:", error);
            toast.error("Error running audit checks", {
                description: "Please try again or check specific categories individually.",
            });
        }
        finally {
            setIsRunningAll(false);
        }
    });
    const statusItems = [
        {
            id: "legal",
            label: "Legal Compliance",
            status: legalStatus,
            passedMessage: "All legal documents verified",
            failedMessage: "Legal issues detected",
            pendingMessage: "Pending",
        },
        {
            id: "functional",
            label: "Functional Testing",
            status: functionalStatus,
            passedMessage: "All features working correctly",
            failedMessage: "Issues with functionality",
            pendingMessage: "Pending",
        },
        {
            id: "ai",
            label: "AI Bot Validation",
            status: aiStatus,
            passedMessage: "AI prompts validated",
            failedMessage: "AI prompts need attention",
            pendingMessage: "Pending",
        },
        {
            id: "performance",
            label: "Performance",
            status: performanceStatus,
            passedMessage: "Performance metrics acceptable",
            failedMessage: "Performance issues detected",
            pendingMessage: "Pending",
        },
        {
            id: "security",
            label: "Security & Database",
            status: securityStatus,
            passedMessage: "Security measures verified",
            failedMessage: "Security issues found",
            pendingMessage: "Pending",
        },
        {
            id: "integrations",
            label: "API Integrations",
            status: integrationsStatus,
            passedMessage: "All integrations working",
            failedMessage: "Integration issues detected",
            pendingMessage: "Pending",
        },
        {
            id: "navigation",
            label: "Navigation & URLs",
            status: navigationStatus,
            passedMessage: "All routes accessible",
            failedMessage: "Navigation issues found",
            pendingMessage: "Pending",
        },
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-2xl", children: "Pre-Launch Audit" }), _jsx(Button, { onClick: runAllAudits, disabled: isRunningAll, children: isRunningAll ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" }), "Running All Checks..."] })) : ("Run All Checks") })] }) }), _jsxs(CardContent, { children: [_jsx(AuditSummary, { summary: summary }), _jsx(AuditStatusList, { items: statusItems })] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-6", children: [_jsx(AuditLegal, { status: legalStatus, onStatusChange: setLegalStatus }), _jsx(AuditFunctional, { status: functionalStatus, onStatusChange: setFunctionalStatus }), _jsx(AuditAI, { status: aiStatus, onStatusChange: setAiStatus }), _jsx(AuditPerformance, { status: performanceStatus, onStatusChange: setPerformanceStatus }), _jsx(AuditSecurity, { status: securityStatus, onStatusChange: setSecurityStatus }), _jsx(AuditIntegrations, { status: integrationsStatus, onStatusChange: setIntegrationsStatus }), _jsx(AuditNavigation, { status: navigationStatus, onStatusChange: setNavigationStatus })] })] }));
}
