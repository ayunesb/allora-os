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
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export const SessionRefreshBanner = ({ threshold = 45, // Default to 45 minutes
 }) => {
    const [showBanner, setShowBanner] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    useEffect(() => {
        // Check if session needs refreshing - use last activity or created_at
        const checkSessionAge = () => {
            if (!auth.user)
                return;
            // Use updated_at if available, otherwise fall back to created_at
            const sessionTimestamp = auth.user.updated_at || auth.user.created_at;
            if (!sessionTimestamp)
                return;
            const sessionUpdateTime = new Date(sessionTimestamp).getTime();
            const thresholdMs = threshold * 60 * 1000; // Convert minutes to ms
            const now = Date.now();
            setShowBanner(now - sessionUpdateTime > thresholdMs);
        };
        checkSessionAge();
        // Check every 5 minutes
        const interval = setInterval(checkSessionAge, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [auth.user, threshold]);
    const handleRefresh = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!auth.refreshSession)
            return;
        setIsRefreshing(true);
        try {
            yield auth.refreshSession();
            setShowBanner(false);
            toast.success("Session refreshed successfully");
        }
        catch (error) {
            console.error("Failed to refresh session:", error);
            toast.error("Failed to refresh session");
        }
        finally {
            setIsRefreshing(false);
        }
    });
    if (!showBanner)
        return null;
    return (_jsx("div", { className: "fixed bottom-4 right-4 z-50 max-w-sm p-4 bg-muted/80 backdrop-blur rounded-lg shadow-lg border border-muted-foreground/20", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-sm", children: "Session expiring soon" }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your session will expire soon. Refresh to stay logged in." }), _jsx(Button, { onClick: handleRefresh, size: "sm", className: "mt-2 h-8", disabled: isRefreshing, children: isRefreshing ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1.5 animate-spin" }), "Refreshing..."] })) : ("Refresh Session") })] })] }) }));
};
