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
import { Loader2 } from "lucide-react";
import APIKeyInput from "./APIKeyInput";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
export default function APIKeysTab({ companyId, initialApiKeys, isLoading }) {
    const [stripeKey, setStripeKey] = useState(initialApiKeys.stripe);
    const [twilioSid, setTwilioSid] = useState(initialApiKeys.twilio_sid);
    const [twilioToken, setTwilioToken] = useState(initialApiKeys.twilio_token);
    const [heygenKey, setHeygenKey] = useState(initialApiKeys.heygen);
    const [isSaving, setIsSaving] = useState(false);
    const { user, profile } = useAuth();
    const handleSaveApiConfiguration = () => __awaiter(this, void 0, void 0, function* () {
        if (!companyId) {
            toast.error("No company found to save settings");
            return;
        }
        setIsSaving(true);
        try {
            // Implementation would go here in a real app
            yield new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            toast.success("API configuration saved successfully");
        }
        catch (error) {
            console.error("Error saving API configuration:", error);
            toast.error(`Failed to save API configuration: ${error.message || "Unknown error"}`);
        }
        finally {
            setIsSaving(false);
        }
    });
    if (isLoading) {
        return (_jsxs("div", { className: "flex items-center justify-center py-4", children: [_jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }), _jsx("span", { className: "ml-2", children: "Loading configuration..." })] }));
    }
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "API Keys Configuration" }), _jsx(CardDescription, { children: "Manage integration keys for external services" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx(APIKeyInput, { id: "stripe-key", label: "Stripe API Key", placeholder: "sk_test_...", value: stripeKey, onChange: setStripeKey }), _jsx(APIKeyInput, { id: "twilio-sid", label: "Twilio Account SID", placeholder: "AC...", value: twilioSid, onChange: setTwilioSid, isSecret: false }), _jsx(APIKeyInput, { id: "twilio-token", label: "Twilio Auth Token", value: twilioToken, onChange: setTwilioToken }), _jsx(APIKeyInput, { id: "heygen-key", label: "Heygen API Key", value: heygenKey, onChange: setHeygenKey }), _jsx(Button, { onClick: handleSaveApiConfiguration, disabled: isSaving || !companyId, children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Saving..."] })) : ("Save API Configuration") })] })] }));
}
