import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export function ExecutiveInteraction({ riskAppetite }) {
    var _a;
    const navigate = useNavigate();
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    // Loading state
    if (!auth.profile) {
        return (_jsxs(Card, { className: "bg-primary/5 border-primary/20", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg", children: _jsx(Skeleton, { className: "h-4 w-32" }) }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-4", children: [_jsx(Skeleton, { className: "h-12 w-12 rounded-full" }), _jsxs("div", { className: "space-y-2 w-full", children: [_jsx(Skeleton, { className: "h-4 w-24" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-8 w-40 mt-2" })] })] }) })] }));
    }
    const companyName = ((_a = auth.profile) === null || _a === void 0 ? void 0 : _a.company) || "your company";
    // Get appropriate executive and message based on risk appetite
    const getExecutiveInfo = () => {
        switch (riskAppetite) {
            case "low":
                return {
                    name: "Financial Advisor",
                    message: `Let's develop a conservative growth strategy for ${companyName} that minimizes risk while ensuring steady progress.`,
                    image: "/executives/financial-advisor.png",
                };
            case "high":
                return {
                    name: "Growth Strategist",
                    message: `I've analyzed your market and have some bold ideas that could significantly accelerate ${companyName}'s growth trajectory.`,
                    image: "/executives/growth-strategist.png",
                };
            case "medium":
            default:
                return {
                    name: "Business Strategist",
                    message: `I've been reviewing ${companyName}'s position and have some balanced strategies that could help optimize your results.`,
                    image: "/executives/business-strategist.png",
                };
        }
    };
    const executiveInfo = getExecutiveInfo();
    return (_jsxs(Card, { className: "bg-primary/5 border-primary/20", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg", children: "Executive Insight" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-4", children: [_jsxs(Avatar, { className: "h-12 w-12 border-2 border-primary/20", children: [_jsx(AvatarImage, { src: executiveInfo.image, alt: executiveInfo.name }), _jsx(AvatarFallback, { children: executiveInfo.name.substring(0, 2).toUpperCase() })] }), _jsxs("div", { className: "space-y-2 text-center sm:text-left w-full", children: [_jsx("h3", { className: "font-semibold", children: executiveInfo.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: executiveInfo.message }), _jsxs(Button, { variant: "outline", size: "sm", className: "mt-2 w-full sm:w-auto", onClick: () => navigate("/dashboard/debate"), children: ["Start Strategy Session", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }) })] }));
}
