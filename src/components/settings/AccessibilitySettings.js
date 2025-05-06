import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "@/context/AccessibilityContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
export function AccessibilitySettings() {
    const { preferences, updatePreference, applyAccessibilityClasses } = useAccessibility();
    const [showFeedback, setShowFeedback] = useState(true);
    const handleToggleHighContrast = () => {
        updatePreference("highContrast", !preferences.highContrast);
        applyAccessibilityClasses();
        if (showFeedback) {
            toast.success(preferences.highContrast
                ? "High contrast mode disabled"
                : "High contrast mode enabled");
        }
    };
    const handleToggleLargeText = () => {
        updatePreference("largeText", !preferences.largeText);
        applyAccessibilityClasses();
        if (showFeedback) {
            toast.success(preferences.largeText
                ? "Large text mode disabled"
                : "Large text mode enabled");
        }
    };
    const handleToggleReducedMotion = () => {
        updatePreference("reducedMotion", !preferences.reducedMotion);
        applyAccessibilityClasses();
        if (showFeedback) {
            toast.success(preferences.reducedMotion
                ? "Reduced motion mode disabled"
                : "Reduced motion mode enabled");
        }
    };
    const handleToggleScreenReader = () => {
        updatePreference("screenReaderFriendly", !preferences.screenReaderFriendly);
        applyAccessibilityClasses();
        if (showFeedback) {
            toast.success(preferences.screenReaderFriendly
                ? "Screen reader optimizations disabled"
                : "Screen reader optimizations enabled");
        }
    };
    const handleToggleFeedback = () => {
        setShowFeedback(!showFeedback);
        toast.info(showFeedback
            ? "Accessibility change notifications disabled"
            : "Accessibility change notifications enabled");
    };
    // Add keyboard shortcuts for accessibility features
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only trigger if Alt+A (accessibility menu) is pressed
            if (e.altKey && e.key === "a") {
                // Prevent default browser action
                e.preventDefault();
                // Show accessibility menu shortcuts info
                toast.info("Accessibility Shortcuts", {
                    description: "Alt+C: Toggle high contrast | Alt+T: Toggle large text | Alt+M: Toggle reduced motion | Alt+S: Toggle screen reader optimizations",
                    duration: 5000,
                });
            }
            // Alt+C for high contrast
            if (e.altKey && e.key === "c") {
                e.preventDefault();
                handleToggleHighContrast();
            }
            // Alt+T for large text
            if (e.altKey && e.key === "t") {
                e.preventDefault();
                handleToggleLargeText();
            }
            // Alt+M for reduced motion
            if (e.altKey && e.key === "m") {
                e.preventDefault();
                handleToggleReducedMotion();
            }
            // Alt+S for screen reader optimizations
            if (e.altKey && e.key === "s") {
                e.preventDefault();
                handleToggleScreenReader();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [preferences, showFeedback]);
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Accessibility Settings" }), _jsx(CardDescription, { children: "Customize your experience to make the application more accessible" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-row items-center justify-between space-y-0", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "high-contrast", children: "High contrast" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Increase the contrast for better readability" })] }), _jsx(Switch, { id: "high-contrast", checked: preferences.highContrast, onCheckedChange: handleToggleHighContrast, "aria-label": "Toggle high contrast mode" })] }), _jsxs("div", { className: "flex flex-row items-center justify-between space-y-0", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "large-text", children: "Larger text" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Increase text size throughout the application" })] }), _jsx(Switch, { id: "large-text", checked: preferences.largeText, onCheckedChange: handleToggleLargeText, "aria-label": "Toggle large text mode" })] }), _jsxs("div", { className: "flex flex-row items-center justify-between space-y-0", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "reduced-motion", children: "Reduced motion" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Minimize animations and transitions" })] }), _jsx(Switch, { id: "reduced-motion", checked: preferences.reducedMotion, onCheckedChange: handleToggleReducedMotion, "aria-label": "Toggle reduced motion mode" })] }), _jsxs("div", { className: "flex flex-row items-center justify-between space-y-0", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "screen-reader", children: "Screen reader optimization" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Add additional context for screen readers" })] }), _jsx(Switch, { id: "screen-reader", checked: preferences.screenReaderFriendly, onCheckedChange: handleToggleScreenReader, "aria-label": "Toggle screen reader optimization" })] }), _jsxs("div", { className: "flex flex-row items-center justify-between space-y-0", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "feedback-notifications", children: "Accessibility change notifications" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Show notifications when accessibility settings change" })] }), _jsx(Switch, { id: "feedback-notifications", checked: showFeedback, onCheckedChange: handleToggleFeedback, "aria-label": "Toggle accessibility change notifications" })] }), _jsxs("div", { className: "pt-4 border-t border-border", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Keyboard shortcuts" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-1", children: [_jsxs("p", { children: [_jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "Alt" }), " +", " ", _jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "A" }), " = Show accessibility menu"] }), _jsxs("p", { children: [_jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "Alt" }), " +", " ", _jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "C" }), " = Toggle high contrast"] }), _jsxs("p", { children: [_jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "Alt" }), " +", " ", _jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "T" }), " = Toggle large text"] }), _jsxs("p", { children: [_jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "Alt" }), " +", " ", _jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "M" }), " = Toggle reduced motion"] }), _jsxs("p", { children: [_jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "Alt" }), " +", " ", _jsx("kbd", { className: "px-1 py-0.5 bg-muted rounded border", children: "S" }), " = Toggle screen reader optimization"] })] })] }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => {
                            toast.success("Accessibility report sent to developers", {
                                description: "Thank you for helping us improve our accessibility features",
                            });
                        }, children: "Report Accessibility Issue" })] })] }));
}
