var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Cookie, Info, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
const CookieConsent = () => {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState({
        necessary: true,
        preferences: false,
        analytics: false,
        marketing: false,
    });
    const [hasConsented, setHasConsented] = useState(false);
    const [isEU, setIsEU] = useState(false);
    useEffect(() => {
        // Check for existing consent
        const consent = localStorage.getItem("cookie-consent");
        if (consent) {
            setHasConsented(true);
            setSettings(JSON.parse(consent));
            return;
        }
        // Detect if user is in EU (simplified version - would use IP geolocation in production)
        const detectEU = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // For demo purposes, randomly determine if the user is in the EU
                // In a real app, you would use a geolocation service based on IP
                const euUser = Math.random() > 0.5; // Simulate 50% chance of EU user
                setIsEU(euUser);
                // Show the banner for all users until they make a choice, for compliance reasons
                setTimeout(() => setOpen(true), 1000);
            }
            catch (error) {
                console.error("Error detecting location:", error);
                // If we can't detect, assume EU to be safe
                setIsEU(true);
                setTimeout(() => setOpen(true), 1000);
            }
        });
        detectEU();
    }, []);
    const handleAcceptAll = () => {
        const allSettings = {
            necessary: true,
            preferences: true,
            analytics: true,
            marketing: true,
        };
        localStorage.setItem("cookie-consent", JSON.stringify(allSettings));
        setSettings(allSettings);
        setHasConsented(true);
        setOpen(false);
        toast.success("All cookies accepted", {
            description: "Your preferences have been saved.",
        });
    };
    const handleAcceptNecessary = () => {
        const necessaryOnly = {
            necessary: true,
            preferences: false,
            analytics: false,
            marketing: false,
        };
        localStorage.setItem("cookie-consent", JSON.stringify(necessaryOnly));
        setSettings(necessaryOnly);
        setHasConsented(true);
        setOpen(false);
        toast.success("Necessary cookies accepted", {
            description: "Only necessary cookies will be used.",
        });
    };
    const handleSavePreferences = () => {
        localStorage.setItem("cookie-consent", JSON.stringify(settings));
        setHasConsented(true);
        setOpen(false);
        toast.success("Cookie preferences saved", {
            description: "Your custom preferences have been saved.",
        });
    };
    const toggleSetting = (setting) => {
        if (setting === "necessary")
            return; // Can't toggle necessary cookies
        setSettings((prev) => (Object.assign(Object.assign({}, prev), { [setting]: !prev[setting] })));
    };
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm", children: _jsxs(Card, { className: "w-full max-w-lg mx-auto border-primary/20 shadow-xl", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Cookie, { className: "h-5 w-5 text-primary" }), _jsx(CardTitle, { children: "Cookie Settings" })] }) }), _jsxs(CardDescription, { children: ["This website uses cookies to enhance your browsing experience, analyze site usage, and assist in our marketing efforts. See our", " ", _jsx(Link, { to: "/cookie-policy", className: "underline", children: "Cookie Policy" }), " ", "and", " ", _jsx(Link, { to: "/privacy", className: "underline", children: "Privacy Policy" }), " ", "for details."] })] }), _jsxs(Tabs, { defaultValue: "simple", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "simple", children: "Simple" }), _jsx(TabsTrigger, { value: "advanced", children: "Advanced" })] }), _jsx(TabsContent, { value: "simple", className: "py-4 px-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx(Info, { className: "h-5 w-5 text-blue-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium", children: "We Value Your Privacy" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "We use necessary cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic." })] })] }), _jsxs("div", { className: "flex items-start gap-4", children: [_jsx(Shield, { className: "h-5 w-5 text-green-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium", children: "Your Choices Matter" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "You can choose to accept or decline cookies. Necessary cookies are always enabled as they are essential for the website to function properly." })] })] }), isEU && (_jsxs("div", { className: "flex items-start gap-4", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium", children: "GDPR Compliance" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "We detect that you may be browsing from the European Union, where GDPR regulations apply. Please make a cookie selection to continue." })] })] }))] }) }), _jsx(TabsContent, { value: "advanced", className: "py-4 px-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "necessary", className: "text-base", children: "Necessary Cookies" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Essential for the website to function properly. Cannot be disabled." })] }), _jsx(Switch, { id: "necessary", checked: true, disabled: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "preferences", className: "text-base", children: "Preference Cookies" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Allow the website to remember choices you have made." })] }), _jsx(Switch, { id: "preferences", checked: settings.preferences, onCheckedChange: () => toggleSetting("preferences") })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "analytics", className: "text-base", children: "Analytics Cookies" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Help us understand how visitors interact with our website." })] }), _jsx(Switch, { id: "analytics", checked: settings.analytics, onCheckedChange: () => toggleSetting("analytics") })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "marketing", className: "text-base", children: "Marketing Cookies" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Used to track visitors across websites for advertising purposes." })] }), _jsx(Switch, { id: "marketing", checked: settings.marketing, onCheckedChange: () => toggleSetting("marketing") })] })] }) })] }), _jsxs(CardFooter, { className: "flex-col sm:flex-row gap-2 bg-muted/20 p-4", children: [_jsx(Button, { variant: "outline", onClick: handleAcceptNecessary, className: "w-full sm:w-auto", children: "Necessary Only" }), _jsxs("div", { className: "flex gap-2 w-full sm:w-auto", children: [_jsx(Button, { variant: "default", onClick: handleAcceptAll, className: "flex-1", children: "Accept All" }), _jsx(Button, { variant: "secondary", onClick: handleSavePreferences, className: "flex-1", children: "Save Preferences" })] })] })] }) }));
};
export default CookieConsent;
