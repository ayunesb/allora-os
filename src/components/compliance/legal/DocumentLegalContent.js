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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock } from "lucide-react";
import { useCompliance } from "@/hooks/useCompliance";
import { formatRelativeTime } from "@/utils/dateUtils";
export default function DocumentLegalContent({ title, description, content }) {
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
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx(CardTitle, { className: "text-lg", children: title }), _jsx(CardDescription, { children: description })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "prose dark:prose-invert max-w-none", children: content ? (_jsx("p", { children: content })) : (_jsx("div", { className: "text-center py-6", children: _jsx("p", { className: "text-muted-foreground", children: "No content available for this document." }) })) }), _jsxs("div", { className: "flex items-center justify-between border-t pt-4", children: [_jsxs("div", { className: "flex items-center text-xs text-muted-foreground", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), "Last updated", " ", compliance.lastChecked
                                        ? formatRelativeTime(compliance.lastChecked)
                                        : "Never"] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: isRefreshing, children: isRefreshing ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1.5 animate-spin" }), "Checking..."] })) : ("Check for Updates") })] })] })] }));
}
