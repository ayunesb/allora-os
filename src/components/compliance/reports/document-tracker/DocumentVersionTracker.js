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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock } from "lucide-react";
import { useCompliance } from "@/hooks/useCompliance";
import { formatRelativeTime } from "@/utils/dateUtils";
import { Skeleton } from "@/components/ui/skeleton";
export default function DocumentVersionTracker() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const compliance = useCompliance();
    const handleRefresh = () => __awaiter(this, void 0, void 0, function* () {
        setIsRefreshing(true);
        try {
            yield compliance.checkForUpdates();
        }
        catch (error) {
            console.error("Error checking for updates:", error);
        }
        finally {
            setIsRefreshing(false);
        }
    });
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx(CardTitle, { className: "text-lg", children: "Document Version Tracker" }), _jsx(CardDescription, { children: "Monitor the status and versions of your compliance documents" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [compliance.isCheckingUpdates ? (_jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-3/4" }), _jsx(Skeleton, { className: "h-4 w-1/2" }), _jsx(Skeleton, { className: "h-4 w-2/3" })] })) : (_jsxs("div", { className: "flex items-center justify-between border-b pb-2 mb-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Last document check" }), _jsxs("div", { className: "flex items-center text-xs text-muted-foreground", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), compliance.lastChecked
                                                    ? formatRelativeTime(compliance.lastChecked)
                                                    : "Never checked"] })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: isRefreshing, children: isRefreshing ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1.5 animate-spin" }), "Checking..."] })) : ("Check Now") })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm font-medium", children: "Auto-update documents" }), _jsx("div", { className: "flex items-center", children: _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "sr-only peer", checked: compliance.autoUpdate || false, onChange: (e) => compliance.setAutoUpdate &&
                                                    compliance.setAutoUpdate(e.target.checked) }), _jsx("div", { className: "w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" })] }) })] })] }) }), _jsx(CardFooter, { className: "text-xs text-muted-foreground", children: "Compliance documents are updated automatically when regulations change" })] }));
}
