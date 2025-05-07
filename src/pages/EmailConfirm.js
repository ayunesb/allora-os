import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
export default function EmailConfirm() {
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-muted/40", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl", children: "Check your email" }), _jsx(CardDescription, { children: "We've sent you a confirmation email with a link to verify your account" })] }), _jsx(CardContent, { className: "grid gap-4", children: _jsx("p", { className: "text-center text-muted-foreground", children: "If you don't see the email in your inbox, please check your spam folder" }) }), _jsx(CardFooter, { className: "flex justify-center", children: _jsx(Button, { variant: "outline", children: "Resend email" }) })] }) }));
}
