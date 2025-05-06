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
import { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, CreditCard, Calendar, AlertCircle, RefreshCw, } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
export default function SubscriptionManagement({ onUpgradePlan }) {
    const { subscription, isLoading, isUpdating, openCustomerPortal, cancelCurrentSubscription, reactivateCurrentSubscription, refresh, } = useSubscription();
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const formatDate = (dateString) => {
        if (!dateString)
            return "N/A";
        return new Date(dateString).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    const handleCancelSubscription = () => __awaiter(this, void 0, void 0, function* () {
        const success = yield cancelCurrentSubscription();
        if (success) {
            setShowCancelDialog(false);
        }
    });
    const handleReactivateSubscription = () => __awaiter(this, void 0, void 0, function* () {
        yield reactivateCurrentSubscription();
    });
    const handleManageBilling = () => __awaiter(this, void 0, void 0, function* () {
        yield openCustomerPortal();
    });
    if (isLoading) {
        return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(RefreshCw, { className: "h-5 w-5 animate-spin" }), "Loading Subscription Info"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-6 bg-muted rounded-md animate-pulse" }), _jsx("div", { className: "h-6 bg-muted rounded-md animate-pulse w-3/4" }), _jsx("div", { className: "h-6 bg-muted rounded-md animate-pulse w-1/2" })] }) })] }));
    }
    if (!(subscription === null || subscription === void 0 ? void 0 : subscription.isActive)) {
        return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-amber-500" }), "No Active Subscription"] }), _jsx(CardDescription, { children: "You currently don't have an active subscription plan." })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Upgrade to a paid plan to access premium features including:" }), _jsxs("ul", { className: "text-sm space-y-1 list-disc pl-4 mb-4", children: [_jsx("li", { children: "Advanced AI strategy recommendations" }), _jsx("li", { children: "Campaign automation and management" }), _jsx("li", { children: "Lead scoring and nurturing" }), _jsx("li", { children: "Integration with marketing platforms" })] })] }), _jsx(CardFooter, { children: _jsx(Button, { onClick: onUpgradePlan, className: "w-full", children: "View Pricing Plans" }) })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [subscription.cancelAtPeriodEnd ? (_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500" })) : (_jsx(CheckCircle, { className: "h-5 w-5 text-green-500" })), subscription.cancelAtPeriodEnd
                                        ? "Subscription Ending"
                                        : "Active Subscription"] }), _jsx(CardDescription, { children: subscription.planName || "Premium Plan" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Status:" }), _jsx("span", { className: "font-medium", children: subscription.status === "active" ? (_jsx("span", { className: "text-green-600 dark:text-green-400", children: "Active" })) : subscription.status === "canceled" ? (_jsx("span", { className: "text-red-600 dark:text-red-400", children: "Canceled" })) : subscription.status === "trialing" ? (_jsx("span", { className: "text-blue-600 dark:text-blue-400", children: "Trial" })) : (subscription.status) }), _jsx("span", { className: "text-muted-foreground", children: subscription.cancelAtPeriodEnd ? "Ends on:" : "Renews on:" }), _jsx("span", { className: "font-medium", children: formatDate(subscription.currentPeriodEnd) }), subscription.cancelAtPeriodEnd && (_jsxs(_Fragment, { children: [_jsx("span", { className: "text-muted-foreground", children: "Status after end date:" }), _jsx("span", { className: "font-medium text-red-600 dark:text-red-400", children: "Canceled" })] })), _jsx("span", { className: "text-muted-foreground", children: "Subscription started:" }), _jsx("span", { className: "font-medium", children: formatDate(subscription.createdAt) })] }) }) }), _jsxs(CardFooter, { className: "flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0", children: [_jsxs(Button, { variant: "outline", className: "w-full sm:w-auto", onClick: handleManageBilling, disabled: isUpdating, children: [_jsx(CreditCard, { className: "mr-2 h-4 w-4" }), isUpdating ? "Processing..." : "Manage Billing"] }), subscription.cancelAtPeriodEnd ? (_jsxs(Button, { className: "w-full sm:w-auto", onClick: handleReactivateSubscription, disabled: isUpdating, children: [_jsx(Calendar, { className: "mr-2 h-4 w-4" }), isUpdating ? "Processing..." : "Reactivate Subscription"] })) : (_jsx(Button, { variant: "destructive", className: "w-full sm:w-auto", onClick: () => setShowCancelDialog(true), disabled: isUpdating, children: isUpdating ? "Processing..." : "Cancel Subscription" }))] })] }), _jsx(AlertDialog, { open: showCancelDialog, onOpenChange: setShowCancelDialog, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Are you sure you want to cancel?" }), _jsxs(AlertDialogDescription, { children: ["Your subscription will remain active until the end of your current billing period on ", formatDate(subscription === null || subscription === void 0 ? void 0 : subscription.currentPeriodEnd), ". After this date, you'll lose access to premium features."] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Keep Subscription" }), _jsx(AlertDialogAction, { onClick: handleCancelSubscription, className: "bg-destructive text-destructive-foreground", children: "Cancel Subscription" })] })] }) })] }));
}
