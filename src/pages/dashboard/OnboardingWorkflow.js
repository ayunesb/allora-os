import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BrainCircuit, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useExecutiveWorkflow } from "@/context/ExecutiveWorkflowContext";
import CompanyProfileForm from "@/components/onboarding/CompanyProfileForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function OnboardingWorkflow() {
    const { profile } = useAuth();
    const { hasGeneratedContent, isLoading } = useExecutiveWorkflow();
    const [activeTab, setActiveTab] = useState("profile");
    const navigate = useNavigate();
    // If content has been generated, show completion state
    if (hasGeneratedContent) {
        return (_jsx("div", { className: "container mx-auto px-4 py-12 max-w-4xl", children: _jsxs(Card, { className: "border-green-200", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex flex-col items-center text-center mb-4", children: [_jsx(CheckCircle2, { className: "h-16 w-16 text-green-500 mb-2" }), _jsx(CardTitle, { className: "text-2xl", children: "AI Executive Workflow Generated!" }), _jsx(CardDescription, { className: "text-lg", children: "Your AI executive team has created strategies, campaigns, and scripts based on your company profile." })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Button, { onClick: () => navigate("/dashboard/strategies"), className: "flex items-center justify-between", size: "lg", children: [_jsx("span", { children: "View Business Strategies" }), _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] }), _jsxs(Button, { onClick: () => navigate("/dashboard/campaigns"), className: "flex items-center justify-between", variant: "outline", size: "lg", children: [_jsx("span", { children: "View Marketing Campaigns" }), _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] }), _jsxs(Button, { onClick: () => navigate("/dashboard/calls"), className: "flex items-center justify-between", variant: "outline", size: "lg", children: [_jsx("span", { children: "View Communication Scripts" }), _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] }), _jsxs(Button, { onClick: () => navigate("/dashboard/ai-bots"), className: "flex items-center justify-between", variant: "outline", size: "lg", children: [_jsx("span", { children: "View AI Executive Debate" }), _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] }), _jsx(Button, { onClick: () => navigate("/dashboard"), className: "w-full mt-4", variant: "secondary", children: "Go to Dashboard" })] })] }) }));
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-12 max-w-5xl", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx(BrainCircuit, { className: "h-16 w-16 text-primary" }) }), _jsx("h1", { className: "text-3xl font-bold", children: "AI Executive Workflow" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Get personalized business strategies, marketing campaigns, and communication scripts from your AI executive team" })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx(TabsList, { className: "grid w-full max-w-md grid-cols-1", children: _jsx(TabsTrigger, { value: "profile", disabled: isLoading, children: "Company Profile" }) }) }), _jsx(TabsContent, { value: "profile", className: "space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Company Profile" }), _jsx(CardDescription, { children: "Provide information about your company to generate personalized AI executive recommendations" })] }), _jsx(CardContent, { children: _jsx(CompanyProfileForm, {}) })] }) })] })] }));
}
