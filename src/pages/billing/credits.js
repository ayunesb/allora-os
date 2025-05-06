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
import { Button } from "@/components/ui/button";
import { Coins, CreditCard, RefreshCw } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
// Initialize supabase client
const supabaseUrl = "https://tnfqzklfdwknmplrygag.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default function CreditsPage() {
    const [credits, setCredits] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchCredits();
    }, []);
    const fetchCredits = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            // Simulate fetching credits from Supabase
            const { data, error } = yield supabase
                .from("billing_profiles")
                .select("credits")
                .single();
            if (error)
                throw error;
            setCredits((data === null || data === void 0 ? void 0 : data.credits) || 0);
        }
        catch (error) {
            console.error("Error fetching credits:", error);
            setCredits(100); // Fallback to default credits
        }
        finally {
            setIsLoading(false);
        }
    });
    const handlePurchaseCredits = () => {
        // Implement credit purchase flow
        console.log("Purchase credits clicked");
    };
    return (_jsxs("div", { className: "container mx-auto py-8 px-4", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: "Credits & Billing" }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Coins, { className: "h-5 w-5 text-primary" }), "Your Credits"] }), _jsx(CardDescription, { children: "Credits are used for AI operations and strategy generation" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-4xl font-bold", children: isLoading ? "..." : credits }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Available Credits" })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: fetchCredits, disabled: isLoading, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CreditCard, { className: "h-5 w-5 text-primary" }), "Purchase Credits"] }), _jsx(CardDescription, { children: "Add more credits to your account" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm", children: "Purchase additional credits to continue using AI features and generating strategies." }), _jsx(Button, { onClick: handlePurchaseCredits, children: "Buy More Credits" })] }) })] })] })] }));
}
