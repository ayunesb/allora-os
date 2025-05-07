var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import SubscriptionManagement from "@/components/subscription/SubscriptionManagement";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Receipt, ChevronRight } from "lucide-react";
import PricingTier from "@/components/pricing/PricingTier";
import { getProducts } from "@/utils/stripeHelpers";
import { toast } from "sonner";
export default function Billing() {
    const [activeTab, setActiveTab] = useState("subscription");
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const { subscription } = useSubscription();
    useEffect(() => {
        const fetchProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                setIsLoadingProducts(true);
                const productsData = yield getProducts();
                setProducts(productsData);
            }
            catch (error) {
                console.error("Failed to fetch products:", error);
                toast.error("Failed to load pricing plans");
            }
            finally {
                setIsLoadingProducts(false);
            }
        });
        fetchProducts();
    }, []);
    const handleUpgradePlan = () => {
        setActiveTab("plans");
    };
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Billing & Subscription - Allora AI" }) }), _jsx(PageErrorBoundary, { pageName: "Billing & Subscription", children: _jsxs("div", { className: "container mx-auto px-4 py-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Billing & Subscription" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Manage your subscription plan and billing information" })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "mt-2 sm:mt-0 gap-1", onClick: () => window.open("mailto:support@allora-ai.com", "_blank"), children: ["Need help? Contact Support", _jsx(ChevronRight, { className: "h-4 w-4" })] })] }), _jsxs(Tabs, { defaultValue: "subscription", value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "subscription", children: "Current Subscription" }), _jsx(TabsTrigger, { value: "plans", children: "Available Plans" }), _jsx(TabsTrigger, { value: "history", children: "Billing History" })] }), _jsxs(TabsContent, { value: "subscription", className: "space-y-4", children: [_jsx(SubscriptionManagement, { onUpgradePlan: handleUpgradePlan }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(CreditCard, { className: "h-5 w-5" }), "Payment Methods"] }), _jsx(CardDescription, { children: "Manage your payment methods and billing details" })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Payment methods can be managed through the Stripe Customer Portal." }), _jsxs(Button, { variant: "outline", onClick: () => (subscription === null || subscription === void 0 ? void 0 : subscription.isActive) && handleUpgradePlan(), children: ["View Payment Methods", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] })] }), _jsx(TabsContent, { value: "plans", className: "space-y-4", children: _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-1", children: "Available Plans" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Choose the plan that best fits your business needs" }), isLoadingProducts ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [1, 2, 3].map((i) => (_jsxs(Card, { className: "animate-pulse", children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "h-7 bg-muted rounded-md w-1/2 mb-2" }), _jsx("div", { className: "h-4 bg-muted rounded-md w-3/4" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((j) => (_jsx("div", { className: "h-4 bg-muted rounded-md w-full" }, j))) }) })] }, i))) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: products.length > 0 ? (products
                                                    .filter((product) => product.active)
                                                    .map((product) => {
                                                    var _a, _b, _c, _d, _e;
                                                    const price = typeof product.default_price === "object"
                                                        ? product.default_price
                                                        : null;
                                                    const priceAmount = (price === null || price === void 0 ? void 0 : price.unit_amount)
                                                        ? `$${(price.unit_amount / 100).toFixed(2)}`
                                                        : "Custom";
                                                    const features = ((_a = product.metadata) === null || _a === void 0 ? void 0 : _a.features)
                                                        ? JSON.parse(product.metadata.features)
                                                        : ((_b = product.description) === null || _b === void 0 ? void 0 : _b.split(", ")) || [];
                                                    const isCurrentPlan = (subscription === null || subscription === void 0 ? void 0 : subscription.planId) === product.id;
                                                    return (_jsx(PricingTier, { title: product.name, price: priceAmount, description: product.description || "", features: features, buttonText: isCurrentPlan ? "Current Plan" : "Subscribe", priceId: typeof price === "object"
                                                            ? price === null || price === void 0 ? void 0 : price.id
                                                            : product.default_price, buttonVariant: isCurrentPlan ? "outline" : "default", currentPlan: isCurrentPlan, isRecommended: ((_c = product.metadata) === null || _c === void 0 ? void 0 : _c.recommended) === "true", popular: ((_d = product.metadata) === null || _d === void 0 ? void 0 : _d.popular) === "true", isEnterprise: ((_e = product.metadata) === null || _e === void 0 ? void 0 : _e.enterprise) === "true" }, product.id));
                                                })) : (_jsx("div", { className: "col-span-3 text-center py-8", children: _jsx("p", { className: "text-muted-foreground", children: "No pricing plans available" }) })) }))] }) }), _jsx(TabsContent, { value: "history", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Receipt, { className: "h-5 w-5" }), "Billing History"] }), _jsx(CardDescription, { children: "View your previous invoices and payment history" })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Access to your complete billing history is available through the Stripe Customer Portal." }), _jsxs(Button, { variant: "outline", onClick: () => __awaiter(this, void 0, void 0, function* () {
                                                            const { openCustomerPortal } = useSubscription();
                                                            yield openCustomerPortal();
                                                        }), children: ["View Billing History", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }) })] })] }) })] }));
}
