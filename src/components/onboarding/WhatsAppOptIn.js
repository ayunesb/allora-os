import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
export function WhatsAppOptIn({ onOptInChange, initialValue = false }) {
    const [optedIn, setOptedIn] = useState(initialValue);
    const handleChange = (checked) => {
        setOptedIn(checked);
        onOptInChange(checked);
    };
    return (_jsxs(Card, { className: "border shadow-sm", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: "WhatsApp Communication" }), _jsx(CardDescription, { children: "Receive AI-powered guidance and updates directly via WhatsApp" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "bg-primary/10 rounded-full p-2 mt-1", children: _jsx(Info, { className: "h-5 w-5 text-primary" }) }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm", children: "Our AI executive team can send personalized business recommendations, marketing campaigns, and strategic advice directly to your WhatsApp. All messages are human-like and tailored to your business needs." }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "whatsapp-opt-in", checked: optedIn, onCheckedChange: handleChange }), _jsx(Label, { htmlFor: "whatsapp-opt-in", className: "text-sm font-medium", children: "Yes, I want to receive AI business guidance via WhatsApp" })] }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["You can opt-out anytime by replying STOP to any message. We respect your privacy and comply with all WhatsApp Business messaging policies. See our", " ", _jsx("a", { href: "#", className: "text-primary hover:underline", children: "Privacy Policy" }), " ", "for details."] })] })] }) }), _jsx(CardFooter, { className: "bg-muted/50 px-6 py-3 text-xs text-muted-foreground", children: "Only pre-approved message templates will be used outside the 24-hour conversation window." })] }));
}
