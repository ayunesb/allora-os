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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useAuthState } from "@/hooks/useAuthState";
import { Badge } from "@/components/ui/badge";
import { Check, Pen, Brain } from "lucide-react";
export function PreferencesForm() {
    const { user } = useAuthState();
    const { preferences, updatePreference, isLoading, lastSyncTime } = useUserPreferences();
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast();
    if (!user) {
        return (_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsx("p", { children: "Please log in to set your AI preferences." }) }) }));
    }
    const handlePreferenceChange = (key, value) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updatePreference(key, value);
            toast({
                title: "Preference updated",
                description: `Your ${key.replace(/([A-Z])/g, " $1").toLowerCase()} has been updated.`,
            });
        }
        catch (error) {
            toast({
                title: "Update failed",
                description: "There was an error updating your preference. Please try again.",
                variant: "destructive",
            });
        }
    });
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl font-bold", children: "\uD83E\uDDE0 Personalize Your AI Executives" }), _jsx(CardDescription, { children: "Customize how your AI executives think, communicate, and make decisions" })] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: () => setIsEditing(!isEditing), className: "flex items-center gap-1", children: [isEditing ? (_jsx(Check, { className: "h-4 w-4" })) : (_jsx(Pen, { className: "h-4 w-4" })), isEditing ? "Done" : "Edit"] })] }) }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium block mb-2", children: "Communication Style" }), isEditing ? (_jsxs(Select, { value: preferences.responseStyle, onValueChange: (value) => handlePreferenceChange("responseStyle", value), disabled: isLoading, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select communication style" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "concise", children: "Concise" }), _jsx(SelectItem, { value: "balanced", children: "Balanced" }), _jsx(SelectItem, { value: "detailed", children: "Detailed" })] })] })) : (_jsx(Badge, { variant: "outline", className: "capitalize px-3 py-1 font-normal", children: preferences.responseStyle || "Not set" })), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "How verbose you want your AI executives to be in their communications" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium block mb-2", children: "Risk Appetite" }), isEditing ? (_jsxs(Select, { value: preferences.riskAppetite, onValueChange: (value) => handlePreferenceChange("riskAppetite", value), disabled: isLoading, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select risk appetite" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "low", children: "Low - Conservative" }), _jsx(SelectItem, { value: "medium", children: "Medium - Balanced" }), _jsx(SelectItem, { value: "high", children: "High - Aggressive" })] })] })) : (_jsx(Badge, { variant: "outline", className: `capitalize px-3 py-1 font-normal ${preferences.riskAppetite === "high"
                                        ? "bg-red-100 text-red-800 border-red-200"
                                        : preferences.riskAppetite === "low"
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : "bg-yellow-100 text-yellow-800 border-yellow-200"}`, children: preferences.riskAppetite || "Not set" })), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "How much risk your AI executives should take in their decisions" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium block mb-2", children: "Technical Level" }), isEditing ? (_jsxs(Select, { value: preferences.technicalLevel, onValueChange: (value) => handlePreferenceChange("technicalLevel", value), disabled: isLoading, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select technical level" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "basic", children: "Basic - Simple language" }), _jsx(SelectItem, { value: "intermediate", children: "Intermediate - Some terminology" }), _jsx(SelectItem, { value: "advanced", children: "Advanced - Industry terminology" })] })] })) : (_jsx(Badge, { variant: "outline", className: "capitalize px-3 py-1 font-normal", children: preferences.technicalLevel || "Not set" })), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "How technical you want the language to be in executive communications" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium block mb-2", children: "Focus Area" }), isEditing ? (_jsxs(Select, { value: preferences.focusArea, onValueChange: (value) => handlePreferenceChange("focusArea", value), disabled: isLoading, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select focus area" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "general", children: "General Business" }), _jsx(SelectItem, { value: "strategy", children: "Strategy" }), _jsx(SelectItem, { value: "marketing", children: "Marketing" }), _jsx(SelectItem, { value: "operations", children: "Operations" }), _jsx(SelectItem, { value: "technology", children: "Technology" }), _jsx(SelectItem, { value: "finance", children: "Finance" })] })] })) : (_jsx(Badge, { variant: "outline", className: "capitalize px-3 py-1 font-normal", children: preferences.focusArea || "Not set" })), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Business area to emphasize in executive responses" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium block mb-2", children: "Preferred AI Model" }), isEditing ? (_jsxs(Select, { value: preferences.modelPreference, onValueChange: (value) => handlePreferenceChange("modelPreference", value), disabled: isLoading, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select AI model" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "auto", children: "Auto (System chooses best model)" }), _jsx(SelectItem, { value: "smart", children: "Smart (Balanced speed/quality)" }), _jsx(SelectItem, { value: "powerful", children: "Powerful (Highest quality)" }), _jsx(SelectItem, { value: "fast", children: "Fast (Quickest response)" })] })] })) : (_jsx(Badge, { variant: "outline", className: "capitalize px-3 py-1 font-normal", children: preferences.modelPreference || "Auto" })), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Which AI model you prefer your executives to use" })] })] }) }), _jsxs(CardFooter, { className: "flex flex-col space-y-3 border-t pt-5 text-sm text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-4 w-4 text-primary" }), _jsx("span", { children: "Your preferences will be applied to all AI executive interactions" })] }), lastSyncTime && (_jsxs("div", { className: "text-xs text-muted-foreground", children: ["Last updated: ", lastSyncTime.toLocaleString()] }))] })] }));
}
