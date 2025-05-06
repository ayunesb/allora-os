import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
const OnboardingTeam = () => {
    const navigate = useNavigate();
    const handleFinish = () => {
        navigate("/dashboard");
    };
    return (_jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-12", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Team Setup" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Invite your team members to collaborate with your AI executives." })] }), _jsxs(Card, { className: "mb-8", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-5 w-5 text-primary" }), _jsx(CardTitle, { children: "Invite Team Members" })] }), _jsx(CardDescription, { children: "Add your colleagues to collaborate on strategies and campaigns" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Team invitations coming soon..." }) }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => navigate("/onboarding/company"), children: "Back" }), _jsx(Button, { onClick: handleFinish, children: "Finish Setup" })] })] })] }));
};
export default OnboardingTeam;
