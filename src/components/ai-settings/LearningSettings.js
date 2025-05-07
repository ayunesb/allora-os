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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Brain, Info, RefreshCw } from "lucide-react";
import { toast } from "sonner";
const LearningSettings = ({ children, variant = "default", size = "medium", }) => {
    const handleResetLearning = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            toast.success("Learning data has been reset", {
                description: "Your AI executives will start learning from scratch.",
            });
        }
        catch (error) {
            console.error("Error resetting learning data:", error);
            toast.error("Failed to reset learning data");
        }
    });
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-5 w-5" }), "Self-Learning Settings"] }), _jsx(CardDescription, { children: "Control how your AI executives learn from your interactions" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between py-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-medium", children: "Enable Self-Learning" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Allow AI executives to adapt based on your feedback and choices" })] }), _jsx(Switch, { checked: learningEnabled, onCheckedChange: onToggleLearning })] }), _jsxs("div", { className: "bg-accent/50 rounded-lg p-4", children: [_jsxs("h3", { className: "text-sm font-medium mb-2 flex items-center", children: [_jsx(Info, { className: "h-4 w-4 mr-2" }), "What does self-learning do?"] }), _jsxs("ul", { className: "text-sm space-y-2", children: [_jsx("li", { children: "\u2022 Tracks which strategies you approve or reject" }), _jsx("li", { children: "\u2022 Learns your risk tolerance and business preferences" }), _jsx("li", { children: "\u2022 Adapts communication style to your preferences" }), _jsx("li", { children: "\u2022 Improves recommendations over time" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-base font-medium", children: "Learning Data" }), _jsxs("div", { className: "flex flex-col space-y-2 mt-2", children: [_jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { children: "Interactions tracked" }), _jsx("span", { className: "font-medium", children: "247" })] }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { children: "Learning sessions" }), _jsx("span", { className: "font-medium", children: "18" })] }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { children: "Last updated" }), _jsx("span", { className: "font-medium", children: "Today, 2:45 PM" })] })] })] })] }), _jsx(CardFooter, { className: "flex justify-between border-t px-6 py-4", children: _jsxs(Button, { variant: "outline", className: "text-destructive", onClick: handleResetLearning, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Reset Learning Data"] }) })] }));
};
