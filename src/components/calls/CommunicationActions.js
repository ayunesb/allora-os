import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Video, MessageSquare, Sparkles } from "lucide-react";
import ZoomScheduler from "./ZoomScheduler";
import WhatsAppSender from "./WhatsAppSender";
import PhoneDialer from "./PhoneDialer";
import AiScriptGenerator from "./AiScriptGenerator";
export default function CommunicationActions() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [activeTab, setActiveTab] = useState("phone");
    return (_jsxs(Card, { className: "h-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Communication Tools" }), _jsx(CardDescription, { children: "Call, message, or schedule meetings with leads" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "phone", value: activeTab, onValueChange: (v) => setActiveTab(v), children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsxs(TabsTrigger, { value: "phone", className: "flex items-center space-x-1", children: [_jsx(Phone, { className: "h-4 w-4" }), _jsx("span", { children: "Call" })] }), _jsxs(TabsTrigger, { value: "zoom", className: "flex items-center space-x-1", children: [_jsx(Video, { className: "h-4 w-4" }), _jsx("span", { children: "Zoom" })] }), _jsxs(TabsTrigger, { value: "whatsapp", className: "flex items-center space-x-1", children: [_jsx(MessageSquare, { className: "h-4 w-4" }), _jsx("span", { children: "WhatsApp" })] }), _jsxs(TabsTrigger, { value: "ai", className: "flex items-center space-x-1", children: [_jsx(Sparkles, { className: "h-4 w-4" }), _jsx("span", { children: "AI" })] })] }), _jsx(TabsContent, { value: "phone", children: _jsx(PhoneDialer, { phoneNumber: phoneNumber, onPhoneNumberChange: setPhoneNumber }) }), _jsx(TabsContent, { value: "zoom", children: _jsx(ZoomScheduler, {}) }), _jsx(TabsContent, { value: "whatsapp", children: _jsx(WhatsAppSender, { phoneNumber: phoneNumber, onPhoneNumberChange: setPhoneNumber }) }), _jsx(TabsContent, { value: "ai", children: _jsx(AiScriptGenerator, {}) })] }) })] }));
}
