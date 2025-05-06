import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const NotificationsTab = () => {
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Notification Preferences" }), _jsx(CardDescription, { children: "Configure system notifications" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "email-notifications", children: "Email Notifications" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Send email for important system events" })] }), _jsx(Switch, { id: "email-notifications", defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { htmlFor: "sms-notifications", children: "SMS Notifications" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Send text messages for critical alerts" })] }), _jsx(Switch, { id: "sms-notifications" })] }), _jsx(Button, { children: "Save Notification Settings" })] })] }));
};
export default NotificationsTab;
