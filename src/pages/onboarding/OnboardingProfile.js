import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const OnboardingProfile = () => {
    const navigate = useNavigate();
    const handleNext = () => {
        navigate("/onboarding/company");
    };
    return (_jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-12", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Your Profile" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "Tell us about yourself so we can personalize your experience." })] }), _jsxs(Card, { className: "mb-8", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Professional Information" }), _jsx(CardDescription, { children: "Help us understand your role and experience" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Profile form coming soon..." }) }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => navigate("/onboarding"), children: "Back" }), _jsx(Button, { onClick: handleNext, children: "Continue" })] })] })] }));
};
export default OnboardingProfile;
