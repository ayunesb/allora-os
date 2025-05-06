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
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
const PlaidIntegration = () => {
    const { toast } = useToast();
    const { profile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    // Initialize personal API keys with plaid fields
    const [personalApiKeys, setPersonalApiKeys] = useState({
        stripe: "",
        twilio: "",
        zoom: "",
        openai: "",
        plaid_client_id: "",
        plaid_secret: "",
        plaid_access_token: "",
        plaid_env: "sandbox", // Default value
    });
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            plaid_client_id: personalApiKeys.plaid_client_id || "",
            plaid_secret: personalApiKeys.plaid_secret || "",
            plaid_access_token: personalApiKeys.plaid_access_token || "",
            plaid_env: personalApiKeys.plaid_env || "sandbox",
        },
    });
    // Load API keys from profile
    useEffect(() => {
        if (profile === null || profile === void 0 ? void 0 : profile.personal_api_keys) {
            // Convert from possible JSON string
            const keys = typeof profile.personal_api_keys === "string"
                ? JSON.parse(profile.personal_api_keys)
                : profile.personal_api_keys;
            setPersonalApiKeys((prev) => (Object.assign(Object.assign({}, prev), keys)));
            // Reset form with loaded values
            reset({
                plaid_client_id: keys.plaid_client_id || "",
                plaid_secret: keys.plaid_secret || "",
                plaid_access_token: keys.plaid_access_token || "",
                plaid_env: keys.plaid_env || "sandbox",
            });
        }
    }, [profile, reset]);
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            // Implementation would go here in a real app
            console.log("Saving Plaid integration settings:", data);
            toast({
                title: "Settings saved",
                description: "Your Plaid integration settings have been updated successfully.",
            });
        }
        catch (error) {
            console.error("Error saving Plaid settings:", error);
            toast({
                title: "Error",
                description: "Failed to save Plaid integration settings.",
                variant: "destructive",
            });
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsxs("div", { className: "container py-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Plaid Integration" }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Connect to Plaid" }), _jsx(CardDescription, { children: "Use Plaid to connect to bank accounts and financial data." })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "plaid_client_id", className: "text-sm font-medium", children: "Plaid Client ID" }), _jsx(Input, Object.assign({ id: "plaid_client_id", type: "text", placeholder: "Enter your Plaid Client ID" }, register("plaid_client_id")))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "plaid_secret", className: "text-sm font-medium", children: "Plaid Secret" }), _jsx(Input, Object.assign({ id: "plaid_secret", type: "password", placeholder: "Enter your Plaid Secret" }, register("plaid_secret")))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "plaid_access_token", className: "text-sm font-medium", children: "Plaid Access Token" }), _jsx(Input, Object.assign({ id: "plaid_access_token", type: "password", placeholder: "Enter your Plaid Access Token" }, register("plaid_access_token")))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "plaid_env", className: "text-sm font-medium", children: "Plaid Environment" }), _jsxs("select", Object.assign({ id: "plaid_env", className: "w-full p-2 border rounded-md" }, register("plaid_env"), { children: [_jsx("option", { value: "sandbox", children: "Sandbox" }), _jsx("option", { value: "development", children: "Development" }), _jsx("option", { value: "production", children: "Production" })] }))] }), _jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Saving..." : "Save Plaid Settings" })] }) })] })] }));
};
export default PlaidIntegration;
