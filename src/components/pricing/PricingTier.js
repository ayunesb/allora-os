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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useBreakpoint } from "@/hooks/use-mobile";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
const PricingTier = ({ title, price, description, features, buttonText, priceId, buttonVariant = "default", popular = false, emoji = "✅", isRecommended = false, isEnterprise = false, currentPlan = false, }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const { subscribeToPlan, isSubscribing, subscription } = useSubscription();
    const handleSubscribe = () => __awaiter(void 0, void 0, void 0, function* () {
        if (isEnterprise) {
            toast.info("Please contact our sales team for enterprise plans");
            return;
        }
        if (!priceId) {
            toast.info("Please contact sales for this plan");
            return;
        }
        // If user is already subscribed to this plan
        if (currentPlan) {
            toast.info("You are already subscribed to this plan");
            return;
        }
        try {
            yield subscribeToPlan(priceId);
        }
        catch (error) {
            console.error("Error creating checkout:", error);
            toast.error("An error occurred. Please try again later.");
        }
    });
    // Custom badge component
    const Badge = ({ children, variant }) => {
        const bgColor = variant === "popular"
            ? "bg-primary"
            : variant === "recommended"
                ? "bg-green-600"
                : "bg-blue-600";
        const textColor = "text-white";
        return (_jsx("div", { className: `py-1 px-4 ${bgColor} ${textColor} text-center text-sm font-medium`, children: children }));
    };
    return (_jsxs(Card, { className: `flex flex-col ${popular ? "border-primary shadow-lg" : isRecommended ? "border-green-500 shadow-lg" : currentPlan ? "border-blue-500 shadow-lg" : ""}`, children: [popular && _jsx(Badge, { variant: "popular", children: "Most Popular" }), isRecommended && _jsx(Badge, { variant: "recommended", children: "Recommended" }), currentPlan && _jsx(Badge, { variant: "current", children: "Current Plan" }), _jsxs(CardHeader, { className: isMobileView ? "px-4 py-3" : undefined, children: [_jsx(CardTitle, { className: "text-xl", children: title }), _jsx(CardDescription, { children: description }), _jsxs("div", { className: "mt-4", children: [_jsx("span", { className: "text-3xl font-bold", children: price }), price !== "Custom" && (_jsx("span", { className: "text-muted-foreground", children: " /month" }))] })] }), _jsx(CardContent, { className: `flex-1 ${isMobileView ? "px-4 py-3 pt-0" : ""}`, children: _jsx("ul", { className: "space-y-3", children: features.map((feature, i) => (_jsxs("li", { className: "flex items-start", children: [_jsx("span", { className: "mr-2 text-primary", children: emoji }), _jsx("span", { className: `${isMobileView ? "text-xs" : "text-sm"}`, children: feature })] }, i))) }) }), _jsx(CardFooter, { className: isMobileView ? "px-4 py-3" : undefined, children: isEnterprise ? (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: buttonVariant, className: "w-full", onClick: handleSubscribe, children: ["Contact Sales", _jsx(Info, { className: "h-4 w-4 ml-2 opacity-70" })] }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Enterprise plans include custom pricing and features" }) })] }) })) : currentPlan ? (_jsx(Button, { variant: "outline", className: "w-full cursor-default", disabled: true, children: "Current Plan" })) : priceId ? (_jsx(Button, { variant: buttonVariant, className: "w-full", onClick: handleSubscribe, disabled: isSubscribing, children: isSubscribing ? "Processing..." : buttonText })) : (_jsx(Button, { variant: buttonVariant, className: "w-full", children: _jsx(Link, { to: "/signup", className: "w-full", children: buttonText }) })) })] }));
};
export default PricingTier;
