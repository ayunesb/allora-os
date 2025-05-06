import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Settings, Info, ArrowLeft } from "lucide-react";
import BotChatPanel from "@/components/bot-chat/BotChatPanel";
import BotSettingsPanel from "@/components/bot-chat/BotSettingsPanel";
import BotInfoPanel from "@/components/bot-chat/BotInfoPanel";
import { useAuth } from "@/context/AuthContext";
import { normalizeUserObject } from "@/utils/authCompatibility";
export default function BotDetail({ bot: initialBot }) {
    const { botId } = useParams();
    const navigate = useNavigate();
    const { profile } = useAuth();
    const [activeTab, setActiveTab] = useState("chat");
    const normalizedProfile = normalizeUserObject(profile);
    // If no bot was passed in props, use the botId from URL params to create a default bot
    const bot = initialBot || {
        id: botId,
        name: "AI Advisor",
        title: "Business Strategist",
        expertise: "Growth Strategies",
        description: "I help businesses identify growth opportunities and develop strategic plans to achieve their goals.",
        avatar: "/ai-advisors/business-strategist.png",
        industry: (normalizedProfile === null || normalizedProfile === void 0 ? void 0 : normalizedProfile.industry) || "General Business",
        specialties: ["Market Analysis", "Competitive Strategy", "Growth Planning"],
    };
    const handleBackClick = () => {
        navigate("/dashboard/ai-bots");
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 max-w-5xl", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "mb-4", onClick: handleBackClick, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back to Advisors"] }), _jsxs(Card, { className: "border-primary/20", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-4", children: [_jsxs(Avatar, { className: "h-16 w-16 border-2 border-primary/20", children: [_jsx(AvatarImage, { src: bot.avatar, alt: bot.name }), _jsx(AvatarFallback, { className: "bg-primary/10 text-lg", children: bot.name.charAt(0) })] }), _jsxs("div", { className: "space-y-1 text-center sm:text-left", children: [_jsx(CardTitle, { className: "text-xl", children: bot.name }), _jsx(CardDescription, { className: "text-base", children: bot.title }), _jsxs("div", { className: "flex flex-wrap gap-2 justify-center sm:justify-start mt-2", children: [_jsx(Badge, { variant: "outline", className: "bg-primary/10", children: bot.expertise }), bot.industry && (_jsx(Badge, { variant: "outline", className: "bg-secondary/10", children: bot.industry }))] })] })] }) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsx("div", { className: "px-4 sm:px-6", children: _jsxs(TabsList, { className: "grid grid-cols-3 w-full", children: [_jsxs(TabsTrigger, { value: "chat", className: "flex items-center gap-2", children: [_jsx(MessageCircle, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: "Chat" })] }), _jsxs(TabsTrigger, { value: "info", className: "flex items-center gap-2", children: [_jsx(Info, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: "Info" })] }), _jsxs(TabsTrigger, { value: "settings", className: "flex items-center gap-2", children: [_jsx(Settings, { className: "h-4 w-4" }), _jsx("span", { className: "hidden sm:inline", children: "Settings" })] })] }) }), _jsxs(CardContent, { className: "pt-6", children: [_jsx(TabsContent, { value: "chat", className: "mt-0", children: _jsx(BotChatPanel, { botId: bot.id || "", bot: bot }) }), _jsx(TabsContent, { value: "info", className: "mt-0", children: _jsx(BotInfoPanel, { bot: bot, description: bot.description, specialties: bot.specialties, expertise: bot.expertise }) }), _jsx(TabsContent, { value: "settings", className: "mt-0", children: _jsx(BotSettingsPanel, { botId: bot.id || "", bot: bot }) })] })] })] })] }));
}
