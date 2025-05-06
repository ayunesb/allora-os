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
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { isDemoTenant } from "@/utils/isDemoTenant";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useCompanyId } from "@/hooks/useCompanyId";
export default function DemoRoute() {
    const { user } = useAuth();
    const tenantId = useCompanyId();
    const [isDemo, setIsDemo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const checkDemoStatus = () => __awaiter(this, void 0, void 0, function* () {
            if (tenantId) {
                const demo = yield isDemoTenant(tenantId);
                setIsDemo(demo);
            }
            else {
                setIsDemo(false);
            }
            setIsLoading(false);
        });
        checkDemoStatus();
    }, [tenantId]);
    // While checking demo status
    if (isLoading) {
        return (_jsx("div", { className: "container mx-auto p-6 flex items-center justify-center min-h-[60vh]", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }));
    }
    // If not in demo mode, redirect to dashboard
    if (isDemo === false) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    const demoExpirationTime = 24; // hours
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsxs(Alert, { className: "rounded-none border-t-0 border-x-0 bg-amber-50 dark:bg-amber-900/20", children: [_jsxs(AlertTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: "Demo Mode" }), _jsx(Button, { onClick: () => navigate("/dashboard"), type: "default", size: "sm", className: "bg-amber-100 hover:bg-amber-200 dark:bg-amber-800 dark:hover:bg-amber-700", children: "Exit Demo" })] }), _jsxs(AlertDescription, { children: ["You're viewing a read-only demo environment. All changes will be automatically reset after ", demoExpirationTime, " hours."] })] }), _jsxs("div", { className: "flex-1", children: [_jsx(Outlet, {}), _jsx("div", { children: ["Text", 123] })] })] }));
}
