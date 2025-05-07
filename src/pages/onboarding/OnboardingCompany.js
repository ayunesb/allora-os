import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building } from "lucide-react";
const OnboardingCompany = () => {
    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/onboarding/team");
    };
    return (_jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-12", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Company Information" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Tell us about your business so we can tailor our AI executives to your needs." })] }), _jsxs(Card, { className: "mb-8", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Building, { className: "h-5 w-5 text-primary" }), _jsx(CardTitle, { children: "Company Details" })] }), _jsx(CardDescription, { children: "Information about your company helps us create relevant business strategies" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Company form coming soon..." }) }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => navigate("/onboarding/profile"), children: "Back" }), _jsx(Button, { onClick: handleNext, children: "Continue" })] })] })] }));
};
export default OnboardingCompany;
