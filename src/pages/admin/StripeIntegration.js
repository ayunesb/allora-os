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
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import APIKeyInput from "@/components/admin/APIKeyInput";
import { useQuery } from "@tanstack/react-query";
export default function StripeIntegration() {
    const [stripeSecretKey, setStripeSecretKey] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [testQuery, setTestQuery] = useState("");
    const [testResult, setTestResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data: isKeySet, isLoading: isCheckingKey } = useQuery({
        queryKey: ["stripe-key-check"],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase.functions.invoke("check-secret", {
                    body: { key: "STRIPE_SECRET_KEY" },
                });
                if (error)
                    throw error;
                return data.exists;
            }
            catch (err) {
                console.error("Error checking Stripe key:", err);
                return false;
            }
        }),
    });
    const handleSaveKey = () => __awaiter(this, void 0, void 0, function* () {
        if (!stripeSecretKey) {
            toast.error("Please enter a Stripe secret key");
            return;
        }
        setIsSubmitting(true);
        try {
            const { data, error } = yield supabase.functions.invoke("set-secret", {
                body: {
                    key: "STRIPE_SECRET_KEY",
                    value: stripeSecretKey,
                },
            });
            if (error)
                throw error;
            toast.success("Stripe secret key saved successfully");
            setStripeSecretKey("");
        }
        catch (err) {
            console.error("Error saving Stripe key:", err);
            toast.error("Failed to save Stripe secret key");
        }
        finally {
            setIsSubmitting(false);
        }
    });
    const handleTestQuery = () => __awaiter(this, void 0, void 0, function* () {
        if (!testQuery) {
            toast.error("Please enter a test query");
            return;
        }
        setIsLoading(true);
        setTestResult(null);
        try {
            const { data, error } = yield supabase.functions.invoke("stripe-analytics", {
                body: { query: testQuery },
            });
            if (error)
                throw error;
            setTestResult(data.result);
        }
        catch (err) {
            console.error("Error executing Stripe test query:", err);
            toast.error("Failed to execute Stripe test query");
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(TypographyH1, { children: "Stripe Integration" }), _jsx(TypographyP, { children: "Configure Stripe integration for payment analytics and management through the AI agent." })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Stripe API Configuration" }), _jsx(CardDescription, { children: "Enter your Stripe secret key to enable payment analytics through the AI agent." })] }), _jsxs(CardContent, { className: "space-y-4", children: [isKeySet ? (_jsxs(Alert, { className: "bg-green-50 border-green-200", children: [_jsx(AlertTitle, { children: "Stripe integration is active" }), _jsx(AlertDescription, { children: "Your Stripe secret key is configured. The AI agent can now access Stripe data." })] })) : (_jsxs(Alert, { className: "bg-yellow-50 border-yellow-200", children: [_jsx(AlertTitle, { children: "Stripe integration not configured" }), _jsx(AlertDescription, { children: "Enter your Stripe secret key below to enable the integration." })] })), _jsxs("div", { className: "mt-4", children: [_jsx(APIKeyInput, { id: "stripe-secret-key", label: "Stripe Secret Key", value: stripeSecretKey, onChange: (value) => setStripeSecretKey(value), placeholder: "sk_live_..." }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Find this in your Stripe Dashboard under API Keys. Use your secret key (not publishable key)." })] }), _jsx(Button, { onClick: handleSaveKey, disabled: isSubmitting || !stripeSecretKey, className: "mt-2", children: isSubmitting ? "Saving..." : "Save API Key" })] })] }), isKeySet && (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Test Stripe Analytics" }), _jsx(CardDescription, { children: "Try out some sample queries to test the Stripe analytics integration." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col space-y-2", children: [_jsx(Label, { htmlFor: "test-query", children: "Test Query" }), _jsx(Input, { id: "test-query", placeholder: "e.g., What's our total revenue in the last 30 days?", value: testQuery, onChange: (e) => setTestQuery(e.target.value) }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Try queries like \"total revenue\", \"active subscriptions\", or \"refunds this week\"" })] }), _jsx(Button, { onClick: handleTestQuery, disabled: isLoading || !testQuery, children: isLoading ? "Running..." : "Run Test Query" }), testResult && (_jsxs("div", { className: "mt-4 p-4 bg-gray-50 rounded-md border", children: [_jsx("h3", { className: "font-medium mb-2", children: "Result:" }), _jsx("pre", { className: "whitespace-pre-wrap text-sm", children: testResult })] }))] })] }))] }));
}
