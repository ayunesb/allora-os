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
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useProtectedApi } from "@/utils/api/enhancedApiClient";
import { logSystemChange } from "@/utils/auditLogger";
import { useAuth } from "@/context/AuthContext";
import { fetchSecuritySettings, saveSecuritySettings } from "./securityService";
import SecurityToggleItem from "./SecurityToggleItem";
const SecurityTab = ({ initialSettings }) => {
    const { user } = useAuth();
    const [settings, setSettings] = useState(initialSettings || {
        twoFactorEnabled: false,
        extendedSessionTimeout: false,
        strictContentSecurity: false,
        enhancedApiProtection: false,
    });
    const { execute, isLoading } = useProtectedApi(saveSecuritySettings, {
        showSuccessToast: true,
        successMessage: "Security settings saved successfully",
        showErrorToast: true,
    });
    const handleToggle = (setting) => {
        setSettings((prev) => (Object.assign(Object.assign({}, prev), { [setting]: !prev[setting] })));
    };
    const handleSave = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield execute({ settings });
            // Log the security change
            if (user) {
                yield logSystemChange(user.id, "security_settings", "Security settings updated", { settings });
            }
        }
        catch (error) {
            console.error("Failed to save security settings:", error);
        }
    });
    // Fetch settings if not provided
    useEffect(() => {
        const loadSettings = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!initialSettings) {
                try {
                    const data = yield fetchSecuritySettings();
                    setSettings(data);
                }
                catch (error) {
                    toast.error("Failed to load security settings");
                }
            }
        });
        loadSettings();
    }, [initialSettings]);
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Shield, { className: "h-5 w-5 text-primary" }), _jsx(CardTitle, { children: "Security Settings" })] }), _jsx(CardDescription, { children: "Configure security preferences for your organization" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx(SecurityToggleItem, { id: "two-factor", title: "Two-Factor Authentication", description: "Require 2FA for all admin users", icon: Lock, checked: settings.twoFactorEnabled, onCheckedChange: () => handleToggle("twoFactorEnabled") }), _jsx(SecurityToggleItem, { id: "session-timeout", title: "Extended Session Timeout", description: "Increase session duration to 24 hours", icon: Key, checked: settings.extendedSessionTimeout, onCheckedChange: () => handleToggle("extendedSessionTimeout") }), _jsx(SecurityToggleItem, { id: "content-security", title: "Strict Content Security", description: "Enable strict Content Security Policy", icon: Shield, checked: settings.strictContentSecurity, onCheckedChange: () => handleToggle("strictContentSecurity") }), _jsx(SecurityToggleItem, { id: "api-protection", title: "Enhanced API Protection", description: "Enable rate limiting and additional API security measures", icon: Key, checked: settings.enhancedApiProtection, onCheckedChange: () => handleToggle("enhancedApiProtection") }), _jsx(Button, { onClick: handleSave, disabled: isLoading, className: "w-full", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Saving..."] })) : ("Save Security Settings") })] })] }));
};
export default SecurityTab;
