import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Accessibility } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "@/hooks/useAccessibility";
export function AccessibilityPanel() {
    const [open, setOpen] = useState(false);
    // Use our extended type to ensure all properties are available
    const { screenReaderFriendly, highContrast, reducedMotion, largeText, invertColors, fontSize = 16, setFontSize = () => { }, toggleScreenReaderFriendly = () => { }, toggleHighContrast = () => { }, toggleReducedMotion = () => { }, toggleLargeText = () => { }, toggleInvertColors = () => { }, } = useAccessibility();
    const handleFontSizeChange = (value) => {
        setFontSize(value[0]);
    };
    const toggles = [
        {
            id: "screen-reader",
            label: "Screen Reader Mode",
            checked: screenReaderFriendly,
            onChange: toggleScreenReaderFriendly,
            description: "Optimizes content for screen readers",
        },
        {
            id: "high-contrast",
            label: "High Contrast",
            checked: highContrast,
            onChange: toggleHighContrast,
            description: "Increases contrast for better visibility",
        },
        {
            id: "reduced-motion",
            label: "Reduced Motion",
            checked: reducedMotion,
            onChange: toggleReducedMotion,
            description: "Reduces animations throughout the application",
        },
        {
            id: "large-text",
            label: "Large Text",
            checked: largeText,
            onChange: toggleLargeText,
            description: "Increases base text size throughout the app",
        },
        {
            id: "invert-colors",
            label: "Invert Colors",
            checked: invertColors,
            onChange: toggleInvertColors,
            description: "Inverts colors for reduced eye strain",
        },
    ];
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Accessibility, { className: "h-5 w-5" }), "Accessibility Settings"] }) }), _jsxs("div", { className: "space-y-6 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: ["Font Size (", fontSize, "px)"] }), _jsx(Slider, { value: [Number(fontSize)], min: 12, max: 24, step: 1, onValueChange: handleFontSizeChange, className: "w-full" })] }), _jsx("div", { className: "space-y-4", children: toggles.map((toggle) => (_jsxs("div", { className: "flex flex-col space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: toggle.id, className: "cursor-pointer", children: toggle.label }), _jsx(Switch, { id: toggle.id, checked: toggle.checked, onCheckedChange: toggle.onChange })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: toggle.description })] }, toggle.id))) })] })] }), _jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", className: "fixed bottom-4 right-4 rounded-full z-50 bg-primary text-primary-foreground", "aria-label": "Accessibility Settings", children: _jsx(Accessibility, { className: "h-4 w-4" }) }) })] }));
}
export function AccessibilityButton() {
    return _jsx(AccessibilityPanel, {});
}
export default AccessibilityPanel;
