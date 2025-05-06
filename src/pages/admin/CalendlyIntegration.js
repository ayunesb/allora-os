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
const APIKeyInput = ({ value, onChange, placeholder, error }) => {
    return (_jsxs("div", { className: "space-y-1", children: [_jsx(Input, { type: "password", value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder || "Enter API key" }), error && _jsx("p", { className: "text-sm text-red-500", children: error })] }));
};
const CalendlyIntegration = () => {
    var _a;
    const { toast } = useToast();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [apiKeyError, setApiKeyError] = useState("");
    const [apiKeyValue, setApiKeyValue] = useState("");
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            apiKey: "",
        },
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setIsConnecting(true);
        setApiKeyError("");
        try {
            // This would normally call an API to validate and save the key
            if (!data.apiKey.startsWith("cal_")) {
                setApiKeyError('Invalid Calendly API key format. Should start with "cal_"');
                throw new Error("Invalid API key format");
            }
            // Simulate API call delay
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            // Set connected status
            setIsConnected(true);
            toast({
                title: "Connected to Calendly",
                description: "Your Calendly account has been successfully connected.",
            });
        }
        catch (error) {
            console.error("Error connecting to Calendly:", error);
            toast({
                title: "Connection Failed",
                description: error.message || "Failed to connect to Calendly",
                variant: "destructive",
            });
        }
        finally {
            setIsConnecting(false);
        }
    });
    const handleDisconnect = () => {
        setIsConnected(false);
        toast({
            title: "Disconnected",
            description: "Your Calendly account has been disconnected.",
        });
    };
    const handleApiKeyChange = (value) => {
        setApiKeyValue(value);
        const field = register("apiKey");
        field.onChange({ target: { name: field.name, value } });
    };
    return (_jsxs("div", { className: "container py-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Calendly Integration" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Connect Allora AI to your Calendly account to automatically schedule meetings and manage your calendar." }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Connect to Calendly" }), _jsx(CardDescription, { children: "Enter your Calendly API key to enable scheduling features in Allora AI." })] }), _jsx(CardContent, { children: !isConnected ? (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "apiKey", className: "text-sm font-medium", children: "Calendly API Key" }), _jsx(APIKeyInput, { value: apiKeyValue, onChange: handleApiKeyChange, placeholder: "cal_...", error: apiKeyError || ((_a = errors.apiKey) === null || _a === void 0 ? void 0 : _a.message) }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["You can find your API key in your", " ", _jsx("a", { href: "https://calendly.com/integrations/api_webhooks", target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: "Calendly account settings" })] })] }), _jsx(Button, { type: "submit", disabled: isConnecting, children: isConnecting ? "Connecting..." : "Connect to Calendly" })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-green-50 text-green-800 rounded-md", children: [_jsx("p", { className: "font-medium", children: "Connected to Calendly" }), _jsx("p", { className: "text-sm mt-1", children: "Your Calendly account is now connected to Allora AI. You can now use Calendly features within the application." })] }), _jsx(Button, { variant: "outline", onClick: handleDisconnect, children: "Disconnect from Calendly" })] })) })] })] }));
};
export default CalendlyIntegration;
