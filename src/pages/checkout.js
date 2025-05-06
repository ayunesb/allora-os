import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { CreditsCheckout } from "@/components/payments/CreditsCheckout";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { Helmet } from "react-helmet-async";
export default function CheckoutPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { user } = useUser();
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Purchase Credits - Allora AI" }) }), _jsx(PageErrorBoundary, { pageName: "Purchase Credits", children: _jsx(CreditsCheckout, {}) })] }));
}
