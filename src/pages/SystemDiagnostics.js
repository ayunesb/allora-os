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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Server, RefreshCw, CheckCircle, XCircle, AlertTriangle, FileWarning, LayoutDashboard, } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
export default function SystemDiagnostics() {
    const [isCheckingConnection, setIsCheckingConnection] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState({
        connected: false,
        error: null,
    });
    const [routeErrors, setRouteErrors] = useState([]);
    const [componentErrors, setComponentErrors] = useState([]);
    const [diagnosticError, setDiagnosticError] = useState(null);
    // Check database connection
    const checkDatabaseConnection = () => __awaiter(this, void 0, void 0, function* () {
        setIsCheckingConnection(true);
        try {
            const { data, error } = yield supabase
                .from("profiles")
                .select("id")
                .limit(1);
            if (error) {
                setConnectionStatus({ connected: false, error: error.message });
            }
            else {
                setConnectionStatus({ connected: true, error: null });
            }
        }
        catch (error) {
            setConnectionStatus({
                connected: false,
                error: error instanceof Error ? error.message : "Unknown database error",
            });
        }
        finally {
            setIsCheckingConnection(false);
        }
    });
    // Initial checks
    useEffect(() => {
        // Check DB connection on mount
        checkDatabaseConnection();
        // Known issues diagnostics
        setComponentErrors([
            {
                component: "DocumentLegalContent",
                error: "Component is using useCompliance hook outside of ComplianceProvider",
                status: "error",
            },
            {
                component: "LegalDocument",
                error: "Not properly wrapped with ComplianceProvider",
                status: "error",
            },
        ]);
        setRouteErrors([
            {
                path: "/legal/terms-of-service",
                error: "Compliance context missing",
                status: "error",
            },
            {
                path: "/admin/diagnostics",
                error: "Route may be inaccessible due to other errors",
                status: "warning",
            },
        ]);
    }, []);
    return (_jsx("div", { className: "min-h-screen bg-background p-6", children: _jsxs("div", { className: "max-w-5xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-3xl font-bold", children: "System Diagnostics" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "outline", asChild: true, children: _jsxs(Link, { to: "/", children: [_jsx(LayoutDashboard, { className: "mr-2 h-4 w-4" }), "Home"] }) }), _jsx(Button, { variant: "outline", asChild: true, children: _jsxs(Link, { to: "/admin", children: [_jsx(Shield, { className: "mr-2 h-4 w-4" }), "Admin"] }) })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: connectionStatus.connected ? "border-green-200" : "border-red-200", children: [_jsx(CardHeader, { children: _jsx(CardDescription, { children: "Status of your Supabase database connection" }) }), " ", _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Badge, { variant: connectionStatus.connected ? "outline" : "destructive", className: "mr-2", children: connectionStatus.connected ? "Connected" : "Disconnected" }), connectionStatus.connected ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" })) : (_jsx(XCircle, { className: "h-4 w-4 text-red-500" }))] }), !connectionStatus.connected && connectionStatus.error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Connection Error" }), _jsx(AlertDescription, { children: connectionStatus.error })] }))] }) }), _jsx(CardFooter, { children: _jsx(Button, { onClick: checkDatabaseConnection, disabled: isCheckingConnection, variant: "outline", className: "w-full", children: isCheckingConnection ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), "Checking Connection..."] })) : (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Check Connection"] })) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Server, { className: "mr-2 h-5 w-5 text-primary" }), "Application Status"] }), _jsx(CardDescription, { children: "Overall application health diagnostics" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Component Errors" }), _jsx("div", { className: "space-y-2", children: componentErrors.map((error, index) => (_jsxs("div", { className: `p-2 rounded text-sm ${error.status === "error"
                                                                ? "bg-red-50 text-red-800"
                                                                : error.status === "warning"
                                                                    ? "bg-amber-50 text-amber-800"
                                                                    : "bg-green-50 text-green-800"}`, children: [_jsx("div", { className: "font-medium", children: error.component }), _jsx("div", { children: error.error })] }, index))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Route Issues" }), _jsx("div", { className: "space-y-2", children: routeErrors.map((error, index) => (_jsxs("div", { className: `p-2 rounded text-sm ${error.status === "error"
                                                                ? "bg-red-50 text-red-800"
                                                                : error.status === "warning"
                                                                    ? "bg-amber-50 text-amber-800"
                                                                    : "bg-green-50 text-green-800"}`, children: [_jsx("div", { className: "font-medium", children: error.path }), _jsx("div", { children: error.error })] }, index))) })] })] }) })] }), " "] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(FileWarning, { className: "mr-2 h-5 w-5 text-primary" }), "Recommended Fixes"] }), _jsx(CardDescription, { children: "Automated fixes for detected issues" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-3 border rounded", children: [_jsx("h3", { className: "font-medium mb-2", children: "Fix ComplianceProvider Issue" }), _jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "The Legal Document component needs to be properly wrapped with ComplianceProvider. This fix will modify LegalDocument.tsx to ensure proper context is provided." }), _jsx("div", { className: "bg-muted p-2 rounded text-sm font-mono mb-3", children: _jsx("pre", { children: `import { ComplianceProvider } from "@/context/ComplianceContext";

export default function LegalDocument() {
  return (
    <ComplianceProvider>
      <DocumentLegalContent />
    </ComplianceProvider>
  );
}` }) }), _jsx(Button, { asChild: true, className: "w-full", children: _jsx(Link, { to: "/admin/diagnostics", children: "Go to Admin Diagnostics" }) })] }), _jsxs(Alert, { children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Route Access Issues" }), _jsxs(AlertDescription, { children: ["You may be experiencing issues accessing certain routes due to the compliance context error. Try accessing the", " ", _jsx(Link, { to: "/admin", className: "underline", children: "Admin Dashboard" }), " ", "directly."] })] })] }) })] })] }) }));
}
