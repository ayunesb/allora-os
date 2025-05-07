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
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, RefreshCw, ExternalLink, ShieldCheck, } from "lucide-react";
import { checkLaunchReadiness } from "@/utils/launchReadiness";
import { toast } from "sonner";
export default function LaunchReadinessCheck() {
    const [readinessStatus, setReadinessStatus] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    useEffect(() => {
        performReadinessCheck();
    }, []);
    function performReadinessCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            setIsChecking(true);
            try {
                const status = yield checkLaunchReadiness();
                setReadinessStatus(status);
                // Show toast with overall status
                if (status.overallStatus === "ready") {
                    toast.success("All systems ready for launch!");
                }
                else if (status.overallStatus === "warning") {
                    toast.warning("System can be launched with some warnings");
                }
                else {
                    toast.error("System is not ready for launch");
                }
            }
            catch (error) {
                console.error("Error performing readiness check:", error);
                toast.error("Failed to complete readiness check");
            }
            finally {
                setIsChecking(false);
            }
        });
    }
    function getApiStatusBadge(status) {
        switch (status) {
            case "connected":
                return (_jsx(Badge, { className: "bg-green-500/10 text-green-500 hover:bg-green-500/20", children: "Connected" }));
            case "error":
                return _jsx(Badge, { variant: "destructive", children: "Error" });
            case "not_configured":
                return (_jsx(Badge, { variant: "outline", className: "text-muted-foreground", children: "Not Configured" }));
            default:
                return null;
        }
    }
    function getStatusIcon(status) {
        if (status === true ||
            status === "ready" ||
            status === "connected" ||
            status === "high") {
            return _jsx(Check, { className: "h-4 w-4 text-green-500" });
        }
        else if (status === "warning" || status === "medium") {
            return _jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500" });
        }
        else {
            return _jsx(X, { className: "h-4 w-4 text-red-500" });
        }
    }
    if (!readinessStatus) {
        return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Launch Readiness Check" }), _jsx(CardDescription, { children: "Checking system readiness..." })] }), _jsx(CardContent, { className: "flex justify-center py-6", children: _jsx(RefreshCw, { className: "h-8 w-8 animate-spin text-primary/70" }) })] }));
    }
    const overallStatusClasses = readinessStatus.overallStatus === "ready"
        ? "bg-green-500/10 text-green-500 border-green-200"
        : readinessStatus.overallStatus === "warning"
            ? "bg-yellow-500/10 text-yellow-600 border-yellow-200"
            : "bg-red-500/10 text-red-600 border-red-200";
    return (_jsxs(Card, { className: "relative overflow-hidden border-primary/10", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-xl md:text-2xl", children: "Launch Readiness Check" }), _jsxs(Button, { variant: "secondary", size: "sm", onClick: performReadinessCheck, disabled: isChecking, className: "h-8 gap-1", children: [_jsx(RefreshCw, { className: `h-3.5 w-3.5 ${isChecking ? "animate-spin" : ""}` }), "Refresh"] })] }), _jsx(CardDescription, { children: "System readiness check for production launch" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs(Alert, { variant: "default", className: `${overallStatusClasses} border`, children: [_jsxs("div", { className: "flex items-center gap-2", children: [readinessStatus.overallStatus === "ready" ? (_jsx(ShieldCheck, { className: "h-5 w-5" })) : readinessStatus.overallStatus === "warning" ? (_jsx(AlertTriangle, { className: "h-5 w-5" })) : (_jsx(X, { className: "h-5 w-5" })), _jsx(AlertTitle, { className: "font-medium", children: readinessStatus.overallStatus === "ready"
                                            ? "Ready for Launch"
                                            : readinessStatus.overallStatus === "warning"
                                                ? "Launch with Caution"
                                                : "Not Ready for Launch" })] }), _jsx(AlertDescription, { className: "mt-2 text-sm", children: readinessStatus.overallStatus === "ready"
                                    ? "All systems have been checked and are ready for production deployment."
                                    : readinessStatus.overallStatus === "warning"
                                        ? "System can be launched but some non-critical items need attention."
                                        : "The system is not ready for launch. Please address the issues highlighted below." })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-3", children: "API Connections" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3", children: [_jsxs("div", { className: "bg-card border border-border rounded-lg p-3 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center", children: _jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-sm", children: "Stripe" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Payments & Billing" })] })] }), getApiStatusBadge(readinessStatus.apis.stripe)] }), _jsxs("div", { className: "bg-card border border-border rounded-lg p-3 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center", children: _jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-sm", children: "Postmark" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Email Delivery" })] })] }), getApiStatusBadge(readinessStatus.apis.postmark)] }), _jsxs("div", { className: "bg-card border border-border rounded-lg p-3 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center", children: _jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-sm", children: "Twilio" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "WhatsApp & SMS" })] })] }), getApiStatusBadge(readinessStatus.apis.twilio)] }), _jsxs("div", { className: "bg-card border border-border rounded-lg p-3 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center", children: _jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-sm", children: "Heygen" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Video Generation" })] })] }), getApiStatusBadge(readinessStatus.apis.heygen)] }), _jsxs("div", { className: "bg-card border border-border rounded-lg p-3 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center", children: _jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-sm", children: "OpenAI" }), _jsx("div", { className: "text-xs text-muted-foreground", children: "AI & Content" })] })] }), getApiStatusBadge(readinessStatus.apis.openai)] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-3", children: "Database & Data" }), _jsxs("div", { className: "space-y-2 bg-secondary/20 p-4 rounded-lg border border-border", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm font-medium", children: "Database Status" }), _jsxs("div", { className: "flex items-center gap-1", children: [getStatusIcon(readinessStatus.database.status), _jsx("span", { className: "text-sm", children: readinessStatus.database.status === "ready"
                                                                    ? "Ready"
                                                                    : "Error" })] })] }), readinessStatus.database.message && (_jsx("div", { className: "text-xs text-muted-foreground", children: readinessStatus.database.message }))] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-3", children: "Compliance" }), _jsxs("div", { className: "space-y-2 bg-secondary/20 p-4 rounded-lg border border-border", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm font-medium", children: "WhatsApp Opt-In/Out" }), _jsx("div", { children: getStatusIcon(readinessStatus.compliance.whatsappOptIn) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm font-medium", children: "Email Unsubscribe" }), _jsx("div", { children: getStatusIcon(readinessStatus.compliance.emailUnsubscribe) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm font-medium", children: "Billing Compliance" }), _jsx("div", { children: getStatusIcon(readinessStatus.compliance.billingCompliance) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm font-medium", children: "API Security Level" }), _jsxs("div", { className: "flex items-center gap-1", children: [getStatusIcon(readinessStatus.compliance.apiSecurityLevel), _jsx("span", { className: "text-sm capitalize", children: readinessStatus.compliance.apiSecurityLevel })] })] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-3", children: "Features Status" }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: [_jsxs("div", { className: "bg-secondary/20 rounded-lg border border-border p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm font-medium", children: "Authentication" }), _jsx("div", { children: getStatusIcon(readinessStatus.features.authentication) })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: "User login & registration" })] }), _jsxs("div", { className: "bg-secondary/20 rounded-lg border border-border p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm font-medium", children: "Onboarding" }), _jsx("div", { children: getStatusIcon(readinessStatus.features.onboarding) })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: "User setup process" })] }), _jsxs("div", { className: "bg-secondary/20 rounded-lg border border-border p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm font-medium", children: "Strategies" }), _jsx("div", { children: getStatusIcon(readinessStatus.features.strategies) })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Business strategies" })] }), _jsxs("div", { className: "bg-secondary/20 rounded-lg border border-border p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm font-medium", children: "Campaigns" }), _jsx("div", { children: getStatusIcon(readinessStatus.features.campaigns) })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Marketing campaigns" })] }), _jsxs("div", { className: "bg-secondary/20 rounded-lg border border-border p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm font-medium", children: "AI Debate" }), _jsx("div", { children: getStatusIcon(readinessStatus.features.aiDebate) })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Executive debate feature" })] }), _jsxs("div", { className: "bg-secondary/20 rounded-lg border border-border p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm font-medium", children: "Welcome Video" }), _jsx("div", { children: getStatusIcon(readinessStatus.features.welcomeVideo) })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Personalized video" })] }), _jsxs("div", { className: "bg-secondary/20 rounded-lg border border-border p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("div", { className: "text-sm font-medium", children: "Billing" }), _jsx("div", { children: getStatusIcon(readinessStatus.features.billing) })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: "Subscription management" })] })] })] })] }), _jsxs(CardFooter, { className: "flex flex-col sm:flex-row justify-between gap-4 border-t pt-6", children: [_jsxs("div", { className: "text-sm text-muted-foreground", children: ["Last checked: ", new Date().toLocaleString()] }), readinessStatus.overallStatus === "ready" && (_jsxs(Button, { className: "w-full sm:w-auto gap-2", children: [_jsx(ExternalLink, { className: "h-4 w-4" }), "Launch to Production"] })), readinessStatus.overallStatus === "warning" && (_jsxs(Button, { variant: "secondary", className: "w-full sm:w-auto gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Launch with Warnings"] })), readinessStatus.overallStatus === "not_ready" && (_jsxs(Button, { variant: "secondary", className: "w-full sm:w-auto gap-2", disabled: true, children: [_jsx(X, { className: "h-4 w-4" }), "Fix Issues to Launch"] }))] })] }));
}
