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
import { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { completeOnboarding } from "@/utils/onboarding";
import { toast } from "sonner";
const OnboardingComplete = () => {
    const navigate = useNavigate();
    const { profile, refreshProfile } = useAuth();
    useEffect(() => {
        const finalizeOnboarding = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if ((profile === null || profile === void 0 ? void 0 : profile.id) && profile.company_id) {
                    yield completeOnboarding(profile.id, profile.company_id, profile.industry || "");
                    refreshProfile();
                }
            }
            catch (error) {
                console.error("Error completing onboarding:", error);
            }
        });
        finalizeOnboarding();
    }, [profile, refreshProfile]);
    const handleComplete = () => {
        toast.success("Onboarding completed successfully!");
        navigate("/dashboard");
    };
    return (_jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-12", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: "Setup Complete!" }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: "You're all set to start using Allora AI." })] }), _jsxs(Card, { className: "mb-8 border-primary/20", children: [_jsxs(CardHeader, { className: "text-center pb-2", children: [_jsx(CheckCircle, { className: "h-16 w-16 text-primary mx-auto mb-4" }), _jsx(CardTitle, { className: "text-2xl", children: "Your AI Executive Team is Ready" })] }), _jsxs(CardContent, { className: "text-center space-y-4 pb-8", children: [_jsx("p", { className: "text-lg", children: "We've set up your AI executives based on your company profile. They're ready to help you make strategic decisions and grow your business." }), _jsxs("div", { className: "flex flex-col items-center space-y-2", children: [_jsx("p", { className: "font-medium", children: "What's next?" }), _jsxs("ul", { className: "text-left space-y-2 max-w-md", children: [_jsxs("li", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx("span", { children: "Explore your AI Executive Boardroom" })] }), _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx("span", { children: "Review suggested strategies" })] }), _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx("span", { children: "Set up your first campaign" })] }), _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx("span", { children: "Track leads and manage communications" })] })] })] })] }), _jsx(CardFooter, { className: "justify-center", children: _jsx(Button, { size: "lg", onClick: handleComplete, children: "Go to Dashboard" }) })] })] }));
};
export default OnboardingComplete;
