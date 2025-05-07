import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { toast } from "sonner";
const AiRecommendations = ({ children, variant = "default", size = "expanded", }) => {
    const [feedbackState, setFeedbackState] = useState({});
    const handleFeedback = (index, isPositive) => {
        setFeedbackState((prev) => (Object.assign(Object.assign({}, prev), { [index]: isPositive ? "liked" : "disliked" })));
        toast.success(isPositive
            ? "Thank you for your positive feedback!"
            : "Thank you for your feedback. We'll improve our recommendations.");
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: "AI Executive Recommendations" }), _jsx(Badge, { variant: "outline", className: "bg-primary/10 text-primary", children: "Executive Team" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-10", children: recommendations.map((rec, index) => (_jsxs(Card, { className: "border-primary/10 hover:border-primary/30 transition-all", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx("div", { className: "flex justify-between", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-1 mb-1", children: [_jsx(Badge, { variant: "outline", className: "capitalize", children: rec.type }), _jsx(Badge, { variant: "outline", className: "bg-amber-500/10 text-amber-500 capitalize", children: rec.timeframe })] }), _jsx(CardTitle, { className: "text-lg", children: rec.title })] }) }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "mb-4 flex items-start gap-3", children: [_jsxs(Avatar, { className: "h-8 w-8 border border-primary/20", children: [_jsx(AvatarImage, { src: `/avatars/${rec.executiveBot.name.toLowerCase().replace(/\s+/g, "-")}.png`, alt: rec.executiveBot.name }), _jsx(AvatarFallback, { children: rec.executiveBot.name.charAt(0) })] }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-muted-foreground text-sm mb-2", children: rec.description }), _jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-1", children: [_jsx("span", { children: "Expected Impact" }), _jsxs("span", { children: [rec.expectedImpact, "%"] })] }), _jsx(ProgressBar, { value: rec.expectedImpact, max: 100, className: "h-1.5" })] })] }), _jsxs("div", { className: "text-xs text-muted-foreground flex items-center", children: [_jsx("span", { children: "Recommended by: " }), _jsx("span", { className: "font-medium ml-1", children: rec.executiveBot.name })] })] }), _jsxs(CardFooter, { className: "flex justify-between border-t pt-4", children: [feedbackState[index] === "liked" ? (_jsxs(Button, { variant: "outline", size: "sm", className: "text-green-500", disabled: true, children: [_jsx(Check, { className: "mr-2 h-4 w-4" }), "Approved"] })) : (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => onApprove(index), children: [_jsx(ThumbsUp, { className: "mr-2 h-4 w-4" }), "Approve"] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleFeedback(index, false), className: "text-muted-foreground", children: _jsx(ThumbsDown, { className: "mr-2 h-4 w-4 h-3 w-3" }) })] })), _jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: _jsx(Link, { to: `/dashboard/${rec.type === "strategy" ? "strategies" : rec.type === "campaign" ? "campaigns" : "calls"}`, children: "View Details" }) })] })] }, index))) })] }));
};
export default AiRecommendations;
