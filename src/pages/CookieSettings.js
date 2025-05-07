import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cookie, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
export default function CookieSettings() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        necessary: true,
        analytics: false,
        preferences: false,
        marketing: false,
    });
    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const savedSettings = localStorage.getItem("cookie-consent");
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings);
                setSettings({
                    necessary: true, // Always true
                    analytics: parsedSettings.analytics || false,
                    preferences: parsedSettings.preferences || false,
                    marketing: parsedSettings.marketing || false,
                });
            }
        }
        catch (error) {
            console.error("Error loading cookie settings:", error);
        }
    }, []);
    const handleToggle = (category) => {
        if (category === "necessary")
            return; // Can't toggle necessary cookies
        setSettings((prev) => (Object.assign(Object.assign({}, prev), { [category]: !prev[category] })));
    };
    const handleSave = () => {
        try {
            localStorage.setItem("cookie-consent", JSON.stringify(settings));
            toast.success("Cookie preferences saved");
        }
        catch (error) {
            console.error("Error saving cookie settings:", error);
            toast.error("Failed to save cookie preferences");
        }
    };
    const handleAcceptAll = () => {
        const allEnabled = {
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true,
        };
        setSettings(allEnabled);
        localStorage.setItem("cookie-consent", JSON.stringify(allEnabled));
        toast.success("All cookies accepted");
    };
    return (_jsxs("div", { className: "container max-w-4xl py-8", children: [_jsxs("div", { className: "mb-6 flex items-center", children: [_jsxs(Button, { variant: "ghost", onClick: () => navigate(-1), className: "mr-4", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] }), _jsx(PageTitle, { title: "Cookie Settings", children: "Cookie Settings" })] }), _jsxs(Card, { className: "mb-8", children: [_jsxs(CardHeader, { className: "border-b border-border", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Cookie, { className: "mr-2 h-5 w-5 text-primary" }), _jsx(CardTitle, { children: "Cookie Settings" })] }), _jsx(CardDescription, { children: "Manage how we use cookies and similar technologies on our website" })] }), _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "rounded-lg bg-muted/50 p-4", children: _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies." }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "necessary", className: "font-medium", children: "Necessary Cookies" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Essential for the website to function properly. Cannot be disabled." })] }), _jsx(Switch, { id: "necessary", checked: true, disabled: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "analytics", className: "font-medium", children: "Analytics Cookies" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Help us understand how visitors interact with our website." })] }), _jsx(Switch, { id: "analytics", checked: settings.analytics, onCheckedChange: () => handleToggle("analytics") })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "preferences", className: "font-medium", children: "Preference Cookies" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Allow the website to remember your preferences and settings." })] }), _jsx(Switch, { id: "preferences", checked: settings.preferences, onCheckedChange: () => handleToggle("preferences") })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "marketing", className: "font-medium", children: "Marketing Cookies" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Used to track visitors across websites for displaying relevant advertisements." })] }), _jsx(Switch, { id: "marketing", checked: settings.marketing, onCheckedChange: () => handleToggle("marketing") })] })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center", children: [_jsx(Shield, { className: "mr-2 h-5 w-5 text-primary" }), _jsx(CardTitle, { children: "Privacy Information" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-sm", children: "For more information about how we use cookies and your personal data, please check our:" }), _jsxs("div", { className: "flex flex-col gap-2 sm:flex-row", children: [_jsx(Button, { variant: "outline", asChild: true, children: _jsx(Link, { to: "/privacy", children: "Privacy Policy" }) }), _jsx(Button, { variant: "outline", asChild: true, children: _jsx(Link, { to: "/gdpr-compliance", children: "GDPR Compliance" }) })] })] })] }), _jsxs("div", { className: "flex justify-end gap-2 mt-6", children: [_jsx(Button, { variant: "outline", onClick: () => navigate(-1), children: "Cancel" }), _jsx(Button, { variant: "outline", onClick: handleAcceptAll, children: "Accept All" }), _jsx(Button, { onClick: handleSave, children: "Save Preferences" })] })] }));
}
