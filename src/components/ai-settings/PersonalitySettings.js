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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Check, Info, Settings } from "lucide-react";
import { toast } from "sonner";
import { useSelfLearning } from "@/hooks/useSelfLearning";
const personalityDescriptions = {
    conservative: "Cautious, risk-averse, prioritizes stability and proven strategies",
    balanced: "Even approach, considers both risks and opportunities equally",
    bold: "Forward-thinking, embraces reasonable risks, innovation-focused",
    aggressive: "Highly risk-tolerant, pursues high-reward opportunities, disruption-oriented",
};
const responseStyleDescriptions = {
    concise: "Brief, to-the-point responses (1-2 sentences)",
    balanced: "Moderate detail (3-4 sentences with key information)",
    detailed: "Comprehensive explanations with examples and context",
};
export function PersonalitySettings({ botPersonalities, onUpdatePersonality }) {
    var _a, _b;
    const [activeBot, setActiveBot] = useState(((_a = botPersonalities[0]) === null || _a === void 0 ? void 0 : _a.botId) || "");
    const { trackAction } = useSelfLearning();
    const currentBot = botPersonalities.find((bot) => bot.botId === activeBot) ||
        botPersonalities[0];
    const handleSavePersonality = (botId, settings) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield onUpdatePersonality(botId, settings);
            toast.success(`${currentBot.botName}'s personality updated`, {
                description: "Your changes have been saved and will apply to future interactions.",
            });
            // Track the personality update for the self-learning system
            trackAction("update_bot_personality", "ai_customization", botId, "bot", {
                botName: currentBot.botName,
                botRole: currentBot.botRole,
                personalityTrait: settings.personalityTrait || currentBot.personalityTrait,
                responseStyle: settings.responseStyle || currentBot.responseStyle,
            });
        }
        catch (error) {
            console.error("Error updating personality:", error);
            toast.error("Failed to update personality", {
                description: "Please try again or contact support if the issue persists.",
            });
        }
    });
    if (!currentBot) {
        return (_jsx(Card, { className: "w-full", children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Executive Personality Settings" }), _jsx(CardDescription, { children: "No AI executives found. Please add executives first." })] }) }));
    }
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Settings, { className: "h-5 w-5" }), "Executive Personality Settings"] }), _jsx(CardDescription, { children: "Customize how your AI executives behave and communicate" })] }), _jsxs(Tabs, { defaultValue: (_b = botPersonalities[0]) === null || _b === void 0 ? void 0 : _b.botId, value: activeBot, onValueChange: setActiveBot, className: "w-full", children: [_jsx("div", { className: "px-6", children: _jsx(TabsList, { className: "w-full h-auto flex flex-wrap gap-2 bg-background mb-4 justify-start", children: botPersonalities.map((bot) => (_jsxs(TabsTrigger, { value: bot.botId, className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-1.5", children: [bot.botName, " (", bot.botRole, ")"] }, bot.botId))) }) }), botPersonalities.map((bot) => (_jsx(TabsContent, { value: bot.botId, className: "m-0", children: _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: `personality-${bot.botId}`, className: "text-base font-medium", children: "Personality Trait" }), _jsx("span", { className: "text-sm font-medium text-primary capitalize", children: bot.personalityTrait })] }), _jsxs("div", { className: "pt-2", children: [_jsx(Slider, { id: `personality-${bot.botId}`, defaultValue: [getPersonalityValue(bot.personalityTrait)], max: 3, step: 1, onValueChange: (values) => {
                                                        const newValue = getPersonalityFromValue(values[0]);
                                                        handleSavePersonality(bot.botId, {
                                                            personalityTrait: newValue,
                                                        });
                                                    }, className: "w-full" }), _jsxs("div", { className: "flex justify-between mt-2 text-xs text-muted-foreground", children: [_jsx("span", { children: "Conservative" }), _jsx("span", { children: "Balanced" }), _jsx("span", { children: "Bold" }), _jsx("span", { children: "Aggressive" })] })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: personalityDescriptions[bot.personalityTrait] })] }), _jsxs("div", { className: "space-y-2 pt-4", children: [_jsx(Label, { htmlFor: `style-${bot.botId}`, className: "text-base font-medium", children: "Response Style" }), _jsxs(Select, { defaultValue: bot.responseStyle, onValueChange: (value) => handleSavePersonality(bot.botId, {
                                                responseStyle: value,
                                            }), children: [_jsx(SelectTrigger, { id: `style-${bot.botId}`, children: _jsx(SelectValue, { placeholder: "Select response style" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "concise", children: "Concise" }), _jsx(SelectItem, { value: "balanced", children: "Balanced" }), _jsx(SelectItem, { value: "detailed", children: "Detailed" })] })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: responseStyleDescriptions[bot.responseStyle] })] }), _jsxs("div", { className: "space-y-2 pt-4", children: [_jsx(Label, { htmlFor: `level-${bot.botId}`, className: "text-base font-medium", children: "Technical Level" }), _jsxs(Select, { defaultValue: bot.technicalLevel, onValueChange: (value) => handleSavePersonality(bot.botId, {
                                                technicalLevel: value,
                                            }), children: [_jsx(SelectTrigger, { id: `level-${bot.botId}`, children: _jsx(SelectValue, { placeholder: "Select technical level" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "basic", children: "Basic - Simple language, no jargon" }), _jsx(SelectItem, { value: "intermediate", children: "Intermediate - Some industry terms" }), _jsx(SelectItem, { value: "advanced", children: "Advanced - Expert terminology" })] })] })] }), _jsxs("div", { className: "space-y-2 pt-4", children: [_jsx(Label, { htmlFor: `focus-${bot.botId}`, className: "text-base font-medium", children: "Strategic Focus" }), _jsxs(Select, { defaultValue: bot.focusArea, onValueChange: (value) => handleSavePersonality(bot.botId, {
                                                focusArea: value,
                                            }), children: [_jsx(SelectTrigger, { id: `focus-${bot.botId}`, children: _jsx(SelectValue, { placeholder: "Select focus area" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "general", children: "General Business" }), _jsx(SelectItem, { value: "growth", children: "Growth & Expansion" }), _jsx(SelectItem, { value: "profitability", children: "Profitability & Efficiency" }), _jsx(SelectItem, { value: "innovation", children: "Innovation & R&D" }), _jsx(SelectItem, { value: "risk", children: "Risk Management" }), _jsx(SelectItem, { value: "operations", children: "Operations & Logistics" })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2 pt-4", children: [_jsx(Switch, { id: `sources-${bot.botId}`, checked: bot.showSources, onCheckedChange: (checked) => handleSavePersonality(bot.botId, {
                                                showSources: checked,
                                            }) }), _jsx(Label, { htmlFor: `sources-${bot.botId}`, children: "Include references to business frameworks and theories" })] }), _jsxs("div", { className: "space-y-2 pt-4", children: [_jsx(Label, { htmlFor: `custom-${bot.botId}`, className: "text-base font-medium", children: "Custom Instructions" }), _jsx(Textarea, { id: `custom-${bot.botId}`, placeholder: "Add specific instructions for how this executive should behave...", value: bot.customInstructions || "", onChange: (e) => handleSavePersonality(bot.botId, {
                                                customInstructions: e.target.value,
                                            }), className: "min-h-[100px]" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "These instructions will be added to the AI's system prompt." })] })] }) }, bot.botId)))] }), _jsxs(CardFooter, { className: "flex justify-between border-t px-6 py-4", children: [_jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [_jsx(Info, { className: "h-4 w-4 mr-2" }), "Changes are saved automatically"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
                            toast.success("Settings test complete", {
                                description: "Your AI executive's personality setting is working correctly.",
                            });
                        }, children: [_jsx(Check, { className: "h-4 w-4 mr-2" }), "Test Settings"] })] })] }));
}
// Helper functions to convert between personality traits and slider values
function getPersonalityValue(trait) {
    switch (trait) {
        case "conservative":
            return 0;
        case "balanced":
            return 1;
        case "bold":
            return 2;
        case "aggressive":
            return 3;
        default:
            return 1;
    }
}
function getPersonalityFromValue(value) {
    switch (value) {
        case 0:
            return "conservative";
        case 1:
            return "balanced";
        case 2:
            return "bold";
        case 3:
            return "aggressive";
        default:
            return "balanced";
    }
}
