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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
const NotionIntegration = () => {
    const { toast } = useToast();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const { register, handleSubmit } = useForm();
    const handleConnect = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setIsConnecting(true);
        try {
            // In a real app, we would store this in the database
            const { apiKey } = data;
            // Test the connection by calling the Notion tool function
            const { data: response, error } = yield supabase.functions.invoke("notion-tool", {
                body: {
                    title: "Connection Test",
                    content: "This is a test of the Notion integration",
                },
                headers: {
                    "X-Notion-API-Key": apiKey,
                },
            });
            if (error)
                throw error;
            // For a real app, store the API key securely
            // This would be done securely server-side
            localStorage.setItem("notion_api_key", apiKey);
            setIsConnected(true);
            toast({
                title: "Notion connected",
                description: "Your Notion account has been successfully connected.",
            });
        }
        catch (error) {
            console.error("Error connecting to Notion:", error);
            toast({
                title: "Connection failed",
                description: error.message || "Failed to connect to Notion",
                variant: "destructive",
            });
        }
        finally {
            setIsConnecting(false);
        }
    });
    const handleDisconnect = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Remove the API key
            localStorage.removeItem("notion_api_key");
            setIsConnected(false);
            toast({
                title: "Notion disconnected",
                description: "Your Notion account has been disconnected.",
            });
        }
        catch (error) {
            console.error("Error disconnecting from Notion:", error);
            toast({
                title: "Error",
                description: "Failed to disconnect from Notion",
                variant: "destructive",
            });
        }
    });
    return (_jsxs("div", { className: "container py-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Notion Integration" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Connect Allora AI to your Notion workspace to log decisions, strategies, and actions." }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Connect to Notion" }), _jsx(CardDescription, { children: "Enter your Notion API key to enable automatic logging of AI decisions and strategies." })] }), _jsx(CardContent, { children: !isConnected ? (_jsxs("form", { onSubmit: handleSubmit(handleConnect), className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "apiKey", className: "text-sm font-medium", children: "Notion API Key" }), _jsx(Input, Object.assign({ id: "apiKey", type: "password", placeholder: "secret_..." }, register("apiKey", { required: true }))), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Get your Notion API key from the", " ", _jsx("a", { href: "https://www.notion.so/my-integrations", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "Notion Integrations page" })] })] }), _jsx(Button, { type: "submit", disabled: isConnecting, children: isConnecting ? "Connecting..." : "Connect to Notion" })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-green-50 text-green-800 rounded-md", children: [_jsx("p", { className: "font-medium", children: "Connected to Notion" }), _jsx("p", { className: "text-sm mt-1", children: "All executive decisions and strategies will be automatically logged to your Notion workspace." })] }), _jsx(Button, { variant: "outline", onClick: handleDisconnect, children: "Disconnect from Notion" })] })) })] })] }));
};
export default NotionIntegration;
