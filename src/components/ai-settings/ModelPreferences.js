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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
export function ModelPreferences({ modelPreferences, onUpdateModelPreferences, }) {
    const handleSave = () => __awaiter(this, void 0, void 0, function* () {
        try {
            toast.success("AI model preferences updated", {
                description: "Changes will apply to all future AI interactions.",
            });
        }
        catch (error) {
            console.error("Error updating model preferences:", error);
            toast.error("Failed to update model preferences");
        }
    });
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-5 w-5" }), "AI Model Preferences"] }), _jsx(CardDescription, { children: "Configure which AI models power your executive team" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "provider", className: "text-base font-medium", children: "AI Provider" }), _jsxs(Select, { value: modelPreferences.provider, onValueChange: (value) => onUpdateModelPreferences({
                                    provider: value,
                                }), children: [_jsx(SelectTrigger, { id: "provider", children: _jsx(SelectValue, { placeholder: "Select AI provider" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "openai", children: "OpenAI" }), _jsx(SelectItem, { value: "anthropic", children: "Anthropic (Claude)" }), _jsx(SelectItem, { value: "google", children: "Google (Gemini)" }), _jsx(SelectItem, { value: "mistral", children: "Mistral AI" })] })] })] }), _jsxs("div", { className: "space-y-2 pt-4", children: [_jsx(Label, { htmlFor: "model", className: "text-base font-medium", children: "Model" }), _jsxs(Select, { value: modelPreferences.model, onValueChange: (value) => onUpdateModelPreferences({ model: value }), children: [_jsx(SelectTrigger, { id: "model", children: _jsx(SelectValue, { placeholder: "Select AI model" }) }), _jsxs(SelectContent, { children: [modelPreferences.provider === "openai" && (_jsxs(_Fragment, { children: [_jsx(SelectItem, { value: "gpt-4o-mini", children: "GPT-4o Mini (Fastest)" }), _jsx(SelectItem, { value: "gpt-4o", children: "GPT-4o (Most Capable)" })] })), modelPreferences.provider === "anthropic" && (_jsxs(_Fragment, { children: [_jsx(SelectItem, { value: "claude-3-sonnet-20240229", children: "Claude 3 Sonnet" }), _jsx(SelectItem, { value: "claude-3-opus-20240229", children: "Claude 3 Opus (Most Capable)" })] })), modelPreferences.provider === "google" && (_jsx(_Fragment, { children: _jsx(SelectItem, { value: "gemini-1.5-pro", children: "Gemini 1.5 Pro" }) })), modelPreferences.provider === "mistral" && (_jsxs(_Fragment, { children: [_jsx(SelectItem, { value: "mistral-large", children: "Mistral Large" }), _jsx(SelectItem, { value: "mistral-small", children: "Mistral Small" })] }))] })] })] }), _jsxs("div", { className: "space-y-2 pt-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "temperature", className: "text-base font-medium", children: "Temperature" }), _jsx("span", { className: "text-sm font-medium", children: modelPreferences.temperature.toFixed(1) })] }), _jsx(Slider, { id: "temperature", defaultValue: [modelPreferences.temperature], min: 0, max: 1, step: 0.1, onValueChange: (values) => onUpdateModelPreferences({ temperature: values[0] }), className: "w-full" }), _jsxs("div", { className: "flex justify-between mt-2 text-xs text-muted-foreground", children: [_jsx("span", { children: "Predictable" }), _jsx("span", { children: "Balanced" }), _jsx("span", { children: "Creative" })] })] })] }), _jsxs(CardFooter, { className: "flex justify-between border-t px-6 py-4", children: [_jsxs(Button, { variant: "outline", onClick: () => onUpdateModelPreferences({
                            provider: "openai",
                            model: "gpt-4o-mini",
                            temperature: 0.7,
                        }), children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Reset to Defaults"] }), _jsx(Button, { onClick: handleSave, children: "Save Preferences" })] })] }));
}
