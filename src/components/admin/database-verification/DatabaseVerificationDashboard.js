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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCw, DatabaseIcon, AlertCircle } from "lucide-react";
import { DatabaseTablesCheck } from "./DatabaseTablesCheck";
import { RlsPoliciesCheck } from "./RlsPoliciesCheck";
import { DatabaseFunctionsCheck } from "./DatabaseFunctionsCheck";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
export function DatabaseVerificationDashboard({ result, onVerify }) {
    const [connectionStatus, setConnectionStatus] = useState({
        checked: false,
        connected: false,
    });
    const checkConnection = () => __awaiter(this, void 0, void 0, function* () {
        const status = yield checkSupabaseConnection();
        setConnectionStatus({
            checked: true,
            connected: status.connected,
            message: status.message,
        });
    });
    return (_jsxs("div", { className: "space-y-6", children: [!connectionStatus.checked ? (_jsx("div", { className: "flex justify-end mb-4", children: _jsx(Button, { variant: "outline", size: "sm", onClick: checkConnection, children: "Check Database Connection" }) })) : connectionStatus.connected ? (_jsxs(Alert, { className: "mb-4", children: [_jsx(DatabaseIcon, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Database connection successful. You can now verify database configuration." })] })) : (_jsxs(Alert, { variant: "destructive", className: "mb-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: connectionStatus.message ||
                            "Database connection failed. Please check your configuration." })] })), _jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Database Verification" }), _jsx(Button, { onClick: onVerify, disabled: result.isVerifying, children: result.isVerifying ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), "Verifying..."] })) : (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Verify Database"] })) })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(DatabaseTablesCheck, { tables: result.tables }), _jsx(RlsPoliciesCheck, { policies: result.policies }), _jsx(DatabaseFunctionsCheck, { functions: result.functions })] }), result.tables.length === 0 &&
                result.policies.length === 0 &&
                result.functions.length === 0 &&
                !result.isVerifying && (_jsx("div", { className: "text-center py-8 text-muted-foreground", children: "Click \"Verify Database\" to check your database configuration" }))] }));
}
