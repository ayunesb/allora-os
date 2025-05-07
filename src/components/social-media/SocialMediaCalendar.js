import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SocialMediaProvider } from "@/context/SocialMediaContext";
import { SocialMediaContent } from "./calendar/SocialMediaContent";
import { ErrorBoundary } from "react-error-boundary";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Toaster } from "sonner";
import { useAccessibility } from "@/context/AccessibilityContext";
export default function SocialMediaCalendar() {
    const { screenReaderFriendly } = useAccessibility();
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, { position: "top-right", closeButton: true, richColors: true }), _jsx(ErrorBoundary, { FallbackComponent: ({ error, resetErrorBoundary }) => (_jsx(Card, { className: "w-full", children: _jsxs(CardContent, { className: "p-6 text-center space-y-4", children: [_jsx(AlertTriangle, { className: "h-12 w-12 mx-auto text-destructive", "aria-hidden": "true" }), _jsx("h3", { className: "text-lg font-medium text-destructive", children: "Something went wrong" }), _jsx("p", { className: "text-sm text-muted-foreground", children: error.message }), _jsx(Button, { onClick: resetErrorBoundary, "aria-label": screenReaderFriendly
                                    ? "Try again to load social media calendar"
                                    : undefined, children: "Try again" })] }) })), children: _jsx(SocialMediaProvider, { children: _jsx("div", { role: "region", "aria-label": screenReaderFriendly ? "Social Media Calendar" : undefined, className: "social-media-calendar", children: _jsx(SocialMediaContent, {}) }) }) })] }));
}
