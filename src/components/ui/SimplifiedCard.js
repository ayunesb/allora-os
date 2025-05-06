import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "./card";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
export function SimplifiedCard({ title, description, children, footer, isLoading = false, error = null, onRetry, variant = "default", contentClassName, className, icon, headerAction, }) {
    // Variant-specific styles
    const variantStyles = {
        default: "",
        info: "border-blue-200 bg-blue-50/50 dark:bg-blue-950/10 dark:border-blue-900/50",
        success: "border-green-200 bg-green-50/50 dark:bg-green-950/10 dark:border-green-900/50",
        warning: "border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-900/50",
        error: "border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900/50",
        ai: "border-purple-200 bg-purple-50/50 dark:bg-purple-950/10 dark:border-purple-900/50",
    };
    // Default icon based on variant
    const defaultIcon = variant === "ai" ? _jsx(Sparkles, { className: "h-5 w-5 text-purple-500" }) : null;
    const displayIcon = icon || defaultIcon;
    return (_jsxs(Card, { className: cn(variantStyles[variant], className), children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [displayIcon && _jsx("div", { children: displayIcon }), _jsx(CardTitle, { children: title })] }), headerAction && _jsx("div", { children: headerAction })] }), description && _jsx(CardDescription, { children: description })] }), _jsx(CardContent, { className: cn(contentClassName), children: isLoading ? (_jsx("div", { className: "w-full flex items-center justify-center py-8", children: _jsx(Loader2, { className: "h-6 w-6 animate-spin text-muted-foreground" }) })) : error ? (_jsxs("div", { className: "text-center py-4", children: [_jsx("p", { className: "text-destructive mb-2", children: error }), onRetry && (_jsx("button", { onClick: onRetry, className: "text-sm text-muted-foreground hover:text-foreground underline", children: "Try again" }))] })) : (children) }), footer && _jsx(CardFooter, { children: footer })] }));
}
