import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AlertsPanel from "@/components/monitoring/AlertsPanel";
import { monitoring } from "@/utils/monitoring";
export default function AlertsTab() {
    const { toast } = useToast();
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "System Alerts" }), _jsx(CardDescription, { children: "Real-time alerts and notifications" })] }), _jsxs(CardContent, { children: [_jsx(AlertsPanel, { maxAlerts: 10 }), _jsx("div", { className: "mt-6", children: _jsx(Button, { variant: "outline", onClick: () => {
                                // Generate test alerts
                                monitoring.triggerAlert("Test Warning Alert", "This is a test warning alert", "warning", { source: "SystemHealth", test: true });
                                monitoring.triggerAlert("Test Error Alert", "This is a test error alert", "error", { source: "SystemHealth", test: true });
                                toast({
                                    title: "Test Alerts Generated",
                                    description: "Created test warning and error alerts",
                                });
                            }, children: "Generate Test Alert" }) })] })] }));
}
