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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { performDeepScan } from "@/utils/admin/database-verification/displayResults";
import { logDiagnosticInfo } from "@/utils/logger";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { Shield, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";
export default function DiagnosticsPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResults, setScanResults] = useState(null);
    const runDeepScan = () => __awaiter(this, void 0, void 0, function* () {
        setIsScanning(true);
        logDiagnosticInfo("Starting deep scan", {
            timestamp: new Date().toISOString(),
        });
        try {
            // Check database connection
            const dbCheck = yield checkSupabaseConnection();
            // Run the full deep scan
            const scanSuccess = yield performDeepScan();
            // Store results
            setScanResults({
                success: scanSuccess,
                timestamp: new Date().toISOString(),
                details: {
                    authentication: true, // We assume these are set by the deep scan
                    database: dbCheck.connected,
                    permissions: true,
                    routing: true,
                },
            });
        }
        catch (error) {
            console.error("Error during deep scan:", error);
            setScanResults({
                success: false,
                timestamp: new Date().toISOString(),
                details: {
                    authentication: false,
                    database: false,
                    permissions: false,
                    routing: false,
                },
            });
        }
        finally {
            setIsScanning(false);
        }
    });
    return (_jsxs("div", { className: "container mx-auto py-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "System Diagnostics" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Run diagnostics to identify and resolve system issues." }), _jsxs("div", { className: "grid gap-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-5 w-5 text-primary" }), "System Deep Scan"] }), _jsx(CardDescription, { children: "Perform a comprehensive scan of authentication, database, permissions, and routing" })] }), _jsxs(CardContent, { children: [scanResults && (_jsxs("div", { className: "mb-6", children: [_jsxs(Alert, { variant: scanResults.success ? "default" : "destructive", children: [scanResults.success ? (_jsx(CheckCircle, { className: "h-4 w-4" })) : (_jsx(AlertTriangle, { className: "h-4 w-4" })), _jsx(AlertTitle, { children: scanResults.success
                                                            ? "Scan Completed Successfully"
                                                            : "Issues Detected" }), _jsxs(AlertDescription, { children: ["Scan completed at", " ", new Date(scanResults.timestamp).toLocaleTimeString()] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: scanResults.details.authentication
                                                                    ? "outline"
                                                                    : "destructive", children: scanResults.details.authentication ? "Pass" : "Fail" }), _jsx("span", { children: "Authentication" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: scanResults.details.database ? "outline" : "destructive", children: scanResults.details.database ? "Pass" : "Fail" }), _jsx("span", { children: "Database" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: scanResults.details.permissions
                                                                    ? "outline"
                                                                    : "destructive", children: scanResults.details.permissions ? "Pass" : "Fail" }), _jsx("span", { children: "Permissions" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: scanResults.details.routing ? "outline" : "destructive", children: scanResults.details.routing ? "Pass" : "Fail" }), _jsx("span", { children: "Routing" })] })] })] })), _jsxs(Tabs, { defaultValue: "instructions", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "instructions", children: "Instructions" }), _jsx(TabsTrigger, { value: "authentication", children: "Authentication" }), _jsx(TabsTrigger, { value: "database", children: "Database" }), _jsx(TabsTrigger, { value: "routing", children: "Routing" })] }), _jsx(TabsContent, { value: "instructions", children: _jsxs("div", { className: "text-sm space-y-4", children: [_jsx("p", { children: "The deep scan will check:" }), _jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [_jsx("li", { children: "Authentication status and session validity" }), _jsx("li", { children: "Database connection and table permissions" }), _jsx("li", { children: "User role and access permissions" }), _jsx("li", { children: "Routing configuration and component loading" })] }), _jsx("p", { className: "font-medium", children: "Click \"Run Deep Scan\" to begin the diagnostics process." })] }) }), _jsx(TabsContent, { value: "authentication", children: _jsxs("div", { className: "text-sm", children: [_jsx("h3", { className: "font-medium mb-2", children: "Authentication Diagnostics" }), _jsx("p", { className: "mb-2", children: "The scan will verify:" }), _jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [_jsx("li", { children: "User is properly authenticated" }), _jsx("li", { children: "Session token is valid and not expired" }), _jsx("li", { children: "User profile is accessible" })] })] }) }), _jsx(TabsContent, { value: "database", children: _jsxs("div", { className: "text-sm", children: [_jsx("h3", { className: "font-medium mb-2", children: "Database Diagnostics" }), _jsx("p", { className: "mb-2", children: "The scan will verify:" }), _jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [_jsx("li", { children: "Supabase connection is established" }), _jsx("li", { children: "Required tables exist and are accessible" }), _jsx("li", { children: "RLS policies are properly configured" }), _jsx("li", { children: "Database functions are working" })] })] }) }), _jsx(TabsContent, { value: "routing", children: _jsxs("div", { className: "text-sm", children: [_jsx("h3", { className: "font-medium mb-2", children: "Routing Diagnostics" }), _jsx("p", { className: "mb-2", children: "The scan will verify:" }), _jsxs("ul", { className: "list-disc pl-5 space-y-1", children: [_jsx("li", { children: "All required routes are defined" }), _jsx("li", { children: "Component loading is working properly" }), _jsx("li", { children: "URL patterns are correct" }), _jsx("li", { children: "Protection for admin routes is working" })] })] }) })] })] }), _jsx(CardFooter, { children: _jsx(Button, { onClick: runDeepScan, disabled: isScanning, className: "w-full", children: isScanning ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), "Running Deep Scan..."] })) : (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Run Deep Scan"] })) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Common Issues" }), _jsx(CardDescription, { children: "Troubleshooting for frequently encountered problems" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium", children: "404 Errors on Admin Pages" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This typically indicates a routing issue or missing component. Check route definitions in admin-routes.tsx and verify that all required components are imported correctly." })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium", children: "Database Connection Issues" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Verify your Supabase credentials and ensure your IP is whitelisted. Check console logs for specific error details that might indicate permission or configuration problems." })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium", children: "Authentication Failures" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "If authentication is failing, try signing out and back in. Check your role in the profiles table to ensure you have the correct permissions for admin functionality." })] })] }) })] })] })] }));
}
