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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Facebook, RefreshCcw, AlertCircle } from "lucide-react";
import { initiateMetaAuth, initiateTikTokAuth, } from "@/services/adPlatformService";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { useState } from "react";
import { toast } from "sonner";
export default function ConnectPlatformsCard({ metaConnected, tiktokConnected, isLoading, onProceed, }) {
    const [metaConnecting, setMetaConnecting] = useState(false);
    const [tiktokConnecting, setTiktokConnecting] = useState(false);
    const [metaError, setMetaError] = useState(null);
    const [tiktokError, setTiktokError] = useState(null);
    const handleMetaConnect = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setMetaConnecting(true);
            setMetaError(null);
            const result = yield initiateMetaAuth();
            if (!result.success) {
                setMetaError(result.error || "Failed to initiate Meta authorization");
            }
        }
        catch (error) {
            console.error("Meta auth initiation failed:", error);
            setMetaError(error.message || "Unknown error");
            toast.error("Failed to connect to Meta. Please try again.");
        }
        finally {
            setMetaConnecting(false);
        }
    });
    const handleTikTokConnect = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setTiktokConnecting(true);
            setTiktokError(null);
            const result = yield initiateTikTokAuth();
            if (!result.success) {
                setTiktokError(result.error || "Failed to initiate TikTok authorization");
            }
        }
        catch (error) {
            console.error("TikTok auth initiation failed:", error);
            setTiktokError(error.message || "Unknown error");
            toast.error("Failed to connect to TikTok. Please try again.");
        }
        finally {
            setTiktokConnecting(false);
        }
    });
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { children: "Connect Ad Platforms" }), _jsx(CardDescription, { children: "Connect your Meta and TikTok ad accounts to start creating campaigns" })] }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Facebook, { className: "mr-2 h-4 w-4 text-blue-600" }), _jsx("span", { children: "Meta (Facebook/Instagram)" })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleMetaConnect, disabled: metaConnected || isLoading || metaConnecting, children: metaConnecting ? (_jsxs(_Fragment, { children: [_jsx(RefreshCcw, { className: "mr-2 h-4 w-4 animate-spin" }), "Connecting..."] })) : metaConnected ? ("Connected") : ("Connect") })] }), metaError && (_jsxs("div", { className: "flex items-center text-red-500 text-sm mt-1", children: [_jsx(AlertCircle, { className: "h-4 w-4 mr-1" }), _jsx("span", { children: metaError })] }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(TikTokIcon, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "TikTok" })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleTikTokConnect, disabled: tiktokConnected || isLoading || tiktokConnecting, children: tiktokConnecting ? (_jsxs(_Fragment, { children: [_jsx(RefreshCcw, { className: "mr-2 h-4 w-4 animate-spin" }), "Connecting..."] })) : tiktokConnected ? ("Connected") : ("Connect") })] }), tiktokError && (_jsxs("div", { className: "flex items-center text-red-500 text-sm mt-1", children: [_jsx(AlertCircle, { className: "h-4 w-4 mr-1" }), _jsx("span", { children: tiktokError })] }))] })] }), _jsx(CardFooter, { children: _jsx(Button, { className: "w-full", onClick: onProceed, disabled: !metaConnected && !tiktokConnected, children: "Proceed to Create Campaign" }) })] }));
}
