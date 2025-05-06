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
import { useState } from "react";
import ConnectPlatformsCard from "@/components/adplatforms/ConnectPlatformsCard";
import { getAdPlatformConnections } from "@/services/adPlatformService";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Facebook, AlertTriangle } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export function AdPlatformsConnection({ onComplete, companyName, isLoading: externalLoading = false, }) {
    const [metaConnected, setMetaConnected] = useState(false);
    const [tiktokConnected, setTiktokConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { profile } = useAuth();
    // Check if user has connected ad accounts
    useEffect(() => {
        const checkConnections = () => __awaiter(this, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                const connections = yield getAdPlatformConnections();
                setMetaConnected(connections.some((conn) => conn.platform === "meta" && conn.is_active));
                setTiktokConnected(connections.some((conn) => conn.platform === "tiktok" && conn.is_active));
            }
            catch (error) {
                console.error("Error checking ad platform connections:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        if (profile === null || profile === void 0 ? void 0 : profile.company_id) {
            checkConnections();
        }
        else {
            setIsLoading(false);
        }
    }, [profile]);
    const handleProceed = () => __awaiter(this, void 0, void 0, function* () {
        if (onComplete) {
            yield onComplete();
        }
    });
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Connect Your Ad Accounts" }), _jsxs("p", { className: "text-muted-foreground", children: ["Connect your Meta and TikTok ad accounts to help ", companyName, " AI provide more targeted strategy recommendations"] })] }), (profile === null || profile === void 0 ? void 0 : profile.company_id) ? (_jsx(ConnectPlatformsCard, { metaConnected: metaConnected, tiktokConnected: tiktokConnected, isLoading: isLoading || externalLoading, onProceed: handleProceed })) : (_jsxs(Card, { className: "border-amber-200 bg-amber-50", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs(CardTitle, { className: "flex items-center text-amber-800", children: [_jsx(AlertTriangle, { className: "mr-2 h-5 w-5" }), "Company Setup Required"] }), _jsx(CardDescription, { className: "text-amber-700", children: "Please complete the company setup before connecting ad platforms" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center opacity-50", children: [_jsx(Facebook, { className: "mr-2 h-4 w-4 text-blue-600" }), _jsx("span", { children: "Meta (Facebook/Instagram)" }), _jsx(Button, { variant: "outline", size: "sm", className: "ml-auto", disabled: true, children: "Connect" })] }), _jsxs("div", { className: "flex items-center opacity-50", children: [_jsx(TikTokIcon, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "TikTok" }), _jsx(Button, { variant: "outline", size: "sm", className: "ml-auto", disabled: true, children: "Connect" })] }), _jsx(Button, { className: "w-full mt-2", onClick: handleProceed, children: "Continue Without Connecting" })] }) })] })), _jsxs("div", { className: "text-sm text-muted-foreground mt-4", children: [_jsx("p", { children: "* You can skip this step and connect your ad accounts later from the dashboard." }), _jsx("p", { children: "* Connecting your ad accounts helps our AI provide more personalized strategy recommendations." })] })] }));
}
