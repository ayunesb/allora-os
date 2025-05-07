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
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useZoomIntegration } from "@/hooks/useZoomIntegration";
import { Video, Link2, Loader2, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
export function ZoomConnector() {
    const { checkConnection, connectZoom, disconnectZoom, isConnecting, integration, isConnected: connectionStatus, } = useZoomIntegration();
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        function checkZoomConnection() {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield checkConnection();
                setIsConnected(result.connected);
                setIsLoading(false);
            });
        }
        checkZoomConnection();
    }, [checkConnection]);
    const handleConnect = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectZoom();
        }
        catch (error) {
            toast.error("Failed to initiate Zoom connection");
        }
    });
    const handleDisconnect = () => __awaiter(this, void 0, void 0, function* () {
        const confirmed = window.confirm("Are you sure you want to disconnect your Zoom integration? Any scheduled Zoom meetings will remain but you won't be able to create new ones.");
        if (!confirmed)
            return;
        const result = yield disconnectZoom();
        if (result.success) {
            setIsConnected(false);
            toast.success("Zoom account disconnected successfully");
        }
        else {
            toast.error("Failed to disconnect Zoom account");
        }
    });
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Video, { className: "h-5 w-5 text-blue-600" }), "Zoom Integration"] }), _jsx(CardDescription, { children: "Connect your Zoom account to schedule meetings with clients" })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "flex justify-center py-4", children: _jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary/70" }) })) : isConnected ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm bg-green-50 dark:bg-green-950/40 p-3 rounded-md text-green-700 dark:text-green-400", children: [_jsx("div", { className: "bg-green-100 dark:bg-green-900/50 p-1 rounded-full", children: _jsx("svg", { className: "h-4 w-4", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }), _jsx("span", { children: "Your Zoom account is connected" })] }), integration && (_jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsxs("p", { children: ["Connected:", " ", integration.created_at
                                            ? formatDistanceToNow(new Date(integration.created_at), {
                                                addSuffix: true,
                                            })
                                            : "Recently"] }), _jsxs("p", { children: ["Last updated:", " ", formatDistanceToNow(new Date(integration.updated_at), {
                                            addSuffix: true,
                                        })] })] })), _jsx("div", { className: "text-sm text-muted-foreground", children: _jsx("p", { children: "Allora AI can now create and manage Zoom meetings on your behalf." }) })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm bg-amber-50 dark:bg-amber-950/40 p-3 rounded-md text-amber-700 dark:text-amber-400", children: [_jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }), _jsx("span", { children: "Your Zoom account is not connected" })] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [_jsx("p", { children: "Connect your Zoom account to enable Allora AI to create and manage meetings on your behalf." }), _jsx("p", { className: "mt-2", children: "This integration allows us to:" }), _jsxs("ul", { className: "list-disc list-inside mt-1 space-y-1", children: [_jsx("li", { children: "Create Zoom meetings for strategic discussions" }), _jsx("li", { children: "Schedule follow-up calls with your team" }), _jsx("li", { children: "Provide one-click access to your meetings" })] })] })] })) }), _jsx(CardFooter, { children: isConnected ? (_jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full", children: [_jsx(Button, { variant: "outline", className: "w-full sm:w-auto", onClick: handleDisconnect, children: "Disconnect Zoom" }), _jsxs(Button, { variant: "outline", className: "w-full sm:w-auto", onClick: () => window.open("https://zoom.us/meeting", "_blank"), children: [_jsx(ExternalLink, { className: "mr-2 h-4 w-4" }), "Open Zoom Dashboard"] })] })) : (_jsx(Button, { onClick: handleConnect, disabled: isConnecting, className: "w-full sm:w-auto", children: isConnecting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Connecting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Link2, { className: "mr-2 h-4 w-4" }), "Connect Zoom Account"] })) })) })] }));
}
