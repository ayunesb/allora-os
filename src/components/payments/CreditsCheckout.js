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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { createCreditPurchaseCheckout } from "@/utils/stripePayments";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
export function CreditsCheckout() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const { user } = useUser();
    const creditPackages = [
        { id: "basic", credits: 100, price: 9.99 },
        { id: "standard", credits: 500, price: 39.99, popular: true },
        { id: "premium", credits: 1000, price: 69.99 },
    ];
    const handleCheckout = (packageId) => __awaiter(this, void 0, void 0, function* () {
        if (!user) {
            toast.error("You must be logged in to purchase credits");
            return;
        }
        try {
            setIsProcessing(true);
            setSelectedPackage(packageId);
            const pkg = creditPackages.find((p) => p.id === packageId);
            if (!pkg)
                return;
            const session = yield createCreditPurchaseCheckout({
                userId: user.id,
                credits: pkg.credits,
                priceUsd: pkg.price,
            });
            // Redirect to Stripe checkout
            window.location.href = session.url;
        }
        catch (error) {
            console.error("Error creating checkout session:", error);
            toast.error("Failed to initiate checkout. Please try again.");
        }
        finally {
            setIsProcessing(false);
        }
    });
    return (_jsxs("div", { className: "container mx-auto py-8 px-4 max-w-5xl", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Purchase Credits" }), _jsx("p", { className: "text-muted-foreground", children: "Add more credits to unlock additional AI-powered features." })] }), _jsx("div", { className: "grid gap-6 md:grid-cols-3", children: creditPackages.map((pkg) => (_jsxs(Card, { className: `relative overflow-hidden ${pkg.popular ? "border-primary shadow-md" : ""}`, children: [pkg.popular && (_jsx("div", { className: "absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium", children: "POPULAR" })), _jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-2xl font-bold", children: [pkg.credits, " Credits"] }), _jsxs(CardDescription, { children: ["$", pkg.price.toFixed(2)] })] }), _jsx(CardContent, { children: _jsxs("ul", { className: "space-y-2", children: [_jsxs("li", { className: "flex items-center", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-green-500 mr-2", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M20 6L9 17l-5-5" }) }), pkg.credits, " AI interactions"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-green-500 mr-2", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M20 6L9 17l-5-5" }) }), "Advanced AI features"] }), _jsxs("li", { className: "flex items-center", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-green-500 mr-2", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M20 6L9 17l-5-5" }) }), "No monthly commitment"] })] }) }), _jsx(CardFooter, { children: _jsx(Button, { className: "w-full", variant: pkg.popular ? "default" : "outline", onClick: () => handleCheckout(pkg.id), disabled: isProcessing && selectedPackage === pkg.id, children: isProcessing && selectedPackage === pkg.id ? (_jsxs("span", { className: "flex items-center", children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Processing..."] })) : ("Purchase") }) })] }, pkg.id))) }), _jsx("div", { className: "mt-8 text-center text-sm text-muted-foreground", children: _jsxs("p", { children: ["Need a custom plan?", " ", _jsx("a", { href: "/contact", className: "text-primary hover:underline", children: "Contact us" }), " ", "for enterprise solutions."] }) })] }));
}
