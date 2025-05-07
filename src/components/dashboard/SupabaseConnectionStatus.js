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
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
export function SupabaseConnectionStatus() {
    const [status, setStatus] = useState("checking");
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        const checkConnection = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Try a simple query to test the connection
                const { data, error } = yield supabase
                    .from("profiles")
                    .select("id")
                    .limit(1);
                if (error) {
                    throw error;
                }
                setStatus("connected");
            }
            catch (err) {
                console.error("Supabase connection error:", err);
                setStatus("error");
                setErrorMessage(err instanceof Error ? err.message : "Unknown connection error");
            }
        });
        checkConnection();
    }, []);
    if (status === "checking") {
        return (_jsxs(Alert, { className: "mb-4", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Checking Connection" }), _jsx(AlertDescription, { children: "Verifying connection to backend services..." })] }));
    }
    if (status === "error") {
        return (_jsxs(Alert, { variant: "destructive", className: "mb-4", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Connection Error" }), _jsx(AlertDescription, { children: errorMessage ||
                        "Unable to connect to backend services. Some features might be limited." })] }));
    }
    return (_jsxs(Alert, { variant: "default", className: "mb-4 bg-green-50 text-green-800 border-green-200", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-600" }), _jsx(AlertTitle, { children: "Connected" }), _jsx(AlertDescription, { children: "Successfully connected to backend services." })] }));
}
