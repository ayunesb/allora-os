import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, } from "@/components/ui/card";
import { motion } from "framer-motion";
export default function CheckoutSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const returnToDashboard = () => {
        navigate("/dashboard");
    };
    React.useEffect(() => {
        if (sessionId) {
            toast.success("Payment completed successfully!");
        }
    }, [sessionId]);
    return (_jsx("div", { className: "min-h-screen bg-background flex flex-col", children: _jsx("div", { className: "container mx-auto px-4 py-16 flex flex-col items-center justify-center flex-1", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, className: "w-full max-w-md", children: _jsxs(Card, { className: "border-primary/20 shadow-lg", children: [_jsxs(CardHeader, { className: "text-center pb-2", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx(CheckCircle, { className: "h-16 w-16 text-green-500" }) }), _jsx(CardTitle, { className: "text-2xl", children: "Payment Successful!" }), _jsx(CardDescription, { children: "Thank you for your purchase. Your transaction has been completed successfully." })] }), _jsx(CardContent, { className: "pt-4", children: _jsxs("div", { className: "bg-muted p-4 rounded-md space-y-2 text-sm", children: [_jsxs("p", { children: ["Your payment confirmation ID:", " ", _jsx("span", { className: "font-mono text-xs", children: sessionId || "N/A" })] }), _jsx("p", { children: "A confirmation email has been sent to your registered email address." })] }) }), _jsxs(CardFooter, { className: "flex flex-col gap-4 pt-6", children: [_jsxs(Button, { onClick: returnToDashboard, className: "w-full", children: ["Return to Dashboard", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] }), _jsx("p", { className: "text-center text-sm text-muted-foreground", children: "If you have any questions about your purchase, please contact our support team." })] })] }) }) }) }));
}
