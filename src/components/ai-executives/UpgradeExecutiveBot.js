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
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Share2, ArrowUpCircle } from "lucide-react";
import { upgradeExecutiveBot } from "@/utils/executive-os/integrationService";
import { toast } from "sonner";
export function UpgradeExecutiveBot({ botName, botRole, onUpgradeComplete }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpgraded, setIsUpgraded] = useState(false);
    const [upgradedBot, setUpgradedBot] = useState(null);
    const handleUpgrade = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const result = yield upgradeExecutiveBot(botName, botRole);
            if (result) {
                setUpgradedBot(result);
                setIsUpgraded(true);
                if (onUpgradeComplete) {
                    onUpgradeComplete(result);
                }
            }
            else {
                toast.error("Upgrade failed", {
                    description: "Could not upgrade executive bot. Please try again.",
                });
            }
        }
        catch (error) {
            console.error("Error upgrading bot:", error);
            toast.error("Upgrade process failed", {
                description: "An unexpected error occurred during the upgrade process.",
            });
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsxs(Card, { className: "border border-primary/20 shadow-sm", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-lg font-medium", children: botName }), isUpgraded && (_jsxs(Badge, { variant: "outline", className: "bg-primary/10 text-primary", children: [_jsx(Sparkles, { className: "h-3 w-3 mr-1" }), " OS Integrated"] }))] }), _jsx(CardDescription, { children: botRole })] }), _jsx(CardContent, { className: "pb-2", children: isUpgraded && upgradedBot ? (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-1 text-sm font-medium text-primary mb-1", children: [_jsx(Sparkles, { className: "h-4 w-4" }), " Cognitive Boost"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: upgradedBot.cognitiveBoost })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-1 text-sm font-medium text-primary mb-1", children: [_jsx(Brain, { className: "h-4 w-4" }), " Mental Model"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: upgradedBot.mentalModel })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-1 text-sm font-medium text-primary mb-1", children: [_jsx(Share2, { className: "h-4 w-4" }), " Strategic Focus"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: upgradedBot.strategicFocus })] }), _jsx("div", { className: "flex flex-wrap gap-1 pt-1", children: upgradedBot.personalityTraits.map((trait, i) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: trait }, i))) })] })) : (_jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Upgrade this AI executive with the Allora Executive OS to enhance decision-making capabilities and strategic thinking." }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [_jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [_jsx(Sparkles, { className: "h-3 w-3 text-primary" }), " First Principles"] }), _jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [_jsx(Sparkles, { className: "h-3 w-3 text-primary" }), " OODA Loop"] }), _jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [_jsx(Sparkles, { className: "h-3 w-3 text-primary" }), " 80/20 Rule"] }), _jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [_jsx(Sparkles, { className: "h-3 w-3 text-primary" }), " Mental Models"] })] })] })) }), _jsx(CardFooter, { className: "pt-2", children: isUpgraded ? (_jsxs("div", { className: "w-full flex justify-between items-center text-xs text-muted-foreground", children: [_jsxs("span", { children: ["Upgraded", " ", new Date((upgradedBot === null || upgradedBot === void 0 ? void 0 : upgradedBot.lastIntegrationDate) || "").toLocaleDateString()] }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8", onClick: () => setIsUpgraded(false), children: "Details" })] })) : (_jsx(Button, { className: "w-full", variant: "default", size: "sm", disabled: isLoading, onClick: handleUpgrade, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(ArrowUpCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Upgrading..."] })) : (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "mr-2 h-4 w-4" }), "Upgrade Executive OS"] })) })) })] }));
}
