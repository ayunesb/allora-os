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
import { Progress } from "@/components/ui/progress";
import { upgradeAllExecutiveBots } from "@/utils/executive-os/integrationService";
import { executiveBots } from "@/backend/executiveBots";
import { ArrowUpCircle, CheckCircle, AlertCircle } from "lucide-react";
import { formatRoleTitle } from "@/utils/consultation/botRoleUtils";
import { toast } from "sonner";
export function UpgradeAllExecutives({ onUpgradeComplete }) {
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [upgradedCount, setUpgradedCount] = useState(0);
    const [failedCount, setFailedCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    // Format executives for upgrade
    const getAllExecutives = () => {
        const executives = [];
        for (const [role, names] of Object.entries(executiveBots)) {
            for (const name of names) {
                executives.push({
                    name,
                    role: formatRoleTitle(role),
                });
            }
        }
        return executives;
    };
    const handleUpgradeAll = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setProgress(0);
        setUpgradedCount(0);
        setFailedCount(0);
        setIsComplete(false);
        try {
            const executives = getAllExecutives();
            const totalExecutives = executives.length;
            // Simulate incremental progress
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95) {
                        clearInterval(progressInterval);
                        return 95;
                    }
                    return prev + 85 / totalExecutives;
                });
            }, 800);
            // Perform the actual upgrade
            const result = yield upgradeAllExecutiveBots(executives);
            clearInterval(progressInterval);
            setProgress(100);
            setUpgradedCount(result.success);
            setFailedCount(result.failed);
            setIsComplete(true);
            if (onUpgradeComplete && result.upgraded.length > 0) {
                onUpgradeComplete(result.upgraded);
            }
            toast.success(`Upgraded ${result.success} executives`, {
                description: result.failed > 0
                    ? `${result.failed} executives could not be upgraded`
                    : "All executives successfully integrated with Executive OS",
            });
        }
        catch (error) {
            console.error("Error upgrading all bots:", error);
            toast.error("Upgrade process failed", {
                description: "An unexpected error occurred during the upgrade process.",
            });
            setProgress(0);
            setIsComplete(true);
        }
        finally {
            setIsLoading(false);
        }
    });
    const resetUpgrade = () => {
        setProgress(0);
        setUpgradedCount(0);
        setFailedCount(0);
        setIsComplete(false);
    };
    return (_jsxs(Card, { className: "border border-primary/20 shadow-sm", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardTitle, { className: "text-lg font-medium", children: "Executive OS Integration" }), _jsx(CardDescription, { children: "Upgrade all AI executives with enhanced cognitive capabilities" })] }), _jsx(CardContent, { className: "pb-2", children: isComplete ? (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex justify-center", children: failedCount === 0 ? (_jsxs("div", { className: "flex items-center gap-2 text-primary", children: [_jsx(CheckCircle, { className: "h-8 w-8" }), _jsx("span", { className: "text-xl font-medium", children: "Complete" })] })) : (_jsxs("div", { className: "flex items-center gap-2 text-amber-500", children: [_jsx(AlertCircle, { className: "h-8 w-8" }), _jsx("span", { className: "text-xl font-medium", children: "Partially Complete" })] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-primary", children: upgradedCount }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Upgraded" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-red-500", children: failedCount }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Failed" })] })] }), _jsx("div", { className: "text-sm text-muted-foreground", children: _jsx("p", { children: "All upgraded executives now have Enhanced Executive OS capabilities including First Principles Thinking, OODA Loop, and Decision Frameworks." }) })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { children: "Integration Progress" }), _jsxs("span", { children: [Math.round(progress), "%"] })] }), _jsx(Progress, { value: progress, className: "h-2" })] }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Thinking Models" }), _jsx("span", { className: "font-medium", children: "First Principles, OODA Loop" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Decision Framework" }), _jsx("span", { className: "font-medium", children: "3x3 Priorities, Eisenhower Matrix" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Delegation System" }), _jsx("span", { className: "font-medium", children: "5 Levels (Default: Level 3)" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Mental Models" }), _jsx("span", { className: "font-medium", children: "Custom Per Executive" })] })] })] })) }), _jsx(CardFooter, { className: "pt-2", children: isComplete ? (_jsx(Button, { className: "w-full", variant: "outline", onClick: resetUpgrade, children: "Reset" })) : (_jsx(Button, { className: "w-full", variant: "default", disabled: isLoading, onClick: handleUpgradeAll, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(ArrowUpCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Upgrading All Executives..."] })) : (_jsxs(_Fragment, { children: [_jsx(ArrowUpCircle, { className: "mr-2 h-4 w-4" }), "Upgrade All Executives"] })) })) })] }));
}
