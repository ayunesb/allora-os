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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
export function AiPreferencesForm() {
    const [usesIndustryData, setUsesIndustryData] = useState(true);
    const [includesCompetitorAnalysis, setIncludesCompetitorAnalysis] = useState(true);
    const [strategiesPerWeek, setStrategiesPerWeek] = useState("1-2");
    const [allowsAutonomy, setAllowsAutonomy] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Simulate API call
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("AI preferences saved successfully");
        }
        catch (error) {
            toast.error("Failed to save AI preferences");
        }
        finally {
            setIsSaving(false);
        }
    });
    return (_jsx("form", { onSubmit: handleSubmit, children: _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { className: "text-base", children: "Strategy Generation Frequency" }), _jsxs(RadioGroup, { value: strategiesPerWeek, onValueChange: (value) => setStrategiesPerWeek(value), children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: "1-2", id: "weekly-1-2" }), _jsx(Label, { htmlFor: "weekly-1-2", className: "font-normal", children: "1-2 strategies per week" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: "3-5", id: "weekly-3-5" }), _jsx(Label, { htmlFor: "weekly-3-5", className: "font-normal", children: "3-5 strategies per week" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: "5+", id: "weekly-5-plus" }), _jsx(Label, { htmlFor: "weekly-5-plus", className: "font-normal", children: "5+ strategies per week" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "industry-data", className: "mb-1 block", children: "Use Industry Data" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Include market research in strategy creation" })] }), _jsx(Switch, { id: "industry-data", checked: usesIndustryData, onCheckedChange: setUsesIndustryData })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "competitor-analysis", className: "mb-1 block", children: "Competitor Analysis" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Include competitor benchmarking in strategies" })] }), _jsx(Switch, { id: "competitor-analysis", checked: includesCompetitorAnalysis, onCheckedChange: setIncludesCompetitorAnalysis })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "autonomy", className: "mb-1 block", children: "Allow Autonomous Implementation" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Let AI execute approved strategies without confirmation" })] }), _jsx(Switch, { id: "autonomy", checked: allowsAutonomy, onCheckedChange: setAllowsAutonomy })] }), _jsx(Button, { type: "submit", disabled: isSaving, children: isSaving ? "Saving..." : "Save Preferences" })] }) }) }) }));
}
export function AIPreferencesForm() {
    return _jsx("div", { children: "AI Preferences Form coming soon." });
}
export default AiPreferencesForm;
