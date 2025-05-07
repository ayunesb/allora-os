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
import APIKeysTab from "@/components/admin/APIKeysTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
export default function ApiKeysPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [companyId, setCompanyId] = useState(null);
    const [apiKeys, setApiKeys] = useState({
        stripe: "",
        twilio_sid: "",
        twilio_token: "",
        heygen: "",
    });
    // Simulate loading API keys
    useEffect(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Simulate API call
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                setCompanyId("company-123");
                setApiKeys({
                    stripe: "sk_test_sample_key",
                    twilio_sid: "AC0123456789",
                    twilio_token: "auth_token_sample",
                    heygen: "heygen_sample_key",
                });
            }
            catch (error) {
                console.error("Error fetching API keys:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchData();
    }, []);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "API Configuration" }), _jsx("p", { className: "text-muted-foreground", children: "Manage API keys and external service configurations." })] }), _jsxs(Tabs, { defaultValue: "api-keys", className: "space-y-4", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "api-keys", children: "API Keys" }), _jsx(TabsTrigger, { value: "security", children: "Security" })] }), _jsx(TabsContent, { value: "api-keys", className: "space-y-4", children: _jsx(APIKeysTab, { companyId: companyId, initialApiKeys: apiKeys, isLoading: isLoading }) }), _jsx(TabsContent, { value: "security", children: _jsx(Card, { children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "API Security Settings" }), _jsx(CardDescription, { children: "Configure security settings for API access" })] }) }) })] })] }));
}
