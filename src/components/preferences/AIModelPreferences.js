import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Database, Bot } from "lucide-react";
export default function AIModelPreferences({ preferences, updatePreference }) {
    const handleModelChange = (value) => {
        updatePreference("modelPreference", value);
    };
    const toggleDebate = (enabled) => {
        updatePreference("enableDebate", enabled);
    };
    const toggleVectorSearch = (enabled) => {
        updatePreference("enableVectorSearch", enabled);
    };
    const toggleLearning = (enabled) => {
        updatePreference("enableLearning", enabled);
    };
    const handleParticipantChange = (value) => {
        updatePreference("maxDebateParticipants", value[0]);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "defaultModel", children: "AI Model Preference" }), _jsxs(Select, { value: preferences.modelPreference || "auto", onValueChange: handleModelChange, children: [_jsx(SelectTrigger, { id: "defaultModel", children: _jsx(SelectValue, { placeholder: "Select AI model" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "auto", children: "Auto (System Choice)" }), _jsx(SelectItem, { value: "gpt-4o-mini", children: "OpenAI GPT-4o Mini (Fast)" }), _jsx(SelectItem, { value: "gpt-4o", children: "OpenAI GPT-4o (Powerful)" }), _jsx(SelectItem, { value: "claude-3-sonnet-20240229", children: "Anthropic Claude 3 Sonnet" }), _jsx(SelectItem, { value: "gemini-1.5-pro", children: "Google Gemini 1.5 Pro" })] })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Select your preferred AI model for generating responses" })] }), _jsx(Card, { className: "border-dashed", children: _jsxs(CardContent, { className: "pt-6 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsxs(Label, { htmlFor: "enableDebate", className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-4 w-4 text-blue-500" }), "Multi-Executive Debate"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Enable executives to debate and provide multiple perspectives" })] }), _jsx(Switch, { id: "enableDebate", checked: preferences.enableDebate || false, onCheckedChange: toggleDebate })] }), preferences.enableDebate && (_jsxs("div", { children: [_jsxs(Label, { className: "flex items-center gap-2", children: [_jsx(Bot, { className: "h-4 w-4 text-violet-500" }), "Maximum Debate Participants"] }), _jsx("div", { className: "pt-4 pb-2", children: _jsx(Slider, { value: [preferences.maxDebateParticipants || 3], min: 2, max: 5, step: 1, onValueChange: handleParticipantChange }) }), _jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [_jsx("span", { children: "2" }), _jsx("span", { children: "3" }), _jsx("span", { children: "4" }), _jsx("span", { children: "5" })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Number of executives that can participate in a debate" })] })), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsxs(Label, { htmlFor: "enableMemory", className: "flex items-center gap-2", children: [_jsx(Database, { className: "h-4 w-4 text-green-500" }), "AI Memory & Vector Search"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Allow AI to remember previous conversations and use them for context" })] }), _jsx(Switch, { id: "enableMemory", checked: preferences.enableVectorSearch || false, onCheckedChange: toggleVectorSearch })] }), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsxs(Label, { htmlFor: "enableLearning", className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-4 w-4 text-amber-500" }), "Learning from Feedback"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Enable AI to learn from your feedback to improve future responses" })] }), _jsx(Switch, { id: "enableLearning", checked: preferences.enableLearning || false, onCheckedChange: toggleLearning })] })] }) })] }));
}
