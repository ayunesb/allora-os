import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Bell, CheckCircle2 } from "lucide-react";
import { AlertList } from "./AlertList";
import { CollapsedAlertButton } from "./CollapsedAlertButton";
import { monitoring } from "@/utils/monitoring";
const AlertsPanel = ({ maxAlerts = 5, defaultExpanded = true, showOnlyUnacknowledged = false, severityFilter, }) => {
    const [alerts, setAlerts] = useState([]);
    const [expanded, setExpanded] = useState(defaultExpanded);
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        // Initial load of alerts
        const alertsToShow = monitoring.getAlerts(severityFilter);
        setAlerts(showOnlyUnacknowledged
            ? alertsToShow.filter((a) => !a.acknowledged)
            : alertsToShow);
        // Subscribe to alert updates
        const unsubscribe = monitoring.addListener((newAlerts) => {
            const filteredAlerts = severityFilter
                ? newAlerts.filter((a) => a.severity === severityFilter)
                : newAlerts;
            setAlerts(showOnlyUnacknowledged
                ? filteredAlerts.filter((a) => !a.acknowledged)
                : filteredAlerts);
        });
        return unsubscribe;
    }, [severityFilter, showOnlyUnacknowledged]);
    const handleAcknowledge = (alertId) => {
        monitoring.acknowledgeAlert(alertId);
    };
    const clearAllAlerts = () => {
        monitoring.clearAlerts();
    };
    const displayedAlerts = showAll ? alerts : alerts.slice(0, maxAlerts);
    if (alerts.length === 0) {
        return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Bell, { className: "mr-2 h-5 w-5 text-primary" }), "System Alerts"] }), _jsx(CardDescription, { children: "Real-time system notifications and alerts" })] }), _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-8 text-center text-muted-foreground", children: [_jsx(CheckCircle2, { className: "h-12 w-12 mb-4 text-green-500" }), _jsx("p", { className: "mb-2", children: "No alerts at this time" }), _jsx("p", { className: "text-sm", children: "The system is running smoothly" })] })] }));
    }
    if (!expanded) {
        return (_jsx(CollapsedAlertButton, { alerts: alerts, onClick: () => setExpanded(true) }));
    }
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(ShieldAlert, { className: "mr-2 h-5 w-5 text-primary" }), "System Alerts"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: clearAllAlerts, children: "Clear All" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setExpanded(false), children: "Minimize" })] })] }), _jsxs(CardDescription, { children: [alerts.length, " active alert", alerts.length !== 1 ? "s" : ""] })] }), _jsxs(CardContent, { children: [_jsx(AlertList, { alerts: displayedAlerts, onAcknowledge: handleAcknowledge }), alerts.length > maxAlerts && !showAll && (_jsx("div", { className: "mt-4 text-center", children: _jsxs(Button, { variant: "link", onClick: () => setShowAll(true), children: ["Show ", alerts.length - maxAlerts, " more alerts"] }) })), showAll && alerts.length > maxAlerts && (_jsx("div", { className: "mt-4 text-center", children: _jsx(Button, { variant: "link", onClick: () => setShowAll(false), children: "Show fewer alerts" }) }))] })] }));
};
export default AlertsPanel;
